const webpack = require("webpack");
module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "index.js",
        path: __dirname + "/lib"
    },

    devtool: "cheap-module-source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {test: /\.tsx?$/, loader: "awesome-typescript-loader", exclude: /node_modules/},
            {test: /\.(css|less)$/, loader: "style-loader!css-loader!less-loader"}
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {test: /\.js$/, loader: "source-map-loader"}
        ]
    },
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
};