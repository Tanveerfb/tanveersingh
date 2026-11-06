import { ToastProvider } from "@/components/ui/toast";
import { CONTACT } from "@/content/contact";
import { ContactForm } from "./contact-form";
import { SectionHeading } from "./section-heading";

/** How to reach him, and the form. */
export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="gutter border-t-4 border-ink pt-20 pb-27.5">
      <div className="mx-auto grid max-w-page gap-9 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div>
          <SectionHeading id="contact-title" kicker={CONTACT.kicker} title={CONTACT.title} accent="touch" />
          <ul className="m-0 grid list-none gap-3.5 p-0">
            {CONTACT.reach.map((item) => (
              <li key={item.label} className="grid gap-0.75">
                <span className="font-display text-cel-sm tracking-cel text-gold">{item.label}</span>
                <a href={item.href} className="font-semibold wrap-anywhere underline">
                  {item.value}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <ToastProvider>
          <ContactForm />
        </ToastProvider>
      </div>
    </section>
  );
}
