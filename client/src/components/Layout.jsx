import { useState } from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [sideOpen, setSideOpen] = useState(false);

  return (
    <div className="layout-shell">
      {/* Mobile-only top bar */}
      <div className="mobile-topbar">
        <button className="hamburger" onClick={() => setSideOpen(true)} aria-label="Open menu">
          ☰
        </button>
        <span className="mobile-topbar-brand">Fitness Platform</span>
      </div>

      <Sidebar open={sideOpen} onClose={() => setSideOpen(false)} />

      <main className="layout-main">
        {children}
      </main>
    </div>
  );
};

export default Layout;
