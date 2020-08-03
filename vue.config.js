// vue.config.js for less-loader@6.0.0
module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#20bf6b',
          },
          javascriptEnabled: true,
        },
      },
    },
  },
};
