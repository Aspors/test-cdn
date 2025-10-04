import { createApp } from "vue";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import App from "./App.vue";

const vuetify = createVuetify({
  theme: {
    defaultTheme: "dark",
    themes: {
      dark: {
        colors: {
          primary: "#64B5F6",
          secondary: "#FF5722",
          background: "#121212",
          surface: "#1E1E1E",
          "surface-variant": "#2C2C2C",
          "on-surface": "#FFFFFF",
          "on-background": "#FFFFFF",
        },
      },
    },
  },
});

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(vuetify);

app.mount("#app");
