import MenuButton from "./MenuButton";

const topNavStyle = {
  maxWidth: 768,
  margin: "0 auto",
  padding: "14px 18px 9px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

export default function TopNav() {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
  const isCourses = pathname.startsWith("/courses");

  return (
    <div style={{ background: "#111111", borderBottom: "1px solid #2a2a2a" }}>
      <div style={topNavStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: "-0.5px", color: "#fff" }}>Fuzu</div>
          <div style={{ display: "flex", alignItems: "center", gap: 18, color: "#b6b6b6", fontSize: 13 }}>
            <button
              type="button"
              data-route="/dashboard"
              style={{
                background: "none",
                border: "none",
                color: pathname === "/dashboard" ? "#fff" : "#b6b6b6",
                padding: 0,
                display: "flex",
                alignItems: "center",
                gap: 6,
                cursor: "pointer",
              }}
            >
              <span style={{ fontSize: 13 }}>⌂</span>
              <span>Home</span>
            </button>

            <button
              type="button"
              data-route="/courses"
              style={{
                background: "none",
                border: "none",
                color: isCourses ? "#fff" : "#b6b6b6",
                padding: 0,
                display: "flex",
                alignItems: "center",
                gap: 6,
                position: "relative",
                cursor: "pointer",
              }}
            >
              <span style={{ fontSize: 12 }}>▢</span>
              <span>Courses</span>
              {isCourses && (
                <div style={{ position: "absolute", left: 0, right: 0, bottom: -15, height: 2, background: "#fff" }} />
              )}
            </button>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#d8d8d8" }}>
          <button
            type="button"
            style={{ background: "linear-gradient(90deg, rgba(138,115,255,0.25), rgba(255,159,90,0.25))", border: "1px solid #4d4d4d", color: "#fff", borderRadius: 999, padding: "7px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
          >
            Start trial
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#191919", border: "1px solid #333", borderRadius: 999, padding: "5px 10px", fontSize: 12 }}>
            <span>0</span>
            <span style={{ opacity: 0.7 }}>🔑</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700 }}>
            <span>1</span>
            <span style={{ color: "#f4e05d" }}>⚡</span>
          </div>

          <MenuButton />
        </div>
      </div>
    </div>
  );
}