import Vue from "vue";
import VueKonva from "vue-konva";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(VueKonva);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
