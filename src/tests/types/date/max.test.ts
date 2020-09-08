import to from 'await-to-js';
import { toYup } from 'src/toYup';
import { DateSchema } from 'yup';
import { DateTypeSchema } from 'src/types';;
import { toUnix } from 'src/lib/date';

const errorMsg = 'Max 01/01/2020';

const schema: DateTypeSchema = {
    type: 'date',
    strict: true,
    required: true,
    max: toUnix(new Date('2020-01-01')),
    errors: {
        max: errorMsg,
    },
};

const yupSchema = toYup(schema) as DateSchema;

test('max expect fail', async () => {
    expect(yupSchema.isValidSync(new Date('2020-01-02'))).toBe(false);
    expect(yupSchema.isValidSync(new Date('2021-12-01'))).toBe(false);
    expect(yupSchema.isValidSync(null)).toBe(false);
    expect(yupSchema.isValidSync(undefined)).toBe(false);
    expect(yupSchema.isValidSync({})).toBe(false);
    expect(yupSchema.isValidSync([])).toBe(false);
});

test('max expect pass', async () => {
    expect(yupSchema.isValidSync(new Date('2019-12-01'))).toBe(true);
    expect(yupSchema.isValidSync(new Date('2020-01-01'))).toBe(true);
});

test('max expect fail message', async () => {
    const [error] = await to(yupSchema.validate(new Date('2020-01-02')));
    expect(error.message).toBe(errorMsg);
});
