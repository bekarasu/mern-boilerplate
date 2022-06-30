const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

var dotenv = require('dotenv').config();

if (dotenv.parsed == null) {
  console.log('\n\x1b[37m\x1b[41m%s\x1b[0m', 'Set .env file first', '\n');
  throw new Error();
}

const webpackEnv = dotenv.parsed.NODE_ENV === 'production' ? 'production' : 'development';

const serverConfig = () => {
  return {
    mode: webpackEnv,
    entry: './src/server/index.ts',
    watch: dotenv.parsed.NODE_ENV === 'local' || dotenv.parsed.NODE_ENV === 'development',
    devtool: 'inline-source-map',
    target: 'node',
    node: {
      __filename: false,
      __dirname: false,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            configFile: 'tsconfig.server.json',
          },
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    externals: [nodeExternals()],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'server.js',
    },
  };
};

const clientConfig = () => {
  return {
    mode: webpackEnv,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            configFile: 'tsconfig.client.json',
          },
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.API_URL': JSON.stringify(dotenv.parsed.API_URL), // we use this in react app
      }),
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.css', '.scss'],
    },
  };
};

const appConfig = () => {
  return merge(clientConfig(), {
    entry: './src/client/app/index.tsx',
    output: {
      filename: 'app.js',
      path: path.resolve(__dirname, 'dist/public'),
    },
  });
};

const adminConfig = () => {
  return merge(clientConfig(), {
    entry: './src/client/admin/index.tsx',
    performance: {
      maxEntrypointSize: 1024000,
      maxAssetSize: 1024000,
    },
    output: {
      filename: 'admin.js',
      path: path.resolve(__dirname, 'dist/public'),
    },
  });
};

const cssConfig = {
  mode: webpackEnv,
  node: false,
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              minimize: true,
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.css', '.scss'],
  },
  plugins: [new OptimizeCSSAssetsPlugin({ canPrint: false })],
};

const appCssConfig = {
  entry: './src/client/app/scss/main.scss',
  plugins: [
    new MiniCssExtractPlugin({
      filename: './public/assets/css/app.css',
    }),
  ],
};

const adminCssConfig = {
  entry: './src/client/admin/scss/main.scss',
  plugins: [
    new MiniCssExtractPlugin({
      filename: './public/assets/css/admin.css',
    }),
  ],
};

if (webpackEnv !== 'production') {
  adminCssConfig.plugins.shift();
  appCssConfig.plugins.shift();
  cssConfig.module.rules[0].use.shift();
  cssConfig.plugins.shift();
}

module.exports = [serverConfig, appConfig, adminConfig, merge(cssConfig, appCssConfig), merge(cssConfig, adminCssConfig)];
