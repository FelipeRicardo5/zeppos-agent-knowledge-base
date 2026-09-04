# Construction of basic environment

The Zepp OS development environment is very simple to set up, requiring only a Node.js environment and a code editor. This article will guide developers through a quick build of the Zepp OS development environment, including the installation of Node.js and the installation of the code editor.

**Minimum API_LEVEL: not stated.** No symbol this pattern uses documents one.

Source: `zeppos-docs/docs/guides/best-practice/Basic-environment-construction.mdx`

## Symbols used

None. This guide's code imports no `@zos` module, so there is nothing here to check against `../api/` — it is prose and configuration only.

## Introduction

## Installing Node.js

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh

// or

wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh
```

```txt
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

## Code Editor
