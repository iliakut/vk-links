<template>
  <v-container >
    <v-layout text-xs-center wrap>
      <v-flex x12>
        <v-btn @click="change">test</v-btn>
        <span>{{ searchStatus }}</span>
      </v-flex>
      <v-flex xs12 v-if="searchStatus === 1">
        <Loader></Loader>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Loader from "../components/Loader"
  import { mapState, mapMutations } from "vuex"

  export default {
    name: "SearchResult",
    components: {
      Loader
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

