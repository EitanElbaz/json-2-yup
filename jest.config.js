const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>'],
    modulePaths: ['<rootDir>'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/',
    }),
    coverageReporters: ['json-summary', 'text', 'lcov'],
    globals: {
        // we must specify a custom tsconfig for tests because we need the typescript transform
        // to transform jsx into js rather than leaving it jsx such as the next build requires.  you
        // can see this setting in tsconfig.jest.json -> "jsx": "react"
        'ts-jest': {
            tsConfig: 'tsconfig.jest.json',
        },
    },
};
