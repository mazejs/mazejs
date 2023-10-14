<script lang="ts">
export default {
  props: ["columns", "order", "item"],

  methods: {
    orderBy(column: any) {
      this.$emit("action", {
        event: "order-by",
        entry: {
          column: column,
          sort: this.order.sort === "asc" ? "desc" : "asc"
        }
      })
    },

    rotate(item: any) {
      return (
        this.order &&
        this.order.sort === "asc" &&
        this.order.column === item.name
      )
    }
  }
}
</script>

<template>
  <th>
    <div
      class="block flex items-center justify-between cursor-pointer px-3 py-2" 
      v-if="order && item.sortable"
      @click.prevent="orderBy(item.name)"
    >
      <span>{{ item.label }}</span>
      <span
        v-show="order && order.column === item.name"
        class="flex items-center pl-3"
      >
        <svg class="fill-current h-4 w-4"
          :class="{'transform rotate-180': rotate(item)}"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </span>
    </div>

    <div class="block" v-else>{{ item.label }}</div>
  </th>
</template>
