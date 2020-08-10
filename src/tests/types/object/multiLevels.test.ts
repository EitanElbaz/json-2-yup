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
        name: {
            type: 'string',
            strict: true,
            required: true,
            errors: {
                required: 'name required',
            },
        },
        address: {
            type: 'object',
            strict: true,
            properties: {
                streetName: {
                    type: 'string',
                    required: true,
                    strict: true,
                    errors: {
                        required: 'streetName required',
                    },
                },
                town: {
                    type: 'string',
                    required: true,
                    strict: true,
                    errors: {
                        required: 'town required',
                    },
                },
                sweets: {
                    type: 'object',
                    strict: true,
                    properties: {
                        count: {
                            type: 'number',
                            required: true,
                            strict: true,
                            sign: 'positive',
                            errors: {
                                required: 'sweet count required',
                                positive: 'sweet count must be positive',
                            },
                        },
                    },
                },
            },
        },
    },
};

const yupSchema = toYup(schema) as ObjectSchema;

test('Object schema expect success', async () => {
    expect(
        yupSchema.isValidSync({
            name: 'Will',
            address: { streetName: 'some road', town: 'London', sweets: { count: 10 } },
        }),
    ).toBe(true);
});

test('Object schema expect required error messages', async () => {
    const [error] = await to(
        yupSchema.validate(
            {
                name: '',
                address: {
                    streetName: '',
                    town: '',
                    sweets: {
                        count: undefined,
                    },
                },
            },
            { abortEarly: false },
        ),
    );
    const yupError: ValidationError = error as ValidationError;
    expect(yupError.errors.includes('name required')).toBe(true);
    expect(yupError.errors.includes('streetName required')).toBe(true);
    expect(yupError.errors.includes('town required')).toBe(true);
    expect(yupError.errors.includes('sweet count required')).toBe(true);

    const [error2] = await to(
        yupSchema.validate(
            {
                name: '',
                address: {
                    streetName: '',
                    town: '',
                    sweets: {
                        count: -1,
                    },
                },
            },
            { abortEarly: false },
        ),
    );
    const yupError2: ValidationError = error2 as ValidationError;
    expect(yupError2.errors.includes('sweet count must be positive')).toBe(true);
});
