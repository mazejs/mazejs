
export default {
  props: {
    name: {
      type: String,
      default: "sidebar"
    }
  },

  data() {
    return {
      isOpen: ! this.isMobile() || false
    }
  },

  created() {
    this.bus.$on("toggled", (data) => {
      if (data === this.name) {
        this.toggle();
      }
    });

    window.addEventListener("resize", () => {
      this.isMobile() ? this.isOpen = false : this.isOpen = true;
    });
  },

  methods: {
    toggle() {
      this.isOpen = ! this.isOpen;
    },

    toggled(data) {
      this.bus.$emit("toggled", data);
    },

    isMobile() {
      return window.innerWidth < 1024;
    }
  }
};
