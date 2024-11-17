"use strict";

const SizePlugin = require("size-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const PATHS = require("./paths");

module.exports = {
    entry: {
        popup: "./src/index.js",
        background: "./public/background.js",
        contentScript: "./public/contentScript.js",
    },
    output: {
        path: PATHS.build,
        filename: "[name].bundle.js",
    },
    devtool: "source-map",
    stats: {
        all: false,
        errors: true,
        builtAt: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "images",
                            name: "[name].[ext]",
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new SizePlugin(),
        new CopyWebpackPlugin({
            patterns: [{ from: PATHS.public, to: "." }],
        }),
        new MiniCssExtractPlugin(),
    ],
    resolve: {
        extensions: [".js", ".jsx"],
        fallback: {
            https: require.resolve("https-browserify"),
            http: require.resolve("stream-http"),
            stream: require.resolve("stream-browserify"),
            buffer: require.resolve("buffer/"),
            crypto: require.resolve("crypto-browserify"),
            url: require.resolve("url/"),
        },
    },
};
