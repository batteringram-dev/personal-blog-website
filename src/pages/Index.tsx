import { useState, useMemo } from "react";
import { Layout } from "@/components/Layout";
import { BlogCard } from "@/components/BlogCard";
import { TagFilter } from "@/components/TagFilter";
import { posts, categories } from "@/data/posts";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    if (!activeCategory) return posts;
    return posts.filter((post) => post.category === activeCategory);
  }, [activeCategory]);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-6 py-12 lg:py-16">
        {/* Page Header */}
        <header className="mb-12 animate-fade-in">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Writing
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Thoughts on creativity, technology, and the art of intentional living.
          </p>
        </header>

        {/* Tag Filter */}
        <TagFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Blog Feed */}
        <div className="space-y-0">
          {filteredPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            No posts found in this category.
          </p>
        )}
      </div>
    </Layout>
  );
};

export default Index;
