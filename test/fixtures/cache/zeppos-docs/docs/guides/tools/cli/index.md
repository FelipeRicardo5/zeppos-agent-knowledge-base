---
title: Zeus CLI
---

## Intro

Zeus CLI is the command line tool.

## `zeus create` Create project

Create project.

```sh
zeus create hello-world
```

Generate projects according to the following selection.

```sh
? What type of application should be created? APP
? Should this application contain a app-side component? Yes
```

After completing the project creation, the directory structure is as follows.

```tree
└── hello-world
    ├── app-side
    │   └── index.js
    ├── app.js
    ├── app.json
    └── setting
        └── index.js
```

## `zeus dev` compilation preview (simulator)

Execute `zeus dev` in the project root for a preview of the compilation.

```sh
zeus dev
```
