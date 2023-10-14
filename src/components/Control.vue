<script lang="ts">
const ACTIONS = [
  {name: "viewing", label: "View"},
  {name: "editing", label: "Edit"},
  {name: "deleting", label: "Delete"}
]

export default {
  props: {
    entry: Object,
    actions: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    listActions () {
      return this.actions.length ? this.actions : ACTIONS
    }
  },

  methods: {
    action(event, entry = {}) {
      this.$emit("action", {
        event: event,
        entry: entry
      })
    }
  }
}
</script>

<template>
  <td class="flex justify-around px-3 py-2">
    <button
      class="no-underline px-1 text-green-500 focus:outline-none hover:text-green-400"
      v-for="item in listActions"
      @click.prevent="action(item.name, entry)"
    >
      {{ item.label }}
    </button>
  </td>
</template>
