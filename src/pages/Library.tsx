import { Layout } from "@/components/Layout";
import { ExternalLink } from "lucide-react";

interface Book {
  title: string;
  author: string;
  description: string;
  link?: string;
}

interface Resource {
  title: string;
  description: string;
  url: string;
}

const currentlyReading: Book = {
  title: "The Master and His Emissary",
  author: "Iain McGilchrist",
  description: "A profound exploration of how our divided brain shapes our world and experience.",
};

const favoriteBooks: Book[] = [
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    description: "The definitive book on how we think, decide, and the biases that shape our reasoning.",
  },
  {
    title: "Pilgrim at Tinker Creek",
    author: "Annie Dillard",
    description: "A beautifully written meditation on nature and the sacred in everyday life.",
  },
  {
    title: "Bird by Bird",
    author: "Anne Lamott",
    description: "Wise and witty advice on writing and life from a master of the craft.",
  },
  {
    title: "Essentialism",
    author: "Greg McKeown",
    description: "The disciplined pursuit of less but better—a guide to doing what matters most.",
  },
];

const resources: Resource[] = [
  {
    title: "Brain Pickings",
    description: "Maria Popova's treasure trove of wisdom from across literature and science.",
    url: "https://www.themarginalian.org",
  },
  {
    title: "Farnam Street",
    description: "Mental models and decision-making frameworks for better thinking.",
    url: "https://fs.blog",
  },
  {
    title: "The Long Now Foundation",
    description: "Long-term thinking and civilization-scale projects.",
    url: "https://longnow.org",
  },
];

const Library = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-6 py-12 lg:py-16">
        {/* Page Header */}
        <header className="mb-12 animate-fade-in">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Library
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Books that shaped my thinking, and resources I return to often.
          </p>
        </header>

        {/* Currently Reading */}
        <section className="mb-16 animate-fade-in-up">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">
            Currently Reading
          </h2>
          <div className="p-6 bg-secondary rounded-lg border border-border">
            <h3 className="font-serif text-xl font-medium text-foreground mb-1">
              {currentlyReading.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              by {currentlyReading.author}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {currentlyReading.description}
            </p>
          </div>
        </section>

        {/* Favorite Books */}
        <section className="mb-16 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">
            Favorite Books
          </h2>
          <div className="space-y-6">
            {favoriteBooks.map((book, index) => (
              <div
                key={book.title}
                className="pb-6 border-b border-border last:border-b-0 last:pb-0"
              >
                <h3 className="font-serif text-lg font-medium text-foreground mb-1">
                  {book.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  by {book.author}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {book.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Resources */}
        <section className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">
            Resources I Love
          </h2>
          <div className="space-y-4">
            {resources.map((resource) => (
              <a
                key={resource.title}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between p-4 rounded-lg border border-border hover:bg-secondary transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-1 group-hover:text-foreground/80 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {resource.description}
                  </p>
                </div>
                <ExternalLink
                  size={16}
                  className="text-muted-foreground group-hover:text-foreground transition-colors mt-1 ml-4 flex-shrink-0"
                />
              </a>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Library;
