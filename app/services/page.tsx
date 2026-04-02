import type { Metadata } from "next";
import { generateSEO } from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import { FaCheck } from "react-icons/fa";
import "@/styles/features/services.scss";

export const metadata: Metadata = generateSEO({
  title: "Services",
  description:
    "Landing pages, business websites, and e-commerce builds — clean, fast, and built to convert.",
  url: "/services",
});

const serviceCards = [
  {
    name: "Landing Pages",
    description:
      "A focused, high-converting single page for your product, campaign, or idea. Fast to deploy and built to get people to act.",
    features: [
      "Single-page build",
      "Mobile-first responsive layout",
      "Clear call-to-action sections",
      "Contact or lead capture form",
      "Basic on-page SEO",
    ],
    popular: false,
  },
  {
    name: "Business Websites",
    description:
      "A proper web presence for your business — multi-page, polished, and easy to maintain. From services pages to staff directories.",
    features: [
      "Multi-page structure (up to 6 pages)",
      "Custom design with your branding",
      "CMS or editable content blocks",
      "Google Analytics integration",
      "Contact form and maps",
      "Performance optimised",
    ],
    popular: true,
  },
  {
    name: "E-Commerce Websites",
    description:
      "Online stores built to sell — product listings, checkout, payments, and everything in between.",
    features: [
      "Product catalogue and listings",
      "Shopping cart and checkout",
      "Payment gateway integration",
      "Order and inventory management",
      "Mobile-optimised shopping experience",
      "SEO-ready product pages",
    ],
    popular: false,
  },
];

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
        {serviceCards.map((card, index) => (
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
