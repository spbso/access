const autoprefixer = require("autoprefixer");
const postcssShort = require('postcss-short');
const simpleVars = require('postcss-simple-vars');
const postcssPresetEnv = require('postcss-preset-env');
const atImport = require("postcss-import")
const include = require('postcss-annotation-include')
const utilities = require('postcss-utilities');


const config = {
    plugins: [
        atImport,
        include,
        autoprefixer,
        postcssShort,
        simpleVars,
        postcssPresetEnv,
        utilities
    ],
};

module.exports = config;
