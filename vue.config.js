// 引入node内置的路径模块，用于拼接绝对路径
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

// 导出Vue CLI的配置对象，Vue CLI会自动读取这个配置
module.exports = {
  // configureWebpack配置对象会被合并到webpack
  configureWebpack: {
    // 配置Webpack缓存（隔离多版本）
    cache: {
      type: 'filesystem', // 使用文件系统缓存（替代内存缓存）
      // 缓存目录指向你指定的路径，把[项目名]改成实际项目名（比如vue3-course-demo）
      acheDirectory: path.resolve(
        'F:/custom_cache/vue_cli_4.5.13_cache/vue3_ts_cms_18'
      )
    },
    // @对应src
    resolve: {
      alias: {
        components: '@/components'
      }
    }
  },

  // 配置webpack
  chainWebpack: (config) => {
    // 让babel-loader处理node_modules中的element-plus文件
    config.module
      .rule('js')
      .include.add(/node_modules\/element-plus/)
      .end()
      .use('babel-loader')
      .loader('babel-loader')
      .tap((options) => {
        return options
      })
  },

  // ========== 可选：适配Vue CLI 4.5.13的基础配置（避免冲突） ==========
  // 开发服务器配置，避开全局5.0.8版本的8080端口
  devServer: {
    // port: 8082, // 自定义端口，防止和其他Vue项目冲突
    open: true, // 启动项目后自动打开浏览器
    // host: '0.0.0.0' // 允许局域网访问
    proxy: {
      '^/api': {
        // target: 'http://152.136.185.210:5000',
        target: 'http://127.0.0.1:9000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    },
    historyApiFallback: true
  },

  // 生产环境是否生成sourceMap（关闭可减小打包体积）
  productionSourceMap: false,
  // 打包输出目录（默认dist，可自定义）
  outputDir: 'dist',
  // 静态资源存放目录（默认static）
  assetsDir: 'static'
  // publicPath: './'
}
