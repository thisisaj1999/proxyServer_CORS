module.exports = {
        apps: [
                {
                        name: "cors-proxy",
                        script: "./app.js",
                        watch: false,
                        instances: 1,
                        exec_mode: "cluster",
                        env: {
                                NODE_ENV: "production",
                        },
                        env_production: {
                                NODE_ENV: "production",
                        },
                }
        ],
};