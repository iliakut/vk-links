<template>
  <v-form ref="form" v-model="valid">
    <v-container>
     <v-layout text-xs-center column>
       <v-flex xs12  offset-(xs4)>
          <v-text-field
              v-model="first_id"
              label="первый пользователь"
              placeholder="id1"
              :rules="rules"
              required
              outline
              color="#4c75a3"
              hint="link"
          ></v-text-field>
      </v-flex>
       <v-flex xs12>
         <v-btn round @click="findLinks" color="#4c75a3">Найти связи</v-btn>
       </v-flex>
       <v-flex xs12>
          <v-text-field
              v-model="second_id"
              label="второй пользователь"
              placeholder="id2"
              :rules="rules"
              required
              outline
              color="#4c75a3"
              hint="link"
          ></v-text-field>
      </v-flex>

    </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    first_id: '',
    second_id: '',
    valid: false,
    rules: [
      v => (v || '').indexOf(' ') < 0 || 'Пробелы недопустимы',
      v => !!v || 'Обязательное поле',
      //v => /https:\/\/vk.com\//.test(v) || 'Не похоже на ссылку' // - закомментировал на время разработки
    ]
  }),
  methods: {
    sendName: function () {
      axios.post('http://localhost:8081/', {id: '17784637'})
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    validate() {
      if (this.$refs.form.validate()) {
        console.log('validated')
      }
    },
    findLinks: function() {
      this.validate();
    }
  }
};
</script>

<style></style>
