/**
Copyright 2021 Forestry.io Holdings, Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import react from '@vitejs/plugin-react'
import fs from 'fs-extra'
import { build, createServer, InlineConfig } from 'vite'
import type { ViteDevServer } from 'vite'
import path from 'path'
import { viteTina } from './tailwind'
import { build as esbuild } from 'esbuild'
import type { Loader } from 'esbuild'

let server: ViteDevServer

export const viteBuild = async ({
  rootPath,
  outputFolder,
  publicFolder,
  local,
  apiUrl,
}: {
  local: boolean
  rootPath: string
  publicFolder: string
  outputFolder: string
  apiUrl: string
}) => {
  console.log('vite build 1', new Date().toString())
  const prebuildPath = path.resolve(__dirname, 'assets')
  const pathToConfig = path.join(rootPath, '.tina', 'config')
  const packageJSONFilePath = path.join(rootPath, 'package.json')
  const outDir = path.join(rootPath, publicFolder, outputFolder)
  await fs.emptyDir(outDir)
  console.log('vite build 2', new Date().toString())

  await fs.ensureDir(outDir)
  console.log('vite build 3', new Date().toString())

  await fs.writeFile(
    path.join(rootPath, publicFolder, outputFolder, '.gitignore'),
    `index.html
assets/
vite.svg`
  )
  console.log('vite build 4', new Date().toString())

  /**
   * This pre-build logic is the same as what we do in packages/@tinacms/cli/src/cmds/compile/index.ts.
   * The logic should be merged, possibly from moving `viteBuild` to a higher-level but for now it's easiest
   * to keep them separate since they run at different times. the compilation step also cleans up after itself
   * so we can't use it as an artifact for this.
   */
  const packageJSON = JSON.parse(
    fs.readFileSync(packageJSONFilePath).toString() || '{}'
  )
  console.log('vite build 5', new Date().toString())

  const define = {}
  const deps = packageJSON?.dependencies || []
  const peerDeps = packageJSON?.peerDependencies || []
  const devDeps = packageJSON?.devDependencies || []
  const external = Object.keys({ ...deps, ...peerDeps, ...devDeps })
  const out = path.join(rootPath, '.tina', '__generated__', 'out.jsx')
  console.log('vite build 6', new Date().toString())

  await esbuild({
    bundle: true,
    platform: 'browser',
    target: ['es2020'],
    entryPoints: [pathToConfig],
    format: 'esm',
    treeShaking: true,
    outfile: out,
    external: [...external, './node_modules/*'],
    loader: loaders,
    define: define,
  })
  console.log('vite build 7', new Date().toString())

  const base = `/${outputFolder}/`

  /**
   * HEADS UP
   *
   * This is an experimental feature to make development within the monorepo faster.
   *
   * We can avoid the prebuild by just treating the appFiles directory
   * as root but this will fail to find user-supplied modules in the config file.
   *
   * This is opt-in and new features should always be tested with this flag off
   */
  const MONOREPO_DEV = process.env.MONOREPO_DEV

  const root = MONOREPO_DEV ? path.join(__dirname, '../appFiles') : outDir
  const config: InlineConfig = {
    root,
    base,
    // For some reason this is breaking the React runtime in the end user's application.
    // Not sure what's going on but `development` works for now.
    mode: local ? 'development' : 'production',
    plugins: [react(), viteTina()],
    define: {
      // Not sure this is needed anymore, but does seem like
      // somewhere `process.env.NODE_ENV` is getting populated
      // Maybe some context? https://github.com/vitejs/vite/pull/8090#issuecomment-1184929037
      'process.env': {},
      __API_URL__: `"${apiUrl}"`,
    },
    server: {
      strictPort: true,
      port: 5173,
      fs: {
        // allow isn't working yet, so be lax with it (maybe just do this for dev mode)
        strict: false,
        // /**
        //  * From the monorepo Vite is importing from a node_modules folder relative to itself, which
        //  * works as expected. But when published and used from a yarn setup, the node_modules
        //  * are flattened, meaning we need to access the global node_modules folder instead of
        //  * our own. I believe this is fine, but something to keep an eye on.
        //  */
        // allow: ['..'],
      },
    },
    resolve: {
      alias: {
        TINA_IMPORT: out,
      },
    },
    build: {
      sourcemap: true,
      outDir,
      emptyOutDir: false,
    },
    logLevel: 'silent',
  }
  console.log('vite build 8', new Date().toString())

  if (local) {
    console.log('vite build local', new Date().toString())

    // Copy the dev index which has instructions for talking to the vite dev asset server
    const indexDev = await fs
      .readFileSync(path.join(__dirname, 'index.dev.html'))
      .toString()
    console.log('vite build local 9', new Date().toString())

    if (MONOREPO_DEV) {
      console.warn('MONOREPO_DEV mode, vite root is @tinacms/app')
      await fs.outputFileSync(
        path.join(outDir, 'index.html'),
        indexDev
          .replace(`INSERT_OUTPUT_FOLDER_NAME`, outputFolder)
          .replace('assets/out.es.js', 'src/main.tsx')
      )
      console.log('vite build local 10', new Date().toString())
    } else {
      console.log('vite build !local', new Date().toString())

      await fs.outputFileSync(
        path.join(outDir, 'index.html'),
        indexDev.replace(`INSERT_OUTPUT_FOLDER_NAME`, outputFolder)
      )
      console.log('vite build !local 9', new Date().toString())

      // Copy the pre-built assets into the user's public output folder
      // This will be used as the entry point by the vite dev server
      await fs.copySync(prebuildPath, path.join(outDir, 'assets'))
      console.log('vite build !local 10', new Date().toString())
    }

    // This build is called every time the user makes a change to their config,
    // so ensure we don't run into an existing server error
    if (server) {
      console.log('vite build !local 11', new Date().toString())

      await server.close()
      console.log('vite build !local 12', new Date().toString())
    }
    console.log('vite build !local 13', new Date().toString())

    server = await createServer(config)
    console.log('vite build !local 14', new Date().toString())

    await server.listen()
    console.log('vite build !local 15', new Date().toString())

    await server.printUrls()
    console.log('vite build !local 16', new Date().toString())
  } else {
    /**
     * This is kind of awkward, we're putting files in the specified
     * output folder because we want to run the vite build
     * from the context of the user's site, so dependencies are
     * discovered properly. So this drops in the scaffolding
     * and then builds over it
     */
    console.log('vite build 17', new Date().toString())

    await fs.copyFileSync(
      path.join(__dirname, 'index.html'),
      path.join(outDir, 'index.html')
    )
    console.log('vite build 18', new Date().toString())

    // Copy the pre-built assets into the user's public output folder
    // This will be used as the entry point by the vite dev server
    await fs.copySync(prebuildPath, path.join(outDir, 'assets'))
    console.log('vite build 19', new Date().toString())

    await build(config)
    console.log('vite build 20', new Date().toString())

    await fs.rmSync(out)
    console.log('vite build 21', new Date().toString())
  }
}

const loaders: { [ext: string]: Loader } = {
  '.aac': 'file',
  '.css': 'file',
  '.eot': 'file',
  '.flac': 'file',
  '.gif': 'file',
  '.jpeg': 'file',
  '.jpg': 'file',
  '.json': 'json',
  '.mp3': 'file',
  '.mp4': 'file',
  '.ogg': 'file',
  '.otf': 'file',
  '.png': 'file',
  '.svg': 'file',
  '.ttf': 'file',
  '.wav': 'file',
  '.webm': 'file',
  '.webp': 'file',
  '.woff': 'file',
  '.woff2': 'file',
  '.js': 'jsx',
  '.jsx': 'jsx',
  '.tsx': 'tsx',
}
