import { StringSchema } from 'yup';
import to from 'await-to-js';
import StringTypeSchema from 'src/types/StringTypeSchema';
import toYup from 'src/toYup';

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
    const valid = await yupSchema.isValid('what');
    expect(valid).toBe(false);
});

test('minLength expect pass', async () => {
    const valid = await yupSchema.isValid('hello');
    expect(valid).toBe(true);
});

test('minLength expect fail message', async () => {
    const [error] = await to(yupSchema.validate('what'));
    expect(error.message).toBe(errorMsg);
});
