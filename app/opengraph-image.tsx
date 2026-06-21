import { ImageResponse } from "next/og";
import { PERSON_NAME, PERSON_ROLE, SITE_URL } from "@/lib/siteConfig";

export const alt = `${PERSON_NAME} — ${PERSON_ROLE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded cyberpunk OG card. ImageResponse only supports inline styles.
export default function OpengraphImage(): ImageResponse {
  const domain = SITE_URL.replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(1200px 630px at 80% -10%, #10121e 0%, #0b0c14 60%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              fontSize: "30px",
              color: "#ff2daa",
              fontWeight: 700,
              letterSpacing: "0.12em",
            }}
          >
            {"//"}
          </div>
          <div
            style={{
              fontSize: "30px",
              color: "#8892a4",
              letterSpacing: "0.28em",
              fontWeight: 600,
            }}
          >
            {domain.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "104px",
              fontWeight: 800,
              color: "#e8eaf0",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
            }}
          >
            {PERSON_NAME}
          </div>
          <div
            style={{
              marginTop: "22px",
              fontSize: "44px",
              fontWeight: 600,
              color: "#00e5ff",
              letterSpacing: "0.02em",
            }}
          >
            {PERSON_ROLE}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            fontSize: "26px",
            color: "#8892a4",
          }}
        >
          <div style={{ width: "120px", height: "4px", background: "#00e5ff" }} />
          <div>Next.js · Firebase · AI Integration · Microsoft 365</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
