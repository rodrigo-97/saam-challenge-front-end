import path from "node:path";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
			generatedRouteTree: path.resolve("src/routes.gen.ts"),
			quoteStyle: "double",
			routeFileIgnorePrefix: "@",
		}),
		react(),
	],
	resolve: {
		alias: {
			"@": path.resolve("src"),
		},
	},
});
