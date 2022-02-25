const preprocess = require("svelte-preprocess");
import {optimizeImports, optimizeCss, icons, pictograms} from "carbon-preprocess-svelte";

const config = {
    preprocess: [
        optimizeImports(),
        optimizeCss(),
        icons(),
        pictograms(),
        preprocess({
            postcss: true,
        }),
    ],
};

module.exports = config;
