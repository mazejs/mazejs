import template from "./template/modal.html";

export default {
  props: {
    name: {
      type: String,
      default: "modal"
    },
    title: {
      type: String,
      default: "Simple Modal"
    },
    size: {
      type: String,
      default: "medium"
    },
    isOpened: {
      type: Boolean,
      default: false
    }
  },

  template,

  data() {
    return {
      buttonHasFocus: this.isOpened || false,
      isOpen: this.isOpened || false
    }
  },

  created() {
      this.bus.$on("modal-toggled", (data) => {
        if (data === this.name) {
          this.toggle();
        }
      });
  },

  mounted() {
    const onEscape = (e) => {
      if (!this.isOpen || e.key !== "Escape") {
        return ;
      }

      this.isOpen = false;
    };

    document.addEventListener("keydown", onEscape);

    this.$on("hook:destroyed", () => {
      document.removeEventListener("keydown", onEscape);
    });
  },

  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },

    toggled(data) {
      this.bus.$emit("modal-toggled", data);
    }
  }
}
