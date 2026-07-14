import { useEffect, useMemo, useState } from "react";
import AccountSettings from "./pages/AccountSettings";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Help from "./pages/Help";
import ArithmeticLesson from "./pages/ArithmeticLesson";
import CountingSequences from "./pages/Countingsequences";
import LegoSimulator from "./pages/LegoSimulator";
import SpikeSimulator from "./pages/SpikeSimulator";

function navigateTo(pathname) {
  window.history.pushState({}, "", pathname);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function resolveRoute(pathname) {
  if (pathname === "/accountsettings") return <AccountSettings />;
  if (pathname === "/courses") return <Courses />;
  if (pathname === "/courses/arithmetic-thinking") return <ArithmeticLesson />;
  if (pathname === "/courses/counting-sequences") return <CountingSequences />;
  if (pathname === "/ev3-lab") return <LegoSimulator />;
  if (pathname === "/spike-lab") return <SpikeSimulator />;
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