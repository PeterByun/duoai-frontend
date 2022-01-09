const path = require('path')

const { DefinePlugin } = require('webpack')
const dotenv = require('dotenv')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = () => {
  return {
    mode: 'development',
    entry: './src/index.tsx',
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        '@': path.resolve(__dirname, './src/'),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: './public/index.html',
      }),
      new ESLintPlugin(),
      new DefinePlugin({
        'process.env': JSON.stringify(
          dotenv.config({ path: './.env.development' }).parsed
        ),
      }),
    ],
    output: {
      filename: 'main.js',
      sourceMapFilename: 'main.map',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      publicPath: '/',
    },
    devtool: 'inline-source-map',
    devServer: {
      compress: true,
      // Where to files which have not gone through webpack compilation.
      static: './pulbic',
      port: 9000,
      hot: true,
      historyApiFallback: true,
      proxy: {
        '/duoai': {
          target: 'http://3.36.87.226:9099/',
          pathRewrite: { '^/duoai': '' },
        },
      },
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
            filename: 'assets/images/[hash][ext][query]',
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          include: path.resolve(__dirname, 'src/assets'),
          type: 'asset/resource',
          generator: {
            filename: 'assets/fonts/[hash][ext][query]',
          },
        },
      ],
    },
  }
}
