const path = require('path')

const { DefinePlugin } = require('webpack')
const dotenv = require('dotenv')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const postcssNormalize = require('postcss-normalize')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = (env) => {
  let dotEnvFilePath = './.env.production'
  if (env.staging) dotEnvFilePath = './.env.staging'

  return {
    mode: 'production',
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
        template: './templates/index.html',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].[contenthash].css',
      }),
      new ESLintPlugin(),
      new DefinePlugin({
        'process.env': JSON.stringify(
          dotenv.config({ path: dotEnvFilePath }).parsed
        ),
      }),
    ],
    output: {
      filename: '[name].[contenthash:8].js',
      sourceMapFilename: '[name].[contenthash:8].map',
      assetModuleFilename: 'assets/[hash][ext][query]',
      // The dist folder.
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      pathinfo: false,
      // The base path for all urls of the bundle.
      publicPath: '/',
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
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    require('postcss-flexbugs-fixes'),
                    require('postcss-preset-env'),
                    postcssNormalize(),
                  ],
                },
              },
            },
          ],
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
          test: /\.(mp4)$/i,
          include: path.resolve(__dirname, 'src/assets'),
          type: 'asset/resource',
          generator: {
            filename: 'assets/videos/[hash][ext][query]',
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
    optimization: {
      minimize: true,
      minimizer: [`...`, new CssMinimizerPlugin()],
      splitChunks: {
        chunks: 'all',
      },
      runtimeChunk: {
        name: (entrypoint) => `runtime-${entrypoint.name}`,
      },
    },
  }
}
