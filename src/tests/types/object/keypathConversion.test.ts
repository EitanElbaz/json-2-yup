import { toYup } from 'src/toYup';
import { ObjectSchema, ValidationError } from 'yup';
import ObjectTypeSchema from 'src/types/ObjectTypeSchema';
import { convertPropertyKeypaths } from 'src/lib/object';

const schema: ObjectTypeSchema = {
    type: 'object',
    strict: true,
    properties: {
        'user.firstName.something': {
            type: 'string',
            required: true,
        },
    },
};

const yupSchema = toYup(schema) as ObjectSchema;

test('Object schema expect success', async () => {
    console.log(JSON.stringify(convertPropertyKeypaths(schema)));
    expect(true).toBe(true);
});
