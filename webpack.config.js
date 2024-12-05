const path = require('path');

module.exports = () => {
    const mode = process.env.NODE_ENV || 'production';

    return {
        mode: mode,
        entry: './static/view/index.jsx', // Entry point changed to React's default
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'index.js',
        },
        devServer: {
            static: './dist',
            hot: true,
            port: 8080
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/, // Apply the rule to .js and .jsx files
                    exclude: /node_modules/, // Exclude node_modules
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env', // Transpile ES6+ to ES5
                                '@babel/preset-react' // Transpile JSX to JavaScript
                            ]
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'], // Process CSS files
                },
                {
                    test: /\.(scss|sass)$/,
                    use: ['style-loader', 'css-loader', 'sass-loader'], // Process Sass/Scss files
                },
                {
                    test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/[hash][ext][query]', // File output format
                    },
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx'], // Resolve both .js and .jsx files
        },
        cache: false,
        stats: "minimal"
    };
};
