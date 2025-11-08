// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxt/image", "@nuxt/icon", "nuxt-icon"],
  postcss: {
    plugins: {
      "autoprefixer": {},
      "cssnano": {},
    },
  },
});
