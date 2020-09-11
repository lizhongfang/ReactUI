'use strict';
let path = require('path');
let config = require('./webpack.config.js');

const port = 7583;

config.devtool = 'inline-source-map';
config.devServer = {
    historyApiFallback: true,
    contentBase: `${__dirname}/src/`,
    host: 'localhost',
    port: port,
    inline: true
};

module.exports = config;
