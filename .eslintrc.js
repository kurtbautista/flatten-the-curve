module.exports = {
  root: true,
  extends: ["airbnb", "eslint-config-prettier"],
  parser: "babel-eslint",
  plugins: ["react", "immutablejs", "jest", "prettier"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      legacyDecorators: true,
      modules: true
    }
  },
  settings: {
    "import/resolver": {
      "babel-module": {
        extensions: [".js", ".jsx", ".json", ".yaml"]
      }
    }
  },
  env: {
    es6: true,
    jest: true,
    node: true,
    jquery: true,
    browser: true
  },
  rules: {
    "react/jsx-one-expression-per-line": "off",
    "no-console": 2,
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          ".storybook/**",
          "stories/**",
          "*/.test.js",
          "*/.test.jsx",
          "test/**",
          "src/shapes/**",
          "*/.story.jsx"
        ]
      }
    ]
  }
};
