import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  Sequence,
} from "remotion";
import { COLORS } from "./theme";
import { FONT_INTER } from "./fonts";

const BUBBLES = [
  { text: "Viral!", x: -500, y: -300, delay: 0, size: 28, color: COLORS.hoaxRed, speed: 2.5 },
  { text: "Breaking!", x: 520, y: -220, delay: 2, size: 34, color: COLORS.verifyYellow, speed: 3 },
  { text: "Link bantuan!", x: -350, y: 160, delay: 4, size: 26, color: COLORS.hoaxRed, speed: 2 },
  { text: "Benarkah?", x: 400, y: 250, delay: 6, size: 30, color: COLORS.lightBlue, speed: 2.8 },
  { text: "Bagikan sekarang!", x: -580, y: -80, delay: 1, size: 24, color: COLORS.verifyYellow, speed: 3.2 },
  { text: "TERBUKTI!", x: 250, y: -380, delay: 5, size: 38, color: COLORS.hoaxRed, speed: 2.2 },
  { text: "Cek fakta?", x: -220, y: 350, delay: 8, size: 28, color: COLORS.lightBlue, speed: 1.8 },
  { text: "Waspada!", x: 600, y: 80, delay: 3, size: 32, color: COLORS.verifyYellow, speed: 2.6 },
  { text: "DARURAT!", x: -150, y: -420, delay: 1, size: 36, color: COLORS.hoaxRed, speed: 3.5 },
  { text: "Sumber: WhatsApp", x: 320, y: 380, delay: 7, size: 22, color: COLORS.slate300, speed: 1.5 },
  { text: "HOAX!", x: 100, y: -100, delay: 9, size: 40, color: COLORS.hoaxRed, speed: 4 },
  { text: "Baca ini segera!", x: -450, y: 280, delay: 3, size: 26, color: COLORS.verifyYellow, speed: 2.4 },
];

const HEADLINES = [
  "Pemerintah Bagikan 10 Juta Rupiah...",
  "Vaksin Berbahaya! Jangan...",
  "WiFi Menyebabkan Kanker?",
  "Ribuan Orang Terkena Dampak...",
  "BREAKING: Harga Naik 500%...",
  "Bantuan Tunai Cair Hari Ini...",
  "Link Undian Berhadiah...",
];

// Floating geometric shapes for GFX
const GFX_SHAPES = Array.from({ length: 15 }, (_, i) => ({
  x: (Math.random() - 0.5) * 1800,
  y: (Math.random() - 0.5) * 1000,
  size: 20 + Math.random() * 60,
  rotation: Math.random() * 360,
  speed: 0.5 + Math.random() * 2,
  type: i % 3, // 0=hex, 1=circle, 2=diamond
  delay: Math.random() * 30,
}));

export const Scene1Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Camera zoom in effect
  const cameraScale = interpolate(frame, [0, fps * 5], [1, 1.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });

  // Background gradient rotation
  const bgRotation = frame * 0.3;

  // Main text
  const text1Progress = interpolate(frame, [fps * 0.3, fps * 1.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const text1Y = interpolate(text1Progress, [0, 1], [80, 0]);
  const text1Blur = interpolate(text1Progress, [0, 0.3, 1], [12, 4, 0]);

  const text2Progress = interpolate(frame, [fps * 3, fps * 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const text2Y = interpolate(text2Progress, [0, 1], [60, 0]);
  const text2Scale = interpolate(text2Progress, [0, 1], [0.7, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

  // Glitch on "Hoaks"
  const glitchActive = frame > fps * 3.5 && frame % 3 === 0;
  const glitchX = glitchActive ? (Math.sin(frame * 2.5) * 6) : 0;
  const glitchY = glitchActive ? (Math.cos(frame * 3.1) * 4) : 0;

  // Chaos - elements speed up
  const chaosMultiplier = interpolate(frame, [0, fps * 5], [1, 4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });

  // Scene blur out
  const sceneBlur = interpolate(frame, [fps * 5.5, fps * 7], [0, 20], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });

  // Vignette intensifies
  const vignetteOpacity = interpolate(frame, [0, fps * 5], [0.3, 0.7], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Red flash at end
  const redFlash = interpolate(frame, [fps * 6, fps * 6.5, fps * 7], [0, 0.15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.darkBlue,
        fontFamily: FONT_INTER,
        overflow: "hidden",
      }}
    >
      {/* Animated gradient background */}
      <div
        style={{
          position: "absolute",
          inset: -200,
          background: `conic-gradient(from ${bgRotation}deg at 50% 50%, 
            ${COLORS.darkBlue} 0deg, 
            rgba(30, 111, 255, 0.08) 60deg,
            ${COLORS.darkBlue} 120deg,
            rgba(239, 68, 68, 0.05) 200deg,
            ${COLORS.darkBlue} 280deg,
            rgba(30, 111, 255, 0.06) 340deg,
            ${COLORS.darkBlue} 360deg)`,
          transform: `scale(${cameraScale})`,
          filter: `blur(${sceneBlur}px)`,
        }}
      />

      {/* Animated grid */}
      <div
        style={{
          position: "absolute",
          inset: -100,
          backgroundImage: `
            linear-gradient(rgba(30, 111, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30, 111, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          transform: `translateY(${frame * 0.8}px) scale(${cameraScale})`,
          filter: `blur(${sceneBlur}px)`,
        }}
      />

      {/* GFX Floating shapes */}
      <div style={{ position: "absolute", inset: 0, filter: `blur(${sceneBlur}px)` }}>
        {GFX_SHAPES.map((shape, i) => {
          const shapeFrame = frame - shape.delay;
          const opacity = interpolate(shapeFrame, [0, 20, fps * 5, fps * 6], [0, 0.12, 0.08, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const rot = shape.rotation + frame * shape.speed;
          const floatY = Math.sin(frame * 0.03 + i) * 30;
          const floatX = Math.cos(frame * 0.02 + i * 0.5) * 20;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `calc(50% + ${shape.x + floatX * chaosMultiplier}px)`,
                top: `calc(50% + ${shape.y + floatY * chaosMultiplier}px)`,
                width: shape.size,
                height: shape.size,
                opacity,
                transform: `rotate(${rot}deg)`,
                border: `1px solid ${i % 2 === 0 ? COLORS.primaryBlue : COLORS.hoaxRed}30`,
                borderRadius: shape.type === 1 ? "50%" : shape.type === 2 ? 0 : 4,
              }}
            />
          );
        })}
      </div>

      {/* Bubbles with motion blur */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          filter: `blur(${sceneBlur}px)`,
          transform: `scale(${cameraScale})`,
        }}
      >
        {BUBBLES.map((bubble, i) => {
          const bubbleFrame = frame - bubble.delay;
          const opacity = interpolate(
            bubbleFrame, [0, 8, fps * 4, fps * 5.5], [0, 1, 0.8, 0.2],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const scale = interpolate(
            bubbleFrame, [0, 12], [0.3, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.34, 1.56, 0.64, 1) }
          );

          // Motion blur direction based on movement
          const moveX = Math.cos(frame * 0.05 + i * 2) * 15 * chaosMultiplier;
          const moveY = Math.sin(frame * 0.04 + i * 1.5) * 12 * chaosMultiplier;
          const motionBlur = Math.abs(moveX + moveY) * 0.08;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `calc(50% + ${bubble.x + moveX}px)`,
                top: `calc(50% + ${bubble.y + moveY}px)`,
                opacity,
                transform: `scale(${scale}) rotate(${Math.sin(frame * 0.02 + i) * 3}deg)`,
                background: "rgba(255, 255, 255, 0.06)",
                backdropFilter: "blur(12px)",
                border: `1.5px solid ${bubble.color}50`,
                borderRadius: 14,
                padding: "14px 24px",
                whiteSpace: "nowrap",
                filter: `blur(${motionBlur}px)`,
                boxShadow: `0 0 20px ${bubble.color}15`,
              }}
            >
              <span
                style={{
                  color: bubble.color,
                  fontSize: bubble.size,
                  fontWeight: 700,
                  letterSpacing: -0.5,
                }}
              >
                {bubble.text}
              </span>
            </div>
          );
        })}
      </div>

      {/* Scrolling headlines - two rows */}
      <div style={{ position: "absolute", bottom: 130, width: "100%", overflow: "hidden", filter: `blur(${sceneBlur}px)` }}>
        <div style={{ display: "flex", gap: 20, transform: `translateX(${-frame * 4 * chaosMultiplier}px)`, whiteSpace: "nowrap", marginBottom: 12 }}>
          {[...HEADLINES, ...HEADLINES, ...HEADLINES, ...HEADLINES].map((h, i) => (
            <div key={i} style={{
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.25)",
              borderRadius: 10,
              padding: "10px 24px",
              color: COLORS.slate200,
              fontSize: 17,
              fontWeight: 600,
            }}>{h}</div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 20, transform: `translateX(${frame * 3 * chaosMultiplier - 800}px)`, whiteSpace: "nowrap" }}>
          {[...HEADLINES, ...HEADLINES, ...HEADLINES, ...HEADLINES].reverse().map((h, i) => (
            <div key={i} style={{
              background: "rgba(245, 158, 11, 0.08)",
              border: "1px solid rgba(245, 158, 11, 0.2)",
              borderRadius: 10,
              padding: "10px 24px",
              color: COLORS.slate300,
              fontSize: 15,
              fontWeight: 500,
            }}>{h}</div>
          ))}
        </div>
      </div>

      {/* Scan lines effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(0, 0, 0, 0.03) 3px,
            rgba(0, 0, 0, 0.03) 4px
          )`,
          pointerEvents: "none",
          opacity: 0.5,
        }}
      />

      {/* Center text */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 20,
          filter: `blur(${sceneBlur * 0.5}px)`,
        }}
      >
        <div
          style={{
            opacity: text1Progress,
            transform: `translateY(${text1Y}px)`,
            filter: `blur(${text1Blur}px)`,
            fontSize: 68,
            fontWeight: 800,
            color: COLORS.white,
            letterSpacing: -2,
            textAlign: "center",
            textShadow: "0 4px 40px rgba(0,0,0,0.6)",
          }}
        >
          Informasi menyebar cepat.
        </div>

        <Sequence from={Math.floor(fps * 3)} layout="none">
          <div
            style={{
              opacity: text2Progress,
              transform: `translateY(${text2Y}px) translateX(${glitchX}px) scale(${text2Scale})`,
              fontSize: 78,
              fontWeight: 900,
              color: COLORS.white,
              letterSpacing: -2,
              marginTop: 12,
              textAlign: "center",
              textShadow: glitchActive
                ? `4px 0 ${COLORS.hoaxRed}, -4px 0 ${COLORS.lightBlue}, 0 0 40px rgba(239,68,68,0.4)`
                : "0 4px 40px rgba(0,0,0,0.6)",
            }}
          >
            <span style={{ position: "relative" }}>
              Hoaks
              {glitchActive && (
                <span
                  style={{
                    position: "absolute",
                    left: glitchX * -2,
                    top: glitchY,
                    color: COLORS.hoaxRed,
                    opacity: 0.4,
                    clipPath: "inset(0 0 50% 0)",
                  }}
                >
                  Hoaks
                </span>
              )}
            </span>{" "}
            juga.
          </div>
        </Sequence>
      </div>

      {/* Red flash overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: COLORS.hoaxRed,
          opacity: redFlash,
          pointerEvents: "none",
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, transparent 30%, ${COLORS.darkBlue} 100%)`,
          opacity: vignetteOpacity,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
