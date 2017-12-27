const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'index.ts'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist/'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        symlinks: false
    },
    module: {
        rules: [
            { test: /\.tsx?$/, use: 'ts-loader' }
        ]
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.CommonsChunkPlugin({ async: true, minChunks: 2 }),
        new webpack.ProvidePlugin({
            'PIXI': 'pixi.js'
        })
    ],
    devServer: {
        contentBase: __dirname,
        host: '0.0.0.0'
    },
    devtool: 'source-map'
}