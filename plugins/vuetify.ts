import 'material-design-icons-iconfont/dist/material-design-icons.css'

import "vuetify/styles";
import { createVuetify } from "vuetify";
import { aliases, md } from 'vuetify/iconsets/md'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // ... your configuration
    theme: {
      defaultTheme: "dark",
    },
    icons: {
      defaultSet: 'md',
      aliases,
      sets: {
        md,
      },
    },
  });
  app.vueApp.use(vuetify);
});
