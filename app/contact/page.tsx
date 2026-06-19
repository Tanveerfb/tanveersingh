import PageShell from "@/modules/Layout/PageShell";
import VerticalDataStrip from "@/modules/Layout/VerticalDataStrip";
import ContactInput from "@/modules/ui/ContactInput";
import ContactButton from "@/modules/ui/ContactButton";

export default function ContactPage() {
  return (
    <>
      <VerticalDataStrip
        logs={[
          "> establishing uplink...",
          "> waiting for input...",
          "> comms stable",
        ]}
      />

      <PageShell>
        <h1 className="duke-fade-up duke-hover">Communications Uplink</h1>

        <form className="contact-form duke-stagger">
          <ContactInput placeholder="Your name" />
          <ContactInput type="email" placeholder="Your email" />
          <ContactInput placeholder="Message..." />

          <ContactButton label="Transmit Packet" />
        </form>

        <div className="contact-socials duke-stagger">
          <p>GitHub: tanveerfb</p>
          <p>LinkedIn: tanveerfb</p>
          <p>YT: Dukesenior22</p>
          <p>Twitch: DukeSenior</p>
        </div>
      </PageShell>
    </>
  );
}
