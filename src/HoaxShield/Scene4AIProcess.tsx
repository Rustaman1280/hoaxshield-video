import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import { COLORS } from "./theme";
import { FONT_INTER } from "./fonts";

const LOADING_TEXTS = [
  "Memeriksa referensi…",
  "Menganalisis pola informasi…",
  "Mencari sumber terpercaya…",
];

const SOURCE_CARDS = [
  { name: "Sumber Resmi Pemerintah", type: "Laman Pemerintah", color: COLORS.trueGreen },
  { name: "Media Terpercaya Nasional", type: "Portal Berita", color: COLORS.primaryBlue },
  { name: "Cek Fakta Indonesia", type: "Fact-Checker", color: COLORS.verifyYellow },
];

// Connection line nodes
const CONNECTION_NODES = [
  { x: 0, y: -60 },
  { x: 80, y: -20 },
  { x: 40, y: 40 },
  { x: -60, y: 60 },
  { x: -80, y: 0 },
];

// Data stream particles
const STREAM_PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  pathIndex: i % 3,
  offset: (i / 30) * 100,
  size: 2 + Math.random() * 4,
  speed: 0.5 + Math.random(),
}));

export const Scene4AIProcess: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene entrance with scale + motion blur
  const entranceProgress = interpolate(frame, [0, fps * 0.8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const entranceScale = interpolate(entranceProgress, [0, 1], [0.9, 1]);
  const entranceBlur = interpolate(entranceProgress, [0, 0.3, 1], [10, 3, 0]);

  // Title entrance with motion blur
  const titleProgress = interpolate(frame, [0, fps * 0.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const titleY = interpolate(titleProgress, [0, 1], [50, 0]);
  const titleBlur = interpolate(titleProgress, [0, 0.4, 1], [12, 3, 0]);

  // Spinner rotation
  const spinnerRotation = frame * 8;

  // Loading text stagger
  const loadingStates = LOADING_TEXTS.map((_, i) => {
    const start = fps * 1 + i * fps * 1.2;
    const progress = interpolate(frame, [start, start + fps * 0.4], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    });
    const slideX = interpolate(progress, [0, 1], [-40, 0]);
    const blur = interpolate(progress, [0, 0.3, 1], [8, 2, 0]);
    const checkProgress = interpolate(frame, [start + fps * 0.8, start + fps * 1], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    });
    return { progress, slideX, blur, checkProgress };
  });

  // Center AI brain - pulse and rotate
  const brainPulse = 1 + Math.sin(frame * 0.1) * 0.04;
  const brainRotation = Math.sin(frame * 0.03) * 5;

  // Connection lines animate
  const lineProgress = interpolate(frame, [fps * 1, fps * 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });

  // Source cards - fly in from right with motion blur
  const sourceStates = SOURCE_CARDS.map((_, i) => {
    const start = fps * 5 + i * fps * 0.6;
    const progress = interpolate(frame, [start, start + fps * 0.5], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    });
    const x = interpolate(progress, [0, 1], [80, 0]);
    const blur = interpolate(progress, [0, 0.4, 1], [6, 2, 0]);
    const scale = interpolate(progress, [0, 1], [0.9, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    });
    return { progress, x, blur, scale };
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #070e1a 0%, ${COLORS.deepBlue} 45%, #0d2a5c 100%)`,
        fontFamily: FONT_INTER,
        overflow: "hidden",
      }}
    >
      {/* Animated dot grid */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `radial-gradient(circle, rgba(30, 111, 255, 0.07) 1.5px, transparent 1.5px)`,
        backgroundSize: "40px 40px",
        transform: `translateY(${Math.sin(frame * 0.02) * 10}px)`,
      }} />

      {/* Floating glow orbs */}
      <div style={{
        position: "absolute",
        width: 500,
        height: 500,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(30, 111, 255, 0.08) 0%, transparent 70%)",
        left: "50%",
        top: "50%",
        transform: `translate(-50%, -50%) translate(${Math.sin(frame * 0.02) * 40}px, ${Math.cos(frame * 0.015) * 30}px)`,
      }} />

      {/* Data stream particles between sections */}
      {STREAM_PARTICLES.map((sp, i) => {
        const particleT = ((frame * sp.speed + sp.offset) % 100) / 100;
        const startX = 200;
        const endX = 700;
        const midY = 400 + (sp.pathIndex - 1) * 80;
        const x = interpolate(particleT, [0, 1], [startX, endX]);
        const y = midY + Math.sin(particleT * Math.PI * 2) * 30;
        const opacity = interpolate(particleT, [0, 0.1, 0.9, 1], [0, 0.4, 0.4, 0]) * lineProgress;

        return (
          <div key={i} style={{
            position: "absolute",
            left: x,
            top: y,
            width: sp.size,
            height: sp.size,
            borderRadius: "50%",
            background: COLORS.primaryBlue,
            opacity,
            boxShadow: `0 0 ${sp.size * 3}px ${COLORS.blueGlow}`,
            filter: "blur(0.5px)",
          }} />
        );
      })}

      {/* Title - LARGE */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: "50%",
          transform: `translate(-50%, ${titleY}px)`,
          opacity: titleProgress,
          filter: `blur(${titleBlur}px)`,
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <div style={{
          fontSize: 42,
          fontWeight: 800,
          color: COLORS.white,
          letterSpacing: -1,
          textShadow: "0 4px 30px rgba(0,0,0,0.5)",
        }}>
          AI + Pencarian Sumber
        </div>
      </div>

      {/* Main content area */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "53%",
          transform: `translate(-50%, -50%) scale(${entranceScale})`,
          filter: `blur(${entranceBlur}px)`,
          display: "flex",
          alignItems: "flex-start",
          gap: 50,
          width: 1100,
        }}
      >
        {/* Left: Loading process */}
        <div style={{ flex: 1.1 }}>
          {/* Input card reference */}
          <div style={{
            background: "rgba(255, 255, 255, 0.04)",
            border: `1px solid ${COLORS.glassBorder}`,
            borderRadius: 14,
            padding: "18px 24px",
            marginBottom: 28,
          }}>
            <div style={{ color: COLORS.slate400, fontSize: 13, fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.8 }}>
              Teks yang diperiksa
            </div>
            <div style={{ color: COLORS.slate100, fontSize: 16, lineHeight: 1.6, fontWeight: 400 }}>
              "Pemerintah membagikan bantuan tunai 5 juta rupiah lewat link berikut…"
            </div>
          </div>

          {/* Loading spinner */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
            <div style={{
              width: 40,
              height: 40,
              border: `3px solid rgba(30, 111, 255, 0.15)`,
              borderTopColor: COLORS.primaryBlue,
              borderRadius: "50%",
              transform: `rotate(${spinnerRotation}deg)`,
              boxShadow: `0 0 15px ${COLORS.blueGlow}`,
            }} />
            <div style={{ color: COLORS.slate200, fontSize: 16, fontWeight: 600 }}>
              Sedang menganalisis...
            </div>
          </div>

          {/* Loading items */}
          {LOADING_TEXTS.map((text, i) => (
            <div
              key={i}
              style={{
                opacity: loadingStates[i].progress,
                transform: `translateX(${loadingStates[i].slideX}px)`,
                filter: `blur(${loadingStates[i].blur}px)`,
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 14,
                padding: "14px 20px",
                background: "rgba(255, 255, 255, 0.04)",
                borderRadius: 12,
                border: `1px solid ${COLORS.glassBorder}`,
              }}
            >
              {loadingStates[i].checkProgress > 0.5 ? (
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: `${COLORS.trueGreen}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `scale(${loadingStates[i].checkProgress})`,
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.trueGreen} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </div>
              ) : (
                <div style={{
                  width: 28,
                  height: 28,
                  border: `2.5px solid ${COLORS.primaryBlue}30`,
                  borderTopColor: COLORS.primaryBlue,
                  borderRadius: "50%",
                  transform: `rotate(${spinnerRotation}deg)`,
                }} />
              )}
              <span style={{ color: COLORS.slate100, fontSize: 16, fontWeight: 600 }}>{text}</span>
            </div>
          ))}
        </div>

        {/* Center: AI visualization */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, paddingTop: 30 }}>
          {/* AI Brain node */}
          <div style={{
            width: 90,
            height: 90,
            borderRadius: 22,
            background: `linear-gradient(135deg, rgba(30, 111, 255, 0.2), rgba(77, 163, 255, 0.1))`,
            border: `1.5px solid ${COLORS.primaryBlue}40`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${brainPulse}) rotate(${brainRotation}deg)`,
            boxShadow: `0 0 40px rgba(30, 111, 255, ${0.15 + Math.sin(frame * 0.1) * 0.08}), inset 0 0 20px rgba(30, 111, 255, 0.05)`,
          }}>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke={COLORS.primaryBlue} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a4 4 0 0 0-4 4v1a4 4 0 0 0-4 4v1a4 4 0 0 0 2 3.46V18a4 4 0 0 0 8 0v-2a4 4 0 0 0 2-2v-1a4 4 0 0 0 0-8V4a4 4 0 0 0-4-4z" />
              <circle cx="12" cy="12" r="3" fill={COLORS.primaryBlue} opacity="0.3" />
            </svg>
          </div>

          {/* Animated connection line */}
          <div style={{
            width: 3,
            height: 100,
            background: `linear-gradient(180deg, ${COLORS.primaryBlue}, ${COLORS.lightBlue}30)`,
            opacity: lineProgress,
            borderRadius: 2,
            boxShadow: `0 0 10px ${COLORS.blueGlow}`,
            position: "relative",
          }}>
            {/* Pulse dot traveling down */}
            <div style={{
              position: "absolute",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: COLORS.lightBlue,
              left: -2.5,
              top: `${(frame * 2) % 100}%`,
              boxShadow: `0 0 12px ${COLORS.lightBlue}`,
              opacity: lineProgress,
            }} />
          </div>

          {/* Search node */}
          <div style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: `linear-gradient(135deg, rgba(77, 163, 255, 0.15), rgba(96, 184, 255, 0.08))`,
            border: `1.5px solid ${COLORS.lightBlue}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: lineProgress,
            transform: `scale(${interpolate(lineProgress, [0, 1], [0.7, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.34, 1.56, 0.64, 1),
            })})`,
            boxShadow: `0 0 30px rgba(77, 163, 255, ${0.1 * lineProgress})`,
          }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={COLORS.lightBlue} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </div>
        </div>

        {/* Right: Source cards */}
        <div style={{ flex: 1, paddingTop: 20 }}>
          <div style={{
            color: COLORS.slate200,
            fontSize: 15,
            fontWeight: 700,
            marginBottom: 20,
            textTransform: "uppercase",
            letterSpacing: 1.5,
            opacity: interpolate(frame, [fps * 4.5, fps * 5], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}>
            Sumber Ditemukan
          </div>

          {SOURCE_CARDS.map((source, i) => (
            <div
              key={i}
              style={{
                opacity: sourceStates[i].progress,
                transform: `translateX(${sourceStates[i].x}px) scale(${sourceStates[i].scale})`,
                filter: `blur(${sourceStates[i].blur}px)`,
                background: "rgba(255, 255, 255, 0.04)",
                border: `1px solid ${source.color}25`,
                borderRadius: 14,
                padding: "18px 22px",
                marginBottom: 14,
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                background: source.color,
                boxShadow: `0 0 12px ${source.color}60`,
              }} />
              <div style={{ flex: 1 }}>
                <div style={{ color: COLORS.white, fontSize: 16, fontWeight: 700 }}>{source.name}</div>
                <div style={{ color: COLORS.slate400, fontSize: 13, fontWeight: 400, marginTop: 3 }}>{source.type}</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.slate400} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
