import Vue from "vue";
import App from "./app";
import moment from "moment";

import "@/assets/css/app.css";

Vue.config.productionTip = false;

Vue.prototype.bus = new Vue();
Vue.prototype.moment = moment;

new Vue({
  render: h => h(App)
}).$mount("#app");
