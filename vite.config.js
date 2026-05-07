import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vite.dev/config/
// IMPORTANT: For GitHub Pages deployment under https://USER.github.io/REPO_NAME/
// set the env variable VITE_BASE or change the `base` below to "/<repo-name>/".
// For user/organization sites (USER.github.io) leave it as "/".
export default defineConfig(function (_a) {
    var _b;
    var mode = _a.mode;
    return ({
        base: (_b = process.env.VITE_BASE) !== null && _b !== void 0 ? _b : "/roadmap-react-quest/",
        plugins: [react()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        build: {
            outDir: "dist",
            sourcemap: mode !== "production",
        },
    });
});
