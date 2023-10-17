<script setup lang="ts">
import GridControl from "./Control.vue"
import GridField from "./Field.vue"
import GridHeader from "./Header.vue"
import Pagination from "./Pagination.vue"

defineProps({
  tableName: {type: String, default: 'Table name'},
  entries: { type: Object, default: [] },
  columns: { type: Object, default: [] },
  order: { type: Object, default: [] },
  controls: {},
  actions: { type: Array, default: [] },
  meta: { type: Object, default: [] },
})

const emit = defineEmits(['action'])

const action = (data: any): void => {
  if (data instanceof Object) {
    emit('action', { event: data.event, entry: data.entry })
  }
}

</script>

<template>
  <div class="flex flex-col w-full">
    <div class="shadow rounded-lg bg-white">
      <header class="flex flex-row items-center justify-between rounded-t-lg shadow-x bg-green-500 text-white px-3 py-2">
        {{ tableName }}
      </header>

      <div class="block overflow-auto">
        <table class="table-auto w-full whitespace-no-wrap">
          <thead>
            <tr class="flex justify-between border-b shadow-x">
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
