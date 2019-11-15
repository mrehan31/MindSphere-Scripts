import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi"
  },
  theme: {
    themes: {
      dark: {
        primary: "#009999",
        secondary: "#4D0099",
        accent: "#990000",
        error: "#990000",
        warning: "#ffc107",
        info: "#004c99",
        success: "#4caf50"
      }
    }
  }
});
