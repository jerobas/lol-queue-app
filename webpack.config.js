const path = require('path');

module.exports = () => {
    const mode = process.env.NODE_ENV ? process.env.NODE_ENV : 'production';

    return {
        mode: mode,
        entry: './static/view/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'index.js',
        },
        devServer: {
            static: './dist',
            hot: true, // Enable hot reloading
            port: 8080
        },
        module: {
            rules: [
                {
                    test: /\.js$/, // Apply the rule to .js files
                    include: path.resolve(__dirname, 'static'), // Only transpile files in src/view
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'] // Transpile ES6+ to ES5
                        }
                    }
                },
                {
                    test: /\.css$/,
                    include: path.resolve(__dirname, 'static'), // Only apply this rule to .css files in src/view
                    use: ['style-loader', 'css-loader'], // First, CSS is processed, then injected into the DOM
                },
                {
                    test: /\.(scss|sass)$/,  // Add this rule for Sass/Scss files
                    include: path.resolve(__dirname, 'static'),
                    use: ['style-loader', 'css-loader', 'sass-loader'],  // Apply the correct loaders
                },
                // Rule for images and fonts
                {
                    test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,  // Match these file types
                    include: path.resolve(__dirname, 'static'),  // Only apply this rule to files in src/view
                    type: 'asset/resource',  // Automatically manages file output
                    generator: {
                        filename: 'assets/[hash][ext][query]',  // File output format (with hashing)
                    },
                }
            ]
        },
        resolve: {
            extensions: ['.js']
        },
        cache: false,
        stats: "minimal"
    };
}