const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const javascript = {
    test: /\.(jsx?)$/,
    exclude: '/node_modules/',
    use: [{
        loader: 'babel-loader',
        options: {
            presets: ['env', 'react']
            // plugins: [require('babel-plugin-transform-react-jsx'), require('babel-plugin-transform-react-pug')]
        }
    }],
};

const postcss = {
    loader: 'postcss-loader',
    options: {
        plugins() {
            return [
                autoprefixer({browsers: 'last 3 versions'}),
                cssnano({autoprefixer: false, zindex: false})
            ];
        }
    }
};

const styles = {
    test: /\.(scss)$/,
    use: ExtractTextPlugin.extract(['css-loader?sourceMap', postcss, 'sass-loader?sourceMap'])
};

const config = {
    entry: {
        app: './public/scripts/app.js'
    },
    resolve: {
        extensions: ['.js', 'jsx']
    },
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'public', 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [javascript, styles]
    },
    plugins: [
        new BrowserSyncPlugin({
            browser: 'chrome.exe',
            proxy: 'http://localhost:3000',
            port: 7777,
            reloadDelay: 600,
            files: ['views/**/*.pug'],
            notify: false
        }),
        new ExtractTextPlugin('main.css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};

process.noDeprecation = true;

module.exports = config;
