<template>
  <v-app>
    <v-app-bar :elevation="1">
      <v-app-bar-title>RBC test</v-app-bar-title>

      <template #append>
        <v-btn
          :icon="
            theme.global.name.value == 'dark' ? 'md:dark_mode' : 'light_mode'
          "
          :elevation="2"
          @click="toggleTheme"
        ></v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <NuxtPage />
      <p>{{ theme.global.name.value }}</p>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { useTheme } from "vuetify";

const theme = useTheme();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
</script>
