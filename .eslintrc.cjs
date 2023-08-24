module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  // JavaScript configuration files
  extends: [
    "eslint:recommended",
    "prettier",
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
  },
  rules: {
    "no-var": "error",
    "no-unused-vars": [
      "warn",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
      },
    ],
  },
  overrides: [
    // TypeScript configuration files
    {
      files: ["*.ts"],
      extends: [
        "eslint:recommended",
        "prettier",
        "plugin:@typescript-eslint/strict-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
      },
      rules: {
        "no-var": "error",
        "@typescript-eslint/no-unused-vars": [
          "warn",
          {
            "argsIgnorePattern": "^_",
            "varsIgnorePattern": "^_",
          },
        ],
      },
    },
    // React files under the `src` directory
    {
      files: ["src/**/*.ts", "src/**/*.tsx"],
      plugins: ["react", "@typescript-eslint"],
      extends: [
        "eslint:recommended",
        "prettier",
        "plugin:@typescript-eslint/strict-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
      },
      rules: {
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/no-unused-vars": [
          "warn",
          {
            "argsIgnorePattern": "^_",
            "varsIgnorePattern": "^_",
          },
        ],
      },
      settings: {
        react: {
          version: "detect",
        },
      },
    },
  ],
};
