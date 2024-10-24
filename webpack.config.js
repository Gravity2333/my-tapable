const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports =  {
  target:'web',
  mode: "development",
  context: path.resolve(__dirname, "./"),
  entry: './src/index.ts',
  output: {
    filename: "[name].js",
    chunkFilename: "chunk-[name]-[chunkhash:8][ext]",
    path: path.resolve(__dirname, "./demo"),
    clean: true,
    publicPath: '/',
    library: {
      type: "module",
    },
  },
  experiments: {
    outputModule: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      lib: path.resolve(__dirname, "./lib"),
    },
    extensions: [".ts", ".js"],
    descriptionFiles: ["package.json"],
    mainFiles: ["index"],
    mainFields: ["main"],
    modules: ["lib", "node_modules"],
  },
  devServer: {
    host: "0.0.0.0",
    port: 8088,
    historyApiFallback: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /.(j|t)s$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 模板位置
      template: "./template.html",
      // 文件名
      filename: "index.html",
      // inject: body 在html的body里生成  srcipt 注入到 body里
      inject: "body",
    }),
    new CopyWebpackPlugin({
      patterns: [
          {
              from: './@types',
              to: './lib/'
          }
      ]
  })
  ],
}