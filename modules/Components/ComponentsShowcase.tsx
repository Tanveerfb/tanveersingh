"use client";

import { useState, useMemo } from "react";
import ProjectCard from "@/components/ProjectCard";
import GradientText from "@/components/GradientText";
import { FaSearch, FaTags } from "react-icons/fa";

interface Component {
  name: string;
  description: string;
  tags: string[];
  category: string;
  tech: string[];
  demoComponent: string;
}

interface ComponentsShowcaseProps {
  components: Component[];
}

export default function ComponentsShowcase({
  components,
}: ComponentsShowcaseProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    components.forEach((component) => {
      component.tags.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  }, [components]);

  // Filter components based on search and tag
  const filteredComponents = useMemo(() => {
    return components.filter((component) => {
      const matchesSearch =
        searchQuery === "" ||
        component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesTag =
        selectedTag === null || component.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [components, searchQuery, selectedTag]);

  // Render demo component
  const renderDemo = (demoComponent: string) => {
    switch (demoComponent) {
      case "ProjectCard":
        return (
          <ProjectCard
            title="Sample Project"
            description="This is a sample project card demonstrating the gradient border and layout."
            status="Completed"
            focus={["UI Design", "React"]}
            tech={["TypeScript", "SCSS"]}
            link="#"
            linkLabel="View Demo"
          />
        );
      case "GradientText":
        return (
          <div style={{ padding: "2rem", textAlign: "center" }}>
            <h2>
              <GradientText
                colors={["var(--accent)", "var(--accent-alt)", "var(--accent)"]}
                animationSpeed={10}
              >
                Animated Gradient Text
              </GradientText>
            </h2>
          </div>
        );
      default:
        return <div className="panel">Demo not available</div>;
    }
  };

  return (
    <section className="components-page">
      <h1 className="components-title">
        <GradientText
          colors={["var(--accent)", "var(--accent-alt)", "var(--accent)"]}
          animationSpeed={10}
        >
          Components Library
        </GradientText>
      </h1>
      
      <p className="components-subtitle">
        Custom-built React components featuring cyberpunk aesthetics and modern design patterns.
      </p>

      {/* Search and Filter Section */}
      <div className="components-filters">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by name or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="tags-filter">
          <FaTags className="tags-icon" />
          <div className="tags-list">
            <button
              className={`tag-button ${selectedTag === null ? "active" : ""}`}
              onClick={() => setSelectedTag(null)}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`tag-button ${selectedTag === tag ? "active" : ""}`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="components-count">
        Showing {filteredComponents.length} of {components.length} components
      </div>

      {/* Components Grid */}
      <div className="components-grid">
        {filteredComponents.length > 0 ? (
          filteredComponents.map((component) => (
            <div key={component.name} className="component-showcase-item">
              <div className="gradient-border">
                <div className="component-info panel">
                  <h3 className="component-name">{component.name}</h3>
                  <p className="component-category">{component.category}</p>
                  <p className="component-description">{component.description}</p>
                  
                  <div className="component-meta">
                    <div className="component-tags">
                      {component.tags.map((tag) => (
                        <span key={tag} className="pill pill-focus">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="component-tech">
                      {component.tech.map((tech) => (
                        <span key={tech} className="pill pill-tech">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Demo Section */}
              <div className="component-demo">
                <h4 className="demo-title">Live Demo</h4>
                {renderDemo(component.demoComponent)}
              </div>
            </div>
          ))
        ) : (
          <div className="no-results panel">
            <p>No components found matching your criteria.</p>
            <button
              className="reset-button"
              onClick={() => {
                setSearchQuery("");
                setSelectedTag(null);
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
