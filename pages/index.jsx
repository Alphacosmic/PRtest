// pages/index.js
// pages/index.js
import { useEffect } from "react";

export default function Home() {
  // Function to send analytics events
  const logEvent = async (action, details) => {
    try {
      await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, details, timestamp: new Date() }),
      });
    } catch (err) {
      console.error("Failed to log event:", err);
    }
  };

  // Track when page loads
  useEffect(() => {
    logEvent("PAGE_VIEW", { page: "Home" });
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "50px", fontFamily: "sans-serif" }}>
      <h1>Welcome to Mini E-Commerce Project 🚀</h1>
      <p>
        <a
          href="/api/auth/signin"
          style={{ marginRight: "20px" }}
          onClick={() => logEvent("CLICK", { button: "Sign In with Google" })}
        >
          Sign in with Google
        </a>
        <a
          href="/profile"
          onClick={() => logEvent("CLICK", { button: "Go to Profile" })}
        >
          Go to Profile
        </a>
      </p>

      {/* Featured products demo */}
      <h2 style={{ marginTop: "40px" }}>Featured Products</h2>
      <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
        {["Red Dress", "Leather Bag", "Smart Watch"].map((product) => (
          <div
            key={product}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "20px",
              cursor: "pointer",
              width: "180px",
            }}
            onClick={() => logEvent("CLICK_PRODUCT", { product })}
          >
            <h3>{product}</h3>
            <p>$99.00</p>
          </div>
        ))}
      </div>
    </div>
  );
}

