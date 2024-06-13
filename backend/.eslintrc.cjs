module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "linebreak-style": "off",
    "no-console": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
      { singleQuote: true },
    ],
  },
  ignorePatterns: ["dist", ".eslintrc.cjs"],
};
