const Logo = ({ size = 64 }) => (
  <div
    aria-label="Fitness Platform Logo"
    role="img"
    style={{
      width: size,
      height: size,
      borderRadius: 12,
      border: "1px solid var(--border)",
      background: "var(--bg-card)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: Math.max(14, Math.round(size / 3.2)),
      fontWeight: 700,
      color: "var(--text-primary)",
      userSelect: "none",
      flexShrink: 0,
    }}
  >
    FP
  </div>
);

export default Logo;
