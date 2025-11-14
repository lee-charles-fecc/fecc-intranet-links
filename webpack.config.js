const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080', // Adjust port as needed
        'webpack/hot/only-dev-server',
        './src/index.js' // Your application's entry point
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    devServer: {
        hot: true, // Enable HMR
        static: {
            directory: path.join(__dirname, 'public'), // Serve static files from 'public'
        },
        port: 8080, // Adjust port as needed
        historyApiFallback: true, // For client-side routing
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            // Add other loaders for CSS, images, etc. as needed
        ]
    },
};