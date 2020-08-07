const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

console.log(
    pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/',
    }),
);
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>'],
    modulePaths: ['<rootDir>'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/',
    }),
    globals: {
        // we must specify a custom tsconfig for tests because we need the typescript transform
        // to transform jsx into js rather than leaving it jsx such as the next build requires.  you
        // can see this setting in tsconfig.jest.json -> "jsx": "react"
        'ts-jest': {
            tsConfig: 'tsconfig.jest.json',
            // moduleNameMapper: { '^~/(.*)$': '<rootDir>/$1' },
            // moduleNameMapper: {
            //     '^src(.*)$': '<rootDir>/src/$1',
            // },
        },
    },
};
