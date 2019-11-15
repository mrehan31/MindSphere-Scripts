<template>
  <div>
    <h2>Welcome to the MDSP Data Exchange Tool!</h2>
    <v-container>
      <v-layout row>
        <v-flex auto class="ma-2">
          <v-card outlined color="teal">
            <v-card-title>Exchange Data Between 2 Tenants</v-card-title>
            <v-card-text> </v-card-text>
            <v-card-actions>
              <v-btn to="/data-exchange" disabled>Go to Data Exchanger</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex auto class="ma-2">
          <v-card outlined color="pink">
            <v-card-title>Manualy Import an Asset into a Tenant</v-card-title>
            <v-card-text> </v-card-text>
            <v-card-actions>
              <v-btn to="/data-import">Go to Data Importer</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data: () => ({}),
  methods: {}
};
</script>
