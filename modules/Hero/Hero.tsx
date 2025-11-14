import siteData from "@/content/siteData.json";

function getSummarySnippet(summary: string): string {
  if (!summary) {
    return "";
  }

  const firstSentenceMatch = summary.match(/[^.!?]*[.!?]/);
  const sentence = firstSentenceMatch
    ? firstSentenceMatch[0].trim()
    : summary.trim();
  return sentence.endsWith(".") ||
    sentence.endsWith("!") ||
    sentence.endsWith("?")
    ? sentence
    : `${sentence}.`;
}

export default function Hero() {
  const { profile, summary } = siteData;
  const summarySnippet = getSummarySnippet(summary);

  return (
    <section id="hero" className="hero-section">
      <h1 className="hero-title">{profile.name}</h1>
      <p className="hero-tagline">{profile.role}</p>
      {summarySnippet ? <div className="hero-cta">{summarySnippet}</div> : null}
    </section>
  );
}
