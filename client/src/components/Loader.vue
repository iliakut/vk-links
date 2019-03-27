<template>
  <v-container>
    <v-layout align-center justify-center column>
      <v-flex xs12>
        <v-progress-circular
          :size="100"
          :width="7"
          color="#4c75a3"
          indeterminate
        ></v-progress-circular>
      </v-flex>
      <v-flex xs12>
        <strong style="color: #4c75a3">Идет поиск</strong>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Loader"
};
</script>
