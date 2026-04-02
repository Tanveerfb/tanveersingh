import type { Metadata } from "next";
import { generateSEO } from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import { FaCheck } from "react-icons/fa";
import "@/styles/features/services.scss";
import siteData from "@/content/siteData.json";

export const metadata: Metadata = generateSEO({
  title: "Services",
  description:
    "Landing pages, business websites, and e-commerce builds — clean, fast, and built to convert.",
  url: "/services",
});

export default function ServicesPage() {
  return (
    <div className="services-page">
      <AnimatedSection>
        <header className="services-header">
          <h1 className="section-heading">Services</h1>
          <p className="services-intro">
            Pick a starting point — every project is scoped and quoted to your
            actual needs.
          </p>
        </header>
      </AnimatedSection>

      <div className="services-grid">
        {siteData.services.map((card, index) => (
          <AnimatedSection key={card.name} delay={index * 0.15}>
            <div className={`service-card ${card.popular ? "popular" : ""}`}>
              {card.popular && (
                <div className="popular-badge">Most Popular</div>
              )}
              <div className="service-card-header">
                <h2 className="service-name">{card.name}</h2>
                <p className="service-description">{card.description}</p>
              </div>
              <ul className="service-features">
                {card.features.map((feature) => (
                  <li key={feature} className="service-feature">
                    <FaCheck className="feature-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="/contact" className="service-cta">
                Get in Touch
              </a>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection delay={0.5}>
        <div className="services-note">
          <p>
            All projects are quoted based on scope. Get in touch and I&apos;ll
            put together something that actually fits your budget.
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
}
