import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import commonjs from 'vite-plugin-commonjs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // plugins: [react(), commonjs()],
  // resolve: {
  //   alias: {
  //     fs: "fs",
  //     // promisify: "util.promisify"
  //   },
  // },
  // optimizeDeps: {
  //   exclude: ['better-sqlite3'],
  // },
  // define: {
  //   'process.env': process.env,
  // }
  base: process.env.GITHUB_PAGES
  ? 'chiku-game/' // レポジトリ名を設定
  : './'
})
