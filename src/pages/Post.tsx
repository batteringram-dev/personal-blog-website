import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ReadingProgress } from "@/components/ReadingProgress";
import { posts } from "@/data/posts";

// Simple markdown-like parser for the content
function parseContent(content: string) {
  const lines = content.split("\n");
  const elements: JSX.Element[] = [];
  let listItems: string[] = [];
  let inList = false;
  let listType: "ul" | "ol" = "ul";

  const flushList = () => {
    if (listItems.length > 0) {
      const ListTag = listType;
      elements.push(
        <ListTag key={`list-${elements.length}`} className={listType === "ol" ? "list-decimal" : "list-disc"}>
          {listItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ListTag>
      );
      listItems = [];
      inList = false;
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Handle headers
    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={`h2-${index}`}>{trimmed.slice(3)}</h2>
      );
      return;
    }

    if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={`h3-${index}`}>{trimmed.slice(4)}</h3>
      );
      return;
    }

    // Handle blockquotes
    if (trimmed.startsWith("> ")) {
      flushList();
      elements.push(
        <blockquote key={`quote-${index}`}>{trimmed.slice(2)}</blockquote>
      );
      return;
    }

    // Handle unordered list items
    if (trimmed.startsWith("- ")) {
      if (!inList || listType !== "ul") {
        flushList();
        listType = "ul";
      }
      inList = true;
      const itemContent = trimmed.slice(2);
      // Handle bold text
      const parsed = itemContent.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      listItems.push(parsed);
      return;
    }

    // Handle ordered list items
    const orderedMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (orderedMatch) {
      if (!inList || listType !== "ol") {
        flushList();
        listType = "ol";
      }
      inList = true;
      const itemContent = orderedMatch[2];
      const parsed = itemContent.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      listItems.push(parsed);
      return;
    }

    // Handle paragraphs
    if (trimmed !== "") {
      flushList();
      // Handle bold text
      const parsed = trimmed.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      elements.push(
        <p key={`p-${index}`} dangerouslySetInnerHTML={{ __html: parsed }} />
      );
    }
  });

  flushList();
  return elements;
}

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return <Navigate to="/" replace />;
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <ReadingProgress />
      <Layout>
        <article className="max-w-2xl mx-auto px-6 py-12 lg:py-16">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Back to Writing</span>
          </Link>

          {/* Article Header */}
          <header className="mb-12 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <time className="text-sm text-muted-foreground">{formattedDate}</time>
              <span className="text-muted-foreground/50">·</span>
              <span className="text-sm text-muted-foreground">{post.readingTime}</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4 leading-tight">
              {post.title}
            </h1>

            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-accent text-accent-foreground">
              {post.category}
            </span>
          </header>

          {/* Article Content */}
          <div className="prose-journal animate-fade-in-up">
            {parseContent(post.content)}
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-border">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={18} />
              <span className="text-sm font-medium">Back to Writing</span>
            </Link>
          </footer>
        </article>
      </Layout>
    </>
  );
};

export default Post;
