// Build webpack config with as .ts file
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import { Configuration } from 'webpack';

// Rename __dirname to root path of project
__dirname = path.resolve(__dirname + '/../');

const config: Configuration = {
  context: path.resolve(__dirname, 'src'),
  entry: './index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    clean: true
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/i,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript']
          }
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false
            }
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader', // Run post css actions
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: ['autoprefixer']
              }
            }
          },
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
            options: {
              sourceMap: true,
              implementation: require.resolve('dart-sass'),
              sassOptions: {
                includePaths: [path.resolve(__dirname, './node_modules')]
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'favicon'),
          to: path.resolve(__dirname, 'public', 'favicon')
        }
      ]
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
};

export default config;
