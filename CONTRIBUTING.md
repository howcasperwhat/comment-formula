# Contributing

Thank you for being interested in this project! We are excited to have you here. This document will guide you through the process of contributing to this project.

## Setup (locally)

To set up the project locally, you need to have [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed.

```bash
npm i
```

## Development

Press `F5` to start the extension in a new VSCode window. Open `./test/` folder to test the extension.

## Update

Every time you add or update a config in `package.json`, run

```bash
npm run update
```

## Code Style

We use [ESLint](https://eslint.org/) with [@antfu/eslint-config](https://github.com/antfu/eslint-config) for code style.

To lint the code, run

```bash
npm run lint --fix
```

Be sure to fix all linting errors before submitting a pull request.
