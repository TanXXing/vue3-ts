const { defineConfig } = require('@vue/cli-service')

const UnpluginElementPlus = require('unplugin-element-plus/webpack')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      proxy: {
        '^/api': {
          target: 'http://152.136.185.210:5000',
          pathRewrite: {
            '^/api': ''
          },
          changeOrigin: true
        }
      }
    },
    resolve: {
      alias: {
        src: '@',
        assets: '@/assets',
        components: '@/components',
        router: '@/router',
        store: '@/store',
        global: '@/global',
        service: '@/service',
        utils: '@/utils',
        views: '@/views'
      },
      extensions: ['.js', '.json', '.vue', '.ts']
    },
    plugins: [UnpluginElementPlus()]
  }
})
