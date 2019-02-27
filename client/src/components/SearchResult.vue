<template>
  <v-container>
    <v-layout text-xs-center wrap column>
      <v-flex x12>
        <v-btn @click="change">test</v-btn>
        <span>{{ searchStatus }}</span>
      </v-flex>
      <v-flex xs12 v-if="searchStatus === 0">
        <AlertWarningWindow message="Необходимо заполнить поля и начать поиск"
                            buttonText="На главную">
        </AlertWarningWindow>
      </v-flex>
      <v-flex xs12 v-if="searchStatus === 1">
        <Loader></Loader>
      </v-flex>
      <v-flex xs12 v-if="searchStatus === 2">
        <AlertWarningWindow :alert="true"
                            message="Ошибка при получении данных с сервера"
                            buttonText="Попробовать снова">
        </AlertWarningWindow>
      </v-flex>
      <v-flex xs12 v-if="searchStatus === 3">
        <Results></Results>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Loader from "../components/Loader"
  import AlertWarningWindow from "./AlertWarningWindow"
  import Results from "./Results"
  import { mapState, mapMutations } from "vuex"

  export default {
    name: "SearchResult",
    components: {
      Loader,
      AlertWarningWindow,
      Results
    },
    data: () => ({
      test: 0
    }),
    computed: {
      ...mapState(["searchStatus"])
    },
    methods: {
      change: function() {
        this.test++;
        if (this.test === 4) {
          this.test = 0;
        }
        this.changeStatus(this.test);
      },
      ...mapMutations(["changeStatus"])
    }
  }
</script>
