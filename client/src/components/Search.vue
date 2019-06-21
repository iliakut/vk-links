<template>
  <v-form ref="form" v-model="valid">
    <v-container>
      <v-layout text-xs-center column>
        <v-flex xs12 offset-(xs4)>
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
          <v-btn round @click="activateSearch" color="#4c75a3">
            Найти связи
          </v-btn>
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
import axios from "axios";
import { mapState, mapMutations } from "vuex";

export default {
  name: "Search",
  data: () => ({
    first_id: "17784637",
    second_id: "15278385",
    valid: false,
    rules: [
      v => (v || "").indexOf(" ") < 0 || "Пробелы недопустимы",
      v => !!v || "Обязательное поле"
      //v => /https:\/\/vk.com\//.test(v) || 'Не похоже на ссылку' // - закомментировал на время разработки
    ]
  }),

  methods: {
    sendName: function() {
      this.changeStatus(1);
      axios
        .post("http://localhost:8081/", { id1: this.first_id, id2: this.second_id })
        .then(response => {
          console.log(response);
          this.writeMutualData(response.data);
          this.changeStatus(3);
        })
        .catch(error => {
          console.log(error);
          this.changeStatus(2);
        });
    },
    validate() {
      return !!this.$refs.form.validate();
    },
    activateSearch: function() {
      if (this.validate()) {
        // if valid
        this.sendName(); // send data to server - закомментировал на время разработки
        this.receivingFromServer;
        this.$router.push("/result");
      }
    },
    ...mapMutations(["changeStatus", "writeMutualData"])
  },
  computed: {
    ...mapState(["searchStatus"])
  }
};
</script>
