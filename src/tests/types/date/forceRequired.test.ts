import { DateTypeSchema } from 'src/types';
import { toYup } from 'src/toYup';
import { DateSchema, ValidationError } from 'yup';
import to from 'await-to-js';

const errorMsg = 'Missing Required Value';
const schema: DateTypeSchema = {
    type: 'date',
    errors: {
        required: errorMsg,
    },
};

const yupSchema = toYup(schema, true) as DateSchema;

test('force required expect pass', async () => {
    expect(yupSchema.isValidSync(new Date())).toBe(true);
});

test('force required expect fail', async () => {
    expect(yupSchema.isValidSync(undefined)).toBe(false);
});

test('force required expect error', async () => {
    const [error] = await to(yupSchema.validate(undefined));
    expect((error as ValidationError).message).toBe(errorMsg);
});
