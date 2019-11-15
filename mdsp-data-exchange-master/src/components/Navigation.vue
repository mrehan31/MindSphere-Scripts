<template>
  <div>
    <v-app-bar app dense class="HeaderBar" color="primary">
      <v-btn small icon @click="drawer = !drawer" class="DrawerIcon">
        <v-icon>menu</v-icon>
      </v-btn>
      <h2 class="mx-2">Mindsphere</h2>
      <h6>powered by Electron.JS</h6>
      <v-spacer></v-spacer>
      <v-btn small icon @click="minimize()" class="Buttons">
        <v-icon small>minimize</v-icon>
      </v-btn>
      <v-btn small icon @click="maximize()" class="Buttons">
        <v-icon small>fullscreen</v-icon>
      </v-btn>
      <v-btn small icon @click="close()" class="Buttons">
        <v-icon small>close</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary class="DrawerIcon">
      <v-list flat>
        <v-list-item-group v-model="active_nav" color="warning">
          <v-list-item v-for="item in nav" :key="item.name" :to="item.route">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
const remote = require("electron").remote;

export default {
  name: "Navigation",
  data: () => ({
    drawer: null,
    w: remote.getCurrentWindow(),
    active_nav: null,
    nav: [
      {
        name: "Home",
        route: "/",
        icon: "apps"
      },
      {
        name: "Data Exchange",
        route: "/data-exchange",
        icon: "info"
      },
      {
        name: "Data Import",
        route: "/data-import",
        icon: "info"
      }
    ]
  }),
  methods: {
    close() {
      this.w.close();
    },
    minimize() {
      this.w.minimize();
    },
    maximize() {
      this.w.maximize();
    },
    call_test(){
      
    }
  }
};
</script>
<style scoped>
.HeaderBar {
  -webkit-app-region: drag;
  padding-right: 10px;
  padding-left: 10px;
}
.DrawerIcon {
  -webkit-app-region: no-drag;
}
.Buttons {
  -webkit-app-region: no-drag;
}
</style>
