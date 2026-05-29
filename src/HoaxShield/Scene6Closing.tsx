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

// Protection ring waves
const RINGS = [
  { delay: 0, maxSize: 400, width: 3 },
  { delay: 15, maxSize: 600, width: 2.5 },
  { delay: 30, maxSize: 800, width: 2 },
  { delay: 45, maxSize: 1000, width: 1.5 },
  { delay: 60, maxSize: 1200, width: 1 },
];

// Community icons data
const COMMUNITY_ICONS = [
  { icon: "school", x: -350, y: -120, delay: 10, label: "Pendidikan" },
  { icon: "social", x: 360, y: -100, delay: 16, label: "Media Sosial" },
  { icon: "community", x: -280, y: 160, delay: 22, label: "Komunitas" },
  { icon: "shield", x: 300, y: 140, delay: 13, label: "Perlindungan" },
  { icon: "globe", x: 0, y: -220, delay: 19, label: "Internet" },
];

// Confetti particles for celebration
const CONFETTI = Array.from({ length: 40 }, (_, i) => ({
  x: (Math.random() - 0.5) * 1600,
  y: -200 - Math.random() * 400,
  size: 4 + Math.random() * 8,
  rotation: Math.random() * 360,
  speed: 1 + Math.random() * 2,
  sway: (Math.random() - 0.5) * 3,
  color: [COLORS.primaryBlue, COLORS.lightBlue, COLORS.trueGreen, COLORS.verifyYellow, COLORS.skyBlue][Math.floor(Math.random() * 5)],
  delay: Math.random() * 40,
}));

// Star burst particles
const STAR_BURST = Array.from({ length: 30 }, (_, i) => {
  const angle = (i / 30) * Math.PI * 2;
  return {
    angle,
    distance: 100 + Math.random() * 400,
    size: 2 + Math.random() * 5,
    speed: 0.5 + Math.random(),
    delay: Math.random() * 10,
  };
});

const IconSVG: React.FC<{ icon: string; size: number }> = ({ icon, size }) => {
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", strokeWidth: "1.5", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (icon) {
    case "school":
      return <svg {...props} stroke={COLORS.lightBlue}><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5" /></svg>;
    case "social":
      return <svg {...props} stroke={COLORS.accentBlue}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>;
    case "community":
      return <svg {...props} stroke={COLORS.skyBlue}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
    case "globe":
      return <svg {...props} stroke={COLORS.primaryBlue}><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>;
    default:
      return <svg {...props} stroke={COLORS.primaryBlue}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
  }
};

export const Scene6Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background brightening
  const brightness = interpolate(frame, [0, fps * 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });

  // Motto words - stagger with motion blur
  const word1Progress = interpolate(frame, [fps * 0.5, fps * 1.3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const word1Scale = interpolate(frame, [fps * 0.5, fps * 1, fps * 1.3], [1.3, 0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const word1Blur = interpolate(word1Progress, [0, 0.3, 1], [15, 3, 0]);

  const word2Progress = interpolate(frame, [fps * 2, fps * 2.8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const word2Scale = interpolate(frame, [fps * 2, fps * 2.5, fps * 2.8], [1.3, 0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const word2Blur = interpolate(word2Progress, [0, 0.3, 1], [15, 3, 0]);

  const word3Progress = interpolate(frame, [fps * 3.5, fps * 4.3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const word3Scale = interpolate(frame, [fps * 3.5, fps * 4, fps * 4.3], [1.3, 0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const word3Blur = interpolate(word3Progress, [0, 0.3, 1], [15, 3, 0]);

  // Motto fade out
  const mottoFade = interpolate(frame, [fps * 6, fps * 7], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });

  // Shield + Logo entrance
  const logoProgress = interpolate(frame, [fps * 7.5, fps * 9], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });
  const logoBlur = interpolate(frame, [fps * 7.5, fps * 8, fps * 9], [20, 5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const logoScale = interpolate(frame, [fps * 7.5, fps * 8.5, fps * 9], [0.3, 1.05, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Shield breathing
  const breathe = 1 + Math.sin(frame * 0.06) * 0.015;

  // Logo glow pulse
  const glowPulse = 0.3 + Math.sin(frame * 0.08) * 0.15;

  // Tagline
  const taglineProgress = interpolate(frame, [fps * 9.5, fps * 10.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Bottom text
  const bottomProgress = interpolate(frame, [fps * 11, fps * 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Line separator
  const lineWidth = interpolate(frame, [fps * 10.5, fps * 11.5], [0, 250], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Community icon states
  const iconStates = COMMUNITY_ICONS.map((ci) => {
    const progress = interpolate(frame, [ci.delay, ci.delay + 20], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    });
    const opacity = progress * mottoFade * 0.7;
    return { progress, opacity };
  });

  // Protection rings (after logo appears)
  const ringStartFrame = fps * 8;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, 
          ${brightness < 0.5 ? '#0a1929' : '#0f2348'} 0%, 
          ${brightness < 0.5 ? COLORS.deepBlue : '#163478'} 40%, 
          ${brightness < 0.5 ? '#0d2a5c' : '#1a4095'} 70%, 
          ${brightness < 0.5 ? '#0a1929' : '#1e4db0'} 100%)`,
        fontFamily: FONT_INTER,
        overflow: "hidden",
      }}
    >
      {/* Rotating background gradient */}
      <div style={{
        position: "absolute",
        inset: -200,
        background: `conic-gradient(from ${frame * 0.2}deg at 50% 50%, 
          transparent 0deg,
          rgba(30, 111, 255, ${0.05 * brightness}) 60deg,
          transparent 120deg,
          rgba(30, 111, 255, ${0.03 * brightness}) 240deg,
          transparent 360deg)`,
      }} />

      {/* Center glow */}
      <div style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: 800,
        height: 800,
        borderRadius: "50%",
        background: `radial-gradient(circle, rgba(30, 111, 255, ${0.1 + brightness * 0.08}) 0%, transparent 60%)`,
        transform: "translate(-50%, -50%)",
        filter: "blur(30px)",
      }} />

      {/* Community icons around center */}
      {COMMUNITY_ICONS.map((ci, i) => {
        const floatY = Math.sin(frame * 0.03 + i) * 10;
        const floatX = Math.cos(frame * 0.025 + i * 0.7) * 8;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `calc(50% + ${ci.x + floatX}px)`,
              top: `calc(45% + ${ci.y + floatY}px)`,
              opacity: iconStates[i].opacity,
              transform: `scale(${iconStates[i].progress})`,
            }}
          >
            <div style={{
              width: 70,
              height: 70,
              borderRadius: 18,
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${COLORS.glassBorder}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              boxShadow: `0 0 20px rgba(30, 111, 255, 0.05)`,
            }}>
              <IconSVG icon={ci.icon} size={28} />
              <span style={{ color: COLORS.slate400, fontSize: 8, fontWeight: 600 }}>{ci.label}</span>
            </div>
          </div>
        );
      })}

      {/* Protection ring waves */}
      {RINGS.map((ring, i) => {
        const ringFrame = frame - ringStartFrame - ring.delay;
        const ringProgress = interpolate(ringFrame, [0, 50], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        });
        const ringOpacity = interpolate(ringFrame, [0, 10, 35, 55], [0, 0.4, 0.2, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const size = ring.maxSize * ringProgress;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "45%",
              width: size,
              height: size,
              borderRadius: "50%",
              border: `${ring.width}px solid ${COLORS.primaryBlue}`,
              transform: "translate(-50%, -50%)",
              opacity: ringOpacity * logoProgress,
              boxShadow: `0 0 ${20 + i * 10}px ${COLORS.blueGlow}`,
            }}
          />
        );
      })}

      {/* Confetti falling */}
      {CONFETTI.map((c, i) => {
        const cFrame = frame - fps * 8 - c.delay;
        const opacity = interpolate(cFrame, [0, 10, 60, 80], [0, 0.5, 0.4, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const y = c.y + cFrame * c.speed * 3;
        const x = c.x + Math.sin(cFrame * 0.05) * c.sway * 20;
        const rot = c.rotation + cFrame * 3;

        return (
          <div key={i} style={{
            position: "absolute",
            left: `calc(50% + ${x}px)`,
            top: y,
            width: c.size,
            height: c.size * 0.6,
            borderRadius: 2,
            background: c.color,
            opacity,
            transform: `rotate(${rot}deg)`,
            boxShadow: `0 0 ${c.size}px ${c.color}40`,
          }} />
        );
      })}

      {/* Star burst from shield */}
      {STAR_BURST.map((s, i) => {
        const sFrame = frame - fps * 8 - s.delay;
        const sProgress = interpolate(sFrame, [0, 30], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        });
        const sOpacity = interpolate(sFrame, [0, 8, 25, 35], [0, 0.6, 0.3, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const dist = s.distance * sProgress;
        const x = Math.cos(s.angle) * dist;
        const y = Math.sin(s.angle) * dist;

        return (
          <div key={i} style={{
            position: "absolute",
            left: `calc(50% + ${x}px)`,
            top: `calc(45% + ${y}px)`,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: COLORS.lightBlue,
            opacity: sOpacity,
            boxShadow: `0 0 ${s.size * 3}px ${COLORS.blueGlow}`,
            filter: `blur(${sProgress < 0.3 ? 2 : 0}px)`,
          }} />
        );
      })}

      {/* Motto section */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: mottoFade,
          gap: 8,
        }}
      >
        {/* Word 1: Lebih kritis */}
        <div style={{
          opacity: word1Progress,
          transform: `scale(${word1Scale})`,
          filter: `blur(${word1Blur}px)`,
          fontSize: 62,
          fontWeight: 800,
          color: COLORS.white,
          letterSpacing: -2,
          textShadow: "0 4px 30px rgba(0,0,0,0.4)",
        }}>
          Lebih <span style={{ color: COLORS.primaryBlue, textShadow: `0 0 40px ${COLORS.blueGlow}` }}>kritis</span>.
        </div>

        {/* Word 2: Lebih aman */}
        <div style={{
          opacity: word2Progress,
          transform: `scale(${word2Scale})`,
          filter: `blur(${word2Blur}px)`,
          fontSize: 62,
          fontWeight: 800,
          color: COLORS.white,
          letterSpacing: -2,
          textShadow: "0 4px 30px rgba(0,0,0,0.4)",
        }}>
          Lebih <span style={{ color: COLORS.trueGreen, textShadow: `0 0 40px rgba(34, 197, 94, 0.4)` }}>aman</span>.
        </div>

        {/* Word 3: Lebih bijak */}
        <div style={{
          opacity: word3Progress,
          transform: `scale(${word3Scale})`,
          filter: `blur(${word3Blur}px)`,
          fontSize: 62,
          fontWeight: 800,
          color: COLORS.white,
          letterSpacing: -2,
          textShadow: "0 4px 30px rgba(0,0,0,0.4)",
        }}>
          Lebih <span style={{ color: COLORS.verifyYellow, textShadow: `0 0 40px rgba(245, 158, 11, 0.4)` }}>bijak</span>.
        </div>
      </div>

      {/* Logo section */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: logoProgress,
          filter: `blur(${logoBlur}px)`,
        }}
      >
        {/* Shield - LARGE with glow */}
        <div style={{
          transform: `scale(${logoScale * breathe})`,
          marginBottom: 28,
          position: "relative",
        }}>
          {/* Glow behind */}
          <div style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${COLORS.blueGlowStrong} 0%, transparent 70%)`,
            transform: "translate(-50%, -50%)",
            opacity: glowPulse,
            filter: "blur(25px)",
          }} />

          <svg width={160} height={160} viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="closingGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={COLORS.primaryBlue} />
                <stop offset="100%" stopColor={COLORS.lightBlue} />
              </linearGradient>
              <filter id="closingGlow2">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d="M50 8 L85 25 L85 50 C85 72 68 88 50 95 C32 88 15 72 15 50 L15 25 Z"
              fill="url(#closingGrad)"
              filter="url(#closingGlow2)"
            />
            <path d="M35 52 L45 62 L65 38" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>

        {/* Logo text - HUGE */}
        <div style={{
          fontSize: 84,
          fontWeight: 900,
          color: COLORS.white,
          letterSpacing: -3,
          textShadow: `0 0 60px ${COLORS.blueGlow}, 0 0 120px rgba(30, 111, 255, 0.2)`,
          transform: `scale(${logoScale * breathe})`,
        }}>
          Hoax<span style={{ color: COLORS.primaryBlue }}>Shield</span>
        </div>

        {/* Tagline */}
        <div style={{
          opacity: taglineProgress,
          transform: `translateY(${interpolate(taglineProgress, [0, 1], [20, 0])}px)`,
          fontSize: 28,
          fontWeight: 500,
          color: COLORS.slate200,
          marginTop: 16,
          letterSpacing: 1,
        }}>
          Cek informasi sebelum percaya.
        </div>

        {/* Separator */}
        <div style={{
          width: lineWidth,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${COLORS.primaryBlue}, transparent)`,
          marginTop: 24,
          marginBottom: 16,
          borderRadius: 1,
          boxShadow: `0 0 15px ${COLORS.blueGlow}`,
        }} />

        {/* Bottom text */}
        <div style={{
          opacity: bottomProgress,
          transform: `translateY(${interpolate(bottomProgress, [0, 1], [15, 0])}px)`,
          fontSize: 18,
          fontWeight: 500,
          color: COLORS.slate400,
          letterSpacing: 1.5,
        }}>
          Bantu lawan hoaks dengan teknologi.
        </div>
      </div>
    </AbsoluteFill>
  );
};
