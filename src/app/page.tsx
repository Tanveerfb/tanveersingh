// TODO: holding page until the component round is locked and the real home page is built.
// It exists only so the scaffold's demo page (which referenced deleted assets) is gone.
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <h1 className="font-display text-6xl tracking-wide text-gold">Tanveer Singh</h1>
      <p className="text-muted">Rebuild in progress.</p>
    </main>
  );
}
