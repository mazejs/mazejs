<script setup lang="ts">
import { computed, reactive, toRefs, watch } from 'vue'

interface ILabel {
  first: string
  previous: string
  next: string
  last: string
}

interface IPagination {
  currentPage: number
  offset: number
  per_page: number
  options: number[]
  label: ILabel
}

const props = defineProps(['meta'])
const emit = defineEmits(['action'])

const state: IPagination = reactive({
  currentPage: 1,
  offset: 2,
  per_page: 10,
  options: [5, 10, 15, 25, 50],
  label: {
    first: "First",
    previous: "Previous",
    next: "Next",
    last: "Last"
  }
})

watch(() => state.per_page, (value) => {
  emit('action', { event: 'perPage', entry: value })
}, { deep: true })

watch(() => state.currentPage, (value) => {
  emit('action', { event: 'paginate', entry: value })
}, { deep: true })

const lastPage = (): number => {
  return props.meta ? props.meta.last_page : 1
}

const changePage = (page: any): void => {
  if (props.meta && page <= props.meta.last_page) {
    state.currentPage = page
  }
}

const prevPage = (): void => {
  if (state.currentPage > 1) {
    state.currentPage--
  }
}

const nextPage = (): void => {
  if (state.currentPage < lastPage()) {
    state.currentPage++
  }
}

const prevClass = (): Object => {
  return setClass(state.currentPage > 1)
}

const nextClass = (): Object => {
  return setClass(state.currentPage !== lastPage())
}

const currentClass = (page: any): Object => {
  return setClass(state.currentPage === page)
}

const edgeClass = (page: any): Object => {
  return setClass(state.currentPage !== page)
}

const setClass = (active: boolean): Object => {
  return {
    "bg-green-500 text-white hover:bg-green-400": active,
    "bg-gray-400 text-gray-500 hover:bg-gray-500 hover:text-white": !active
  }
}

const pages = computed(() => {
  return [...Array(lastPage()).keys()]
    .map(index => ++index)
    .reduce((pages: any, page) => {
      if (
        page - state.offset <= state.currentPage &&
        page + state.offset >= state.currentPage
      ) {
        return [...pages, page]
      }
      return pages
    }, [])
})

const displayMeta = computed(() => {
  return props.meta
    ? `
      Showing
      ${props.meta.from || 0} to
      ${props.meta.to || 0} of
      ${props.meta.total || 0} entries
    `
    : ""
})

const { label, per_page, options } = toRefs(state)
</script>

<template>
  <div class="flex w-full">
    <div class="flex flex-col md:flex-row w-full items-center justify-between sm:m-0">
      <div class="flex flex-col md:flex-row w-full justify-between items-center sm:mb-0">
        <div class="relative mb-2 lg:mb-0">
          <select
            class="appearance-none rounded cursor-pointer border-2 border-gray-300 py-1 px-3 pr-8 leading-tight text-gray-700 bg-gray-100 focus:outline-none focus:bg-white focus:border-green-500"
            v-model="per_page"
          >
            <option v-for="(item, index) in options" :value="item" :key="`page-option-${index}`">{{ item }}</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>

        <div class="relative mb-2 sm:mr-2 md:mb-0">{{ displayMeta }}</div>
      </div>

      <ul class="flex border-grey-light rounded font-sans">
        <li>
          <button
            class="rounded-tl rounded-bl px-3 py-2 focus:outline-none"
            :class="edgeClass(1)"
            @click.prevent="changePage(1)"
            v-text="label.first"
          ></button>
        </li>
        <li>
          <button
            class="px-3 py-2 focus:outline-none"
            :class="prevClass()"
            @click.prevent="prevPage()"
            v-text="label.previous"
          ></button>
        </li>
        <li v-for="page in pages">
          <button
            class="hidden sm:block px-3 py-2 focus:outline-none"
            :class="currentClass(page)"
            @click.prevent="changePage(page)"
          >{{ page }}</button>
        </li>
        <li>
          <button
            class="px-3 py-2 focus:outline-none"
            :class="nextClass()"
            @click.prevent="nextPage()"
            v-text="label.next"
          ></button>
        </li>
        <li>
          <button
            class="rounded-tr rounded-br px-3 py-2 focus:outline-none"
            :class="edgeClass(lastPage())"
            @click.prevent="changePage(lastPage())"
            v-text="label.last"
          ></button>
        </li>
      </ul>
    </div>
  </div>
</template>
