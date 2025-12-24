import { Link } from "react-router-dom";
import { Post } from "@/data/posts";

interface BlogCardProps {
  post: Post;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article
      className="group animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <Link to={`/post/${post.id}`} className="block">
        <div className="py-8 border-b border-border hover-lift">
          {/* Meta info */}
          <div className="flex items-center gap-3 mb-3">
            <time className="text-sm text-muted-foreground">{formattedDate}</time>
            <span className="text-muted-foreground/50">·</span>
            <span className="text-sm text-muted-foreground">{post.readingTime}</span>
          </div>

          {/* Title */}
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-3 group-hover:text-muted-foreground transition-colors duration-300">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-muted-foreground leading-relaxed mb-4 max-w-2xl">
            {post.excerpt}
          </p>

          {/* Category Tag */}
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-accent text-accent-foreground">
            {post.category}
          </span>
        </div>
      </Link>
    </article>
  );
}
