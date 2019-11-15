<template>
  <div>
    <div>
      <v-container>
        <v-layout row>
          <v-flex auto>
            <h2>Step 1 : Access Tenant Permission</h2>
            <v-card outlined>
              <v-card-title></v-card-title>
              <v-card-text>
                <v-text-field
                  label="Tenant Name"
                  placeholder="Name"
                  v-model="tenant"
                  outlined
                ></v-text-field>
                <v-text-field
                  label="Mindsphere Gate"
                  disabled
                  placeholder="eu1.mindsphere.io"
                  outlined
                ></v-text-field>
                <v-text-field
                  label="Mindsphere Username"
                  placeholder="Username"
                  v-model="username"
                  outlined
                ></v-text-field>
                <v-text-field
                  label="Mindsphere Password"
                  placeholder="Password"
                  :type="'password'"
                  v-model="password"
                  outlined
                ></v-text-field>
                <v-textarea
                  outlined
                  name="donor_cookie"
                  label="Donor Tenant Cookie"
                  v-model="JSON.stringify(myCookies)"
                ></v-textarea>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer
                ><v-btn
                  @click="getCookies_from_tenant()"
                  :loading="permission_loader"
                  >Get Permissions</v-btn
                >
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
            <h2>Step 2 : Aspect to Import</h2>
            <v-card outlined>
              <v-card-title></v-card-title>
              <v-card-text>
                <p>
                  Please paste the Aspect you would like to import in the text
                  area.
                </p>
                <v-textarea
                  outlined
                  name="donor_cookie"
                  label="Donor Tenant Cookie"
                  v-model="aspect_string"
                ></v-textarea>
              </v-card-text>
              <v-card-actions
                ><v-spacer></v-spacer
                ><v-btn
                  :disabled="!valid_input"
                  @click="import_aspect_to_tenant()"
                  >Create Aspect</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import {
  getCookies,
  ValidateJSON,
  Create_Cookie,
  Import_Aspect
} from "../lib/Browser";
export default {
  name: "DataImport",
  components: {},
  data: () => ({
    myCookies: {},
    myToken: "{}",
    tenant: "",
    username: "",
    password: "",
    aspect_string: "",
    instance_id: 0,
    permission_loader: false
  }),
  computed: {
    valid_input: function() {
      return ValidateJSON(this.aspect_string);
    }
  },

  methods: {
    getCookies_from_tenant() {
      this.permission_loader = true;
      getCookies(this.tenant, this.username, this.password).then(response => {
        this.instance_id = response.instance_id;
        Create_Cookie(response.myCookies, this.tenant).then(response => {
          this.myCookies = response.cookie_string;
          this.myToken = response.token_string;
          this.permission_loader = false;
        });
      });
    },
    import_aspect_to_tenant() {
      Import_Aspect(
        this.myCookies,
        this.myToken,
        JSON.parse(this.aspect_string),
        this.tenant
      );
    }
  }
};
</script>
