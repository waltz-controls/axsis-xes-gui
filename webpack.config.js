const path = require("path");
const webpack = require("webpack");

module.exports = function (env) {

    const pack = require("./package.json");
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");

    const production = !!(env && env.production === "true");
    const asmodule = !!(env && env.module === "true");
    const standalone = !!(env && env.standalone === "true");

    const babelSettings = {
        extends: path.join(__dirname, '/.babelrc')
    };

    const config = {
        mode: production ? "production" : "development",
        entry: {
            libs: "./import/libs.js",
            index: "./index.js"
        },
        output: {
            path: path.join(__dirname, "dist"),
            publicPath:"/dist/",
            filename: "[name].js",
            chunkFilename: "[name].bundle.js"
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /webix\.(min\.|)js$/,
                    use: "babel-loader?" + JSON.stringify(babelSettings)
                },
                {
                    test: /\.(svg|png|jpg|gif)$/,
                    use: "url-loader?limit=25000"
                },
                {
                    test: /\.(less|css)$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
                },
                {
                    test: /webix\.(min\.|)js$/,
                    use: "script-loader"
                }
            ]
        },
        stats: "minimal",
        resolve: {
            extensions: [".js"],
            modules: ["./src", "node_modules"],
            alias:{
                webix:path.resolve(__dirname, "node_modules", "webix", "webix.min.js")
            }
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].css"
            }),
            new webpack.DefinePlugin({
                VERSION: `"${pack.version}"`,
                APPNAME: `"${pack.name}"`,
                PRODUCTION: production,
                BUILD_AS_MODULE: (asmodule || standalone)
            })
        ],
        devServer: {
            stats: "errors-only",
            proxy: {
                "/axsis": {
                    target: 'http://localhost:5000'
                },
                "/magix": {
                    target: 'http://localhost:8080'
                },
                "/user-context": {
                    target: 'http://localhost:3000'
                }
            }
        }
    };

    if (!production) {
        config.devtool = "inline-source-map";
    }

    if (asmodule) {
        if (!standalone) {
            config.externals = config.externals || {};
            config.externals = ["webix-jet"];
        }
        
        config.entry = {
            index: "./src/index.js"
        };

        config.externals = pack.runtimeDependencies;

        const out = config.output;
        const sub = standalone ? "full" : "module";

        out.library = pack.name.replace(/[^a-z0-9]/gi, "");
        out.libraryTarget = "umd2";
        out.path = path.join(__dirname, "dist", sub);
        out.publicPath = "/dist/" + sub + "/";
    }

    return config;
}
