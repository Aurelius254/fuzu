import { useEffect, useRef, useState } from "react";
import { Menu as MenuIcon } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // Adjust path to your firebase.js

export default function MenuButton({ items } = {}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDown(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    // That's it! App.jsx will detect the change and show landing page
  };

  const menuItems = items ?? [
    { label: "Settings", route: "/accountsettings" },
    { label: "Help", route: "/help" },
    { label: "Log out", action: handleLogout }, // Changed: added action
  ];

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        style={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          background: open ? "#3b3b3b" : "#333",
          border: "1px solid #454545",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#d8d8d8",
        }}
      >
        <MenuIcon size={18} />
      </button>

      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 10px)", right: 0, minWidth: 180, background: "#202020", border: "1px solid #333", borderRadius: 12, padding: 8, zIndex: 30 }}>
          {menuItems.map((mi) => (
            <button
              key={mi.label}
              type="button"
              {...(mi.route ? { "data-route": mi.route } : {})}
              onClick={() => {
                if (mi.action) {
                  mi.action(); // Call logout function
                }
                setOpen(false);
              }}
              style={{ width: "100%", background: "none", border: "none", color: "#f0f0f0", padding: "10px 12px", textAlign: "left", fontWeight: 700, cursor: "pointer", borderRadius: 8 }}
            >
              {mi.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}