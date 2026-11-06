/** The ki bar: loading for an action in progress. Lists and cards use a skeleton instead. */
export function KiLoader({ label }: { label: string }) {
  return (
    <div role="progressbar" aria-label={label} className="relative h-3.5 w-full overflow-hidden border-3 border-ink bg-navy">
      <span className="ki-charge absolute inset-0 origin-left animate-ki-load" />
    </div>
  );
}
