import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

const phases = [
  {
    id: 1,
    label: "Phase 1",
    sublabel: "The Infinity Saga begins",
    movies: [
      { id: "iron-man-1", title: "Iron Man", year: 2008 },
      { id: "incredible-hulk", title: "The Incredible Hulk", year: 2008 },
      { id: "iron-man-2", title: "Iron Man 2", year: 2010 },
      { id: "thor-1", title: "Thor", year: 2011 },
      { id: "cap-1", title: "Captain America: The First Avenger", year: 2011 },
      { id: "avengers-1", title: "The Avengers", year: 2012 },
    ],
  },
  {
    id: 2,
    label: "Phase 2",
    sublabel: "The Infinity Saga expands",
    movies: [
      { id: "iron-man-3", title: "Iron Man 3", year: 2013 },
      { id: "thor-2", title: "Thor: The Dark World", year: 2013 },
      { id: "cap-2", title: "Captain America: The Winter Soldier", year: 2014 },
      { id: "gotg-1", title: "Guardians of the Galaxy", year: 2014 },
      { id: "aou", title: "Avengers: Age of Ultron", year: 2015 },
      { id: "antman-1", title: "Ant-Man", year: 2015 },
      { id: "dd-s1", title: "Daredevil Season 1", year: 2015, type: "show" },
    ],
  },
  {
    id: 3,
    label: "Phase 3",
    sublabel: "The Infinity Saga concludes",
    movies: [
      { id: "civil-war", title: "Captain America: Civil War", year: 2016 },
      { id: "dd-s2", title: "Daredevil Season 2", year: 2016, type: "show" },
      { id: "dr-strange-1", title: "Doctor Strange", year: 2016 },
      { id: "gotg-2", title: "Guardians of the Galaxy Vol. 2", year: 2017 },
      { id: "spidey-1", title: "Spider-Man: Homecoming", year: 2017, spidey: true },
      { id: "ragnarok", title: "Thor: Ragnarok", year: 2017 },
      { id: "punisher-s1", title: "The Punisher Season 1", year: 2017, type: "show" },
      { id: "bp-1", title: "Black Panther", year: 2018 },
      { id: "iw", title: "Avengers: Infinity War", year: 2018 },
      { id: "venom-1", title: "Venom", year: 2018, type: "sony" },
      { id: "antman-2", title: "Ant-Man and the Wasp", year: 2018 },
      { id: "dd-s3", title: "Daredevil Season 3", year: 2018, type: "show" },
      { id: "captain-marvel", title: "Captain Marvel", year: 2019 },
      { id: "punisher-s2", title: "The Punisher Season 2", year: 2019, type: "show" },
      { id: "endgame", title: "Avengers: Endgame", year: 2019 },
      { id: "spidey-2", title: "Spider-Man: Far From Home", year: 2019, spidey: true },
    ],
  },
  {
    id: 4,
    label: "Phase 4",
    sublabel: "The Multiverse Saga begins",
    movies: [
      { id: "bw", title: "Black Widow", year: 2021 },
      { id: "loki-s1", title: "Loki Season 1", year: 2021, type: "show" },
      { id: "shang-chi", title: "Shang-Chi and the Legend of the Ten Rings", year: 2021 },
      { id: "venom-2", title: "Venom: Let There Be Carnage", year: 2021, type: "sony" },
      { id: "eternals", title: "Eternals", year: 2021 },
      { id: "spidey-3", title: "Spider-Man: No Way Home", year: 2021, spidey: true },
      { id: "wandavision", title: "WandaVision", year: 2021, type: "show" },
      { id: "ds2", title: "Doctor Strange in the Multiverse of Madness", year: 2022 },
      { id: "thor-4", title: "Thor: Love and Thunder", year: 2022 },
      { id: "bp-2", title: "Black Panther: Wakanda Forever", year: 2022 },
    ],
  },
  {
    id: 5,
    label: "Phase 5",
    sublabel: "The Multiverse Saga deepens",
    movies: [
      { id: "antman-3", title: "Ant-Man and the Wasp: Quantumania", year: 2023 },
      { id: "gotg-3", title: "Guardians of the Galaxy Vol. 3", year: 2023 },
      { id: "loki-s2", title: "Loki Season 2", year: 2023, type: "show" },
      { id: "marvels", title: "The Marvels", year: 2023 },
      { id: "xmen-1", title: "X-Men", year: 2000, type: "fox" },
      { id: "xmen-2", title: "X2: X-Men United", year: 2003, type: "fox" },
      { id: "xmen-fc", title: "X-Men: First Class", year: 2011, type: "fox" },
      { id: "xmen-dofp", title: "X-Men: Days of Future Past", year: 2014, type: "fox" },
      { id: "xmen-apoc", title: "X-Men: Apocalypse", year: 2016, type: "fox" },
      { id: "deadpool-1", title: "Deadpool", year: 2016, type: "fox" },
      { id: "logan", title: "Logan", year: 2017, type: "fox" },
      { id: "deadpool-2", title: "Deadpool 2", year: 2018, type: "fox" },
      { id: "ff-2005", title: "Fantastic Four", year: 2005, type: "fox" },
      { id: "ff-2007", title: "Fantastic Four: Rise of the Silver Surfer", year: 2007, type: "fox" },
      { id: "deadpool", title: "Deadpool & Wolverine", year: 2024 },
      { id: "venom-3", title: "Venom: The Last Dance", year: 2024, type: "sony" },
      { id: "dd-ba-s1", title: "Daredevil: Born Again Season 1", year: 2025, type: "show" },
      { id: "cap-4", title: "Captain America: Brave New World", year: 2025 },
      { id: "thunderbolts", title: "Thunderbolts*", year: 2025 },
    ],
  },
  {
    id: 6,
    label: "Phase 6",
    sublabel: "The Multiverse Saga concludes",
    movies: [
      { id: "ff", title: "The Fantastic Four: First Steps", year: 2025 },
      { id: "dd-ba-s2", title: "Daredevil: Born Again Season 2", year: 2026, type: "show" },
      { id: "punisher-olk", title: "Punisher: One Last Kill", year: 2026, type: "show" },
      { id: "bnd", title: "Spider-Man: Brand New Day", year: 2026, spidey: true },
      { id: "doomsday", title: "Avengers: Doomsday", year: 2026,  },
    ],
  },
];

function getDefaultWatched() {
  const defaults = {};
  const allMovies = phases.flatMap((p) => p.movies).filter((m) => !m.target);
  for (const movie of allMovies) {
    if (movie.id === "antman-1") break;
    defaults[movie.id] = true;
  }
  return defaults;
}

function computeExpandedPhases(watchedState) {
  const allOrdered = phases.flatMap((p) => p.movies).filter((m) => !m.target);
  const firstUnwatched = allOrdered.find((m) => !watchedState[m.id]);
  const activePhaseId = firstUnwatched
    ? phases.find((p) => p.movies.some((m) => m.id === firstUnwatched.id))?.id
    : null;
  const result = {};
  for (const phase of phases) {
    const phaseMovies = phase.movies.filter((m) => !m.target);
    const isComplete = phaseMovies.length > 0 && phaseMovies.every((m) => watchedState[m.id]);
    result[phase.id] = phase.id === activePhaseId && !isComplete;
  }
  return result;
}

export default function App() {
  const [watched, setWatched] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [expandedPhases, setExpandedPhases] = useState({});

  // Load from Supabase on mount
  useEffect(() => {
    async function loadFromSupabase() {
      try {
        const { data, error } = await supabase
          .from("watchlist")
          .select("watched_ids")
          .eq("id", "darshan")
          .single();

        if (error || !data) {
          const defaults = getDefaultWatched();
          setWatched(defaults);
          setExpandedPhases(computeExpandedPhases(defaults));
        } else {
          const ids = data.watched_ids || [];
          const watchedMap = {};
          ids.forEach((id) => (watchedMap[id] = true));
          // If empty DB, seed with defaults
          const finalMap = Object.keys(watchedMap).length === 0 ? getDefaultWatched() : watchedMap;
          setWatched(finalMap);
          setExpandedPhases(computeExpandedPhases(finalMap));
        }
      } catch {
        const defaults = getDefaultWatched();
        setWatched(defaults);
        setExpandedPhases(computeExpandedPhases(defaults));
      } finally {
        setLoading(false);
      }
    }
    loadFromSupabase();

    // Check if already authenticated this session
    if (sessionStorage.getItem("marvel-admin") === "true") {
      setIsAdmin(true);
    }
  }, []);

  // Save to Supabase
  const saveToSupabase = useCallback(async (watchedMap) => {
    setSaving(true);
    const ids = Object.keys(watchedMap).filter((k) => watchedMap[k]);
    await supabase
      .from("watchlist")
      .update({ watched_ids: ids, updated_at: new Date().toISOString() })
      .eq("id", "darshan");
    setSaving(false);
  }, []);

  const toggle = (id) => {
    if (!isAdmin) {
      setShowPasswordModal(true);
      return;
    }
    setWatched((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      saveToSupabase(next);
      return next;
    });
  };

  const togglePhase = (id) => {
    setExpandedPhases((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePasswordSubmit = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAdmin(true);
      sessionStorage.setItem("marvel-admin", "true");
      setShowPasswordModal(false);
      setPasswordInput("");
      setPasswordError(false);
    } else {
      setPasswordError(true);
      setPasswordInput("");
    }
  };

  const allMovies = phases.flatMap((p) => p.movies).filter((m) => !m.target);
  const watchedCount = allMovies.filter((m) => watched[m.id]).length;
  const totalCount = allMovies.length;
  const progress = Math.round((watchedCount / totalCount) * 100);

  const allMoviesOrdered = phases.flatMap((p) => p.movies).filter((m) => !m.target);
  const nowWatchingMovie = allMoviesOrdered.find((m) => !watched[m.id]) || null;
  const nowWatchingId = nowWatchingMovie?.id ?? null;
  const nextUpMovie = nowWatchingMovie
    ? allMoviesOrdered[allMoviesOrdered.indexOf(nowWatchingMovie) + 1] ?? null
    : null;

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", background: "#0a0a0f", display: "flex",
        alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16,
      }}>
        <div style={{ fontSize: 32 }}>🕷</div>
        <div style={{ color: "#4a4a66", fontSize: 13 }}>Loading watchlist...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#e8e8f0", padding: "0 0 60px" }}>

      {/* Password Modal */}
      {showPasswordModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 100,
        }}
          onClick={(e) => { if (e.target === e.currentTarget) { setShowPasswordModal(false); setPasswordError(false); setPasswordInput(""); } }}
        >
          <div style={{
            background: "#12121e", border: "1px solid #2a2a44", borderRadius: 12,
            padding: "28px 24px", width: 300, textAlign: "center",
          }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>🔒</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#ccccee", marginBottom: 6 }}>Admin Access</div>
            <div style={{ fontSize: 12, color: "#4a4a66", marginBottom: 20 }}>Enter password to edit the watchlist</div>
            <input
              autoFocus
              type="password"
              value={passwordInput}
              onChange={(e) => { setPasswordInput(e.target.value); setPasswordError(false); }}
              onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit()}
              placeholder="Password"
              style={{
                width: "100%", padding: "10px 12px", borderRadius: 7,
                border: `1px solid ${passwordError ? "#aa3333" : "#2a2a44"}`,
                background: "#0a0a15", color: "#ccccee", fontSize: 13,
                outline: "none", marginBottom: 8, boxSizing: "border-box",
              }}
            />
            {passwordError && (
              <div style={{ fontSize: 11, color: "#cc4444", marginBottom: 10 }}>Incorrect password</div>
            )}
            <button
              onClick={handlePasswordSubmit}
              style={{
                width: "100%", padding: "10px", borderRadius: 7,
                background: "#8b0000", border: "none", color: "#fff",
                fontSize: 13, fontWeight: 700, cursor: "pointer", marginTop: 4,
              }}
            >
              Unlock
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{
        background: "linear-gradient(160deg, #1a0505 0%, #0d0d1f 50%, #0a0a0f 100%)",
        borderBottom: "1px solid #2a1a1a", padding: "32px 20px 28px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <div style={{ fontSize: 11, letterSpacing: "0.18em", color: "#b03030", fontWeight: 700, textTransform: "uppercase" }}>
              MCU Watchlist
            </div>
            {/* Admin / Lock indicator */}
            <div
              onClick={() => !isAdmin && setShowPasswordModal(true)}
              style={{
                fontSize: 11, cursor: isAdmin ? "default" : "pointer",
                color: isAdmin ? "#44cc44" : "#3a3a55",
                display: "flex", alignItems: "center", gap: 5,
              }}
            >
              {isAdmin ? (
                <><span>🟢</span><span style={{ color: "#44aa44" }}>Editing enabled</span></>
              ) : (
                <><span>🔒</span><span>View only — tap to edit</span></>
              )}
              {saving && <span style={{ color: "#5555aa", marginLeft: 6 }}>saving...</span>}
            </div>
          </div>

          <h1 style={{ margin: "0 0 4px", fontSize: 26, fontWeight: 800, letterSpacing: "-0.5px", color: "#fff" }}>
            Road to Doomsday
          </h1>
          <p style={{ margin: "0 0 24px", fontSize: 13, color: "#6a6a88" }}>
            Spider-Man: Brand New Day · July 31, 2026 &nbsp;·&nbsp; Avengers: Doomsday · Dec 18, 2026
          </p>
      

          {/* Progress bar */}
          <div style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: "#8888aa" }}>{watchedCount} of {totalCount} titles watched</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: "#e23535" }}>{progress}%</span>
            </div>
            <div style={{ height: 5, background: "#1e1e2e", borderRadius: 3, overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${progress}%`,
                background: "linear-gradient(90deg, #8b0000, #e23535)",
                borderRadius: 3, transition: "width 0.4s ease",
              }} />
            </div>
          </div>

          {nowWatchingMovie && (
            <div style={{
              marginTop: 16, display: "inline-flex", alignItems: "center", gap: 8,
              background: "#1a0d0d", border: "1px solid #3a1a1a", borderRadius: 6, padding: "6px 12px", fontSize: 12,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#e23535", display: "inline-block", animation: "pulse 1.5s infinite" }} />
              <span style={{ color: "#8888aa" }}>Now watching:</span>
              <span style={{ color: "#ffcc44", fontWeight: 600 }}>{nowWatchingMovie.title}</span>
            </div>
          )}
          {nextUpMovie && (
            <div style={{ marginTop: 8, fontSize: 12, color: "#6a6a88" }}>
              Up next: <span style={{ color: "#aaaacc" }}>{nextUpMovie.title} ({nextUpMovie.year})</span>
            </div>
          )}
        </div>
      </div>

      {/* Phase list */}
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px 16px 0" }}>
        {phases.map((phase) => {
          const phaseMovies = phase.movies.filter((m) => !m.target);
          const phaseWatched = phaseMovies.filter((m) => watched[m.id]).length;
          const isComplete = phaseWatched === phaseMovies.length && phaseMovies.length > 0;
          const isExpanded = expandedPhases[phase.id];

          return (
            <div key={phase.id} style={{
              marginBottom: 12, border: "1px solid",
              borderColor: isComplete ? "#1e3a1e" : "#1e1e2e",
              borderRadius: 10, overflow: "hidden",
              background: isComplete ? "#0d150d" : "#0e0e1a",
            }}>
              <button
                onClick={() => togglePhase(phase.id)}
                style={{
                  width: "100%", background: "none", border: "none", padding: "14px 16px",
                  cursor: "pointer", display: "flex", alignItems: "center", gap: 10,
                  textAlign: "left", color: "inherit",
                }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: 6,
                  background: isComplete ? "#1a3a1a" : "#1a1a2e",
                  border: `1px solid ${isComplete ? "#2d5a2d" : "#2a2a44"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 800, color: isComplete ? "#44cc44" : "#5555aa", flexShrink: 0,
                }}>
                  {isComplete ? "✓" : phase.id}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: isComplete ? "#66dd66" : "#ccccee" }}>
                    {phase.label}
                    {phase.id === 6 && (
                      <span style={{ marginLeft: 8, fontSize: 10, background: "#3a1010", color: "#ff6666", padding: "2px 6px", borderRadius: 4, fontWeight: 700, letterSpacing: "0.05em" }}>
                        ENDGAME
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: "#4a4a66", marginTop: 1 }}>{phase.sublabel}</div>
                </div>
                <div style={{ fontSize: 11, color: "#4a4a66", marginRight: 8, whiteSpace: "nowrap" }}>
                  {phaseMovies.length > 0 ? `${phaseWatched}/${phaseMovies.length}` : "🎯"}
                </div>
                <div style={{ fontSize: 10, color: "#3a3a55", transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</div>
              </button>

              {isExpanded && (
                <div style={{ borderTop: "1px solid #1a1a28" }}>
                  {phase.movies.map((movie, idx) => {
                    const isWatched = watched[movie.id];
                    const isCurrent = movie.id === nowWatchingId;
                    const isTarget = movie.target;

                    return (
                      <div
                        key={movie.id}
                        onClick={() => !isTarget && toggle(movie.id)}
                        style={{
                          display: "flex", alignItems: "center", gap: 12, padding: "10px 16px",
                          borderBottom: idx < phase.movies.length - 1 ? "1px solid #13131f" : "none",
                          cursor: isTarget ? "default" : "pointer",
                          background: isCurrent ? "#1a1000" : isTarget ? "#12001a" : "transparent",
                          transition: "background 0.15s", userSelect: "none",
                        }}
                        onMouseEnter={(e) => { if (!isTarget) e.currentTarget.style.background = isCurrent ? "#221500" : "#12121e"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = isCurrent ? "#1a1000" : isTarget ? "#12001a" : "transparent"; }}
                      >
                        <div style={{
                          width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                          border: `1.5px solid ${isTarget ? "#5a1a88" : isWatched ? "#2d5a2d" : "#2a2a44"}`,
                          background: isTarget ? "transparent" : isWatched ? "#1a3a1a" : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11,
                        }}>
                          {isTarget ? "🎯" : isWatched ? <span style={{ color: "#44cc44" }}>✓</span> : null}
                        </div>


                        <div style={{ flex: 1 }}>
                          <span style={{
                            fontSize: 13, fontWeight: isCurrent || isTarget ? 700 : 400,
                            color: isTarget ? "#cc88ff" : isCurrent ? "#ffcc44" : isWatched ? "#444466" : "#ccccee",
                            textDecoration: isWatched && !isCurrent && !isTarget ? "line-through" : "none",
                            textDecorationColor: "#333344",
                          }}>
                            {movie.title}
                          </span>
                          {movie.spidey && !isTarget && <span style={{ marginLeft: 6, fontSize: 10, color: "#aa3333" }}>🕷</span>}
                          {movie.type === "show" && (
                            <span style={{ marginLeft: 7, fontSize: 9, background: "#0a1a2e", color: "#4488cc", border: "1px solid #1a3a5a", padding: "1px 5px", borderRadius: 3, fontWeight: 700 }}>TV</span>
                          )}
                          {movie.type === "sony" && (
                            <span style={{ marginLeft: 7, fontSize: 9, background: "#1a1000", color: "#cc8822", border: "1px solid #3a2800", padding: "1px 5px", borderRadius: 3, fontWeight: 700 }}>SONY</span>
                          )}
                          {movie.type === "fox" && (
                            <span style={{ marginLeft: 7, fontSize: 9, background: "#1a0a00", color: "#ff6633", border: "1px solid #3a1a00", padding: "1px 5px", borderRadius: 3, fontWeight: 700 }}>FOX</span>
                          )}
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          {isCurrent && <span style={{ fontSize: 10, background: "#3a2500", color: "#ffaa22", padding: "2px 7px", borderRadius: 10, fontWeight: 700 }}>WATCHING</span>}
                          {isTarget && <span style={{ fontSize: 10, background: "#2a0a44", color: "#cc88ff", padding: "2px 7px", borderRadius: 10, fontWeight: 700 }}>TARGET</span>}
                          {!isAdmin && !isTarget && (
                            <span style={{ fontSize: 9, color: "#2a2a44" }}>🔒</span>
                          )}
                          <span style={{ fontSize: 11, color: "#3a3a55" }}>{movie.year}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        <div style={{ textAlign: "center", marginTop: 24, fontSize: 11, color: "#f5f5f8" }}>
          {isAdmin ? "Tap any title to toggle watched status" : "🔒 View only · Tap the lock to edit"}
        </div>
        <div style={{ textAlign: "left", marginTop: 24, fontSize: 9, color: "#f5f5f8" }}>
          <p style={{ margin: "0 0 24px", fontSize: 9, color: "#6a6a88" }}>
            Created for Ruchika ♥
          </p>
          </div>
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        * { box-sizing: border-box; }
        body { margin: 0; }
        input:focus { border-color: #5555aa !important; }
      `}</style>
    </div>
  );
}