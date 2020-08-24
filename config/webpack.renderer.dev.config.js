const { merge } = require('webpack-merge');
const spawn = require('child_process').spawn;
const baseConfig = require('./webpack.renderer.config');

module.exports = merge(baseConfig, {
    devServer: {
        port: 1357,
        compress: true,
        noInfo: true,
        stats: 'errors-only',
        inline: true,
        hot: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
        historyApiFallback: {
            verbose: true,
            disableDotRule: false,
        },
        before() {
            if (process.env.START_HOT) {
                spawn('npm', ['run', 'start:main-dev'], {
                    shell: true,
                    env: process.env,
                    stdio: 'inherit',
                })
                    .on('close', (code) => process.exit(code))
                    .on('error', (spawnError) => console.error(spawnError));
            }
        },
    },
});
