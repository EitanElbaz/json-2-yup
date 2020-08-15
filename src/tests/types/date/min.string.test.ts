import to from 'await-to-js';
import { toYup } from 'src/toYup';
import { DateSchema } from 'yup';
import DateTypeSchema from 'src/types/DateTypeSchema';
import { toUnix } from 'src/lib/date';

const errorMsg = 'Min 01/01/2020';

const schema: DateTypeSchema = {
    type: 'date',
    strict: true,
    required: true,
    min: '2020-01-01',
    errors: {
        min: errorMsg,
    },
};

const yupSchema = toYup(schema) as DateSchema;

test('min expect fail', async () => {
    expect(yupSchema.isValidSync(new Date('2019-12-01'))).toBe(false);
    expect(yupSchema.isValidSync(null)).toBe(false);
    expect(yupSchema.isValidSync(undefined)).toBe(false);
    expect(yupSchema.isValidSync({})).toBe(false);
    expect(yupSchema.isValidSync([])).toBe(false);
});

test('min expect pass', async () => {
    expect(yupSchema.isValidSync(new Date('2020-12-01'))).toBe(true);
    expect(yupSchema.isValidSync(new Date('2020-01-01'))).toBe(true);
    expect(yupSchema.isValidSync(new Date('2020-01-02'))).toBe(true);
});

test('min expect fail message', async () => {
    const [error] = await to(yupSchema.validate(new Date('2019-12-01')));
    expect(error.message).toBe(errorMsg);
});