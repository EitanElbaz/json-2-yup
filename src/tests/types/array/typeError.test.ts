import { ArraySchema, ValidationError } from 'yup';
import to from 'await-to-js';
import { ArrayTypeSchema } from 'src/types';
import { toYup } from 'src/toYup';

const errorMsg = 'Has to be an array';
const schema: ArrayTypeSchema = {
    type: 'array',
    strict: true,
    required: true,
    errors: {
        typeError: errorMsg,
    },
};
const yupSchema = toYup(schema) as ArraySchema<any>;

test('typeError expect fail', async () => {
    expect(yupSchema.isValidSync(5)).toBe(false);
    expect(yupSchema.isValidSync('5')).toBe(false);
    expect(yupSchema.isValidSync(true)).toBe(false);
    expect(yupSchema.isValidSync(false)).toBe(false);
    expect(yupSchema.isValidSync({})).toBe(false);
    expect(yupSchema.isValidSync(null)).toBe(false);
    expect(yupSchema.isValidSync(undefined)).toBe(false);
});

test('typeError expect pass', async () => {
    expect(yupSchema.isValidSync([''])).toBe(true);
});

test('typeError expect fail message', async () => {
    const [error] = await to(yupSchema.validate('5'));
    expect((error as ValidationError).message).toBe(errorMsg);
});
