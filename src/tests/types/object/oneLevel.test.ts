import NumberTypeSchema from 'src/types/NumberTypeSchema';
import toYup from 'src/toYup';
import { NumberSchema, ObjectSchema, ValidationError } from 'yup';
import ObjectTypeSchema from 'src/types/ObjectTypeSchema';
import to from 'await-to-js';

const errorMsg = 'Must be integer';

const schema: ObjectTypeSchema = {
    type: 'object',
    strict: true,
    properties: {
        firstName: {
            type: 'string',
            maxLength: 5,
            minLength: 2,
            strict: true,
            required: true,
            errors: {
                maxLength: 'first name too long',
                minLength: 'first name too short',
                required: 'first name required',
            },
        },
        lastName: {
            type: 'string',
            maxLength: 5,
            minLength: 2,
            strict: true,
            required: true,
            errors: {
                maxLength: 'last name too long',
                minLength: 'last name too short',
                required: 'last name required',
            },
        },
        email: {
            type: 'string',
            format: 'email',
            minLength: 10,
            maxLength: 20,
            strict: true,
            required: true,
            errors: {
                maxLength: 'email too long',
                minLength: 'email too short',
                required: 'email required',
            },
        },
        count: {
            type: 'number',
            max: 10,
            min: 5,
            strict: true,
            required: true,
            errors: {
                min: 'count too low',
                max: 'count too high',
                required: 'count required',
            },
        },
    },
};

const yupSchema = toYup(schema) as ObjectSchema;

test('Object schema expect success', async () => {
    expect(
        yupSchema.isValidSync({
            firstName: 'Will',
            lastName: 'Smith',
            email: 'test@example.com',
            count: 6,
        }),
    ).toBe(true);
});

test('Object schema expect too short error messages', async () => {
    const [error] = await to(
        yupSchema.validate(
            {
                firstName: 'a',
                lastName: 'a',
                email: 'a@a.com',
                count: 4,
            },
            { abortEarly: false },
        ),
    );
    const yupError: ValidationError = error as ValidationError;
    expect(yupError.errors.includes('first name too short')).toBe(true);
    expect(yupError.errors.includes('last name too short')).toBe(true);
    expect(yupError.errors.includes('email too short')).toBe(true);
    expect(yupError.errors.includes('count too low')).toBe(true);
});

test('Object schema expect too long error messages', async () => {
    const [error] = await to(
        yupSchema.validate(
            {
                firstName: 'William',
                lastName: 'Williamson',
                email: 'hello.something@some-company.com',
                count: 20,
            },
            { abortEarly: false },
        ),
    );
    const yupError: ValidationError = error as ValidationError;
    expect(yupError.errors.includes('first name too long')).toBe(true);
    expect(yupError.errors.includes('last name too long')).toBe(true);
    expect(yupError.errors.includes('email too long')).toBe(true);
    expect(yupError.errors.includes('count too high')).toBe(true);
});

test('Object schema expect required error messages', async () => {
    const [error] = await to(
        yupSchema.validate(
            {
                firstName: '',
                lastName: '',
                email: '',
                count: undefined,
            },
            { abortEarly: false },
        ),
    );
    const yupError: ValidationError = error as ValidationError;
    expect(yupError.errors.includes('first name required')).toBe(true);
    expect(yupError.errors.includes('last name required')).toBe(true);
    expect(yupError.errors.includes('email required')).toBe(true);
    expect(yupError.errors.includes('count required')).toBe(true);
});
