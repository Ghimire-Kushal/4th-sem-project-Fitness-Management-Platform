import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
  sidebar: {
    width: 220, minHeight: "100vh", background: "#1e1b4b",
    display: "flex", flexDirection: "column", padding: "0",
    position: "fixed", left: 0, top: 0, zIndex: 200,
  },
  brand: {
    padding: "24px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)",
    color: "#fff", fontWeight: 700, fontSize: 16, fontFamily: "Segoe UI",
    display: "flex", alignItems: "center", gap: 10,
  },
  nav: { flex: 1, padding: "16px 0" },
  link: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "11px 20px", color: "rgba(255,255,255,0.65)",
    textDecoration: "none", fontSize: 14, fontFamily: "Segoe UI",
    fontWeight: 500, transition: "all 0.15s",
  },
  activeLink: {
    color: "#fff", background: "rgba(255,255,255,0.12)",
    borderRight: "3px solid #a5b4fc",
  },
  bottom: {
    padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.1)",
    display: "flex", alignItems: "center", gap: 10,
  },
  avatar: {
    width: 34, height: 34, borderRadius: "50%",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", fontWeight: 700, fontSize: 13, flexShrink: 0,
  },
  name: { color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: "Segoe UI" },
  role: { color: "rgba(255,255,255,0.5)", fontSize: 11, fontFamily: "Segoe UI" },
  logout: {
    marginLeft: "auto", background: "none", border: "none",
    color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 18,
  },
};

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const links = linkMap[user?.role] || memberLinks;

  const handleLogout = () => { logout(); navigate("/login"); };

  return (
    <aside style={s.sidebar}>
      <div style={s.brand}>
        <span>🏋️</span> Fitness Platform
      </div>
      <nav style={s.nav}>
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === "/dashboard" || l.to === "/trainer" || l.to === "/admin"}
            style={({ isActive }) => ({ ...s.link, ...(isActive ? s.activeLink : {}) })}
          >
            <span>{l.icon}</span> {l.label}
          </NavLink>
        ))}
      </nav>
      <div style={s.bottom}>
        <div style={s.avatar}>{user?.name?.[0]?.toUpperCase()}</div>
        <div>
          <div style={s.name}>{user?.name}</div>
          <div style={s.role}>{user?.role}</div>
        </div>
        <button style={s.logout} onClick={handleLogout} title="Logout">⏻</button>
      </div>
    </aside>
  );
};

export default Sidebar;
