/// <reference types="vitest" />
import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    restoreMocks: true,
    setupFiles: "./__test__/setupFile.ts",
    environmentMatchGlobs: [
      // all component tests will run in jsdom
      ["**/?(*.)+(spec|test).[jt]sx", "jsdom"],
      // all function tests will run in node
      ["**/?(*.)+(spec|test).[jt]s", "node"],
    ],
    testTimeout: 5000,
    coverage: {
      provider: "v8",
      reporter: ["clover", "json", "lcov", "text", "json-summary"],
    },
  },
}) satisfies UserConfig;
