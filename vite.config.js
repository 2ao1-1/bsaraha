import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa"; // تأكد من إضافة هذا الاستيراد

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "بصراحه | استقبل مصارحات من اصدقائك",
        short_name: "بصراحه",
        description: "استقبل رأي اصدقائك عنك",
        theme_color: "#6366F1",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "./1.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "./2.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  server: {
    historyApiFallback: true,
  },
});
