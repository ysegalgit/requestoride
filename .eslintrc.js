module.exports = {
    "env": {
        "node": true
    },

    "extends": "eslint:recommended",
    "rules": {
        "linebreak-style" : "off",
        "semi": ["error", "always"],
        "quotes": "off",
        "indent": ["error", "tab"],
        "no-unused-vars": ["error", { "varsIgnorePattern": "cl" }],
        "no-console" : "off"
    }
};
