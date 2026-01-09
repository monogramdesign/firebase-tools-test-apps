import type { Linter } from "eslint";
import { config as baseConfig } from "@repo/eslint-config/base";

const config: Linter.Config[] = [...baseConfig];

export default config;
