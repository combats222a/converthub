import { ImageResponse } from "next/og";

export const alt = "ConvertContext — конвертер файлов онлайн в любой формат";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          background: "#0b0e18",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "linear-gradient(135deg, #1f56dc, #2c5bce)",
            }}
          />
          <div style={{ display: "flex", fontSize: 44, fontWeight: 700, color: "#e8e9ed" }}>
            ConvertContext
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 56,
            fontWeight: 700,
            color: "#e8e9ed",
            lineHeight: 1.2,
            maxWidth: 900,
          }}
        >
          Конвертер файлов онлайн в любой формат
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 30,
            color: "#8b8f9c",
            maxWidth: 850,
          }}
        >
          Быстро, бесплатно, без загрузки на сервер
        </div>
      </div>
    ),
    { ...size }
  );
}
