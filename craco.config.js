module.exports = {
    style: {
        postcss: {
            plugins: [
                require('postcss-import'),
                require('tailwindcss/nesting')(require('postcss-nested')),
                require("postcss-custom-properties"),
                require('tailwindcss'),
                require('autoprefixer'),
            ],
        },
    },
}
