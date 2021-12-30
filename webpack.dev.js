const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = () => {
  return {
    mode: 'development',
    entry: './src/index.ts',
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        ['@']: path.resolve(__dirname, './src/'),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'DUO AI',
      })
    ],
    output: {
      filename: '[name].[contenthash:8].js',
      sourceMapFilename: '[name].[contenthash:8].map',
      assetModuleFilename: 'assets/[hash][ext][query]',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      pathinfo: false,
    },
    devtool: 'inline-source-map',
    devServer: {
      static: './dist',
    },
    module: {
      rules: [
        {
          test: /\.m?jsx?$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          include: path.resolve(__dirname, 'src/assets'),
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          include: path.resolve(__dirname, 'src/assets'),
          type: 'asset/resource',
          generator: {
            filename: 'assets/images/[hash][ext][query]'
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          include: path.resolve(__dirname, 'src/assets'),
          type: 'asset/resource',
          generator: {
            filename: 'assets/fonts/[hash][ext][query]'
          }
        }
      ]
    }
  }
}