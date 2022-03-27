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

# CLI

**npm install** - Intalls libraries specified in a package.json.
<br>
**start** - Starts a local development server.
<br>
**test:unit** - TODO
<br>
**test:e2e** - TODO
<br>
**build** - Build the application bundle.

---

# File structure

If the data scheme of API is not suitable for the client, you should process it with an adapter, so the complexity of API does not affect the components.
This is why we have a dedicated folder for APIs(/apis). Also, this will make the Front-end application testable without the backend API server, thus decreasing the operational cost by efficiently implementing E2E tests.

\*files prefixed with "app" means these files belong to the app, but not specific features.

- /apis: HTTP request modules for API endpoints.
  Each API consists of one or more type definitions and an adapter for processing data.
- /assets: Static assets such as images, fonts, json files.
- /components-atoms: Very basic dumb components that are used to build complex, smart components.
- /components-features: Components belong to specific features(pages).
- /constants: Constants that are categorized by feature.
- /hooks: React component logics exracted for common use cases.
- /pages: Components under pages represent pages and routes.
- /redux: Global state management.
- /types: Type definitions.
- /utils: Utility modules.

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
레전드오브롤1244님이 방에 참가했습니다.
디알엑스태윤님이 방에 참가했습니다.
DWG KIA님이 방에 참가했습니다.
GenGRuler님이 방에 참가했습니다.
DWG Ghost님이 방에 참가했습니다.
```

# Icons

- <a href="https://www.flaticon.com/free-icons/agriculture" title="agriculture icons">Agriculture icons created by Freepik - Flaticon</a>
- <a href="https://www.flaticon.com/free-icons/sword" title="sword icons">Sword icons created by Freepik - Flaticon</a>
- <a href="https://www.flaticon.com/free-icons/battlefield" title="battlefield icons">Battlefield icons created by max.icons - Flaticon</a>
- <a href="https://www.flaticon.com/free-icons/torch" title="torch icons">Torch icons created by Freepik - Flaticon</a>
- <a href="https://www.flaticon.com/free-icons/shield" title="shield icons">Shield icons created by Freepik - Flaticon</a>
- <a href="https://www.flaticon.com/free-icons/bow" title="bow icons">Bow icons created by Good Ware - Flaticon</a>
- <a href="https://www.flaticon.com/free-icons/chick" title="chick icons">Chick icons created by Freepik - Flaticon</a>
- <a href="https://www.flaticon.com/free-icons/left-arrow" title="left arrow icons">Left arrow icons created by nawicon - Flaticon</a>
- <a target="_blank" href="https://icons8.com/icon/45301/up-arrow">Up Arrow</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
  <a target="_blank" href="https://icons8.com/icon/45289/down">Down</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
