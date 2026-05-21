import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { simple } from "@clerk/themes";
import App from "./App.jsx";
import "./input.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {PUBLISHABLE_KEY ? (
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        afterSignOutUrl="/"
        localization={{
          signIn: {
            start: {
              title: "Sign In to AlgoScope!",
              subtitle: "Welcome!",
            },
          },
        }}
        appearance={{
          baseTheme: simple,
          variables: {
            colorPrimary: "#8b5cf6",
            colorText: "#ffffff",
            colorTextSecondary: "#a1a1aa",
            colorBackground: "#0f0f0f",
            borderRadius: "12px",
            colorBorder: "#27272a",
            fontFamily: "Inter, sans-serif",
          },
        }}
      >
        <App />
      </ClerkProvider>
    ) : (
      // 👇 fallback UI (VERY IMPORTANT)
      <div style={{ color: "white", padding: "20px" }}>
        ❌ Missing Clerk Publishable Key
        <br />
        👉 Add <b>VITE_CLERK_PUBLISHABLE_KEY</b> in .env
      </div>
    )}
  </StrictMode>
);