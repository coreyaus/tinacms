# tinacms-authjs

## 1.0.0

### Major Changes

- 8b4044a4f: Initial release

### Patch Changes

- 6a8aa3640: allow tinacms to be used in a single backend function
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

- Updated dependencies [131b4dc55]
- Updated dependencies [6a8aa3640]
- Updated dependencies [93bfc804a]
- Updated dependencies [1fc2c4a99]
- Updated dependencies [cb0e4b755]
- Updated dependencies [a937aabf0]
- Updated dependencies [630ab9436]
  - tinacms@1.5.23
  - @tinacms/schema-tools@1.4.14
