const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './views/scss//index.js',
    output: {
        path: path.resolve(__dirname, ''),
        filename: './public/javascripts/bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader?url=false',
                        'sass-loader',
                    ]
                })
            }]
    },
    plugins: [
        new ExtractTextPlugin('./public/stylesheets/main.css')
    ]
};