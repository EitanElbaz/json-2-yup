import { BooleanSchema } from 'yup';
import to from 'await-to-js';
import toYup from 'src/toYup';
import BooleanTypeSchema from 'src/types/BooleanTypeSchema';

const errorMsg = 'Should not be false';

const schema: BooleanTypeSchema = {
    type: 'boolean',
    strict: true,
    notOneOf: [false],
    errors: {
        notOneOf: errorMsg,
    },
};

const yupSchema = toYup(schema) as BooleanSchema;

test('notOneOf expect fail', async () => {
    expect(yupSchema.isValidSync(false)).toBe(false);
});

test('notOneOf expect pass', async () => {
    expect(yupSchema.isValidSync(true)).toBe(true);
});

test('notOneOf expect fail message', async () => {
    const [error] = await to(yupSchema.validate(false));
    expect(error.message).toBe(errorMsg);
});