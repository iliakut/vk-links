<template>
  <v-container>
    <v-layout align-center column>
      <v-flex xs12>
        <v-alert value="true" :color="color" icon="warning" outline>
          {{ message }}
          <v-btn round small :color="color" :to="buttonRoute">
            {{ buttonText }}
          </v-btn>
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
    },
    alert: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: "Ошибка"
    },
    buttonText: {
      type: String,
      default: "Назад"
    }
  },
  computed: {
    color: function() {
      if (this.alert) return "error";
      return "warning";
    }
  }
};
</script>
