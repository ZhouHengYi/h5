module.exports = function (api) {
    api.cache(true);

    const presets = [
        ["@babel/env", {
            "modules": false,
            "useBuiltIns": "usage",
            "corejs": 3
        }],
    ];

    const plugins = [
        "@babel/transform-runtime",
        "@babel/syntax-dynamic-import",
        "@babel/plugin-proposal-class-properties",
        [
            "by-tools-demand-loading",
            {
                "library": "by-tools"
            }
        ]
    ];

    return {
        presets,
        plugins
    };
}
