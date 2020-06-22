import template from "./template/datagrid.html";
import GridControl from "./datagrid/control";
import GridField from "./datagrid/field";
import GridHeader from "./datagrid/header";
import Pagination from "./pagination";

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
      };
    }},
    controls: {type: Boolean, default: () => false},
    actions: {type: Array, default: () => []},
    meta: {type: Object, default: () => {}}
  },

  template,

  components: {
    GridControl,
    GridField,
    GridHeader,
    Pagination
  },

  methods: {
    action(data) {
      if (data instanceof Object) {
        this.$emit(data.event, data.entry);
      }
    },

    searching() {
      this.$emit("searching", this.search);
    }
  }
};
