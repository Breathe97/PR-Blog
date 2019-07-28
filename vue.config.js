module.exports = {
  // 修改的配置
  publicPath: '/',
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://pryun.vip:3000',
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
