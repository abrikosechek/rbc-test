import "material-design-icons-iconfont/dist/material-design-icons.css";
import DateFnsAdapter from "@date-io/date-fns";
import enUS from "date-fns/locale/en-US";
import svSE from "date-fns/locale/sv";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { aliases, md } from "vuetify/iconsets/md";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // ... your configuration
    theme: {
      defaultTheme: "dark",
    },
    icons: {
      defaultSet: "md",
      aliases,
      sets: {
        md,
      },
    },
    date: {
      adapter: DateFnsAdapter,
      locale: {
        en: enUS,
        sv: svSE,
      },
    },
  });
  app.vueApp.use(vuetify);
});
