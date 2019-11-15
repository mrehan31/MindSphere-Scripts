<template>
  <v-app class="no-scroll">
    <Navigation />
    <v-content class="ContentBox">
        <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navigation from "@/components/Navigation";
export default {
  components: {
    Navigation,
  },
  data: () => ({}),
  created() {
    this.$vuetify.theme.dark = true;
  },
  mounted(){}
};
</script>

<style>
::-webkit-scrollbar {
  display: none;
}
.ContentBox {
  margin: 30px
}
</style>