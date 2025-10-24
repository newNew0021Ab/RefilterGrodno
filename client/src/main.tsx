import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ErrorBoundary } from "./components/ErrorBoundary";

console.log("🚀 Refilter app initializing...");
console.log("📦 Environment:", import.meta.env.MODE);
console.log("✅ Root element found:", !!document.getElementById("root"));

try {
  const root = document.getElementById("root");
  if (!root) {
    throw new Error("Root element not found");
  }
  
  createRoot(root).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
  
  console.log("✅ React app rendered successfully");
} catch (error) {
  console.error("❌ Failed to initialize app:", error);
  document.body.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; font-family: sans-serif; background: #f8f9fa;">
      <div style="max-width: 600px; text-align: center; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <h1 style="color: #dc2626; margin-bottom: 16px;">Ошибка загрузки</h1>
        <p style="color: #6b7280; margin-bottom: 24px;">Не удалось загрузить приложение. Проверьте консоль браузера для деталей.</p>
        <button onclick="window.location.reload()" style="padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px;">
          Обновить страницу
        </button>
      </div>
    </div>
  `;
}
