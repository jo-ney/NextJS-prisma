"use client";
// src/app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "#0d0d1a",
      fontFamily: "'Segoe UI', Roboto, Arial, sans-serif",
    }}>

      {/* 404 */}
      <div style={{ position: "relative", marginBottom: "8px" }}>
        <h1 style={{
          fontSize: "clamp(6rem, 20vw, 12rem)",
          fontWeight: 900,
          margin: 0,
          background: "linear-gradient(135deg, #ffffff 0%, #e94560 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          lineHeight: 1,
          letterSpacing: "-4px",
          userSelect: "none",
        }}>
          404
        </h1>
        <h1 aria-hidden style={{
          position: "absolute",
          top: "6px",
          left: "6px",
          fontSize: "clamp(6rem, 20vw, 12rem)",
          fontWeight: 900,
          margin: 0,
          color: "#e9456020",
          lineHeight: 1,
          letterSpacing: "-4px",
          userSelect: "none",
          zIndex: -1,
        }}>
          404
        </h1>
      </div>

      {/* Divider */}
      <div style={{
        width: "60px",
        height: "4px",
        background: "#e94560",
        borderRadius: "2px",
        marginBottom: "24px",
      }} />

      {/* Message */}
      <h2 style={{
        fontSize: "1.4rem",
        fontWeight: 600,
        color: "#ffffff",
        margin: "0 0 8px 0",
      }}>
        Page not found
      </h2>
      <p style={{
        fontSize: "0.95rem",
        color: "#6b7280",
        margin: "0 0 32px 0",
        textAlign: "center",
        maxWidth: "320px",
        lineHeight: 1.6,
      }}>
        The page you're looking for doesn't exist or has been moved.
      </p>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "12px" }}>
        <Link href="/" style={{
          padding: "11px 28px",
          background: "#e94560",
          color: "#fff",
          borderRadius: "8px",
          textDecoration: "none",
          fontSize: "14px",
          fontWeight: 500,
        }}>
          ← Go home
        </Link>
        <button
          onClick={() => history.back()}
          style={{
            padding: "11px 28px",
            background: "transparent",
            color: "#ffffff",
            border: "1.5px solid #ffffff25",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Go back
        </button>
      </div>

    </div>
  );
}