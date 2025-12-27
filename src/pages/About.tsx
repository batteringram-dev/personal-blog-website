import { Layout } from "@/components/Layout";

const About = () => {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-6 py-12 lg:py-16">
        {/* Page Header */}
        <header className="mb-12 animate-fade-in">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
            About
          </h1>
        </header>

        {/* Main Content with Image and Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start lg:items-center animate-fade-in-up">
          {/* Introduction Text - Takes 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
            <div className="prose-journal">
              <p className="text-lg text-foreground leading-relaxed">
                Hi, I'm <strong>Sriram Kumar</strong>, a Data Engineer passionate about building scalable, production-ready data pipelines and reliable data platforms.
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                With expertise in Analytics & Big Data, I've demonstrated success in deriving strategic insights from extensive datasets. I'm committed to leveraging cutting-edge tools to drive data-driven decision-making.
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                My technical skills include Python, SQL, Apache Spark, MongoDB, Databricks, and cloud platforms like AWS and GCP. I enjoy sharing my learnings through writing about data engineering, AI/ML, and the tools that power modern data infrastructure.
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                When I'm not building data pipelines or writing code, you'll find me exploring new technologies, contributing to open source, or sharing insights with the data community.
              </p>
            </div>
          </div>

          {/* Image - Takes 1 column on large screens, centered on mobile */}
          <div className="lg:col-span-1 flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-lg overflow-hidden shadow-lg">
              <img
                src="/github-image.JPG"
                alt="Sriram Kumar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if image doesn't load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    target.parentElement.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-muted to-accent flex items-center justify-center text-muted-foreground font-serif text-4xl">SK</div>';
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;

