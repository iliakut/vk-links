<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        ></v-img>
      </v-flex>
      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Vuetify
        </h1>
        <p class="subheading font-weight-regular">
          For help and collaboration with other Vuetify developers,
          <br />please join our online
          <a href="https://community.vuetifyjs.com" target="_blank"
            >Discord Community</a
          >
        </p>
        <v-text-field v-model="id"></v-text-field>
        <v-btn @click="sendName">send to server</v-btn>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    id: ''
  }),
  methods: {
    sendName: function() {
      axios.post('http://localhost:8081/',  {id: '17784637'})
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
};
</script>

<style></style>
