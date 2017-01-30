const webpack = require("webpack");
module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist",
        publicPath: 'dist'
    },

    // Enable sourcemaps for debugging webpack's output.
    // devtool: "source-map",
    devtool: "eval",

    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {test: /\.tsx?$/, loader: "awesome-typescript-loader"},
            {test: /\.(css|less)$/, loader: "style-loader!css-loader!less-loader"}
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {test: /\.js$/, loader: "source-map-loader"}
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin({
            multiStep: true
        })
    ]
};