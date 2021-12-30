const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = () => {
  return {
    mode: 'production',
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
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
        chunkFilename: "[id].[contenthash].css",
      }),
    ],
    output: {
      filename: '[name].[contenthash:8].js',
      sourceMapFilename: '[name].[contenthash:8].map',
      assetModuleFilename: 'assets/[hash][ext][query]',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      pathinfo: false,
    },
    devtool: 'source-map',
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
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
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
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [
          `...`,
          new CssMinimizerPlugin(),
        ],
      splitChunks: {
        chunks: 'all',
      },
      runtimeChunk: {
        name: entrypoint => `runtime-${entrypoint.name}`,
      },
    }
  }
}