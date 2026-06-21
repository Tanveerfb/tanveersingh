import { ImageResponse } from "next/og";

export const size = { width: 256, height: 256 };
export const contentType = "image/png";

// Branded "TS" app icon. ImageResponse only supports inline styles.
export default function Icon(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0c14",
          color: "#00e5ff",
          fontSize: "150px",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          fontFamily: "sans-serif",
          border: "10px solid #00e5ff",
          borderRadius: "48px",
        }}
      >
        TS
      </div>
    ),
    { ...size }
  );
}
