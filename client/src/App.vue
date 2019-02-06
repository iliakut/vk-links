<template>
  <v-app dark>
    <v-content>
      <v-btn fab dark small></v-btn>
      <v-btn fab dark small></v-btn>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      //
    };
  }
};
</script>
