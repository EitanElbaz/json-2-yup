import to from 'await-to-js';
import toYup from 'src/toYup';
import NumberTypeSchema from 'src/types/NumberTypeSchema';
import { NumberSchema } from 'yup';

const errorMsg = 'More Than 5';

const schema: NumberTypeSchema = {
    type: 'number',
    strict: true,
    moreThan: 5,
    errors: {
        moreThan: errorMsg,
    },
};

const yupSchema = toYup(schema) as NumberSchema;

test('moreThan expect fail', async () => {
    expect(yupSchema.isValidSync(5)).toBe(false);
    expect(yupSchema.isValidSync([0])).toBe(false);
    expect(yupSchema.isValidSync([5])).toBe(false);
    expect(yupSchema.isValidSync(Number.MIN_VALUE)).toBe(false);
    expect(yupSchema.isValidSync(Number.MIN_SAFE_INTEGER)).toBe(false);
});

test('moreThan expect pass', async () => {
    expect(yupSchema.isValidSync(6)).toBe(true);
    expect(yupSchema.isValidSync(Number.MAX_VALUE)).toBe(true);
    expect(yupSchema.isValidSync(Number.MAX_SAFE_INTEGER)).toBe(true);
});

test('moreThan expect fail message', async () => {
    const [error] = await to(yupSchema.validate(5));
    expect(error.message).toBe(errorMsg);
});