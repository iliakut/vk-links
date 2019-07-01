<template>
  <v-container>
    <v-layout align-center column>
      <v-flex xs12 ma-2>
        <a :href="`https://vk.com/id${id1}`" target="_blank">
          <v-avatar color="grey lighten-4" size="60">
            <img
                :src="mutualData.avatars.first_user"
                alt="avatar"
            />
          </v-avatar>
        </a>
        <v-avatar v-if="mutualData.areMutual">
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
        <v-avatar v-else>
          <v-icon>clear</v-icon>
        </v-avatar>
        <a :href="`https://vk.com/id${id2}`" target="_blank">
          <v-avatar color="grey lighten-4" size="60">
            <img
                :src="mutualData.avatars.second_user"
                alt="avatar"
            />
          </v-avatar>
        </a>
      </v-flex>
      <v-flex xs12 ma-2 v-for="user in mutualData.mutualArr">
        <a :href="`https://vk.com/id${id1}`" target="_blank">
          <v-avatar color="grey lighten-4" size="60">
            <img
                :src="mutualData.avatars.first_user"
                alt="avatar"
            />
          </v-avatar>
        </a>
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
        <a :href="`https://vk.com/id${user}`" target="_blank">
          <v-avatar color="grey lighten-4" size="60">
            <img
                :src="mutualData.avatars[user]"
                alt="avatar"
            />
          </v-avatar>
        </a>
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
        <a :href="`https://vk.com/id${id2}`" target="_blank">
        <v-avatar color="grey lighten-4" size="60">
          <img
              :src="mutualData.avatars.second_user"
              alt="avatar"
          />
        </v-avatar>
        </a>
      </v-flex>
    </v-layout>
    <span v-show="!mutualData.areMutual">no links</span>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "MutualFriends",
  computed: {
    ...mapState(["mutualData", "id1", "id2"])
  }
};
</script>
