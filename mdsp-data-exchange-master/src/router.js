import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import DataExchange from "./views/DataExchange.vue";
import DataImport from "./views/DataImport.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/data-exchange",
      name: "DataExchange",
      component: DataExchange
    },
    {
      path: "/data-import",
      name: "DataImport",
      component: DataImport
    }
  ]
});
