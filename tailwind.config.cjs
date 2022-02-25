const production = !process.env.ROLLUP_WATCH;
const colors = require('tailwindcss/colors')

const config = {
    content: ["./src/**/*.{html,js,svelte,ts}"],

    theme: {
        fontFamily: {
            "sans": ["Roboto", "Helvetica Neue", "Arial"]
        },
        // colors: {
        //     'spbso': '#002549',
        //     transparent: 'transparent',
        //     current: 'currentColor',
        //     black: colors.black,
        //     white: colors.white,
        //     gray: colors.gray,
        //     emerald: colors.emerald,
        //     indigo: colors.indigo,
        //     yellow: colors.yellow,
        //     red: colors.red,
        // },
        extend: {},
    },

    plugins: [
        require('@tailwindcss/aspect-ratio'),
    ],

    future: {
        // purgeLayersByDefault: true,
        // removeDeprecatedGapUtilities: true,
    },
};

module.exports = config;
