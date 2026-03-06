// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = defineConfig([
	{
		files: ['**/*.ts'],
		extends: [
			eslint.configs.recommended,
			tseslint.configs.recommendedTypeChecked,
			tseslint.configs.stylisticTypeChecked,
			angular.configs.tsRecommended,
		],
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: __dirname,
			},
		},
		processor: angular.processInlineTemplates,
		rules: {
			'@angular-eslint/directive-selector': [
				'error',
				{
					type: 'attribute',
					prefix: 'app',
					style: 'camelCase',
				},
			],
			'@angular-eslint/component-selector': [
				'error',
				{
					type: 'element',
					prefix: 'app',
					style: 'kebab-case',
				},
			],
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'explicit' }],

			'@typescript-eslint/prefer-readonly': 'warn',

			'no-var': 'error',
			'prefer-const': 'warn',

			'@typescript-eslint/naming-convention': [
				'error',

				{
					selector: 'typeLike',
					format: ['PascalCase'],
				},

				{
					selector: 'variableLike',
					format: ['camelCase', 'UPPER_CASE'],
				},

				{
					selector: 'property',
					format: ['camelCase'],
					leadingUnderscore: 'allow',
				},
			],

			complexity: ['warn', 10],
			'max-depth': ['warn', 4],

			'@angular-eslint/component-class-suffix': ['error', { suffixes: ['Component'] }],

			'@angular-eslint/directive-class-suffix': ['error', { suffixes: ['Directive'] }],

			'@angular-eslint/prefer-on-push-component-change-detection': 'error',
		},
	},
	{
		files: ['**/*.html'],
		extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
		rules: {},
	},
]);
