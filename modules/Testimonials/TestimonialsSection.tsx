"use client";

import { motion } from "framer-motion";
import "@/styles/features/testimonials.scss";

const testimonials = [
  {
    name: "Mohammed Mustafa",
    role: "S-Vyasa SAS’28｜Entrepreneur ｜Mentor｜Content Creator",
    company: "Campus Mantri @GeeksforGeeks",
    quote:
      "I had the pleasure of working with Tanveer on several projects, and his ability to tackle complex challenges is truly impressive. He is a detail-oriented professional who consistently delivers high-quality work, even under tight deadlines. Beyond his technical skills, Tanveer is a great communicator and a reliable teammate. I highly recommend him to any organization looking for a dedicated and skilled professional.",
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
