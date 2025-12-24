interface TagFilterProps {
  categories: string[];
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function TagFilter({ categories, activeCategory, onCategoryChange }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
          activeCategory === null
            ? "bg-foreground text-background"
            : "bg-secondary text-muted-foreground hover:bg-accent hover:text-foreground"
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
            activeCategory === category
              ? "bg-foreground text-background"
              : "bg-secondary text-muted-foreground hover:bg-accent hover:text-foreground"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
