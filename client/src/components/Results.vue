<template>
  <v-container>
    <v-layout align-center column>
      <v-flex xs8>
        <v-avatar color="grey lighten-4">
          <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar">
        </v-avatar>
        <svg width="100%" height="10%"><line x1="0px" y1="50px" x2="15px" y2="50px" stroke="red" stroke-width="9"></line></svg>
        <v-avatar color="grey lighten-4">
          <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar">
        </v-avatar>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "Results"
  }
</script>

<style scoped>
  svg {
    width: 48px;
    height: 20px;
  }
</style>
