export interface Post {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category: string;
  readingTime: string;
}

export const posts: Post[] = [
  {
    id: "idempotency-in-data-pipelines",
    title: "Idempotency in Data Pipelines: Why It Matters and How to Achieve It",
    date: "2025-01-15",
    excerpt: "Learn how to design data pipelines that never corrupt downstream data, even when re-run multiple times. Explore core techniques like MERGE, delete-and-load, and orchestration-level strategies.",
    content: `Imagine the data in your warehouse is duplicated or doubled or imagine a loan portfolio dashboard is displaying crazy and unusual numbers - this is the problem if your data pipeline isn't idempotent. Before going into what idempotency is in data pipelines, let's first skim through how your data can be duplicated in your tables. Let's say, for instance, your pipeline has failed due to an issue. You debug, re-run the Task and finally fix the issue, yes - great work! But have you realized that while re-running your Task/pipeline, you load the data twice or more unknowingly, which is the last thing you want! How can we design pipelines in such a way that re-running them nevers corrupts downstream data? This is where idempotency comes into the picture!

## Why Idempotency Matters

It matters a LOT! Non-idempotent pipelines results in duplicated data, inflated reports, and most importantly $$$, you waste a lot of money on compute power if your data is really "big". However, if your pipeline is idempotent, running it will give you the same result regardless of how many times we run it; isn't this extremely reliable? In simpler terms, running a pipeline twice should produce the same end state as running it once or an idempotent pipeline ensures that data will never be duplicated in the destination even if you run it a hundred times. But if isn't and you really run it a hundred times, then may the data gods have mercy on you and your compute budget. Because what you've just summoned is not insight, it's a full-blown Elden Beast (huge Elden Ring fan here :P)

## Core Techniques To Achieve Idempotency

Since we are done with "What" and "Why", let's get into my favourite part, that is "How" - the hands-on implementation to achieve idempotency. In order to build pipelines that can truly be relied upon, you must first understand the data flowing through your system all the way up to the Gold or analytics tables, you could say. You should know:

- what granularity your data arrives in (daily, hourly, event-based)

- what keys or columns can uniquely identify a record at each stage

- what data transformations happen along the way and whether they introduce duplicates or overwrite logic.

Only when you understand the full data journey, you can decide where to implement what.

Let's go through the core techniques that can be applied to your pipeline to make it idempotent:

### MERGE/Upsert:

MERGE is such a powerful command in SQL! As the word suggests, we merge the newly ingested data or source table with destination on a primary or natural key. It performs a comparison between the source and destination tables and essentially inserts rows that are not present in the destination and updates rows if there are any changes. Same concept applies to an Upsert command - It updates and/or inserts basically.

**Implementation:**

- suppose you have two tables, staging_orders, that holds newly ingested data and orders which is your production/Gold table. You want to update existing orders if they already exist (matching id) and insert new rows if they don't exist. Below is the query on how you can implement this:

\`\`\`sql
MERGE INTO orders AS target
USING staging_orders AS source
ON target.id = source.id
WHEN MATCHED THEN
  UPDATE SET
    target.customer_name = source.customer_name,
    target.status = source.status,
    target.updated_at = source.updated_at
WHEN NOT MATCHED THEN
  INSERT (id, customer_name, status, updated_at)
  VALUES (source.id, source.customer_name, source.status, source.updated_at);
\`\`\`

As you can see above, when id is matched, then we are updating the row, and inserting when not matched.

**Limitations:**

- MERGE can be slow, especially on large datasets causing performance overhead and it also expensive

- writing correct WHEN MATCHED and WHEN NOT MATCHED can sometimes become tricky and error-prone for multi-condition joins

- not all DB systems support MERGE

### Delete-and-load:

This technique follows the KISS principle - Keep It Simple Stupid! Because it is simple to implement, but ONLY when your table is small or when you are applying this technique to a partition in a table. It essentially deletes the existing data before loading the new data effectively truncating the entire table and reloading from scratch, resulting in achieving idempotency, which is why it's called delete-and-load.

You can apply this technique to tables that are smaller in size, perhaps, a few GBs wouldn't hurt as it won't cost much and introduce significant overhead. You truncate the existing table and load but don't do this to larger tables unless they are partitioned! If you are dealing with a huge table that's partitioned by date, then you can rewrite to a specific partition, wiping out an old slice with a new one. But if the table isn't partitioned and it's big, don't even bother.

**Implementation:**

We can use the same example as above here. Suppose you have two tables and you ingest daily order data into a table orders from a source table staging_orders, and each row has a order_date column. You want to delete existing data for a specific date and load fresh data for that date:

\`\`\`sql
-- Step 1: Delete existing records for the partition/date
DELETE FROM orders
WHERE order_date = '2025-06-06';

-- Step 2: Insert fresh data from staging
INSERT INTO orders (id, customer_name, status, order_date, updated_at)
SELECT id, customer_name, status, order_date, updated_at
FROM staging_orders
WHERE order_date = '2025-06-06';
\`\`\`

This will first delete the data for that specific partition/date first and then loads new data. Applies to an entire table as well - you just need to remove the partition clause.

**Limitations:**

- like I said, this works well only for small datasets

- no history tracking, which is a huge trade-off. We delete old data and insert fresh causing us to lose history unless explicitly archived somewhere else

- data gaps during execution can use issues. During the window after the DELETE but before the INSERT, the target table might be empty for that partition, causing issues for real-time queries or dashboards

### INSERT OVERWRITE:

This is similar to delete-and-load technique but it's only available in certain DBs. As the name suggests, this technique overwrites data in a partition resulting in fresh data. If your DB supports the INSERT OVERWRITE command, it's better to use it instead of delete-and-load. Here's how you can use the command to overwrite data for a specific partition:

\`\`\`sql
-- Replace the data for a specific partition (2025-06-06)
INSERT OVERWRITE TABLE orders
PARTITION (order_date = '2025-06-06')
SELECT id, customer_name, status, updated_at
FROM staging_orders
WHERE order_date = '2025-06-06';
\`\`\`

**Limitations:**

- same as the above, we won't be able to maintain history as it wipes out the old data

- not at all suitable for real-time or concurrent use cases as it may access inconsistent data while overwrite is in progress

- this is compute expensive and slow as overwriting large partitions requires scanning and writing all data

- no fine-grained control like MERGE as we can't handle row-level updates/inserts

### Orchestration Level: Apache Airflow

Another way to achieve idempotency at an orchestration/Task level setting, specifically in Airflow, is to set depends_on_past=True in your Task. When set to true, this will make sure your Task runs only when yesterday's run was successful, otherwise fails. This ensures it avoids re-running tasks for the same time window unless the previous task completed successfully - a key ingredient for idempotent pipelines. Also, two main reasons would be to avoid loading inconsistent or out-of-order data into our tables.

**Implementation** - this is how you set depends_on_past at a Task level:

\`\`\`python
    load_task = PythonOperator(
        task_id='load_data',
        python_callable=load_daily_data,
        depends_on_past=True,
        provide_context=True,
    )
\`\`\`

**Limitations:**

- becomes a nightmare to debug at scale when there are many Tasks and retries

- only works at Task level, not DAG level

## Real-world Example: Stripe's Idempotent API

Here's a short summary on how Stripe made their API idempotent:

- client sends a unique identifier (UUID) to the server

- this unique ID is cached in an in-memory database for 24 hours

- suppose the client retries or makes the same payment over and over again, the server will get the already-stored unique ID, cross-checks, and ignores duplicate requests

- and since it is an in-memory database, the cached data is then deleted after 24 hours to reduce costs and free up memory`,
    category: "Data Engineering",
    readingTime: "12 min read"
  },
];

export const categories = Array.from(new Set(posts.map(post => post.category)));
