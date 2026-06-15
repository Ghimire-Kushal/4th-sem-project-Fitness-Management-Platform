import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import Logo from "./Logo";

const memberLinks = [
  { to: "/dashboard",     icon: "🏠", label: "Dashboard" },
  { to: "/membership",    icon: "🎫", label: "Membership" },
  { to: "/book-session",  icon: "📅", label: "Book Session" },
  { to: "/book-trainer",  icon: "🏋️", label: "Book Trainer" },
  { to: "/my-plans",      icon: "📋", label: "My Plans" },
  { to: "/notifications", icon: "🔔", label: "Notifications" },
  { to: "/profile",       icon: "👤", label: "Profile" },
];

const trainerLinks = [
  { to: "/trainer",          icon: "🏠", label: "Dashboard" },
  { to: "/trainer/members",  icon: "👥", label: "My Members" },
  { to: "/trainer/workout",  icon: "💪", label: "Assign Workout" },
  { to: "/trainer/diet",     icon: "🥗", label: "Assign Diet" },
  { to: "/notifications",    icon: "🔔", label: "Notifications" },
  { to: "/profile",          icon: "👤", label: "Profile" },
];

const adminLinks = [
  { to: "/admin",           icon: "🏠", label: "Dashboard" },
  { to: "/admin/users",     icon: "👥", label: "Members" },
  { to: "/admin/trainers",  icon: "🏋️", label: "Trainers" },
  { to: "/admin/bookings",  icon: "📅", label: "Bookings" },
  { to: "/admin/plans",     icon: "🎫", label: "Plans" },
  { to: "/admin/slots",     icon: "⏱️", label: "Time Slots" },
  { to: "/profile",         icon: "👤", label: "Profile" },
];

const linkMap = { member: memberLinks, trainer: trainerLinks, admin: adminLinks };

const s = {
  brand: {
    padding: "20px",
    borderBottom: "1px solid var(--border)",
    color: "var(--text-primary)", fontWeight: 700, fontSize: 16, fontFamily: "Segoe UI",
    display: "flex", alignItems: "center", gap: 10,
  },
  nav: { flex: 1, padding: "16px 0", overflowY: "auto" },
  link: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "11px 20px", color: "var(--text-secondary)",
    textDecoration: "none", fontSize: 14, fontFamily: "Segoe UI",
    fontWeight: 500, transition: "all 0.15s",
  },
  activeLink: {
    color: "var(--text-primary)", background: "var(--bg-muted)",
    borderRight: "3px solid var(--text-primary)",
  },
  bottom: {
    padding: "16px 20px", borderTop: "1px solid var(--border)",
    display: "flex", alignItems: "center", gap: 10,
  },
  avatar: {
    width: 34, height: 34, borderRadius: "50%",
    background: "var(--bg-muted)",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "var(--text-primary)", fontWeight: 700, fontSize: 13, flexShrink: 0,
  },
  name: { color: "var(--text-primary)", fontSize: 13, fontWeight: 600, fontFamily: "Segoe UI" },
  role: { color: "var(--text-muted)", fontSize: 11, fontFamily: "Segoe UI" },
};

const Sidebar = ({ open, onClose }) => {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();
  const links = linkMap[user?.role] || memberLinks;

  const handleLogout = () => { logout(); navigate("/login"); };

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  return (
    <>
      {/* Backdrop overlay for mobile */}
      <div
        className={`sidebar-backdrop${open ? " sidebar-open" : ""}`}
        onClick={onClose}
      />

      <aside className={`sidebar${open ? " sidebar-open" : ""}`}>
        <div style={s.brand}>
          <Logo size={32} />
          <span>Fitness Platform</span>
        </div>
        <nav style={s.nav}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/dashboard" || l.to === "/trainer" || l.to === "/admin"}
              style={({ isActive }) => ({ ...s.link, ...(isActive ? s.activeLink : {}) })}
              onClick={handleLinkClick}
            >
              <span>{l.icon}</span> {l.label}
            </NavLink>
          ))}
        </nav>
        <div style={s.bottom}>
          <div style={s.avatar}>{user?.name?.[0]?.toUpperCase()}</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ ...s.name, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.name}</div>
            <div style={s.role}>{user?.role}</div>
          </div>
          <button onClick={toggle} title={dark ? "Light mode" : "Dark mode"}
            style={{ marginLeft: "auto", background: "var(--bg-muted)", border: "1px solid var(--border)", borderRadius: 8,
              color: "var(--text-primary)", cursor: "pointer", fontSize: 14, padding: "6px 10px", flexShrink: 0 }}>
            Theme
          </button>
          <button
            style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: 18, marginLeft: 6, flexShrink: 0 }}
            onClick={handleLogout} title="Logout">⏻</button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
