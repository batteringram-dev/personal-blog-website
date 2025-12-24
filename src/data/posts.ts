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
    id: "finding-clarity-in-chaos",
    title: "Finding Clarity in Chaos",
    date: "2024-12-20",
    excerpt: "In the midst of constant noise and distraction, I've discovered that clarity isn't found—it's cultivated through intentional practice and quiet reflection.",
    content: `In the midst of constant noise and distraction, I've discovered that clarity isn't found—it's cultivated through intentional practice and quiet reflection.

## The Art of Slowing Down

We live in an age of perpetual motion. Our devices buzz with notifications, our calendars overflow with commitments, and our minds race with endless to-do lists. Yet somewhere in this chaos lies an opportunity for profound clarity.

I've found that the most transformative moments of my life haven't come from doing more, but from intentionally doing less. When I strip away the unnecessary, what remains is essential.

## Morning Rituals

My mornings now begin differently. No phone for the first hour. Just coffee, a notebook, and the quiet hum of early light filtering through curtains. In these moments, thoughts settle like sediment in still water, revealing insights that busy days would never allow.

> "Almost everything will work again if you unplug it for a few minutes, including you." — Anne Lamott

## The Practice

Clarity is a practice, not a destination. Some days it comes easily; others, it eludes me entirely. But the pursuit itself has value—each attempt strengthens the muscle of attention, of presence, of being fully here.

The chaos hasn't disappeared. But my relationship with it has fundamentally shifted.`,
    category: "Reflection",
    readingTime: "4 min read"
  },
  {
    id: "on-building-in-public",
    title: "On Building in Public",
    date: "2024-12-15",
    excerpt: "Why sharing your work before it's ready might be the most important thing you do for your creative practice.",
    content: `Why sharing your work before it's ready might be the most important thing you do for your creative practice.

## The Fear of Being Seen

There's a particular vulnerability in sharing unfinished work. We fear judgment, comparison, and the exposure of our amateur status. Yet this fear, I've learned, is precisely what we must walk through.

## My Journey

When I started writing publicly three years ago, each post felt like standing naked in a crowded room. My prose was clumsy, my ideas half-formed. But something remarkable happened: people responded not to my polish, but to my honesty.

The imperfections became the connection points.

## What I've Learned

1. **Progress beats perfection.** A shipped draft teaches more than an unfinished masterpiece.
2. **Feedback accelerates growth.** External eyes see blind spots we cannot.
3. **Consistency builds trust.** Regular sharing creates a container for ongoing conversation.

## The Invitation

If you're holding back, waiting until you're "ready"—consider this your permission slip. The world needs your voice, rough edges and all.

Start today. Start small. But start.`,
    category: "Creativity",
    readingTime: "3 min read"
  },
  {
    id: "lessons-from-books",
    title: "Lessons from a Year of Reading",
    date: "2024-12-08",
    excerpt: "Fifty-two books, countless insights, and the surprising patterns that emerged from a year dedicated to intentional reading.",
    content: `Fifty-two books, countless insights, and the surprising patterns that emerged from a year dedicated to intentional reading.

## The Challenge

At the start of 2024, I committed to reading one book per week. Not skimming, not summarizing—actually reading, with attention and presence.

## The Unexpected Patterns

What surprised me wasn't any single book's insights, but the conversations that emerged between them. Philosophy spoke to science. Fiction illuminated psychology. History rhymed with current events.

### Books That Shaped My Thinking

- **"Thinking, Fast and Slow"** by Daniel Kahneman — Understanding our cognitive biases
- **"Pilgrim at Tinker Creek"** by Annie Dillard — The sacred in the ordinary
- **"The Master and His Emissary"** by Iain McGilchrist — How our brain shapes our world

## The Deeper Lesson

Reading isn't about accumulating information. It's about transformation—allowing other minds to reshape our own, one page at a time.

The books changed me. And that's the point.`,
    category: "Books",
    readingTime: "5 min read"
  },
  {
    id: "digital-minimalism",
    title: "Embracing Digital Minimalism",
    date: "2024-11-28",
    excerpt: "How I reclaimed my attention by radically simplifying my digital life—and what I discovered on the other side.",
    content: `How I reclaimed my attention by radically simplifying my digital life—and what I discovered on the other side.

## The Breaking Point

Last spring, I caught myself checking my phone 147 times in a single day. Not because I needed to—but because my fingers had learned to reach for that glowing rectangle on autopilot.

Something had to change.

## The Experiment

For 30 days, I stripped my digital life to essentials:
- Deleted all social media apps
- Removed email from my phone
- Turned off all non-essential notifications
- Set hard boundaries on screen time

## What Happened

The first week was uncomfortable. My hands felt empty, my mind restless. But by week two, something shifted.

I started noticing things: the quality of light at different hours, the texture of a good conversation, the subtle satisfaction of an uninterrupted thought carried to completion.

## The New Normal

I've maintained a modified version of this practice. Not because I'm anti-technology—I love what it enables. But because I've tasted what life feels like when technology serves me, rather than the reverse.

The attention we reclaim becomes the life we actually live.`,
    category: "Technology",
    readingTime: "4 min read"
  },
  {
    id: "art-of-slow-writing",
    title: "The Art of Slow Writing",
    date: "2024-11-15",
    excerpt: "In a world optimized for speed, I've found my best work emerges from deliberate slowness and patient revision.",
    content: `In a world optimized for speed, I've found my best work emerges from deliberate slowness and patient revision.

## Against the Algorithm

Every platform incentivizes volume. Post daily. Ship weekly. The algorithm rewards those who feed it constantly. But quality lives on a different timeline.

## My Process

I now write in layers:
1. **First draft:** Pure flow, no judgment
2. **Rest:** Days or weeks of distance
3. **Revision:** Careful sculpting
4. **Final polish:** Reading aloud, hearing the rhythm

This essay you're reading took three weeks to complete. A year ago, I would have published it in three hours.

## The Difference

Speed produces content. Slowness produces work that lasts.

I no longer measure success by output volume, but by the depth of thinking each piece represents.`,
    category: "Creativity",
    readingTime: "3 min read"
  }
];

export const categories = Array.from(new Set(posts.map(post => post.category)));
