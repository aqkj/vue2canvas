/**
 * webpack入口
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = (env, args) => {
  const isDev = env.development
  const config = {
    mode: isDev ? 'development' : 'production',
    devtool: !isDev ? 'source-maps' : 'eval',
    entry: {
      'vue-canvas': './src/index.ts',
      app: './web/index.ts'
    },
    output: {
      filename: isDev ? '[name].js' : '[name].[chunkhash:8].js',
      chunkFilename: '[name].[chunkhash:8].js',
      path: path.join(__dirname, './dist')
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            'ts-loader'
          ]
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 0
            }
          }]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, './public/index.html')
      })
    ],
    devServer: {
      host: '0.0.0.0',
      port: 8888,
      hot: true,
      compress: true,
      progress: true,
      open: true
    }
  }
  return config
}