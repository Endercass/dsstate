import { defineConfig } from "vite";
import dtsPlugin from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dtsPlugin({
      insertTypesEntry: true,
      outputDir: "dist/types",
      exclude: ["**/*.test.ts"],
      tsConfigFilePath: "./tsconfig.json",
    }),
  ],
  build: {
    lib: {
      formats: ["es"],
      entry: "src/index.ts",
      name: "DSState",
      fileName: (format) => `dsstate.${format}.js`,
    },
  },
});
