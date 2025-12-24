import { ReactNode, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Github, Linkedin, Twitter, Menu, X } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const navLinks = [
  { to: "/", label: "Writing" },
  { to: "/library", label: "Library" },
  { to: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://github.com", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "https://twitter.com", icon: Twitter, label: "X" },
];

export function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-6 py-4">
          <NavLink to="/" className="font-serif text-xl font-semibold text-foreground">
            Your Name
          </NavLink>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-foreground hover:text-muted-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="px-6 pb-6 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-lg font-medium transition-colors ${
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
            <div className="flex items-center space-x-4 mt-6 pt-6 border-t border-border">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={link.label}
                >
                  <link.icon size={20} />
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:flex-col lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-72 xl:w-80 bg-sidebar border-r border-sidebar-border p-8">
          <div className="flex flex-col h-full">
            {/* Profile Section */}
            <div className="mb-8">
              <div className="w-16 h-16 rounded-full bg-muted mb-4 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-muted to-accent flex items-center justify-center text-muted-foreground font-serif text-xl">
                  YN
                </div>
              </div>
              <h1 className="font-serif text-2xl font-semibold text-sidebar-foreground mb-2">
                Your Name
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Writer, reader, and thinker exploring the intersection of creativity, technology, and intentional living.
              </p>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col space-y-1 mb-auto">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-sidebar-accent text-sidebar-foreground"
                        : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                    }`}
                  >
                    {link.label}
                  </NavLink>
                );
              })}
            </nav>

            {/* Social Links */}
            <div className="pt-6 border-t border-sidebar-border">
              <div className="flex items-center space-x-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-sidebar-foreground transition-colors"
                    aria-label={link.label}
                  >
                    <link.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-72 xl:ml-80 min-h-screen">
          <div className="pt-20 lg:pt-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
