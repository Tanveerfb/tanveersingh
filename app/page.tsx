import Hero from "../modules/Hero/Hero";
import IdentityCard from "../modules/IdentityCard/IdentityCard";
import SectionTiles from "../modules/SectionTiles/SectionTiles";
import StatusStrip from "../modules/StatusStrip/StatusStrip";
import tiles from "@/content/tiles.json";

export default function Home() {
  return (
    <>
      <section id="hero-section">
        <div className="container">
          <Hero />
        </div>
      </section>
      <section id="identity-card-section">
        <div className="container identity-card-section">
          <IdentityCard variant="engineer" />
          <IdentityCard variant="creator" />
        </div>
      </section>
      <section id="homepage-tiles-section">
        <div className="container">
          <SectionTiles tiles={tiles.tiles} />
        </div>
      </section>
      <section id="status-strip-section">
        <div className="container">
          <StatusStrip />
        </div>
      </section>
    </>
  );
}
