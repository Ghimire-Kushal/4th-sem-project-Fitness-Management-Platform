import Sidebar from "./Sidebar";

const Layout = ({ children }) => (
  <div style={{ display: "flex", minHeight: "100vh", background: "#f1f5f9", fontFamily: "Segoe UI, sans-serif" }}>
    <Sidebar />
    <main style={{ marginLeft: 220, flex: 1, padding: "32px", minHeight: "100vh" }}>
      {children}
    </main>
  </div>
);

export default Layout;
