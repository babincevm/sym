module.exports = {
    extends: [
        'prettier',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:react/recommended'
    ],
    env: {
        browser: true,
        es6: true,
        node: true
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2021,
        sourceType: 'module',
        project: './tsconfig.json'
    },
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    settings: {
        react: {
            version: 'detect'
        }
    },
    ignorePatterns: ['.eslintrc.js'],
    plugins: [
        '@typescript-eslint',
        'eslint-plugin-import',
        'eslint-plugin-import-helpers',
        'eslint-plugin-react',
        'eslint-plugin-react-hooks'
    ],
    rules: {
        'no-async-promise-executor': ['error'],
        'no-await-in-loop': ['error'],
        'no-template-curly-in-string': ['error'],
        'array-callback-return': ['off'],
        'block-scoped-var': ['error'],
        curly: ['error', 'all'],
        'dot-location': ['error', 'property'],
        'dot-notation': ['error'],
        eqeqeq: ['error', 'always'],
        'guard-for-in': ['error'],
        'max-classes-per-file': ['error', 1],
        'no-alert': ['error'],
        'no-caller': ['error'],
        'no-console': ['error'],
        'no-constant-binary-expression': ['error'],
        'no-div-regex': ['error'],
        'no-else-return': ['error', { allowElseIf: true }],
        'no-eval': ['error'],
        'no-empty': ['error', { allowEmptyCatch: true }],
        'no-extend-native': ['error'],
        'no-extra-bind': ['error'],
        'no-fallthrough': ['error'],
        'no-floating-decimal': ['error'],
        'no-implicit-coercion': ['error'],
        'no-implied-eval': ['error'],
        'no-invalid-this': ['error'],
        'no-iterator': ['error'],
        'no-lone-blocks': ['error'],
        'no-loop-func': ['error'],
        'no-multi-spaces': ['error'],
        'no-multi-str': ['error'],
        'no-new-func': ['error'],
        'no-new-native-nonconstructor': ['error'],
        'no-new-wrappers': ['error'],
        'no-octal-escape': ['error'],
        'no-proto': ['error'],
        'no-redeclare': ['off'],
        'no-return-assign': ['error', 'always'],
        'no-script-url': ['error'],
        'no-self-assign': ['error'],
        'no-self-compare': ['error'],
        'no-sequences': ['error'],
        'no-throw-literal': ['error'],
        'no-underscore-dangle': ['error'],
        'no-unmodified-loop-condition': ['error'],
        'no-unused-expressions': ['off'],
        'no-unused-vars': ['off'],
        'no-useless-call': ['error'],
        'no-useless-concat': ['error'],
        'no-useless-constructor': ['off'],
        'no-void': ['error'],
        'no-with': ['error'],
        radix: ['error', 'always'],
        'require-await': ['off'],
        'wrap-iife': ['error', 'inside'],
        yoda: ['error'],
        'no-label-var': ['error'],
        'no-shadow': ['off'],
        'no-shadow-restricted-names': ['error'],
        'no-use-before-define': ['off'],
        'no-path-concat': ['error'],

        /* Stylistic */
        'no-extra-parens': ['off'],
        'no-extra-semi': ['off'],

        /* ECMAScript 6 */
        'arrow-parens': ['error', 'always'],
        'arrow-spacing': ['error', { before: true, after: true }],
        'generator-star-spacing': ['error', { before: false, after: true }],
        'no-duplicate-imports': ['error', { includeExports: true }],
        'no-useless-computed-key': ['error'],
        'no-useless-rename': ['error'],
        'no-var': ['error'],
        'object-shorthand': ['error', 'always'],
        'prefer-const': ['error'],
        'prefer-rest-params': ['error'],
        'prefer-spread': ['error'],
        'prefer-template': ['error'],
        'rest-spread-spacing': ['error', 'never'],
        'template-curly-spacing': ['error'],
        'yield-star-spacing': ['error', { before: true, after: false }],

        /* Imports */
        'import/no-empty-named-blocks': ['error'],
        'import/no-dynamic-require': ['error'],
        'import/no-webpack-loader-syntax': ['error'],
        'import/no-self-import': ['error'],
        'import/no-cycle': ['error'],
        'import/no-useless-path-segments': ['error'],
        'import/no-unused-modules': ['error'],
        'import/no-named-as-default': ['error'],
        'import/no-named-as-default-member': ['error'],
        'import/no-mutable-exports': ['error'],
        'import/no-commonjs': ['off'],
        'import/first': ['error'],
        'import/no-duplicates': ['error'],
        'import/no-namespace': ['off'],
        'import/extensions': [
            'error',
            'never',
            { css: 'always', scss: 'always', jpg: 'always', png: 'always', json: 'always', svg: 'always' }
        ],
        'import/newline-after-import': ['error'],

        /* Typescript */
        '@typescript-eslint/adjacent-overload-signatures': ['error'],
        '@typescript-eslint/array-type': ['error', { default: 'array-simple', readonly: 'array-simple' }],
        '@typescript-eslint/await-thenable': ['error'],
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'variable',
                format: ['camelCase', 'UPPER_CASE', 'PascalCase']
            },
            {
                selector: ['function', 'parameter'],
                format: ['camelCase', 'PascalCase']
            },
            {
                selector: ['objectLiteralProperty', 'objectLiteralMethod', 'typeProperty'],
                format: []
            },
            {
                selector: 'typeLike',
                format: ['PascalCase']
            },
            {
                selector: 'enum',
                format: ['PascalCase'],
                prefix: ['E']
            },
            {
                selector: 'enumMember',
                format: ['UPPER_CASE']
            },
            {
                selector: 'interface',
                format: ['PascalCase'],
                prefix: ['I']
            },
            {
                selector: 'typeParameter',
                format: ['PascalCase'],
                prefix: ['T']
            },
            {
                selector: 'default',
                format: []
            }
        ],
        '@typescript-eslint/ban-ts-comment': ['off'],
        '@typescript-eslint/consistent-type-assertions': [
            'error',
            { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow-as-parameter' }
        ],
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
        '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'explicit' }],
        '@typescript-eslint/explicit-module-boundary-types': [
            'error',
            {
                allowArgumentsExplicitlyTypedAsAny: true
            }
        ],
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                multiline: {
                    delimiter: 'semi',
                    requireLast: true
                },
                singleline: {
                    delimiter: 'semi',
                    requireLast: false
                }
            }
        ],
        '@typescript-eslint/no-extra-parens': ['off'],
        '@typescript-eslint/no-extra-semi': ['error'],
        '@typescript-eslint/no-floating-promises': ['off'],
        '@typescript-eslint/no-empty-interface': ['off'],
        '@typescript-eslint/no-explicit-any': ['off'],
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/no-inferrable-types': [
            'error',
            {
                ignoreParameters: true,
                ignoreProperties: true
            }
        ],
        '@typescript-eslint/no-invalid-this': ['error'],
        '@typescript-eslint/no-redeclare': ['error', { ignoreDeclarationMerge: true }],
        '@typescript-eslint/no-non-null-assertion': ['off'],
        '@typescript-eslint/no-misused-new': ['error'],
        '@typescript-eslint/no-misused-promises': [
            'error',
            {
                checksVoidReturn: false
            }
        ],
        '@typescript-eslint/no-parameter-properties': ['off'],
        '@typescript-eslint/no-unnecessary-type-assertion': ['error'],
        '@typescript-eslint/no-unused-expressions': ['error'],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                vars: 'all',
                args: 'after-used',
                ignoreRestSiblings: false
            }
        ],
        '@typescript-eslint/no-use-before-define': [
            'error',
            {
                variables: true,
                functions: false,
                classes: true,
                enums: true,
                typedefs: true
            }
        ],
        '@typescript-eslint/no-useless-constructor': ['error'],
        '@typescript-eslint/promise-function-async': [
            'error',
            {
                checkArrowFunctions: true,
                checkFunctionDeclarations: true,
                checkFunctionExpressions: true,
                checkMethodDeclarations: true
            }
        ],
        '@typescript-eslint/require-await': ['error'],
        '@typescript-eslint/restrict-plus-operands': ['error'],
        '@typescript-eslint/return-await': ['error'],
        '@typescript-eslint/typedef': [
            'error',
            {
                arrayDestructuring: false,
                arrowParameter: true,
                memberVariableDeclaration: true,
                objectDestructuring: false,
                parameter: true,
                propertyDeclaration: true,
                variableDeclaration: false,
                variableDeclarationIgnoreFunction: false
            }
        ],
        '@typescript-eslint/unified-signatures': ['error'],

        /* React */
        'react/boolean-prop-naming': ['error'],
        'react/button-has-type': ['error'],
        'react/default-props-match-prop-types': ['error'],
        'react/display-name': 'off',
        'react/no-access-state-in-setstate': ['error'],
        'react/no-children-prop': ['error'],
        'react/no-danger-with-children': ['error'],
        'react/no-deprecated': ['error'],
        'react/no-direct-mutation-state': ['error'],
        'react/no-is-mounted': ['error'],
        'react/no-multi-comp': 'off',
        'react/no-find-dom-node': ['error'],
        'react/no-redundant-should-component-update': ['error'],
        'react/no-render-return-value': ['error'],
        'react/no-typos': ['error'],
        'react/no-string-refs': ['error'],
        'react/no-this-in-sfc': ['error'],
        'react/no-unknown-property': ['error'],
        'react/no-unsafe': ['error'],
        'react/no-unused-state': ['error'],
        'react/no-will-update-set-state': ['error', 'disallow-in-func'],
        'react/hook-use-state': ['error'],
        'react/prefer-es6-class': ['error', 'always'],
        'react/prop-types': ['error'],
        'react/react-in-jsx-scope': ['error'],
        'react/require-render-return': ['error'],
        'react/self-closing-comp': ['error', { component: true, html: true }],
        'react/sort-comp': [
            'error',
            {
                order: [
                    'type-annotations',
                    'static-variables',
                    'static-methods',
                    'instance-variables',
                    'lifecycle',
                    '/^on.+$/',
                    '/^handle.+$/',
                    'everything-else',
                    '/^render.+$/',
                    'render'
                ]
            }
        ],
        'react/style-prop-object': ['error'],
        'react/void-dom-elements-no-children': ['error'],
        'react/jsx-boolean-value': ['error', 'never'],
        'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
        'react/jsx-closing-tag-location': ['error'],
        'react/jsx-curly-spacing': ['error', { when: 'never' }],
        'react/jsx-equals-spacing': ['error', 'never'],
        'react/jsx-first-prop-new-line': ['error', 'multiline'],
        'react/jsx-key': ['error'],
        'react/jsx-no-bind': ['error'],
        'react/jsx-no-duplicate-props': ['error'],
        'react/jsx-no-useless-fragment': ['error'],
        'react/jsx-pascal-case': ['error', { allowAllCaps: true }],
        'react/jsx-uses-react': ['error'],
        'react/jsx-uses-vars': ['error'],
        'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
        'react/jsx-tag-spacing': [
            'error',
            {
                closingSlash: 'never',
                beforeSelfClosing: 'always',
                afterOpening: 'never',
                beforeClosing: 'never'
            }
        ],

        /* React Hooks */
        'react-hooks/rules-of-hooks': ['error'],
        'react-hooks/exhaustive-deps': ['error'],

        /* Imports */
        'import-helpers/order-imports': [
            'error',
            {
                newlinesBetween: 'always',
                groups: [
                    'module',

                    '/types($|/)/',
                    '/^@/helpers($|/)/',
                    '/^@/api($|/)/',
                    '/^@/contexts($|/)/',
                    '/^@/hooks($|/)/',
                    '/^@/layouts($|/)/',
                    '/^@/ui($|/)/',
                    '/^@/components($|/)/',
                    '/^@/store($|/)/',
                    '/^@/assets($|/)/',

                    ['parent', 'sibling', 'index'],
                    '/\\.json/'
                ]
            }
        ]
    }
};
