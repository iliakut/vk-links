<template>
  <v-container>
    <v-layout text-xs-center wrap column>
      <v-flex xs12 v-if="searchStatus === 0">
        <AlertWarningWindow
          message="Необходимо заполнить поля и начать поиск"
          buttonText="На главную"
        />
      </v-flex>
      <v-flex xs12 v-if="searchStatus === 1">
        <Loader></Loader>
      </v-flex>
      <v-flex xs12 v-if="searchStatus === 2">
        <AlertWarningWindow
          :alert="true"
          message="Ошибка при получении данных с сервера"
          buttonText="Попробовать снова"
        />
      </v-flex>
      <v-flex xs12 v-if="searchStatus === 3">
        <Results></Results>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Loader from "../components/Loader";
import AlertWarningWindow from "./AlertWarningWindow";
import Results from "./MutualFriends";
import { mapState, mapMutations } from "vuex";
export default {
  name: "SearchResult",
  components: {
    Loader,
    AlertWarningWindow,
    Results
  },
  data: () => ({}),
  computed: {
    ...mapState(["searchStatus"])
  },
  methods: {
    ...mapMutations(["changeStatus"])
  }
};
</script>
