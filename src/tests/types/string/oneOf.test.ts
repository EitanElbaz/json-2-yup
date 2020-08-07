import { StringSchema } from 'yup';
import to from 'await-to-js';
import StringTypeSchema from 'src/types/StringTypeSchema';
import toYup from 'src/toYup';

const errorMsg = 'Must be either "one" or "two"';
const schema: StringTypeSchema = {
    type: 'string',
    strict: true,
    oneOf: ['one', 'two'],
    errors: {
        oneOf: errorMsg,
    },
};
const yupSchema = toYup(schema) as StringSchema;

test('oneOf expect fail', async () => {
    expect(yupSchema.isValidSync('hello')).toBe(false);
    expect(yupSchema.isValidSync('One')).toBe(false);
    expect(yupSchema.isValidSync('twO')).toBe(false);
});

test('oneOf expect pass', async () => {
    expect(yupSchema.isValidSync('one')).toBe(true);
    expect(yupSchema.isValidSync('two')).toBe(true);
});

test('oneOf expect fail message', async () => {
    const [error] = await to(yupSchema.validate('hello'));
    expect(error.message).toBe(errorMsg);
});
