import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import { COLORS, SHADOWS } from "./theme";
import { FONT_INTER } from "./fonts";

const SAMPLE_TEXT = "Pemerintah membagikan bantuan tunai 5 juta rupiah lewat link berikut…";

// Data flow particles
const DATA_PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  startX: -100 + Math.random() * 200,
  startY: 300 + Math.random() * 400,
  endX: 800 + Math.random() * 200,
  endY: Math.random() * 600,
  delay: i * 4 + fps_seed(i),
  size: 3 + Math.random() * 4,
  speed: 0.3 + Math.random() * 0.7,
}));

function fps_seed(i: number) {
  return (i * 7 + 3) % 15;
}

export const Scene3Input: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene entrance - zoom + slide
  const sceneProgress = interpolate(frame, [0, fps * 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const sceneScale = interpolate(sceneProgress, [0, 1], [0.85, 1]);
  const sceneY = interpolate(sceneProgress, [0, 1], [60, 0]);
  const sceneBlur = interpolate(sceneProgress, [0, 0.3, 1], [8, 2, 0]);

  // Label entrance with motion blur
  const labelProgress = interpolate(frame, [fps * 0.3, fps * 1.2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const labelBlur = interpolate(labelProgress, [0, 0.5, 1], [10, 2, 0]);

  // Typewriter
  const typeProgress = interpolate(
    frame, [fps * 1.5, fps * 4], [0, SAMPLE_TEXT.length],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const typedText = SAMPLE_TEXT.slice(0, Math.floor(typeProgress));
  const showCursor = frame > fps * 1.5 && frame < fps * 5 && Math.floor(frame / 7) % 2 === 0;

  // Button interaction
  const buttonPressFrame = fps * 5;
  const isPressed = frame >= buttonPressFrame && frame < buttonPressFrame + 8;
  const buttonScale = isPressed
    ? interpolate(frame, [buttonPressFrame, buttonPressFrame + 3, buttonPressFrame + 8], [1, 0.92, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  // Ripple effect from button
  const rippleProgress = interpolate(frame, [buttonPressFrame + 3, buttonPressFrame + 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const rippleOpacity = interpolate(rippleProgress, [0, 0.3, 1], [0.4, 0.2, 0]);

  // Post-press - spinner + glow
  const showSpinner = frame > buttonPressFrame + 8;
  const spinnerRotation = (frame - buttonPressFrame) * 10;

  // Glow pulse on card
  const cardGlow = interpolate(
    frame, [buttonPressFrame, buttonPressFrame + 20], [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Floating particles in background
  const bgParticleOpacity = interpolate(frame, [fps * 1, fps * 2], [0, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #070e1a 0%, ${COLORS.deepBlue} 45%, #0d2a5c 100%)`,
        fontFamily: FONT_INTER,
        overflow: "hidden",
      }}
    >
      {/* Animated gradient orbs */}
      <div style={{
        position: "absolute",
        width: 800,
        height: 800,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(30, 111, 255, 0.1) 0%, transparent 70%)",
        right: -200,
        top: -200,
        transform: `translate(${Math.sin(frame * 0.02) * 30}px, ${Math.cos(frame * 0.015) * 20}px)`,
      }} />
      <div style={{
        position: "absolute",
        width: 600,
        height: 600,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(30, 111, 255, 0.06) 0%, transparent 70%)",
        left: -150,
        bottom: -150,
        transform: `translate(${Math.cos(frame * 0.018) * 25}px, ${Math.sin(frame * 0.02) * 15}px)`,
      }} />

      {/* Data flow particles */}
      {DATA_PARTICLES.map((p, i) => {
        const pFrame = (frame + p.delay * 3) % 120;
        const pProgress = pFrame / 120;
        const x = interpolate(pProgress, [0, 1], [p.startX, p.endX]);
        const y = interpolate(pProgress, [0, 1], [p.startY, p.endY]);
        const opacity = interpolate(pProgress, [0, 0.1, 0.9, 1], [0, 0.3, 0.3, 0]) * bgParticleOpacity;
        return (
          <div key={i} style={{
            position: "absolute",
            left: x,
            top: y,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: COLORS.primaryBlue,
            opacity,
            boxShadow: `0 0 ${p.size * 3}px ${COLORS.blueGlow}`,
            filter: "blur(1px)",
          }} />
        );
      })}

      {/* Title label - big and bold */}
      <div
        style={{
          position: "absolute",
          top: 55,
          left: "50%",
          transform: `translate(-50%, ${interpolate(labelProgress, [0, 1], [40, 0])}px)`,
          opacity: labelProgress,
          filter: `blur(${labelBlur}px)`,
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
          Tempel teks atau tautan mencurigakan
        </div>
      </div>

      {/* App mockup card - LARGE */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "53%",
          transform: `translate(-50%, calc(-50% + ${sceneY}px)) scale(${sceneScale})`,
          filter: `blur(${sceneBlur}px)`,
          width: 1000,
        }}
      >
        {/* Card glow effect */}
        {cardGlow > 0 && (
          <div style={{
            position: "absolute",
            inset: -20,
            borderRadius: 28,
            background: `radial-gradient(ellipse at 70% 80%, rgba(30, 111, 255, ${0.15 * cardGlow}) 0%, transparent 60%)`,
            filter: "blur(20px)",
          }} />
        )}

        {/* Header bar */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(20px)",
            borderBottom: `1px solid ${COLORS.glassBorder}`,
            borderRadius: "20px 20px 0 0",
            padding: "16px 28px",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          {/* Shield icon */}
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={COLORS.primaryBlue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span style={{ color: COLORS.white, fontSize: 18, fontWeight: 800, letterSpacing: -0.5 }}>
            Hoax<span style={{ color: COLORS.primaryBlue }}>Shield</span>
          </span>
          <div style={{ flex: 1 }} />
          {["Periksa", "Database Hoaks", "Tentang Kami", "Login Admin"].map((nav, i) => (
            <span key={i} style={{
              color: i === 0 ? COLORS.primaryBlue : COLORS.slate400,
              fontSize: 14,
              fontWeight: i === 0 ? 700 : 400,
              marginLeft: 20,
              padding: i === 0 ? "4px 12px" : 0,
              background: i === 0 ? `${COLORS.primaryBlue}15` : "transparent",
              borderRadius: 6,
            }}>
              {nav}
            </span>
          ))}
        </div>

        {/* Main content */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(15px)",
            border: `1px solid ${COLORS.glassBorder}`,
            borderTop: "none",
            borderRadius: "0 0 20px 20px",
            padding: 44,
          }}
        >
          {/* Card */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: `1.5px solid ${cardGlow > 0 ? `${COLORS.primaryBlue}40` : COLORS.glassBorder}`,
              borderRadius: 16,
              padding: 32,
              boxShadow: cardGlow > 0 ? `0 0 40px rgba(30, 111, 255, ${0.1 * cardGlow})` : "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: `linear-gradient(135deg, ${COLORS.primaryBlue}20, ${COLORS.lightBlue}10)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.primaryBlue} strokeWidth="2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <span style={{ color: COLORS.white, fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>
                Periksa Informasi
              </span>
            </div>

            {/* Textarea */}
            <div
              style={{
                background: "rgba(0, 0, 0, 0.35)",
                border: `1.5px solid ${frame > fps * 1.5 ? `${COLORS.primaryBlue}50` : COLORS.glassBorder}`,
                borderRadius: 14,
                padding: "20px 22px",
                minHeight: 110,
                boxShadow: frame > fps * 1.5 ? `inset 0 0 30px rgba(30, 111, 255, 0.03)` : "none",
              }}
            >
              <div style={{
                color: typedText.length > 0 ? COLORS.slate100 : COLORS.slate400,
                fontSize: 18,
                lineHeight: 1.7,
                fontWeight: 400,
              }}>
                {typedText.length > 0 ? typedText : "Tempel teks berita atau link yang ingin diperiksa..."}
                {showCursor && (
                  <span style={{
                    display: "inline-block",
                    width: 2.5,
                    height: 22,
                    background: COLORS.primaryBlue,
                    marginLeft: 2,
                    verticalAlign: "text-bottom",
                    boxShadow: `0 0 8px ${COLORS.blueGlow}`,
                  }} />
                )}
              </div>
            </div>

            {/* Button */}
            <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end", position: "relative" }}>
              {/* Ripple */}
              {rippleProgress > 0 && rippleProgress < 1 && (
                <div style={{
                  position: "absolute",
                  right: 80,
                  top: 20,
                  width: rippleProgress * 600,
                  height: rippleProgress * 600,
                  borderRadius: "50%",
                  border: `2px solid ${COLORS.primaryBlue}`,
                  transform: "translate(50%, -50%)",
                  opacity: rippleOpacity,
                }} />
              )}

              <div
                style={{
                  background: `linear-gradient(135deg, ${COLORS.primaryBlue}, #3b82f6, ${COLORS.lightBlue})`,
                  color: COLORS.white,
                  padding: "14px 32px",
                  borderRadius: 12,
                  fontSize: 17,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  transform: `scale(${buttonScale})`,
                  boxShadow: `0 4px 20px rgba(30, 111, 255, ${0.3 + cardGlow * 0.3}), 0 0 ${cardGlow * 30}px rgba(30, 111, 255, ${cardGlow * 0.2})`,
                }}
              >
                {showSpinner ? (
                  <>
                    <div style={{
                      width: 18,
                      height: 18,
                      border: "2.5px solid rgba(255,255,255,0.3)",
                      borderTopColor: "white",
                      borderRadius: "50%",
                      transform: `rotate(${spinnerRotation}deg)`,
                    }} />
                    <span>Menganalisis...</span>
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35" />
                    </svg>
                    <span>Analisis Sekarang</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
