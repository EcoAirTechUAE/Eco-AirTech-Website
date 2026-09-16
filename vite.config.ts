import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
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
});
