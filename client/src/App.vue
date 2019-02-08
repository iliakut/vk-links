<template>
  <v-app dark>
    <v-content>
      <v-btn icon large dark to="/" @click="transitionReverse = false">
        <v-icon >search</v-icon>
      </v-btn>
      <v-btn icon large dark to="/result" @click="transitionReverse = true">
        <v-icon >timeline</v-icon>
      </v-btn>
      <v-dialog width="500" v-model="dialog">
        <v-btn slot="activator" icon large dark>
          <v-icon >help</v-icon>
        </v-btn>
        <v-card color="#4c75a3" @click="dialog = false">
          <v-card-text>
            Приложение позволяет найти связи между двумя пользователями вконтакте. Для поиска связей
            требуется ввести ссылку на страницу пользователя. Поиск связий происходит по трем "рукопожатиям",
            то есть: пользователь 1 - друзья пользователя 1 - друзья друзей пользователя 1 - пользователь 2.
            В результаты попадают и связи короче, чем три "рукопожатия". В результатах отображаются все
            найденные связи между двумя пользователями.
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-container grid-list-md text-xs-center>
        <v-layout>
          <v-flex xs12>
            <v-avatar tile>
              <v-img src="./img/icons/VK.com-logo.svg"></v-img>
              <strong style="color: #4c75a3" class="title">links</strong>
            </v-avatar>
          </v-flex>
        </v-layout>
      </v-container>
      <v-scroll-x-reverse-transition mode="out-in" v-if="transitionReverse">
        <router-view />
      </v-scroll-x-reverse-transition>
      <v-scroll-x-transition mode="out-in" v-else>
        <router-view />
      </v-scroll-x-transition>
    </v-content>
    <v-footer>
      <v-spacer></v-spacer>
      <pre>github.com/iliakut </pre>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      transitionReverse: true,
      dialog: false
    };
  },
  methods: {

  }
};
</script>
