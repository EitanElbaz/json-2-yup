import { ObjectSchema, ValidationError } from 'yup';
import to from 'await-to-js';
import toYup from 'src/toYup';
import ObjectTypeSchema from 'src/types/ObjectTypeSchema';

const schema: ObjectTypeSchema = {
    type: 'object',
    strict: true,
    properties: {
        manyNumbers: {
            type: 'boolean',
            strict: true,
            required: true,
        },
        numbers: {
            type: 'array',
            strict: true,
            required: true,
            of: { type: 'number', strict: true },
            when: [
                {
                    fields: 'manyNumbers',
                    is: true,
                    then: {
                        type: 'array',
                        min: 2,
                        errors: {
                            min: 'Min 2 items when manyNumbers is true',
                        },
                    },
                    otherwise: {
                        type: 'array',
                        max: 0,
                        errors: {
                            max: 'Max 0 when manyNumbers is false',
                        },
                    },
                },
            ],
        },
    },
};

const yupSchema = toYup(schema) as ObjectSchema;

test('when array expect fail', async () => {
    expect(
        yupSchema.isValidSync({
            manyNumbers: true,
            numbers: [1],
        }),
    ).toBe(false);
});

test('when array expect pass', async () => {
    expect(
        yupSchema.isValidSync({
            manyNumbers: true,
            numbers: [1, 2],
        }),
    ).toBe(true);
});

test('when boolean manyNumbers true expect errors', async () => {
    const [error] = await to(
        yupSchema.validate({
            manyNumbers: true,
            numbers: [1],
        }),
    );
    const yupError = error as ValidationError;
    expect(yupError.errors).toContain('Min 2 items when manyNumbers is true');
});

test('when boolean manyNumbers false expect errors', async () => {
    const [error] = await to(
        yupSchema.validate({
            manyNumbers: false,
            numbers: [1],
        }),
    );
    const yupError = error as ValidationError;
    expect(yupError.errors).toContain('Max 0 when manyNumbers is false');
});
