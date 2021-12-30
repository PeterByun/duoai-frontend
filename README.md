# League-Frontend
The front-end application of DUO AI.

# How to start the development server.

1. Install Node.js on your machine. [Download link](https://nodejs.org/en/)

2. Run below commands in the root directory of the project where README.md is located.
```
npm install
npm run start
```

# Project structure
```
/public: Files will **not** going be processed by the Webpack. 

/src:
    /assets: Static files such as .css, .scss, ttf, etc..

    /components: Components that are encapulated, thus can be used in different pages of the app.
    
    /pages: Pages to be rendered by the **React-rotuer**. Nested folders represent nested **router-view**.

    /tests: Unit Test files to ensure that components and utility moduels work as intended.

/db.json: A json-server creates a fake REST API based on this file.

/helpers: Files that are not used in runtime.

```
# CLI
- npm install
    Intalls libraries specified in a package.json.
- start:
    Starts a local development server.
- test:unit
- test:e2e
- build
    Build the application bundle.

# Components

## Structure

1. Import Components
2. Import types
3. Import libraries
4. Import static resources
5. Type definitions
6. Functions
7. JSX