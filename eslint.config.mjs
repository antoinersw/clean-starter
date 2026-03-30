import js from "@eslint/js";
import boundaries from "eslint-plugin-boundaries";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["**/node_modules/**", "**/dist/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: { boundaries },
    settings: {
      "boundaries/elements": [
        { type: "domain", pattern: "packages/domain" },
        { type: "application", pattern: "packages/application" },
        { type: "infrastructure", pattern: "packages/infrastructure" },
        { type: "adapters", pattern: "packages/adapters" },
      ],
    },
    rules: {
      "boundaries/element-types": [
        2,
        {
          default: "disallow",
          rules: [
            { from: "domain", allow: [] },
            { from: "application", allow: ["domain"] },
            {
              from: "infrastructure",
              allow: ["domain", "application"],
            },
            { from: "adapters", allow: ["application"] },
          ],
        },
      ],
    },
  }
);
