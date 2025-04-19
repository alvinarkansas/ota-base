/// <reference types="vitest" />
import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
  },
}) satisfies UserConfig;
