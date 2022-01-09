# League-Frontend
The front-end application of DUO AI.

---

# To start the dev server

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
## Structure

1. Import Components
2. Import types
3. Import libraries
4. Import static resources
5. Type definitions
6. Functions
7. JSX