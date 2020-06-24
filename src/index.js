
export default {
  install(Vue, options) {
    Vue.component("breadcrumb", require("./components/breadcrumb").default);
    Vue.component("datagrid", require("./components/datagrid").default);
    Vue.component("dropdown", require("./components/dropdown").default);
    Vue.component("modal", require("./components/modal").default);
    Vue.component("notice", require("./components/notice").default);
    Vue.component("notification", require("./components/notification").default);
    Vue.component("notify", require("./components/notify").default);
    Vue.component("sidebar", require("./components/sidebar").default);
  }
};
