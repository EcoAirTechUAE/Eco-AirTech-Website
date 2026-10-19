import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ command }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  define: {
    // Reviews awaiting client approval are shown only where someone has
    // switched them on: the dev server, or a build with SHOW_PENDING_REVIEWS=1
    // (set in Vercel for Preview deployments only). Anything else, including
    // the live site, leaves them out. Off unless asked for, so a missing
    // variable can never publish an unapproved quote.
    __SHOW_PENDING_REVIEWS__: JSON.stringify(
      command === "serve" || process.env.SHOW_PENDING_REVIEWS === "1",
    ),
  },
  build: {
    // Build output goes to /build, not /assets.
    //
    // public/assets holds the client's renders and logos and is copied to
    // /assets verbatim, so with the default assetsDir the content-hashed
    // bundle files landed in the same directory as files like logo.png.
    // Nothing could then tell the two apart by path, and the immutable
    // cache header meant for hashed filenames was also being applied to
    // artwork that gets replaced under the same name.
    assetsDir: "build",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
