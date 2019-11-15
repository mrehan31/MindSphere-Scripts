<template>
  <div>
    <div>
      <h1>UNDER CONSTRUCTION! DOES NOT WORK!</h1>
      <v-container>
        <v-layout row>
          <v-flex auto>
            <h2>Step 1 : Donor Tenant</h2>
            <v-card outlined>
              <v-card-title></v-card-title>
              <v-card-text>
                <v-text-field
                  label="Tenant Name"
                  placeholder="Name"
                  outlined
                ></v-text-field>
                <v-text-field
                  label="Mindsphere Gate"
                  disabled
                  placeholder="eu1.mindsphere.io"
                  outlined
                ></v-text-field>
                <v-textarea
                  outlined
                  name="donor_cookie"
                  label="Donor Tenant Cookie"
                  value="{}"
                  disabled
                ></v-textarea>
              </v-card-text>
              <v-card-actions
                ><v-btn disabled>Next Step!</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <div>
      <v-container>
        <v-layout row>
          <v-flex auto>
            <h2>Step 2 : Receiver Tenant</h2>
            <v-card outlined>
              <v-card-title></v-card-title>
              <v-card-text>
                <v-text-field
                  label="Tenant Name"
                  placeholder="Name"
                  outlined
                ></v-text-field>
                <v-text-field
                  label="Mindsphere Gate"
                  disabled
                  placeholder="eu1.mindsphere.io"
                  outlined
                ></v-text-field>
                <v-textarea
                  outlined
                  name="donor_cookie"
                  label="Donor Tenant Cookie"
                  value="{}"
                  disabled
                ></v-textarea>
              </v-card-text>
              <v-card-actions
                ><v-btn disabled>Next Step!</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <div>
      <v-container>
        <v-layout row>
          <v-flex auto>
            <h2>Step 3 : Aspect to Import</h2>
            <v-card outlined>
              <v-card-title></v-card-title>
              <v-card-text>
                <p>
                  Please paste the Asset you would like to import in the text
                  area.
                </p>
                <v-textarea
                  outlined
                  name="donor_cookie"
                  label="Donor Tenant Cookie"
                  value="{}"
                ></v-textarea>
              </v-card-text>
              <v-card-actions
                ><v-btn disabled>Next Step!</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "DataExchange",
  components: {},
  data: () => ({}),
  methods: {}
};
</script>
