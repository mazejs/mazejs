import template from "./template/breadcrumb.html";
import Item from "./breadcrumb/item";

const HOME = [
  { name: "home", url: "/home", title: "Home" }
];

export default {
  props: ["entries"],

  template,

  components: {
    Item
  },

  computed: {
    items() {
      return this.entries ? [...HOME, ...this.entries] : HOME;
    }
  }
};
