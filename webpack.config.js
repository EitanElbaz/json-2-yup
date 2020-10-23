/* eslint-disable @typescript-eslint/no-var-requires */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { name } = require('./package.json');

const isProduction = process.env.NODE_ENV === 'production';

// eslint-disable-next-line func-names
module.exports = function () {
    return {
        mode: isProduction ? 'production' : 'development',
        target: 'node',
        entry: { index: './src/index.ts' },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js',
            library: name,
            libraryTarget: 'umd',
            umdNamedDefine: true,
        },
        cache: true,
        optimization: {
            minimize: true,
            runtimeChunk: false,
        },
        devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
            plugins: [new TsconfigPathsPlugin()],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                },
            ],
        },
        externals: {
            yup: {
                commonjs: 'yup',
                commonjs2: 'yup',
                amd: 'yup',
                root: 'yup',
            },
        },
        plugins: [
            new webpack.EnvironmentPlugin({
                NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
                DEBUG: false,
            }),
            new CleanWebpackPlugin(),
        ],
    };
};
