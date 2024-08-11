// Common ESLint configuration for Node.js projects

module.exports = {
  extends: [
    "next",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  env: {
    node: true,
    es6: true,
  },
  ignorePatterns: ["node_modules/", "dist/", "out/"],
  overrides: [
    {
      files: ["**/__tests__/**/*"],
      env: {
        jest: true,
      },
    },
  ],
  settings: {
    "import/resolver": {
      typescript: true,
      node: true
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  parser: "@typescript-eslint/parser",
  rules: {
    "turbo/no-undeclared-env-vars": "off",
    "import/no-unresolved": "error",
    "import/no-namespace": "off",
    "import/no-named-as-default": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "object-shorthand": "warn",
    "prefer-template": "warn",
    "import/no-duplicates": ["error", { considerQueryString: true }],
    "import/order": [
      "error",
      {
        groups: [
          "builtin", // Built-in imports (come from NodeJS native) go first
          "external", // <- External imports
          "internal", // <- Absolute imports
          ["sibling", "parent"], // <- Relative imports, the sibling and parent types they can be mingled together
          "index", // <- index imports
          "unknown", // <- unknown
        ],
        "newlines-between": "always",
        alphabetize: {
          /* sort in ascending order. Options: ["ignore", "asc", "desc"] */
          order: "asc",
          /* ignore case. Options: [true, false] */
          caseInsensitive: true,
        },
      },
    ],
  },
};
