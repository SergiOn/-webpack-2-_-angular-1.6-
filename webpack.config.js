const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');


module.exports = {
    entry: './client/app/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'client')
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }],
                exclude: [/node_modules/]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    ExtractTextPlugin.extract({
                        loader: 'css-loader?importLoaders=1'
                    }),
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('precss'),
                                    require('autoprefixer')
                                ];
                            }
                        }
                    }
                ],
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    'style-loader',
                    ExtractTextPlugin.extract({
                        loader: [
                            {
                                loader: 'css-loader?importLoaders=1'
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: function () {
                                        return [
                                            require('precss'),
                                            require('autoprefixer')
                                        ];
                                    }
                                }
                            }
                        ]
                    }),
                    'sass-loader'
                ]
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('bundle.css'),
        new webpack.LoaderOptionsPlugin({ options: { postcss: [ autoprefixer({ browsers: ["> 1%", "last 4 versions"] }) ] } })
    ],

    resolve: {
        modules: ['node_modules']
    },

    watch: true,

    devtool: "inline-source-map"
};