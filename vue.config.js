module.exports = {
    publicPath: '/vue-form-test/',
    css: {
      loaderOptions: {
        sass: {
          additionalData: `@import "@/styles/_variables.scss";`
        }
      }
    }
  }