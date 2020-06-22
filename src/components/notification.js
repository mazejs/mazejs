import template from "./template/notification.html";

export default {
  props: {
    name: {
      type: String,
      default: "notification"
    }
  },

  template,

  data() {
    return {
      isOpen: false,
    }
  },

  created() {
    this.bus.$on("notification-toggled", (data) => {
      if (data === this.name) this.toggle();
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
      this.bus.$emit("notification-toggled", data);
    }
  }
};
