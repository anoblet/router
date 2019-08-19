import typescript from "rollup-plugin-typescript";

export default {
  input: "./src/index.ts",
  output: {
    file: "dist/router.js",
    format: "esm"
  },
  plugins: [typescript()]
};
