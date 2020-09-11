var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');

let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    entry: {
        index: [
            `${__dirname}/src/index.js`
            // './src/demo/app.js'
        ]
    },
    output: {
        path: `${__dirname}/dist`,
        filename: '[name].js',
        publicPath: '',
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: [{
                loader: "babel-loader",
                options: {
                    presets: ["react", ["es2015", ["@babel/env", { "modules": false }]]],
                    plugins: ["add-module-exports", "transform-react-jsx"]
                }
            }],
        }, {
            test: /\.css/,
            exclude: /node_modules/,
            use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
        }, {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }]
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, exclude: /node_modules/, loader: "url-loader?limit=10000&minetype=application/font-woff"
        // }, {
        //     test: /\.(ttf|eot|svg|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, exclude: /node_modules/, loader: "file-loader"
        }, {
            test: /\.(jpg|png|gif)$/,
            use: [{ loader: 'url-loader', options: { limit: 81920 } }],
            exclude: /node_modules/
        // }, {
        //   test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        //   exclude: /node_modules/,
        //   use: [{
        //     loader: "url-loader", options: {
        //       limit: 10000, minetype: "application/font-woff"
        //     }
        //   }]
        },{
              test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              exclude: /node_modules/, use: [{ loader: "file-loader", options: { limit: 8192 } }]
        }]
    },

    resolve: {
        modules: [ path.resolve(__dirname, "src"), "node_modules" ],
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            // 'cc-ui': path.resolve(__dirname, "./../../../src")
            'cc-ui': path.join(__dirname, "./../../src")
        },
    },
    plugins: [
        // new webpack.DefinePlugin({
        //       'process.env':{
        //           'NODE_ENV': JSON.stringify('production')
        //       }
        //   }),
        // new webpack.optimize.UglifyJsPlugin({
        //   sourceMap: true,
        //   compress: {
        //     warnings: false
        //   }
        // }),
        // new webpack.LoaderOptionsPlugin({
        //   minimize: true
        // }),
        new HtmlWebpackPlugin({ template: `${__dirname}/src/index.html` }),
        // new CopyWebpackPlugin([{
        //     from : path.join(__dirname, './src/static'),
        //     to : 'static'
        // }]),
        // new BundleAnalyzerPlugin()
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                venders: {
                    // test: /[\\/]node_modules[\\/]/,
                    test(module, chunks) {
                        //...
                        // console.log(module);
                        // return module.type === 'javascript/auto';

                        return module.context && (module.context.indexOf('/node_modules/') > -1 && module.context.indexOf('react') == -1);
                    },
                    name: 'venders',
                    chunks: 'all'
                },
                react: {
                    test(module, chunks) {
                        //...
                        // console.log(module);
                        // return module.type === 'javascript/auto';

                        return module.context && (module.context.indexOf('/node_modules/') > -1 && module.context.indexOf('react') > -1);
                    },
                    name: 'react-related',
                    chunks: 'all'
                }

                // commons: {
                //     test: /[\\/]node_modules[\\/]react-router-dom[\\/]/,
                //     name: 'react-router-dom',
                //     chunks: 'all'
                // },
                // commons2: {
                //     test: /[\\/]node_modules[\\/]react[\\/]/,
                //     name: 'react',
                //     chunks: 'all'
                // },
            }
        }
    },
    mode: 'development',
    // watch: true
}
