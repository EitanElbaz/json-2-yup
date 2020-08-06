import StringTypeSchema from '../../../types/StringTypeSchema';
import toYup from '../../../toYup';
import { StringSchema } from 'yup';
import to from 'await-to-js';

const errorMsg = 'Max 5 chars';
const schema: StringTypeSchema = {
    type: 'string',
    strict: true,
    maxLength: 5,
    errors: {
        maxLength: errorMsg,
    },
};
const yupSchema = toYup(schema) as StringSchema;

test('maxLength expect fail', async () => {
    const valid = await yupSchema.isValid('whats up');
    expect(valid).toBe(false);
});

test('maxLength expect pass', async () => {
    const valid = await yupSchema.isValid('what');
    expect(valid).toBe(true);
});

test('minLength expect fail message', async () => {
    const [error] = await to(yupSchema.validate('whats up'));
    expect(error.message).toBe(errorMsg);
});
