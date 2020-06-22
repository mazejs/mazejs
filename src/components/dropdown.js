import template from "./template/dropdown.html";

export default {
  template,

  data() {
    return {
      buttonHasFocus: false,
      isOpen: false
    }
  },

  mounted() {
    const onEscape = (e) => {
      if (!this.isOpen || e.key !== 'Escape') {
          return ;
      }

      this.isOpen = false;
    };

    document.addEventListener('keydown', onEscape);

    this.$on('hook:destroyed', () => {
      document.removeEventListener('keydown', onEscape);
    });
  },

  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    }
  }
};
