module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:react/recommended',
        "plugin:react-hooks/recommended",
        'plugin:@typescript-eslint/recommended',
        "prettier"
    ],
    parserOptions: {
        ecmaVersion:  2018,  // 帮助转化最先进的ECMAScript功能
        sourceType:  'module',  // 允许imports的用法
        ecmaFeatures:  {
            jsx:  true,  // JSX兼容
        },
    },
    rules:  {
        "@typescript-eslint/no-var-requires": "off",

    },
    settings:  {
        react:  {
          version:  'detect',  // 告诉eslint-plugin-react自动检测最新版本的react
        },
    },
}