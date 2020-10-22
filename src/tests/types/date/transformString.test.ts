import { toYup } from 'src/toYup';
import { DateSchema } from 'yup';
import { DateTypeSchema } from 'src/types';

const schema: DateTypeSchema = {
    type: 'date',
    required: true,
    nullable: false,
    inputFormat: 'yyyy-MM-dd',
};

const yupSchema = toYup(schema) as DateSchema;

test('required expect fail', async () => {
    expect(yupSchema.isValidSync(undefined)).toBe(false);
    expect(yupSchema.isValidSync(null)).toBe(false);
    expect(yupSchema.isValidSync('01/01/2018')).toBe(false); //doesn't match the input format
});

test('required expect pass', async () => {
    expect(yupSchema.isValidSync('2018-01-01')).toBe(true);
    expect(
        toYup({
            type: 'date',
            required: true,
            nullable: false,
            inputFormat: 'dd/MM/yyyy',
        } as DateTypeSchema).isValidSync('01/01/2018'),
    ).toBe(true);
    expect(
        toYup({
            type: 'date',
            required: true,
            nullable: false,
            inputFormat: 'MM/yyyy',
        } as DateTypeSchema).isValidSync('01/2018'),
    ).toBe(true);
    expect(
        toYup({
            type: 'date',
            required: true,
            nullable: false,
            inputFormat: 'MM-yyyy',
        } as DateTypeSchema).isValidSync('01-2018'),
    ).toBe(true);
});
