export default {
  theme: {
    extend: {
      backgroundColor: {
        primary: '#012e55',
        secondary: '#ffc107',
        primary1: '#0a4271',
        dark: '#001E38',
        darkHover: '#002141'
      },
      textColor: {
        primary: '#012e55',
        secondary: '#ffc107',
        primary1: '#0a4271',
        dark: '#001E38',
        darkHover: '#002141'
      },
      borderColor: {
        primary: '#012e55',
        secondary: '#ffc107',
        primary1: '#0a4271',
        dark: '#001E38',
        darkHover: '#002141'
      },
    },
  },
  plugins: [],
  content: [
    `~/components/**/*.{vue,js,ts}`,
    `~/layouts/**/*.vue`,
    `~/pages/**/*.vue`,
    `~/composables/**/*.{js,ts}`,
    `~/plugins/**/*.{js,ts}`,
    `~/utils/**/*.{js,ts}`,
    `~/App.{js,ts,vue}`,
    `~/app.{js,ts,vue}`,
    `~/Error.{js,ts,vue}`,
    `~/error.{js,ts,vue}`,
    `~/app.config.{js,ts}`,
  ],
}
