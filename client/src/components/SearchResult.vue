<template>
  <v-container>
    <v-layout text-xs-center wrap column>
      <v-flex x12>
        <v-btn @click="change">test</v-btn>
        <span>{{ searchStatus }}</span>
      </v-flex>
      <v-flex xs12 v-if="searchStatus === 0">
        <WarningSearch></WarningSearch>
      </v-flex>
      <v-flex xs12 v-if="searchStatus === 1">
        <Loader></Loader>
      </v-flex>
      <v-flex xs12 v-if="searchStatus === 2">
        <AlertServer></AlertServer>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  import Loader from "../components/Loader"
  import WarningSearch from "../components/WarningSearch"
  import AlertServer from "../components/AlertServer"
  import { mapState, mapMutations } from "vuex"

  export default {
    name: "SearchResult",
    components: {
      Loader,
      AlertServer,
      WarningSearch
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

