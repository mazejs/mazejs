<script lang="ts">
export default {
  props: ["meta"],

  data() {
    return {
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
    }
  },

  watch: {
    meta(meta) {
      this.currentPage = meta ? meta.current_page : 1
      this.per_page = meta ? meta.per_page : 10
    },

    currentPage(value) {
      this.$emit("action", {
        event: "paginate",
        entry: value
      })
    },

    per_page(value) {
      this.$emit("action", {
        event: "per-page",
        entry: value
      })
    }
  },

  computed: {
    pages() {
      return [...Array(this.lastPage()).keys()]
        .map(index => ++index)
        .reduce((pages: any, page) => {
          if (
            page - this.offset <= this.currentPage &&
            page + this.offset >= this.currentPage
          ) {
            return [...pages, page]
          }
          return pages
        }, [])
    },

    displayMeta() {
      return this.meta
        ? `
          Showing
          ${this.meta.from || 0} to
          ${this.meta.to || 0} of
          ${this.meta.total || 0} entries
        `
        : ""
    }
  },

  methods: {
    lastPage() {
      return this.meta ? this.meta.last_page : 1
    },

    changePage(page: any) {
      if (this.meta && page <= this.meta.last_page) {
        this.currentPage = page
      }
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },

    nextPage() {
      if (this.currentPage < this.lastPage()) {
        this.currentPage++
      }
    },

    prevClass() {
      return this.setClass(this.currentPage > 1)
    },

    nextClass() {
      return this.setClass(this.currentPage !== this.lastPage())
    },

    currentClass(page: any) {
      return this.setClass(this.currentPage === page)
    },

    edgeClass(page: any) {
      return this.setClass(this.currentPage !== page)
    },

    setClass(active: any) {
      return {
        "bg-green-500 text-white hover:bg-green-400": active,
        "bg-gray-400 text-gray-500 hover:bg-gray-500 hover:text-white": !active
      }
    }
  }
}
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
            <option v-for="item in options" :value="item" :key="item">{{ item }}</option>
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
