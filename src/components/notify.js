import template from "./template/notify.html";
import Notice from "./notice";

export default {
  props: ["entries"],

  template,

  components: {
    Notice
  },

  data() {
    return {
      notifications: []
    }
  },

  beforeMount() {
    if (this.entries && this.entries instanceof Array)
      this.entries.forEach(entry => this.notify(entry));

    if (this.entries && this.entries instanceof Object)
      this.notify(this.entries);
  },

  computed: {
    sortedNotification() {
      return [...this.notifications].reverse().slice(0, 4)
    }
  },

  methods: {
    notify(notification) {
      this.notifications.push(notification);
      setTimeout(() => {
        this.removeNotification(notification.id)
      }, 3000);
    },

    removeNotification(identify) {
      this.notifications = this.notifications.filter(
        notification => notification.id !== identify
      )
    }
  }
};
