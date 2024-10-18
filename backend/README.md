# Task Manager App with Categories and Authentication

## Objective

Build a task management app that allows users to create tasks, assign them to categories, and track their progress. Use Node.js, MongoDB, and user authentication to manage users and their tasks.

### Project Setup from Scratch

- npm init
- npm i -D typescript ts-node nodemon @types/node
- npx tsc --init
- npm init @eslint/config@latest
- npm install --save-dev --save-exact prettier + .prettierrc fiel
- ctl + p -> add gitignoer -> node (will create a .gitignoer file)
- LICENSE
- .env & .env.sample fiel, src -> index.ts
- npm i express mongoose bcrypt jsonwebtoken, npm i -D @types/express @types/bcrypt @types/jsonwebtoken
- git commit -m Step 1: Initial Backend Project setup with Node.js, TypeScript, Express, MongoDB

### Clone the Project

- git clone `<git-clone-link>`
- npm i
- npm run dev

## References

- [TypeStrong/ts-node#2092](https://github.com/TypeStrong/ts-node/issues/2092)
- [Nodemon Not Required with Node.js --watch](https://nodejs.org/docs/v20.17.0/api/cli.html#--watch)
- [Stack Overflow: TypeScript Error - Property 'user' does not exist on type 'Request'](https://stackoverflow.com/questions/44383387/typescript-error-property-user-does-not-exist-on-type-request)
- [Stack Overflow: ExpiresIn vs MaxAge](https://stackoverflow.com/questions/56229436/expiresin-vs-maxage)
  - The `expiresIn` property in JWT (JSON Web Token) specifies when the token should expire. 
  - The `maxAge` property in cookies specifies how long the cookie should live in the browser. This defines how long the browser should store the cookie, and it's not directly related to the JWT token itself, though they can be related in terms of session duration.
- **SameSite Cookies Explained**
  - [Link 1](https://web.dev/articles/samesite-cookies-explained)
  - [Link 2](https://andrewlock.net/understanding-samesite-cookies/)
