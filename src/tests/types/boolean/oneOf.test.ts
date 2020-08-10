import { BooleanSchema } from 'yup';
import to from 'await-to-js';
import toYup from 'src/toYup';
import BooleanTypeSchema from 'src/types/BooleanTypeSchema';

const errorMsg = 'Must be true';

const schema: BooleanTypeSchema = {
    type: 'boolean',
    strict: true,
    oneOf: [true],
    errors: {
        oneOf: errorMsg,
    },
};

const yupSchema = toYup(schema) as BooleanSchema;

test('oneOf expect fail', async () => {
    expect(yupSchema.isValidSync(false)).toBe(false);
});

test('oneOf expect pass', async () => {
    expect(yupSchema.isValidSync(true)).toBe(true);
});

test('oneOf expect fail message', async () => {
    const [error] = await to(yupSchema.validate(false));
    expect(error.message).toBe(errorMsg);
});