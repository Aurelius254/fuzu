import { useEffect, useMemo, useState } from "react";
import AccountSettings from "./pages/AccountSettings";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Subjects from "./pages/Subjects";
import PathDetail from "./pages/PathDetail";
import Help from "./pages/Help";
import ArithmeticLesson from "./pages/ArithmeticLesson";

function navigateTo(pathname) {
  window.history.pushState({}, "", pathname);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function Redirect({ to }) {
  useEffect(() => { navigateTo(to); }, [to]);
  return null;
}

function resolveRoute(pathname) {
  if (pathname === "/accountsettings") return <AccountSettings />;
  if (pathname === "/subjects") return <Subjects />;
  if (pathname === "/paths") return <Redirect to="/courses" />;
  if (pathname.startsWith("/paths/")) {
    const cardId = pathname.split("/").filter(Boolean)[1];
    return <Redirect to={`/courses/${cardId}`} />;
  }
  if (pathname === "/courses") return <Courses />;
  if (pathname === "/courses/arithmetic-thinking") return <ArithmeticLesson />;
  if (pathname.startsWith("/courses/")) {
    const cardId = pathname.split("/").filter(Boolean)[1];
    return <PathDetail params={{ cardId }} />;
  }
  if (pathname === "/help") return <Help />;
  return <Dashboard />;
}

export default function AppRouter() {
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