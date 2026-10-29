export default {
    extends: ['stylelint-config-standard'],
    rules: {
        'alpha-value-notation': null,
        'color-function-alias-notation': null,
        'color-function-notation': null,
        'hue-degree-notation': null,
        'import-notation': null,
        'media-feature-range-notation': null,
        'selector-class-pattern': null,
        'declaration-block-no-redundant-longhand-properties': null
    },
    overrides: [
        {
            files: ['**/*.vue'],
            customSyntax: 'postcss-html'
        }
    ]
}
