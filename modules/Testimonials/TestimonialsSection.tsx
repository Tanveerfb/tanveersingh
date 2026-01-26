"use client";

import { motion } from "framer-motion";
import "@/styles/features/testimonials.scss";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Operations Manager",
    company: "Tech Solutions Inc",
    quote:
      "Tanveer's expertise in Microsoft 365 and SharePoint transformed our workflow. His custom portal solution has significantly improved our team's productivity.",
    avatar: "",
  },
  {
    name: "Michael Chen",
    role: "CTO",
    company: "Innovation Labs",
    quote:
      "Outstanding web development skills! Tanveer delivered a modern, responsive website that exceeded our expectations. His attention to detail is remarkable.",
    avatar: "",
  },
  {
    name: "Emma Williams",
    role: "Project Lead",
    company: "Digital Agency",
    quote:
      "Working with Tanveer was a pleasure. He's professional, communicative, and delivers high-quality work on time. Highly recommended!",
    avatar: "",
  },
];

export default function TestimonialsSection() {

  return (
    <div className="testimonials-section">
      <h2 className="section-heading">Client Testimonials</h2>
      <p className="testimonials-intro">
        What clients say about working with me
      </p>

      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="testimonial-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ y: -8 }}
          >
            <div className="testimonial-quote">{testimonial.quote}</div>
            <div className="testimonial-author">
              <div className="author-avatar">
                {testimonial.avatar || testimonial.name.charAt(0)}
              </div>
              <div className="author-info">
                <div className="author-name">{testimonial.name}</div>
                <div className="author-role">
                  {testimonial.role} at {testimonial.company}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
