module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://8.138.115.205:8000',
        changeOrigin: true,
        // ws: true,
        pathRewrite: { 
          '^/api': ''
        }
      }
    }
  }
}
