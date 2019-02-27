<template>
  <v-container>
    <v-layout align-center column>
      <v-flex xs12>
        <v-alert
            value="true"
            color="error"
            icon="warning"
            outline>
          Ошибка при получении данных с сервера
          <v-btn round small color="error" :to="buttonRoute">Попробовать снова</v-btn>
        </v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "AlertServer",
    props: {
      buttonRoute: {
        type: String,
        default: "/"
      }
    }
  }
</script>

