export default {
  env: {
    baseURL: "https://rifdecor.com/backend/api/",
    imgBaseUrl: "https://rifdecor.com/backend/public/img/",
    imgCatBaseUrl: "https://rifdecor.com/backend/public/img_cat/",

    // baseURL: 'http://127.0.0.1:8000/api/',
    // imgBaseUrl: 'http://127.0.0.1:8000/img/',
    // imgCatBaseUrl: 'http://127.0.0.1:8000/img_cat/'
  },
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Test",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Descubre emocionantes oportunidades laborales. Conecta con empleadores confiables y encuentra el trabajo de tus sueños. Explora nuestra amplia selección de ofertas de empleo y da un impulso a tu carrera hoy mismo.",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/icon.png" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "ant-design-vue/dist/antd.css",
    "vue-slick-carousel/dist/vue-slick-carousel.css",
    "vue-slick-carousel/dist/vue-slick-carousel-theme.css",
    "@/assets/css/mycss.css",
    "@/assets/css/button.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/antd-ui",
    "@/plugins/bootstrap-vue",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
