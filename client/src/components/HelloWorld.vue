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
              color="#4c75a3"
              hint="link"
          ></v-text-field>
      </v-flex>
       <v-flex xs12>
         <v-btn round @click="findLinks">Найти связи</v-btn>
       </v-flex>
       <v-flex xs12>
          <v-text-field
              v-model="second_id"
              label="второй пользователь"
              placeholder="id2"
              :rules="rules"
              required
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
    id: '',
    first_id: '',
    second_id: '',
    valid: false,
    rules: [
      v => (v || '').indexOf(' ') < 0 || 'Пробелы недопустимы',
      v => !!v || 'Обязательное поле'
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
  },
  computed: {
    rules123 () {
      const rules = [];

      const rule1 = v => (v || '').indexOf(' ') < 0 || 'Пробелы недопустимы';
      rules.push(rule1);
      const rule2 = v => !!v || 'Обязательное поле';
      rules.push(rule2);

      //      v => /.+@.+/.test(v) || 'E-mail must be valid'
      return rules
    }
}
};
</script>

<style></style>
