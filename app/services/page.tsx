import type { Metadata } from "next";
import { generateSEO } from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import { FaCheck } from "react-icons/fa";
import "@/styles/features/services.scss";

export const metadata: Metadata = generateSEO({
  title: "Services & Pricing",
  description: "Professional web development, Microsoft 365 solutions, and ICT support services tailored to your needs.",
  url: "/services",
});

const serviceTiers = [
  {
    name: "Basic",
    price: "Contact",
    description: "Perfect for small projects and consultations",
    features: [
      "Single page website",
      "Responsive design",
      "Basic SEO optimization",
      "Contact form integration",
      "1 month support",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "Contact",
    description: "Ideal for growing businesses",
    features: [
      "Multi-page website",
      "Custom design",
      "Advanced SEO",
      "CMS integration",
      "Database setup",
      "3 months support",
      "Performance optimization",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Contact",
    description: "Complete digital solutions",
    features: [
      "Complex web applications",
      "Microsoft 365 integration",
      "SharePoint customization",
      "Power Automate workflows",
      "Internal portals",
      "6 months support",
      "Ongoing maintenance",
      "Priority support",
    ],
    popular: false,
  },
];

export default function ServicesPage() {
  return (
    <div className="services-page">
      <AnimatedSection>
        <header className="services-header">
          <h1 className="section-heading">Services & Pricing</h1>
          <p className="services-intro">
            Professional development services tailored to your needs
          </p>
        </header>
      </AnimatedSection>

      <div className="services-grid">
        {serviceTiers.map((tier, index) => (
          <AnimatedSection key={tier.name} delay={index * 0.15}>
            <div
              className={`service-card ${tier.popular ? "popular" : ""}`}
            >
              {tier.popular && (
                <div className="popular-badge">Most Popular</div>
              )}
              <div className="service-card-header">
                <h2 className="service-name">{tier.name}</h2>
                <div className="service-price">{tier.price}</div>
                <p className="service-description">{tier.description}</p>
              </div>
              <ul className="service-features">
                {tier.features.map((feature) => (
                  <li key={feature} className="service-feature">
                    <FaCheck className="feature-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="/contact" className="service-cta">
                Get Started
              </a>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection delay={0.5}>
        <div className="services-note">
          <p>
            All projects are custom-quoted based on specific requirements.
            Contact me to discuss your needs and get a personalized quote.
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
}
