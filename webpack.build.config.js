var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');

let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    entry: {
        'cc-ui': [
            './src/index.js'
            // './src/app.js'
            // './src/demo/app.js'
        ]
    },
    output: {
        path: `${__dirname}/dist`,
        filename: '[name].js',
        publicPath: './',
        libraryTarget: 'umd'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: [{
              loader: "babel-loader",
              options: {
                  presets: ["react", ["es2015", ["@babel/env", { "modules": false }]]],
                  plugins: ["transform-react-jsx","add-module-exports"]
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
        extensions: ['.js', '.jsx', '.json']
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
        // new HtmlWebpackPlugin({ template: 'src/index.html' }),
        // new CopyWebpackPlugin([{
        //     from : path.join(__dirname, './src/static'),
        //     to : 'static'
        // }]),
        // new webpack.LoaderOptionsPlugin({
        //     minimize: true,
        //     options: {
        //         htmlLoader: {
        //             minimize: true,
        //             removeAttributeQuotes: false,
        //             caseSensitive: true
        //         }
        //     }
        // }),
        // new webpack.optimize.UglifyJsPlugin({
        //     beautify : false,
        //     output : {
        //         comments : false
        //     },
        //     compress: {
        //         warnings: false
        //     }
        // })
        // new BundleAnalyzerPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    optimization: {
        minimize: true,
        // splitChunks: {
        //     cacheGroups: {
        //         venders: {
        //             // test: /[\\/]node_modules[\\/]/,
        //             test(module, chunks) {
        //                 //...
        //                 // console.log(module);
        //                 // console.log(module.context);
        //                 // return module.type === 'javascript/auto';
        //
        //                 return module.context && (
        //                     module.context.indexOf('/node_modules/') > -1 &&
        //                     module.context.indexOf('react') == -1 &&
        //                     module.context.indexOf('moment/locale') == -1
        //                 );
        //             },
        //             name: 'venders',
        //             chunks: 'all'
        //         },
        //         react: {
        //             test(module, chunks) {
        //                 //...
        //                 // console.log(module.context);
        //                 // return module.type === 'javascript/auto';
        //
        //                 // console.log(module.context);
        //                 // console.log(module.context && (module.context.indexOf('/node_modules/') > -1 && module.context.indexOf('react') > -1));
        //
        //                 return module.context && (module.context.indexOf('/node_modules/') > -1 && module.context.indexOf('react') > -1);
        //             },
        //             name: 'react-related',
        //             // minChunks: 1,
        //             chunks: 'all'
        //         },
        //         moment: {
        //             test(module, chunks) {
        //                 //...
        //                 // console.log(module.context);
        //                 // return module.type === 'javascript/auto';
        //
        //                 // console.log(module.context);
        //                 // console.log(module.context && (module.context.indexOf('/node_modules/') > -1 && module.context.indexOf('moment/locale') > -1));
        //
        //                 return module.context && (module.context.indexOf('/node_modules/') > -1 && module.context.indexOf('moment/locale') > -1);
        //             },
        //             name: 'moment-local',
        //             // minChunks: 1,
        //             chunks: 'all'
        //         }
        //     }
        // }
    },
    mode: 'production'
}
