import { StringSchema, ValidationError } from 'yup';
import to from 'await-to-js';
import { StringTypeSchema } from 'src/types';
import { toYup } from 'src/toYup';

const errorMsg = 'Min 5 chars';

const schema: StringTypeSchema = {
    type: 'string',
    strict: true,
    minLength: 5,
    errors: {
        minLength: errorMsg,
    },
};

const yupSchema = toYup(schema) as StringSchema;

test('minLength expect fail', async () => {
    expect(yupSchema.isValidSync('what')).toBe(false);
});

test('minLength expect pass', async () => {
    expect(yupSchema.isValidSync('hello')).toBe(true);
});

test('minLength expect fail message', async () => {
    const [error] = await to(yupSchema.validate('what'));
    expect((error as ValidationError).message).toBe(errorMsg);
});
