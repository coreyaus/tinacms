# tinacms-gitprovider-github

## 1.0.0

### Patch Changes

- 6a8aa3640: allow tinacms to be used in a single backend function
- 80677d872: ## Changes

  - deprecate onPut, onDelete and the level args to `createDatabase`
  - adds `databaseAdapter` instead of `level`
  - adds `gitProvider` instead of onPut and onDelete.
  - creates a packages called `tinacms-gitprovider-github` that exports the `GitHubProvider` class
  - adds `gitProvider` to interface to `@tinacms/graphql`
  - adds the generated database client

  The database.ts file can now look like this.

  ```ts
  import {
    createDatabase,
    createLocalDatabase,
    GitHubProvider,
  } from '@tinacms/datalayer'
  import { MongodbLevel } from 'mongodb-level'

  const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

  export default isLocal
    ? createLocalDatabase()
    : createDatabase({
        gitProvider: new GitHubProvider({
          branch: process.env.GITHUB_BRANCH,
          owner: process.env.GITHUB_OWNER,
          repo: process.env.GITHUB_REPO,
          token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
        }),
        databaseAdapter: new MongodbLevel<string, Record<string, any>>({
          collectionName: process.env.GITHUB_BRANCH,
          dbName: 'tinacms',
          mongoUri: process.env.MONGODB_URI,
        }),
      })
  ```

  ## Migrating Database.ts

  ### OnPut and OnDelete

  We are deprecating onPut and onDelete. You can now use the `gitProvider` to do the same thing.

  We also provide a `GitHubProvider` that you can use (If you are using Github).

  Instead of defining `onPut` and `onDelete` you can now do this:

  ```ts
  // We now provide a GitHubProvider that you can use.
  const gitProvider new GitHubProvider({
    branch: process.env.GITHUB_BRANCH,
    owner: process.env.GITHUB_OWNER,
    repo: process.env.GITHUB_REPO,
    token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  })
  ```

  If you are using a different git provider you can implement the `GitProvider` interface:

  ```ts
  class CustomGitProvider implements GitProvider {
    async onPut(key: string, value: string) {
      // ...
    }
    async onDelete(key: string) {
      // ...
    }
  }
  const gitProvider = new CustomGitProvider()
  ```

  ### Renaming `level` to `databaseAdapter`

  In order to clarify the purpose of the `level` property, we are renaming it to `databaseAdapter`. In most cases you can use a provided implementation:

  ```diff
  createDatabase({
  -      level: new MongodbLevel<string, Record<string, any>>({
  -        collectionName: process.env.GITHUB_BRANCH,
  -        dbName: 'tinacms',
  -        mongoUri: process.env.MONGODB_URI,
  -      }),
  +      databaseAdapter: new MongodbLevel<string, Record<string, any>>({
  +        collectionName: process.env.GITHUB_BRANCH,
  +        dbName: 'tinacms',
  +        mongoUri: process.env.MONGODB_URI,
  +      }),
      })
  ```

  ### createLocalDatabase

  We now provide a `createLocalDatabase` function that you can use to create a local database. Previously you would have to implement this yourself and pass the correct handlers to `createDatabase`:

  ```ts
  import { createLocalDatabase } from '@tinacms/datalayer'
  createLocalDatabase(port)
  ```

  ### Putting it all together

  ```diff
  // database.{ts,js}
  // ...
  - const githubOnPut = async (key, value) => {
  -    //...
  - }
  - const githubOnDelete = async (key) => {
  -     //...
  - }
  - const localOnPut = async (key, value) => {
  -    //...
  - }
  - const localOnDelete = async (key) => {
  -    //...
  - }


  export default isLocal
    ? createLocalDatabase()
    : createDatabase({
        gitProvider: new GitHubProvider({
          branch: process.env.GITHUB_BRANCH,
          owner: process.env.GITHUB_OWNER,
          repo: process.env.GITHUB_REPO,
          token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
        }),
        databaseAdapter: new MongodbLevel<string, Record<string, any>>({
          collectionName: process.env.GITHUB_BRANCH,
          dbName: 'tinacms',
          mongoUri: process.env.MONGODB_URI,
        }),
      })
  ```

  The final database.{ts,js} file can now look like this.

  ```ts
  import {
    createDatabase,
    createLocalDatabase,
    GitHubProvider,
  } from '@tinacms/datalayer'
  import { MongodbLevel } from 'mongodb-level'

  const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

  export default isLocal
    ? createLocalDatabase()
    : createDatabase({
        gitProvider: new GitHubProvider({
          branch: process.env.GITHUB_BRANCH,
          owner: process.env.GITHUB_OWNER,
          repo: process.env.GITHUB_REPO,
          token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
        }),
        databaseAdapter: new MongodbLevel<string, Record<string, any>>({
          collectionName: process.env.GITHUB_BRANCH,
          dbName: 'tinacms',
          mongoUri: process.env.MONGODB_URI,
        }),
      })
  ```

- cb0e4b755: ## Summary

  - adds authProvider to defineConfig
  - adds AbstractAuthProvider class that can be extended to make new auth provider
  - Adds a Clerk auth provider
  - renames admin.auth to admin.authHooks
  - deprecates admin.auth

  Adds the auth provider to the Internal client and config.

  Instead of passing an object that contains the auth functions you can now use an authProvider class. This makes the DX more clear and allows us to use classes for the AuthProvide, GitProvider and Database Adapter. This also means it will be easier to publish new auth providers as packages.

  ## Previously

  ```js
  defineConfig({
    admin: {
      auth: {
        login() {},
        logout() {},
        //...
      },
    },
    //...
  })
  ```

  ## New API

  ```js
  import { customAuthProvider } from 'tinacms-CUSTOM'
  defineConfig({
    authProvider: new CustomAuthProvider(),
  })
  ```

  ## Migration

  If you are using admin.auth.onLogin or admin.auth.onLogout you can move those functions to admin.authHooks.

  If you are using other function from admin.auth you can move them into a custom auth provider.

  ## Previously

  ```js
  defineConfig({
    admin: {
      auth: {
        login() {},
        logout() {},
        //...
      },
    },
    //...
  })
  ```

  ## Update to be

  ## New API

  ```js
  import { AbstractAuthProvider } from 'tinacms'
  class CustomAuthProvider extends AbstractAuthProvider {
    login() {}
    logout() {}
    //...
  }
  defineConfig({
    authProvider: new CustomAuthProvider(),
    //...
  })
  ```

  Now everything should work as it previously did.

- Updated dependencies [6a8aa3640]
- Updated dependencies [80677d872]
- Updated dependencies [cb0e4b755]
  - @tinacms/datalayer@1.3.0
