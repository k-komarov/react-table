const webpack = require("webpack");
module.exports = {
    entry: [
        "./example/index.tsx",
        "./src/index.tsx"
    ],
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist",
        publicPath: 'dist'
    },

    devtool: "inline-source-map",

    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true
    },

    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {test: /\.tsx?$/, loader: "awesome-typescript-loader"},
            {test: /\.(css|less)$/, loader: "style-loader!css-loader!less-loader"},
            {
                enforce: "pre",
                test: /\.(js|tsx)$/,
                loader: "source-map-loader"
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin({
            multiStep: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
};