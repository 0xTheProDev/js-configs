---
to: packages/<%= h.changeCase.lower(name) %>/package.json
---

{
  "name": "@theprodev/<%= h.changeCase.lower(name) %>",
  "version": "0.0.0",
  "description": "Add a brief description to this package",
  "keywords": [
    "nodejs",
    "web",
    "microservices",
    "typescript",
    "angular",
    "nestjs",
    "nextjs",
    "react",
    "vue"
  ],
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "files": [
    "dist"
  ],
  "bugs": {
    "url": "https://github.com/0xTheProDev/js-configs/discussions"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/0xTheProDev/js-configs.git"
  },
  "license": "MIT",
  "author": "Progyan Bhattacharya <bprogyan@gmail.com>",
  "scripts": {
    "build": "tsup",
    "format": "prettier \"./**/*.{js,ts,tsx,json,md}\" --check",
    "format:fix": "prettier --write \"./**/*.{js,ts,tsx,json,md}\"",
    "lint": "eslint \"./src/**/*.{cjs,mjs,js,ts,tsx,json}\"",
    "lint:fix": "eslint \"./src/**/*.{cjs,mjs,js,ts,tsx,json}\" --fix",
    "typecheck": "tsc --noEmit"
  },
  "prettier": "@theprodev/prettier-config",
  "devDependencies": {
    "@theprodev/tsconfigs": "workspace:*"
  },
  "publishConfig": {
    "access": "public"
  }
}
