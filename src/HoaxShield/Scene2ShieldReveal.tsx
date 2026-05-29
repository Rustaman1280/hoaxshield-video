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

// Explosion particles
const PARTICLES = Array.from({ length: 40 }, (_, i) => {
  const angle = (i / 40) * Math.PI * 2;
  const distance = 180 + Math.random() * 300;
  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    size: 3 + Math.random() * 8,
    delay: Math.random() * 10,
    speed: 0.5 + Math.random() * 1.5,
    color: Math.random() > 0.5 ? COLORS.primaryBlue : COLORS.lightBlue,
  };
});

// Light rays
const RAYS = Array.from({ length: 12 }, (_, i) => ({
  angle: (i / 12) * 360,
  width: 2 + Math.random() * 4,
  length: 300 + Math.random() * 400,
  opacity: 0.03 + Math.random() * 0.06,
  delay: i * 2,
}));

// Orbiting dots
const ORBIT_DOTS = Array.from({ length: 8 }, (_, i) => ({
  radius: 200 + i * 30,
  speed: 0.8 + i * 0.3,
  size: 4 + Math.random() * 4,
  startAngle: (i / 8) * Math.PI * 2,
}));

export const Scene2ShieldReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Shockwave from center
  const shockwaveScale = interpolate(frame, [fps * 0.3, fps * 1.5], [0, 3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const shockwaveOpacity = interpolate(frame, [fps * 0.3, fps * 1.5], [0.6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Shield entrance - explosive scale
  const shieldProgress = interpolate(frame, [fps * 0.5, fps * 1.8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });
  const shieldScale = interpolate(shieldProgress, [0, 1], [0, 1]);
  const shieldOpacity = interpolate(frame, [fps * 0.5, fps * 0.8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Shield breathing pulse
  const breathe = 1 + Math.sin(frame * 0.08) * 0.02;

  // Shield glow pulse
  const glowPulse = interpolate(frame, [fps * 1.5, fps * 3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const glowSize = 20 + Math.sin(frame * 0.1) * 10;

  // Title slam-in
  const titleProgress = interpolate(frame, [fps * 2.2, fps * 2.8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const titleScale = interpolate(frame, [fps * 2.2, fps * 2.6, fps * 2.8], [1.5, 0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleBlur = interpolate(titleProgress, [0, 0.5, 1], [15, 3, 0]);

  // Tagline slide up
  const taglineProgress = interpolate(frame, [fps * 3.5, fps * 4.3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Background transition
  const bgBrightness = interpolate(frame, [0, fps * 1.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });

  // Decorative line width
  const lineWidth = interpolate(frame, [fps * 3, fps * 4], [0, 300], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 45%, 
          rgba(30, 111, 255, ${0.12 * bgBrightness}) 0%, 
          ${COLORS.deepBlue} 40%, 
          ${COLORS.darkBlue} 100%)`,
        fontFamily: FONT_INTER,
        overflow: "hidden",
      }}
    >
      {/* Rotating gradient background */}
      <div
        style={{
          position: "absolute",
          inset: -200,
          background: `conic-gradient(from ${frame * 0.5}deg at 50% 45%, 
            transparent 0deg, 
            rgba(30, 111, 255, ${0.04 * bgBrightness}) 30deg,
            transparent 60deg)`,
        }}
      />

      {/* Light rays from center */}
      {RAYS.map((ray, i) => {
        const rayOpacity = interpolate(
          frame, [fps * 1 + ray.delay, fps * 2 + ray.delay], [0, ray.opacity * glowPulse],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "40%",
              width: ray.width,
              height: ray.length,
              background: `linear-gradient(180deg, rgba(30, 111, 255, ${rayOpacity}) 0%, transparent 100%)`,
              transformOrigin: "top center",
              transform: `translateX(-50%) rotate(${ray.angle + frame * 0.2}deg)`,
            }}
          />
        );
      })}

      {/* Shockwave ring */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "40%",
          width: 200,
          height: 200,
          borderRadius: "50%",
          border: `3px solid ${COLORS.primaryBlue}`,
          transform: `translate(-50%, -50%) scale(${shockwaveScale})`,
          opacity: shockwaveOpacity,
          boxShadow: `0 0 40px ${COLORS.blueGlow}, inset 0 0 40px ${COLORS.blueGlow}`,
        }}
      />

      {/* Second shockwave */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "40%",
          width: 200,
          height: 200,
          borderRadius: "50%",
          border: `2px solid ${COLORS.lightBlue}`,
          transform: `translate(-50%, -50%) scale(${interpolate(frame, [fps * 0.6, fps * 2], [0, 4], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })})`,
          opacity: interpolate(frame, [fps * 0.6, fps * 2], [0.4, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      {/* Orbiting dots */}
      {ORBIT_DOTS.map((dot, i) => {
        const dotOpacity = interpolate(frame, [fps * 1.5, fps * 2.5], [0, 0.5], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const angle = dot.startAngle + frame * 0.02 * dot.speed;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `calc(50% + ${Math.cos(angle) * dot.radius}px)`,
              top: `calc(40% + ${Math.sin(angle) * dot.radius}px)`,
              width: dot.size,
              height: dot.size,
              borderRadius: "50%",
              background: COLORS.primaryBlue,
              opacity: dotOpacity,
              boxShadow: `0 0 ${dot.size * 3}px ${COLORS.blueGlow}`,
              filter: `blur(${1}px)`,
            }}
          />
        );
      })}

      {/* Explosion particles */}
      {PARTICLES.map((p, i) => {
        const pFrame = frame - fps * 0.5 - p.delay;
        const pProgress = interpolate(pFrame, [0, 40], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        });
        const pOpacity = interpolate(pFrame, [0, 10, 30, 50], [0, 0.8, 0.5, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const motionBlur = pProgress < 0.5 ? 3 : 0;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `calc(50% + ${p.x * pProgress}px)`,
              top: `calc(40% + ${p.y * pProgress}px)`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: p.color,
              opacity: pOpacity,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}80`,
              filter: `blur(${motionBlur}px)`,
            }}
          />
        );
      })}

      {/* Shield icon - LARGE */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "38%",
          transform: `translate(-50%, -50%) scale(${shieldScale * breathe})`,
          opacity: shieldOpacity,
        }}
      >
        {/* Glow behind shield */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${COLORS.blueGlowStrong} 0%, transparent 70%)`,
            transform: "translate(-50%, -50%)",
            opacity: glowPulse * 0.6,
            filter: `blur(${glowSize}px)`,
          }}
        />

        {/* Outer ring */}
        {[1, 2, 3].map((ring) => (
          <div
            key={ring}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 200 + ring * 50,
              height: 200 + ring * 50,
              borderRadius: "50%",
              border: `1.5px solid rgba(30, 111, 255, ${0.15 * glowPulse / ring})`,
              transform: `translate(-50%, -50%) rotate(${frame * 0.3 * ring}deg)`,
              opacity: glowPulse,
            }}
          />
        ))}

        <svg
          width={200}
          height={200}
          viewBox="0 0 100 100"
          fill="none"
        >
          <defs>
            <linearGradient id="shieldGrad2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={COLORS.primaryBlue} />
              <stop offset="100%" stopColor={COLORS.lightBlue} />
            </linearGradient>
            <filter id="shieldGlow2">
              <feGaussianBlur stdDeviation={3 + glowPulse * 3} result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M50 8 L85 25 L85 50 C85 72 68 88 50 95 C32 88 15 72 15 50 L15 25 Z"
            fill="url(#shieldGrad2)"
            filter="url(#shieldGlow2)"
          />
          <path
            d="M35 52 L45 62 L65 38"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Title: HoaxShield - LARGE */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "58%",
          transform: `translate(-50%, 0) scale(${titleScale})`,
          opacity: titleProgress,
          filter: `blur(${titleBlur}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 88,
            fontWeight: 900,
            color: COLORS.white,
            letterSpacing: -3,
            textShadow: `0 0 60px ${COLORS.blueGlow}, 0 0 120px rgba(30, 111, 255, 0.2)`,
          }}
        >
          Hoax<span style={{ color: COLORS.primaryBlue }}>Shield</span>
        </div>
      </div>

      {/* Decorative line */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "68%",
          transform: "translateX(-50%)",
          width: lineWidth,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${COLORS.primaryBlue}, transparent)`,
          borderRadius: 2,
          boxShadow: `0 0 20px ${COLORS.blueGlow}`,
        }}
      />

      {/* Tagline */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "72%",
          transform: `translate(-50%, ${interpolate(taglineProgress, [0, 1], [30, 0])}px)`,
          opacity: taglineProgress,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 500,
            color: COLORS.slate200,
            letterSpacing: 2,
          }}
        >
          Cek informasi sebelum percaya.
        </div>
      </div>
    </AbsoluteFill>
  );
};
