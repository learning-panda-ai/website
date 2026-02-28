import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Learning Panda — AI Study Buddy for Every Subject";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #E8F5E9 0%, #F1F8E9 50%, #FFFDE7 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, #C8E6C9 0%, transparent 70%)",
          }}
        />

        {/* Panda icon */}
        <div
          style={{
            fontSize: 100,
            marginBottom: 24,
            background: "white",
            borderRadius: 32,
            width: 140,
            height: 140,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 32px rgba(76,175,80,0.25)",
            border: "3px solid #A5D6A7",
          }}
        >
          🐼
        </div>

        {/* Brand name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#1B4332",
            letterSpacing: "-1px",
            marginBottom: 16,
          }}
        >
          Learning Panda
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "#2D6A4F",
            fontWeight: 600,
            marginBottom: 32,
            textAlign: "center",
            maxWidth: 700,
          }}
        >
          AI Study Buddy for Every Subject &amp; Grade
        </div>

        {/* Feature pills */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          {["Free Forever", "All Subjects", "24/7 Available", "K-12 + University"].map((pill) => (
            <div
              key={pill}
              style={{
                background: "#4CAF50",
                color: "white",
                padding: "10px 22px",
                borderRadius: 999,
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              {pill}
            </div>
          ))}
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            fontSize: 22,
            color: "#388E3C",
            fontWeight: 600,
          }}
        >
          learningpanda.ai
        </div>
      </div>
    ),
    { ...size }
  );
}
