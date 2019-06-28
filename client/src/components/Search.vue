<template>
  <v-form ref="form" v-model="valid">
    <v-container>
      <v-layout text-xs-center column>
        <v-flex xs12 offset-(xs4)>
          <v-text-field
            v-model="first_user"
            label="первый пользователь"
            placeholder="https:/vk.com/first_user"
            :rules="rules"
            required
            outline
            color="#4c75a3"
            hint="link"
            @keyup.enter="$refs.second_user.focus()"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-btn round @click="activateSearch" color="#4c75a3">
            Найти связи
          </v-btn>
          <v-btn round @click="test" color="#4c75a3">
            test
          </v-btn>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            v-model="second_user"
            ref="second_user"
            label="второй пользователь"
            placeholder="https:/vk.com/second_user"
            :rules="rules.concat([checkIfSimilarUsers()])"
            required
            outline
            color="#4c75a3"
            hint="link"
            @keyup.enter="activateSearch"
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
    first_user: "",
    second_user: "",
    valid: false,
    rules: [
      v => (v || "").indexOf(" ") < 0 || "Пробелы недопустимы",
      v => !!v || "Обязательное поле",
      v => /https:\/\/vk.com\//.test(v) || 'Не похоже на ссылку вк',
      v => /https:\/\/vk.com\/./.test(v) || 'Не хватает символов после /'
    ]
  }),

  methods: {
    test: function() {
      console.log(this.$refs.second_user.focus());
    },
    sendName: function() {
      this.changeStatus(1);
      axios
        .post("http://localhost:8081/", { id1: this.first_user_screenName, id2: this.second_user_screenName })
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
        this.sendName(); // send data to server
        this.$router.push("/result");
        this.setFirstId(this.first_user_screenName);
        this.setSecondId(this.second_user_screenName);
      }
    },
    checkIfSimilarUsers() {
      return this.first_user !== this.second_user || 'Одинаковые пользователи';
    },
    ...mapMutations(["changeStatus", "writeMutualData", "setFirstId", "setSecondId"])
  },
  computed: {
    ...mapState(["searchStatus"]),
    first_user_screenName: function () {
      let index = this.first_user.indexOf("com/");
      return this.first_user.slice(index + 4, this.first_user.length);
    },
    second_user_screenName: function () {
      let index = this.second_user.indexOf("com/");
      return this.second_user.slice(index + 4, this.second_user.length);
    }
  }
};
</script>
