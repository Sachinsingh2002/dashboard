module.exports = {
    env: {
        commonjs: true,
        es6: true,
        node: true,
        mocha: true,
    },
    ignorePatterns: ['dist/', 'types/', 'node_modules/'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2020,
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['import', 'prefer-arrow', '@typescript-eslint'],
    rules: {
        ' @typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/restrict-plus-operands': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/restrict-template-expressions': ['error', { allowAny: true }],
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^context' }],
        'array-bracket-spacing': 'error',
        'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: true }],
        'arrow-spacing': 'error',
        indent: [
            'warn',
            4,
            {
                SwitchCase: 1,
            },
        ],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'brace-style': 'error',
        //camelcase: 'error',
        'comma-dangle': 'off',
        'comma-spacing': ['error', { before: false, after: true }],
        'comma-style': ['error', 'last'],
        complexity: 'off',
        'constructor-super': 'error',
        curly: 'error',
        'dot-notation': 'error',
        'eol-last': 'error',
        eqeqeq: ['error', 'smart'],
        'guard-for-in': 'off',
        'id-blacklist': 'error',
        'id-match': 'error',
        'import/order': 'error',
        'key-spacing': 'error',
        'keyword-spacing': 'error',
        'linebreak-style': ['off', 'unix'],
        'max-classes-per-file': ['error', 3],
        'max-len': 'off',
        'new-parens': 'error',
        'no-bitwise': 'error',
        'no-caller': 'error',
        'no-cond-assign': 'error',
        'no-console': 'off',
        'no-debugger': 'error',
        'no-empty': 'off',
        'no-eval': 'error',
        'no-fallthrough': 'off',
        'no-invalid-this': 'off',
        'no-multiple-empty-lines': 'error',
        'no-multi-spaces': 'error',
        'no-new-wrappers': 'error',
        'no-shadow': 'off',
        'no-throw-literal': 'error',
        'no-trailing-spaces': 'error',
        'no-undef-init': 'error',
        'no-underscore-dangle': 'off',
        'no-unsafe-finally': 'error',
        'no-unused-expressions': 'error',
        'no-unused-labels': 'error',
        'no-var': 'error',
        'no-whitespace-before-property': 'error',
        'object-shorthand': 'error',
        'one-var': ['error', 'never'],
        'operator-linebreak': ['error', 'before'],
        'prefer-arrow/prefer-arrow-functions': ['error', { allowStandaloneDeclarations: true }],
        'prefer-const': 'error',
        'quote-props': ['error', 'consistent-as-needed'],
        radix: 'error',
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'never',
                asyncArrow: 'always',
                named: 'never',
            },
        ],
        'spaced-comment': [
            'error',
            'always',
            {
                block: {
                    markers: ['!'],
                },
            },
        ],
        'space-infix-ops': 'error',
        'space-in-parens': 'error',
        'use-isnan': 'error',
        'valid-typeof': 'error',
    },
    overrides: [
        {
            files: ['*.ts'],
            extends: [
                //'plugin:@typescript-eslint/recommended',
                //'plugin:@typescript-eslint/recommended-requiring-type-checking',
            ],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                project: ['./tsconfig.json'],
            },
            rules: {
                'restrict-plus-operands': 'off',
                '@typescript-eslint/no-unsafe-return': 'off',
                '@typescript-eslint/no-unsafe-argument': 'off',
                '@typescript-eslint/no-floating-promises': 'off',
                '@typescript-eslint/unbound-method': 'off',
            },
        },
    ],
};
