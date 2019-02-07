<template>
  <v-form>
    <v-container>
     <v-layout text-xs-center column>
       <v-flex xs12  offset-(xs4)>
          <v-text-field
              v-model="first_id"
              :counter="100"
              label="первый пользователь"
              placeholder="id1"
              :rules="[() => !!first_id || 'Это обязательное поле']"
              required
              color="#4c75a3"
              hint="id или link или screen_name"
          ></v-text-field>
      </v-flex>
       <v-flex xs12>
         <v-btn @click="sendName">send to server</v-btn>
       </v-flex>
       <v-flex xs12>
        <v-form>
          <v-text-field
              v-model="second_id"
              :counter="100"
              label="второй пользователь"
              placeholder="id2"
              :rules="[() => !!first_id || 'Это обязательное поле']"
              required
              color="#4c75a3"
              hint="id или link или screen_name"
          ></v-text-field>
        </v-form>
      </v-flex>
    </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    id: '',
    first_id: '',
    second_id: ''
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
