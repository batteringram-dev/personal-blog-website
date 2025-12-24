import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message sent",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto px-6 py-12 lg:py-16">
        {/* Page Header */}
        <header className="mb-12 animate-fade-in">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Contact
          </h1>
          <p className="text-lg text-muted-foreground">
            Have a question or want to connect? I'd love to hear from you.
          </p>
        </header>

        {/* Email */}
        <div className="mb-12 p-6 bg-secondary rounded-lg animate-fade-in-up">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent rounded-md">
              <Mail size={20} className="text-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Email me at</p>
              <a
                href="mailto:hello@yourname.com"
                className="text-foreground font-medium hover:underline underline-offset-4"
              >
                hello@yourname.com
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              Name
            </label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your name"
              required
              className="bg-background border-border focus:ring-foreground focus:border-foreground"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@example.com"
              required
              className="bg-background border-border focus:ring-foreground focus:border-foreground"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
              Message
            </label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="What's on your mind?"
              rows={6}
              required
              className="bg-background border-border focus:ring-foreground focus:border-foreground resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-foreground text-background hover:bg-foreground/90 transition-colors"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default Contact;
