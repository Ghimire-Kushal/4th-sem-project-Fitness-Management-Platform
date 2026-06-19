import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("Frontend render error:", error, info);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f5f5",
          color: "#111827",
          fontFamily: "Segoe UI, sans-serif",
          padding: 24,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 560,
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            padding: 24,
          }}
        >
          <h1 style={{ margin: "0 0 8px", fontSize: 22 }}>Frontend Error</h1>
          <p style={{ margin: "0 0 16px", color: "#4b5563" }}>
            The app failed while rendering.
          </p>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              background: "#f3f4f6",
              borderRadius: 8,
              padding: 12,
              fontSize: 13,
            }}
          >
            {this.state.error?.message || String(this.state.error)}
          </pre>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
