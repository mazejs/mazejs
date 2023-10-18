<script setup lang="ts">
import { computed } from 'vue'

const ACTIONS = [
  {name: "viewing", label: "View"},
  {name: "editing", label: "Edit"},
  {name: "deleting", label: "Delete"}
]

const props = defineProps({
  entry: Object,
  actions: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['action'])

const listActions: any = computed(() => {
  return props.actions.length ? [...ACTIONS, ...props.actions] : ACTIONS
})
</script>

<template>
  <td class="flex justify-around px-3 py-2">
    <button
      class="no-underline px-1 text-green-500 focus:outline-none hover:text-green-400"
      v-for="item in listActions"
      @click.prevent="emit('action', { event: item.name, entry: entry })"
    >
      {{ item.label }}
    </button>
  </td>
</template>
