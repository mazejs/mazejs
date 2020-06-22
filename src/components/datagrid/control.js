const template = `
  <td class="flex justify-around px-3 py-2">
    <button
      class="no-underline px-1 text-green-500 focus:outline-none hover:text-green-400"
      v-for="item in listActions"
      @click.prevent="action(item.name, entry)"
    >
      {{ item.label }}
    </button>
  </td>
`;

const ACTIONS = [
  {name: "viewing", label: "View"},
  {name: "editing", label: "Edit"},
  {name: "deleting", label: "Delete"}
];

export default {
  props: {
    entry: Object,
    actions: {
      type: Array,
      default: () => []
    }
  },

  template,

  computed: {
    listActions() {
      return this.actions.length ? this.actions : ACTIONS
    }
  },

  methods: {
    action(event, entry = null) {
      this.$emit("action", {
        event: event,
        entry: entry
      });
    }
  }
};
