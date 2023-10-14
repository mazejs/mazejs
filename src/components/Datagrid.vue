<script lang="ts">
import GridControl from "./Control.vue"
import GridField from "./Field.vue"
import GridHeader from "./Header.vue"
import Pagination from "./Pagination.vue"

export default {
  props: {
    entries: {type: Array, default: () => []},
    columns: {type: Array, default: () => []},
    order: {type: Object, default: () => {}},
    search: {type: Object, default: () => {
      return {
        value: "",
        type: "",
        types: []
      }
    }},
    controls: {type: Boolean, default: () => false},
    actions: {type: Array, default: () => []},
    meta: {type: Object, default: () => {}}
  },

  components: {
    GridControl,
    GridField,
    GridHeader,
    Pagination
  },

  methods: {
    action(data: any) {
      if (data instanceof Object) {
        this.$emit(data.event, data.entry)
      }
    },

    searching() {
      this.$emit("searching", this.search)
    }
  }
}
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="shadow rounded-lg bg-white">
      <header class="flex flex-row md:flex-row-reverse items-center justify-between rounded-t-lg shadow-x bg-green-500 text-white px-3 py-2">
        <form class="flex">
          <div class="relative mr-2" v-if="search.types.length">
            <select
              class="appearance-none rounded cursor-pointer border border-gray-300 py-1 px-3 pr-8 leading-tight text-gray-700 bg-gray-100 focus:outline-none focus:bg-white focus:border-gray-600"
              v-model="search.type"
            >
              <option v-for="item in search.types" :value="item.name" :key="item.name">{{ item.label }}</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
          <div class="">
            <input
              type="text"
              class="shadow appearance-none leading-tight border border-gray-300 rounded bg-gray-100 text-gray-700 px-3 py-1 focus:outline-none focus:bg-white focus:border-gray-600"
              placeholder="Search"
              v-model="search.value"
            />
            <button
              class="no-underline px-1 text-white focus:outline-none hover:text-black"
              @click.prevent="searching()"
            >Search</button>
          </div>
        </form>
      </header>

      <div class="block overflow-auto">
        <table class="table-auto w-full whitespace-no-wrap">
          <thead>
            <tr class="table-row border-b shadow-x">
              <grid-header
                :key="item.label"
                :item="item"
                :order="order"
                v-for="item in columns"
                @action="action"
              ></grid-header>

              <th class="px-3 py-2" v-if="controls">Control</th>
            </tr>

            <tr class="flex justify-between bg-green-500 text-white" v-if="! columns.length">
                <th class="px-3 py-2">Datagrid</th>
            </tr>
          </thead>

          <tbody>
            <tr class="flex justify-between border-b shadow-x hover:bg-gray-200" v-for="entry in entries" :key="entry.id">
              <grid-field
                :key="column.id"
                :entry="entry"
                :column="column"
                v-for="column in columns"
              ></grid-field>

              <grid-control
                v-if="controls"
                :entry="entry"
                :actions="actions"
                @action="action"
              ></grid-control>
            </tr>

            <tr class="flex justify-between border-b text-center shadow-x hover:bg-gray-200" v-if="! entries.length">
              <td class="px-3 py-2" :colspan="columns.length + (controls && columns.length ? 1 : 2)">No records found.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <footer class="flex flex-row items-center justify-between rounded-b-lg shadow-x">
        <pagination
          class="px-3 py-2"
          :meta="meta"
          @action="action"
        ></pagination>
      </footer>
    </div>
  </div>
</template>
