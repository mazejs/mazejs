/* eslint-disabled */
declare module '*.vue' {
  import type { DefineComponent } from "vue/dist/vue.mjs"
  const component: DefineComponent<{}, {}, any>
  export default component
}
