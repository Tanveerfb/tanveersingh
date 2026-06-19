"use client";

import { motion } from "framer-motion";
import "@/styles/features/testimonials.scss";
import testimonials from "@/content/testimonials.json";

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
            whileHover={{ y: -8 }}
          >
            <div className="testimonial-quote">{testimonial.quote}</div>
            <div className="testimonial-author">
              <div className="author-avatar" aria-hidden="true">
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
