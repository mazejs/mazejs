/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/* eslint-disabled */
declare module '*.vue' {
  import type { DefineComponent } from "vue/dist/vue.mjs"
  const component: DefineComponent<{}, {}, any>
  export default component
}
