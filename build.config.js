const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = [
  {
    mode: "production",
    context: path.resolve(__dirname, "./"),
    entry: "./lib/my-tapable/index.ts",
    output: {
      filename: "[name].js",
      chunkFilename: "chunk-[name]-[chunkhash:8][ext]",
      path: path.resolve(__dirname, "./dist"),
      clean: true,
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
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "./@types",
            to: "./",
          },
        ],
      }),
    ],
  },
];
