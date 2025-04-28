import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/ref.ts",
      name: "DSState",
      fileName: (format) => `dsstate.${format}.js`,
    },
  },
});
