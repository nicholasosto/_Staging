// @ts-nocheck
overrides: [
  {
    files: ["scripts/**/*.ts", "tools/**/*.ts"],
    parserOptions: { project: "./tsconfig.scripts.json" }
  }
]