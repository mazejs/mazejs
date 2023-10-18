import DefaultLayout from './Default.vue'

const layouts: {name: String, layout: Object}[] = [
  { name: 'default', layout: DefaultLayout },
]

export default (layout: string | unknown) => {
  return layouts.find((element) => element.name === layout)?.layout
}
