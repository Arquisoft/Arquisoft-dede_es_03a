// webpack.config.js
const path = require( 'path' );module.exports = {
    context: __dirname,
    entry: './src/index.tsx',
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'main.ts',
        publicPath: '/'
    },
      devServer: {
        historyApiFallback: true
      },
    module: {
        rules: [
            {
                test: "/\.tsx$/",
                exclude: "/node_modules/",
                use: 'babel-loader',
            }
        ]
    }
};