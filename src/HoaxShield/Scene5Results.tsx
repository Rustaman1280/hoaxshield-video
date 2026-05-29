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

const SOURCES = [
  { name: "Kominfo.go.id", desc: "Tidak ada pengumuman resmi bantuan tunai" },
  { name: "Cek Fakta Tempo", desc: "Artikel terkait belum ditemukan" },
  { name: "Media Terpercaya", desc: "Tidak ada konfirmasi dari pemerintah" },
];

// Celebration particles
const CELEBRATION_PARTICLES = Array.from({ length: 25 }, (_, i) => ({
  x: (Math.random() - 0.5) * 800,
  y: (Math.random() - 0.5) * 600,
  size: 3 + Math.random() * 5,
  delay: Math.random() * 30,
  speed: 0.3 + Math.random() * 0.7,
  color: [COLORS.hoaxRed, COLORS.trueGreen, COLORS.verifyYellow, COLORS.primaryBlue][Math.floor(Math.random() * 4)],
}));

export const Scene5Results: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene entrance
  const sceneProgress = interpolate(frame, [0, fps * 0.8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const sceneScale = interpolate(sceneProgress, [0, 1], [0.88, 1]);
  const sceneBlur = interpolate(sceneProgress, [0, 0.3, 1], [12, 3, 0]);

  // Three status badges with dramatic pop
  const statuses = [
    { label: "Kemungkinan Hoaks", color: COLORS.hoaxRed, bgColor: COLORS.hoaxRedBg, borderColor: COLORS.hoaxRedBorder, icon: "x" as const },
    { label: "Kemungkinan Benar", color: COLORS.trueGreen, bgColor: COLORS.trueGreenBg, borderColor: COLORS.trueGreenBorder, icon: "check" as const },
    { label: "Perlu Verifikasi", color: COLORS.verifyYellow, bgColor: COLORS.verifyYellowBg, borderColor: COLORS.verifyYellowBorder, icon: "alert" as const },
  ];

  const statusStates = statuses.map((s, i) => {
    const start = fps * 0.6 + i * fps * 0.4;
    const progress = interpolate(frame, [start, start + fps * 0.3], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    });
    // Overshoot bounce
    const scale = interpolate(frame, [start, start + fps * 0.2, start + fps * 0.35, start + fps * 0.45], [0, 1.2, 0.95, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const blur = interpolate(progress, [0, 0.4, 1], [8, 2, 0]);
    const y = interpolate(progress, [0, 1], [40, 0]);
    // Glow flash on appear
    const glowFlash = interpolate(frame, [start + fps * 0.15, start + fps * 0.3, start + fps * 0.5], [0, 1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    return { progress, scale, blur, y, glowFlash };
  });

  // Result card - slide up with motion blur
  const resultProgress = interpolate(frame, [fps * 2.5, fps * 3.3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const resultY = interpolate(resultProgress, [0, 1], [80, 0]);
  const resultBlur = interpolate(resultProgress, [0, 0.3, 1], [12, 3, 0]);
  const resultScale = interpolate(resultProgress, [0, 1], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

  // Source cards - stagger slide from right with blur
  const sourceStates = SOURCES.map((_, i) => {
    const start = fps * 5.5 + i * fps * 0.5;
    const progress = interpolate(frame, [start, start + fps * 0.4], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    });
    const x = interpolate(progress, [0, 1], [60, 0]);
    const blur = interpolate(progress, [0, 0.3, 1], [8, 2, 0]);
    const scale = interpolate(progress, [0, 1], [0.9, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    });
    return { progress, x, blur, scale };
  });

  // Share button entrance
  const shareProgress = interpolate(frame, [fps * 8, fps * 8.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #070e1a 0%, ${COLORS.deepBlue} 45%, #0d2a5c 100%)`,
        fontFamily: FONT_INTER,
        overflow: "hidden",
      }}
    >
      {/* Background glow orbs */}
      <div style={{
        position: "absolute",
        width: 700,
        height: 700,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245, 158, 11, 0.06) 0%, transparent 70%)",
        left: "25%",
        top: "45%",
        transform: `translate(-50%, -50%) translate(${Math.sin(frame * 0.02) * 30}px, ${Math.cos(frame * 0.015) * 20}px)`,
      }} />
      <div style={{
        position: "absolute",
        width: 500,
        height: 500,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(30, 111, 255, 0.06) 0%, transparent 70%)",
        right: "10%",
        top: "30%",
        transform: `translate(${Math.cos(frame * 0.018) * 25}px, ${Math.sin(frame * 0.02) * 15}px)`,
      }} />

      {/* Celebration particles */}
      {CELEBRATION_PARTICLES.map((p, i) => {
        const pFrame = frame - fps * 2 - p.delay;
        const opacity = interpolate(pFrame, [0, 10, 80, 100], [0, 0.4, 0.3, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const y = p.y - pFrame * p.speed;
        return (
          <div key={i} style={{
            position: "absolute",
            left: `calc(50% + ${p.x}px)`,
            top: `calc(50% + ${y}px)`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: p.color,
            opacity,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}50`,
          }} />
        );
      })}

      {/* Main layout */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) scale(${sceneScale})`,
          filter: `blur(${sceneBlur}px)`,
          width: 1100,
          display: "flex",
          gap: 40,
        }}
      >
        {/* Left column */}
        <div style={{ flex: 1.3 }}>
          {/* Status badges - BIG */}
          <div style={{ display: "flex", gap: 14, marginBottom: 28, flexWrap: "wrap" }}>
            {statuses.map((status, i) => (
              <div
                key={i}
                style={{
                  opacity: statusStates[i].progress,
                  transform: `translateY(${statusStates[i].y}px) scale(${statusStates[i].scale})`,
                  filter: `blur(${statusStates[i].blur}px)`,
                  background: status.bgColor,
                  border: `1.5px solid ${status.borderColor}`,
                  borderRadius: 14,
                  padding: "14px 24px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  boxShadow: statusStates[i].glowFlash > 0
                    ? `0 0 ${30 * statusStates[i].glowFlash}px ${status.color}40`
                    : "none",
                }}
              >
                {status.icon === "x" && (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={status.color} strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" /><path d="M15 9l-6 6M9 9l6 6" />
                  </svg>
                )}
                {status.icon === "check" && (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={status.color} strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" /><path d="M8 12l3 3 5-5" />
                  </svg>
                )}
                {status.icon === "alert" && (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={status.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                )}
                <span style={{ color: status.color, fontSize: 17, fontWeight: 800 }}>{status.label}</span>
              </div>
            ))}
          </div>

          {/* Result card - LARGE */}
          <div
            style={{
              transform: `translateY(${resultY}px) scale(${resultScale})`,
              opacity: resultProgress,
              filter: `blur(${resultBlur}px)`,
              background: "rgba(255, 255, 255, 0.04)",
              backdropFilter: "blur(15px)",
              border: `1.5px solid ${COLORS.glassBorder}`,
              borderRadius: 18,
              padding: 32,
            }}
          >
            {/* Status header */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
              <div style={{
                background: COLORS.verifyYellowBg,
                border: `2px solid ${COLORS.verifyYellowBorder}`,
                borderRadius: 12,
                padding: "10px 20px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COLORS.verifyYellow} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <span style={{ color: COLORS.verifyYellow, fontSize: 20, fontWeight: 800 }}>
                  Perlu Verifikasi
                </span>
              </div>
            </div>

            {/* Reason */}
            <div style={{
              background: "rgba(245, 158, 11, 0.06)",
              borderRadius: 14,
              padding: "20px 24px",
              border: `1px solid ${COLORS.verifyYellow}15`,
            }}>
              <div style={{ color: COLORS.slate300, fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
                Alasan Analisis
              </div>
              <div style={{ color: COLORS.slate100, fontSize: 17, lineHeight: 1.8, fontWeight: 400 }}>
                Informasi belum memiliki sumber resmi yang cukup kuat. Disarankan untuk mengecek langsung ke situs pemerintah terkait.
              </div>
            </div>

            {/* Share button */}
            <div style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "flex-end",
              opacity: shareProgress,
              transform: `scale(${shareProgress})`,
            }}>
              <div style={{
                background: `linear-gradient(135deg, ${COLORS.primaryBlue}20, ${COLORS.primaryBlue}10)`,
                border: `1.5px solid ${COLORS.primaryBlue}35`,
                borderRadius: 12,
                padding: "10px 20px",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.primaryBlue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                <span style={{ color: COLORS.primaryBlue, fontSize: 15, fontWeight: 700 }}>Bagikan Hasil</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Sources */}
        <div style={{ flex: 0.7, paddingTop: 60 }}>
          <div style={{
            opacity: interpolate(frame, [fps * 4.5, fps * 5], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            marginBottom: 20,
          }}>
            <div style={{ color: COLORS.white, fontSize: 20, fontWeight: 800, letterSpacing: -0.5 }}>
              Sumber Rujukan Resmi
            </div>
            <div style={{ color: COLORS.slate400, fontSize: 13, marginTop: 6, lineHeight: 1.5 }}>
              Cek sendiri untuk memastikan
            </div>
          </div>

          {SOURCES.map((source, i) => (
            <div
              key={i}
              style={{
                opacity: sourceStates[i].progress,
                transform: `translateX(${sourceStates[i].x}px) scale(${sourceStates[i].scale})`,
                filter: `blur(${sourceStates[i].blur}px)`,
                background: "rgba(255, 255, 255, 0.04)",
                border: `1px solid ${COLORS.glassBorder}`,
                borderRadius: 14,
                padding: "16px 20px",
                marginBottom: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: `linear-gradient(135deg, ${COLORS.primaryBlue}20, ${COLORS.lightBlue}10)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.primaryBlue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: COLORS.primaryBlue, fontSize: 16, fontWeight: 700 }}>{source.name}</div>
                  <div style={{ color: COLORS.slate400, fontSize: 13, marginTop: 3 }}>{source.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
