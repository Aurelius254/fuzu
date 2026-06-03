import { useEffect, useMemo, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase"; // Adjust path as needed
import AccountSettings from "./pages/AccountSettings";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Subjects from "./pages/Subjects";
import PathDetail from "./pages/PathDetail";
import Help from "./pages/Help";

function navigateTo(pathname) {
  window.history.pushState({}, "", pathname);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function Redirect({ to }) {
  useEffect(() => {
    navigateTo(to);
  }, [to]);
  return null;
}

function resolveRoute(pathname, onLogout) {
  if (pathname === "/accountsettings") {
    return <AccountSettings />;
  }

  if (pathname === "/subjects") {
    return <Subjects />;
  }

  if (pathname === "/paths") {
    return <Redirect to="/courses" />;
  }

  if (pathname.startsWith("/paths/")) {
    const parts = pathname.split("/").filter(Boolean);
    const cardId = parts[1];
    return <Redirect to={`/courses/${cardId}`} />;
  }

  if (pathname === "/courses") {
    return <Courses />;
  }

  if (pathname.startsWith("/courses/")) {
    const parts = pathname.split("/").filter(Boolean);
    const cardId = parts[1];
    return <PathDetail params={{ cardId }} />;
  }

  if (pathname === "/help") {
    return <Help />;
  }

  if (pathname === "/dashboard") {
    return <Dashboard onLogout={onLogout} />;
  }

  return <Dashboard onLogout={onLogout} />;
}

export default function AppRouter() {
  const [pathname, setPathname] = useState(window.location.pathname);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // After logout, the onAuthStateChanged in App.jsx will trigger
      // and show the landing page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const page = useMemo(() => resolveRoute(pathname, handleLogout), [pathname, handleLogout]);

  return (
    <div
      onClickCapture={(event) => {
        const target = event.target.closest?.("[data-route]");
        if (target) {
          event.preventDefault();
          navigateTo(target.getAttribute("data-route"));
        }
      }}
    >
      {page}
    </div>
  );
}