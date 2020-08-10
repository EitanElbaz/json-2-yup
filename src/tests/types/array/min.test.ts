import to from 'await-to-js';
import toYup from 'src/toYup';
import ArrayTypeSchema from 'src/types/ArrayTypeSchema';
import { ArraySchema } from 'yup';

const errorMsg = 'Min 2 items';

const schema: ArrayTypeSchema = {
    type: 'array',
    strict: true,
    required: true,
    min: 2,
    errors: {
        min: errorMsg,
    },
};

const yupSchema = toYup(schema) as ArraySchema<any>;

test('min expect fail', async () => {
    expect(yupSchema.isValidSync([1])).toBe(false);
    expect(yupSchema.isValidSync([])).toBe(false);
    expect(yupSchema.isValidSync(null)).toBe(false);
    expect(yupSchema.isValidSync(undefined)).toBe(false);
    expect(yupSchema.isValidSync({})).toBe(false);
    expect(yupSchema.isValidSync('1')).toBe(false);
    expect(yupSchema.isValidSync(1)).toBe(false);
});

test('min expect pass', async () => {
    expect(yupSchema.isValidSync([1, 2])).toBe(true);
    expect(yupSchema.isValidSync([1, 2, 3, 4])).toBe(true);
    expect(yupSchema.isValidSync([1, 2, 3, 4, 5, 6])).toBe(true);
});

test('min expect fail message', async () => {
    const [error] = await to(yupSchema.validate([1]));
    expect(error.message).toBe(errorMsg);
});
