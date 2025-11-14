interface SectionTilesProps {
  tiles: {
    title: string;
    description?: string;
  }[];
}

export default function SectionTiles({ tiles }: SectionTilesProps) {
  return (
    <section id="section-tiles" className="tiles-section">
      {tiles.map((tile) => (
        <div key={tile.title} className="tile">
          <h3>{tile.title}</h3>
          {tile.description ? <p>{tile.description}</p> : null}
        </div>
      ))}
    </section>
  );
}
