const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const postcssShort = require("postcss-short");
const simpleVars = require("postcss-simple-vars");
const postcssPresetEnv = require("postcss-preset-env");
const atImport = require("postcss-import");
const include = require("postcss-annotation-include");
const utilities = require("postcss-utilities");

const config = {
  plugins: [
    atImport,
    include,
    //Some plugins, like tailwindcss/nesting, need to run before Tailwind,
    tailwindcss(),
    //But others, like autoprefixer, need to run after,
    autoprefixer,
    postcssShort,
    simpleVars,
    postcssPresetEnv,
    utilities,
  ],
};

module.exports = config;
