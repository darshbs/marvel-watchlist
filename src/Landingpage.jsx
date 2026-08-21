import { useState, useEffect, useRef } from "react";

const DOOMSDAY = new Date("2026-12-18T00:00:00");
const MP4_URL = "https://xvblnshbvbffprmbwjqh.supabase.co/storage/v1/object/public/marvel-assets/trailer-with-audio.mp4";
const WEBM_URL = "https://xvblnshbvbffprmbwjqh.supabase.co/storage/v1/object/public/marvel-assets/trailer-muted.webm";
const TICK_URL = "https://xvblnshbvbffprmbwjqh.supabase.co/storage/v1/object/public/marvel-assets/clock-tick.wav";

const tickAudio = new Audio(TICK_URL);
tickAudio.volume = 0.7;

function playTick() {
  try {
    tickAudio.currentTime = 0;
    tickAudio.play();
  } catch {}
}

function useCountdown() {
  const [time, setTime] = useState(() => getTimeLeft());
  useEffect(() => {
    const t = setInterval(() => {
      setTime(getTimeLeft());
      playTick();
    }, 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

function getTimeLeft() {
  const diff = DOOMSDAY - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function pad(n) { return String(n).padStart(2, "0"); }

export default function LandingPage() {
  const videoRef = useRef(null);
  const [phase, setPhase] = useState("video"); // "video" | "fading" | "countdown"
  const [muted, setMuted] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const time = useCountdown();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try to autoplay
    video.play().catch(() => {
      // If autoplay blocked, go straight to countdown
      setPhase("countdown");
    });

    const handleEnded = () => {
      // Fade out video
      setPhase("fading");
      let op = 1;
      const fade = setInterval(() => {
        op -= 0.04;
        setOpacity(Math.max(0, op));
        if (op <= 0) {
          clearInterval(fade);
          setPhase("countdown");
          setOpacity(1);
        }
      }, 30);
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, []);

  return (
    <div style={{
      minHeight: "100vh", background: "#000", overflow: "hidden",
      fontFamily: "'Segoe UI', system-ui, sans-serif", position: "relative",
    }}>

      {/* VIDEO PHASE */}
      {(phase === "video" || phase === "fading") && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1,
          opacity: phase === "fading" ? opacity : 1,
          transition: "none",
        }}>
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            id="trailer-video"
            style={{
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center center", transform: "scale(1.3)", display: "block",
            }}
          >
            <source src="https://xvblnshbvbffprmbwjqh.supabase.co/storage/v1/object/public/marvel-assets/trailer-with-audio.mp4" type="video/mp4" />
            <source src={WEBM_URL} type="video/webm" />
          </video>

          {/* Title overlay on video */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.7) 100%)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "flex-end",
            paddingTop: 24,
          }}>
            <div style={{ fontSize: 11, letterSpacing: "0.25em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", marginBottom: 10 }}>
              © Marvel Studios - All Rights of this video belongs to Marvel Studios
            </div>
            
          </div>

          {/* Mute/Unmute button */}
            <button
            onClick={() => {
                const v = document.getElementById("trailer-video");
                v.muted = !v.muted;
                setMuted(v.muted);
            }}
            style={{
                position: "absolute", bottom: 32, left: 32,
                background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.8)", fontSize: 18, padding: "8px 14px",
                borderRadius: 4, cursor: "pointer", backdropFilter: "blur(4px)",
            }}
            >
            {muted ? "🔇" : "🔊"}
            </button>

          {/* Skip button */}
          <button
            onClick={() => {
              setPhase("fading");
              let op = 1;
              const fade = setInterval(() => {
                op -= 0.06;
                setOpacity(Math.max(0, op));
                if (op <= 0) { clearInterval(fade); setPhase("countdown"); setOpacity(1); }
              }, 20);
            }}
            style={{
              position: "absolute", bottom: 32, right: 32,
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.6)", fontSize: 12, padding: "8px 16px",
              borderRadius: 4, cursor: "pointer", letterSpacing: "0.1em",
              backdropFilter: "blur(4px)",
            }}
          >
            SKIP ▶
          </button>
        </div>
      )}

      {/* COUNTDOWN PHASE */}
      {phase === "countdown" && (
        <div style={{
          minHeight: "100vh", position: "relative",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          animation: "fadeIn 1.2s ease forwards",
        }}>
          {/* Dark atmospheric background */}
          <div style={{
            position: "fixed", inset: 0, zIndex: 0,
            background: `
                radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.6) 0%, transparent 60%),
                url('https://xvblnshbvbffprmbwjqh.supabase.co/storage/v1/object/public/marvel-assets/doomsday.avif') center/cover no-repeat
            `,
          }} />

          {/* Subtle grid texture */}
          <div style={{
            position: "fixed", inset: 0, zIndex: 0, opacity: 0.03,
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }} />

          {/* Doom particle shimmer */}
          <div style={{
            position: "fixed", inset: 0, zIndex: 0,
            background: "radial-gradient(ellipse at 50% 50%, rgba(180,0,0,0.06) 0%, transparent 70%)",
            animation: "breathe 4s ease-in-out infinite",
          }} />

          <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 24px", maxWidth: 800, width: "100%" }}>

            {/* Eyebrow */}
            <div style={{
              fontSize: 11, letterSpacing: "0.3em", color: "#f8f8f8",
              textTransform: "uppercase", marginBottom: 16, fontWeight: 700,
            }}>
              Marvel Studios · Phase 6
            </div>

            {/* Main title */}
            <div style={{
              fontSize: "clamp(36px, 8vw, 88px)", fontWeight: 900,
              color: "#fff", letterSpacing: "0.06em", textTransform: "uppercase",
              lineHeight: 0.95, marginBottom: 6,
              textShadow: "none",
            }}>
              Avengers
            </div>
            <div style={{
              fontSize: "clamp(20px, 4vw, 42px)", fontWeight: 300,
              color: "#fffefe", letterSpacing: "0.35em", textTransform: "uppercase",
              marginBottom: 56,
            }}>
              Doomsday
            </div>

            {/* Countdown blocks */}
            <div style={{
              display: "flex", alignItems: "flex-start", justifyContent: "center",
              gap: "clamp(4px, 1.5vw, 24px)", flexWrap: "nowrap",
            }}>
              {[
                { value: pad(Math.floor(time.days / 30)), label: "MONTHS" },
                { value: pad(time.days % 30), label: "DAYS" },
                { value: pad(time.hours), label: "HOURS" },
                { value: pad(time.minutes), label: "MIN" },
                { value: pad(time.seconds), label: "SEC" },
              ].map((unit, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "clamp(12px, 3vw, 40px)" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{
                      fontSize: "clamp(28px, 5vw, 72px)", fontWeight: 800,
                      color: "#fff", lineHeight: 1, letterSpacing: "-0.02em",
                      textShadow: "none",
                      fontVariantNumeric: "tabular-nums",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      minWidth: "clamp(60px, 12vw, 130px)",
                    }}>
                      {unit.value}
                    </div>
                    <div style={{
                      fontSize: 20, letterSpacing: "0.2em", color: "#ffffff",
                      fontWeight: 700, marginTop: 8,
                    }}>
                      {unit.label}
                    </div>
                  </div>
                  {i < 4 && (
                    <div style={{
                      fontSize: "clamp(20px, 3vw, 48px)", color: "#fffdfd",
                      fontWeight: 900, lineHeight: 1, marginBottom: 24,
                      animation: "blink 1s step-end infinite",
                    }}>:</div>
                  )}
                </div>
              ))}
            </div>

            {/* Release date */}
            <div style={{
              marginTop: 48, fontSize: 12, letterSpacing: "0.2em",
              color: "#333344", textTransform: "uppercase", fontWeight: 600,
            }}>
              
            </div>

            {/* Back to watchlist link */}
            <a
                href="/watchlist"
                style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    marginTop: 56, padding: "14px 32px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 4, color: "#fff", textDecoration: "none",
                    fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase",
                    fontWeight: 700, backdropFilter: "blur(4px)",
                    transition: "background 0.2s, border-color 0.2s", textShadow: "#fff",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                }}
                >
                ☰ &nbsp; View Watchlist
                </a>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes breathe { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; background: #000; }
      `}</style>
    </div>
  );
}