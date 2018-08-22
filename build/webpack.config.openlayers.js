var configBase = require("./webpack.config.base");
//端名
var libName = "openlayers";
//产品包名
var productName = "iclient9-openlayers";

module.exports = {
    mode: configBase.mode,
    //页面入口文件配置
    entry: configBase.entry,
    //入口文件输出配置
    output: configBase.output(libName, productName),
    //是否启用压缩
    optimization: configBase.optimization,
    //不显示打包文件大小相关警告
    performance: configBase.performance,
    //其它解决方案配置
    resolve: configBase.resolve,
    externals: Object.assign({}, configBase.externals, {
        'openlayers': 'ol',
        '@turf/turf': "function(){try{return turf}catch(e){return {}}}()",
        'ol-mapbox-style': "function(){try{return olms}catch(e){return {}}}()",
        'ol-mapbox-style/stylefunction': "function(){try{return olms.stylefunction}catch(e){return {}}}()",
        'deck.gl': '(function(){try{return DeckGL}catch(e){return {}}})()',
        'luma.gl': '(function(){try{return luma}catch(e){return {}}})()',
        'webgl-debug': '(function(){try{return webgl-debug}catch(e){return {}}})()',
        'xlsx': "function(){try{return XLSX}catch(e){return {}}}()"
    }),

    module: {
        noParse: /[\/\\]node_modules[\/\\]openlayers[\/\\]dist[\/\\]ol\.js$/,
        rules: (function () {
            let moduleRules = [];
            moduleRules.push(configBase.module.rules.img);
            moduleRules.push(configBase.module.rules.eslint);
            if (configBase.moduleVersion === "es5") {
                //打包为es5相关配置
                moduleRules.push({
                    test: [/\.js$/],
                    exclude: /classic | webgl-debug/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                });

            }
            moduleRules.push(configBase.module.rules.css);
            return moduleRules
        })()
    },
    plugins: configBase.plugins(libName, productName)
};