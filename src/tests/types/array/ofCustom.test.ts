import to from 'await-to-js';
import { toYup } from 'src/toYup';
import { ArrayTypeSchema, BuildCustomSchema, CustomTypeSchema } from 'src/types';
import { ArraySchema, ValidationError } from 'yup';
import * as yup from 'yup';

const errorMsg = 'custom min 5';

const schema: ArrayTypeSchema = {
    type: 'array',
    strict: true,
    required: true,
    of: {
        type: 'custom',
    },
};

const buildCustom: BuildCustomSchema = (schema: CustomTypeSchema, forceRequired) => {
    return yup.number().min(5, errorMsg);
};

const yupSchema = toYup(schema, false, buildCustom) as ArraySchema<any>;

test('of custom expect fail', async () => {
    expect(yupSchema.isValidSync([0, 1, -1, 4])).toBe(false);
});

test('of custom expect pass', async () => {
    expect(yupSchema.isValidSync([5, 6, 100])).toBe(true);
});

test('of custom expect fail message', async () => {
    const [error] = await to(yupSchema.validate([4]));
    expect(error.message).toBe(errorMsg);
});
