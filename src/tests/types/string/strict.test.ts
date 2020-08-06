import { StringSchema } from 'yup';
import StringTypeSchema from '../../../types/StringTypeSchema';
import toYup from '../../../toYup';

const schema: StringTypeSchema = {
    type: 'string',
    strict: true,
};
const yupSchema = toYup(schema) as StringSchema;

test('strict string type', async () => {
    const valid = await yupSchema.isValid('hello');
    expect(valid).toBe(true);
});

test('strict string type - number value', async () => {
    const valid = await yupSchema.isValid(1);
    expect(valid).toBe(false);
});

test('strict string type - boolean value', async () => {
    const validTrue = await yupSchema.isValid(true);
    const validFalse = await yupSchema.isValid(false);
    expect(validTrue).toBe(false);
    expect(validFalse).toBe(false);
});

test('strict string type - array value', async () => {
    const valid = await yupSchema.isValid([]);
    expect(valid).toBe(false);
});

test('strict string type - object value', async () => {
    const valid = await yupSchema.isValid({});
    expect(valid).toBe(false);
});
