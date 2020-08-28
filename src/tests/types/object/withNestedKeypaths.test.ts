import ObjectTypeSchema from 'src/types/ObjectTypeSchema';
import { toYup } from 'src/toYup';
import { ObjectSchema } from 'yup';

const schema: ObjectTypeSchema = {
    type: 'object',
    strict: true,
    properties: {
        user: {
            type: 'object',
            properties: {
                'details.boolean': {
                    type: 'boolean',
                    required: true,
                    strict: true,
                },
            },
        },
        'user.firstName': {
            type: 'string',
            strict: true,
            required: true,
        },
        'user.lastName': {
            type: 'string',
            strict: true,
            required: true,
        },
        'user.details.count': {
            type: 'number',
            strict: true,
            required: true,
        },
    },
};

const yupSchema = toYup(schema) as ObjectSchema;

test('Object schema expect success', async () => {
    expect(
        yupSchema.isValidSync({
            user: {
                firstName: 'stan',
                lastName: 'williams',
                details: { count: 1, boolean: true },
            },
        }),
    ).toBe(true);
});
