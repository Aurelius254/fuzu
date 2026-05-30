import { useEffect, useMemo, useState } from "react";
import AccountSettings from "./pages/AccountSettings";
import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import Paths from "./pages/Paths";

function navigateTo(pathname) {
  window.history.pushState({}, "", pathname);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function resolveRoute(pathname) {
  if (pathname === "/accountsettings") {
    return <AccountSettings />;
  }

  if (pathname === "/subjects") {
    return <Subjects />;
  }

  if (pathname === "/paths") {
    return <Paths />;
  }

  if (pathname === "/dashboard") {
    return <Dashboard />;
  }

  return <Dashboard />;
}

export default function App() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const page = useMemo(() => resolveRoute(pathname), [pathname]);

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
