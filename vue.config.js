const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 9090,
    host: '0.0.0.0',
    historyApiFallback: true,
    allowedHosts: 'all'
  }
})
