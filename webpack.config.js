const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// TODO Configure Webpack for Development and Production Environments
const dev = process.env.NODE_ENV === 'development';
const prod = process.env.NODE_ENV === 'production';

// console.log('Your environment is set to ' + process.env.NODE_ENV);

function getPlugins() {
    let plugins = [];

    plugins.push(new webpack.DefinePlugin({
        dev: JSON.stringify(dev),
        prod: JSON.stringify(prod)
    }));

    plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.js',
        minChunks: Infinity
    }));

    plugins.push(new ExtractTextPlugin('main.css'))

    if (prod) {
        plugins.push(
            new UglifyJsPlugin()
        );
    } else {
        plugins.push(
            new BrowserSyncPlugin({
                browser: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
                proxy: 'http://localhost:3000',
                port: 7777,
                reloadDelay: 600,
                files: ['views/**/*.pug'],
                notify: false
            })
        );
    }
    return plugins;
}

// TODO Configure Webpack with code splitting to deal with larger library sets i.e. React|Angular etc.

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
        app: './public/scripts/app.js',
        vendor: ['react', 'react-dom', 'react-router', 'gsap', 'hammerjs']
    },
    resolve: {
        extensions: ['.js', 'jsx'],
        modules: ['node_modules']
    },
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'public', 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [javascript, styles]
    },
    plugins: getPlugins()
};

console.log('Your environment is set to ' + process.env.NODE_ENV);

process.noDeprecation = true;

module.exports = config;
