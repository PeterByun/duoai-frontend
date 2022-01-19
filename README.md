# League-Frontend

The front-end application of DUO AI.

---

# How to start the dev server

1. Install Node.js on your machine. [Download link](https://nodejs.org/en/)

2. Run below commands in the root directory of the project where README.md is located.

```
npm install
npm run start
```

---

# Project structure

```
/public: Files will **not** going be processed by the Webpack.

/src:
    /assets: Static files such as .css, .scss, ttf, etc..

    /components: Components that are encapulated, thus can be used in different pages of the app.

    /pages: Pages to be rendered by the **React-rotuer**. Nested folders represent nested **router-view**.

    /tests: Unit Test files to ensure that components and utility moduels work as intended.

/db.json: The json-server creates a fake REST API based on this file.


```

---

# CLI

**npm install** - Intalls libraries specified in a package.json.
<br>
**start** - Starts a local development server.
<br>
**test:unit**
<br>
**test:e2e**
<br>
**build** - Build the application bundle.

---

# Components

## Import statemnets order.

1. Import libraries
2. Import Components
3. Import types
4. Import static resources

# Test

## MultiSearch

Test input

```
KT Dove 님이 방에 참가했습니다.
T1 Roach 님이 방에 참가했습니다.
Gen G Clid 님이 방에 참가했습니다.
Liiv Effort 님이 방에 참가했습니다.
T1 Zeus 님이 방에 참가했습니다.
```
