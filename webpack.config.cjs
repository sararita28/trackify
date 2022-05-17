const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");

module.exports = ({ mode } = { mode: "production" }) => {
  console.log(`mode is: ${mode}`);
  return merge({
    mode,
    entry: ["regenerator-runtime/runtime.js", "./src/index.js"],
    devServer: {
      open: true,
      host: "0.0.0.0",
      port: 3000,
      historyApiFallback: true,
      allowedHosts: "all",
      //for Replit config
      proxy: {
        "/websocket": {
          target: "wss://trackify.sararita28.repl.co:3000/ws",
          ws: true, // important
        },
      },
    },
    output: {
      publicPath: "/",
      path: path.resolve(__dirname, "build"),
      filename: "bundle.js",
    },
    resolve: {
      extensions: ["*", ".js", ".jsx", ".json"],
      symlinks: false,
      cacheWithContext: false,
    },
    module: {
      rules: [
        {
          test: /\.jpe?g|png$/,
          exclude: /node_modules/,
          use: ["file-loader"],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.html$/,
          use: ["html-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
    ],
  });
};
