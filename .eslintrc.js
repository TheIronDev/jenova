module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "mocha": true
    },
    "extends": "defaults/configurations/google",
    "ignorePath": "./example/",
    "rules": {
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};