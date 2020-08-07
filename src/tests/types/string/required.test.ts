import StringTypeSchema from 'src/types/StringTypeSchema';
import toYup from 'src/toYup';
import { StringSchema } from 'yup';
import to from 'await-to-js';

const errorMsg = 'Missing Required Value';
const schema: StringTypeSchema = {
    type: 'string',
    required: true,
    errors: {
        required: errorMsg,
    },
};

const yupSchema = toYup(schema) as StringSchema;

test('required expect pass', async () => {
    const valid = await yupSchema.isValid('a');
    expect(valid).toBe(true);
});

test('required expect fail', async () => {
    const valid = await yupSchema.isValid('');
    expect(valid).toBe(false);
});

test('required expect error', async () => {
    const [error] = await to(yupSchema.validate(''));
    expect(error.message).toBe(errorMsg);
});
