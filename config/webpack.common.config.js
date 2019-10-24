const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    // devServer: {
    //     contentBase: '../dist',
    // },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, '../docs'),
        filename: '[name].[chunkhash].js'
    },
    // watch:true,
    module: {
        rules: [{
                test: [/.js$/],
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            },
            {
                test: [/.css$|.scss$/],
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    "postcss-loader",
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|jpeg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/images'
                    }
                }]
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                use: [{
                  loader: "file-loader",
                  options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/fonts'
                  }
                }]
              }
            
        ]
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Html_test',
            template: './src/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'style.[chunkhash].css'
        }),

        new CopyWebpackPlugin([{
                from: './src/assets/images',
                to: 'assets/images'
            },
            {
                from: './src/assets/icons',
                to: 'assets/icons'
            }
        ]),
        new CleanWebpackPlugin()
    ]
};