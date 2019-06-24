<template>
  <v-container>
    <v-layout align-center column>
      <v-flex xs12 ma-2 v-if="mutualData.areMutual">
        <v-avatar color="grey lighten-4" size="60">
          <img
              :src="mutualData.avatars[id1]"
              alt="avatar"
          />
        </v-avatar>
        <v-avatar>
          <svg width="100%" height="100%">
            <line
              x1="0%"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke="#4c75a3"
              stroke-width="3"
            ></line>
          </svg>
        </v-avatar>
        <v-avatar color="grey lighten-4" size="60">
          <img
              :src="mutualData.avatars[id2]"
              alt="avatar"
          />
        </v-avatar>
      </v-flex>
      <v-flex xs12 ma-2 v-for="user in mutualData.mutualArr">
        <v-avatar color="grey lighten-4" size="60">
          <img
            :src="mutualData.avatars[id1]"
            alt="avatar"
          />
        </v-avatar>
        <v-avatar>
          <svg width="100%" height="100%">
            <line
              x1="0%"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke="#4c75a3"
              stroke-width="3"
            ></line>
          </svg>
        </v-avatar>
        <v-avatar color="grey lighten-4" size="60">
          <img
            :src="mutualData.avatars[user]"
            alt="avatar"
        />
        </v-avatar>
        <v-avatar>
          <svg width="100%" height="100%">
            <line
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
                stroke="#4c75a3"
                stroke-width="3"
            ></line>
          </svg>
        </v-avatar>
        <v-avatar color="grey lighten-4" size="60">
          <img
              :src="mutualData.avatars[id2]"
              alt="avatar"
          />
        </v-avatar>
      </v-flex>
    </v-layout>
    <span>{{ mutualData }}</span>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Results",
  computed: {
    ...mapState(["mutualData", "id1", "id2"])
  }
};
</script>
