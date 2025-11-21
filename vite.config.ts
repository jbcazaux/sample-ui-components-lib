import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { fileURLToPath } from 'node:url'

import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import { extname, relative } from 'node:path'
import { createHash } from 'node:crypto'
import { globSync } from 'glob'
import preserveDirectives from 'rollup-preserve-directives'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          /*'babel-plugin-react-compiler'*/
        ],
      },
    }),
    libInjectCss(),
    dts({
      tsconfigPath: fileURLToPath(
        new URL('tsconfig.lib.json', import.meta.url),
      ),
      exclude: '**/*.stories.tsx',
    }),
    preserveDirectives(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./lib', import.meta.url)),
    },
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/scss/_variables.scss" as *;
        `,
      },
    },
    modules: {
      generateScopedName: (className, filename) => {
        const hash = createHash('sha256')
          .update(filename)
          .update(className)
          .digest('base64')
          .substring(0, 5)
          .replace(/\//g, 'X')
          .replace(/\+/g, 'z')
        return `${className}__${hash}`
      },
    },
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: fileURLToPath(new URL('lib/components/main.ts', import.meta.url)),
      formats: ['es'],
    },
    rolldownOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      input: Object.fromEntries(
        globSync('lib/**/*.{ts,tsx}', {
          ignore: ['lib/**/*types*.ts', 'lib/**/*stories*.tsx'],
        }).map((file) => [
          relative('lib', file.slice(0, file.length - extname(file).length)),
          fileURLToPath(new URL(file, import.meta.url)),
        ]),
      ),
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
})
