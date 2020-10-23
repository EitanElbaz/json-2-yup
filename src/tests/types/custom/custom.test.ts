import to from 'await-to-js';
import { toYup } from 'src/toYup';
import { BuildCustomSchema, CustomTypeSchema, NumberTypeSchema } from 'src/types';
import { NumberSchema, ValidationError } from 'yup';
import * as yup from 'yup';

const errorMsg = 'custom min 5 chars';

declare module 'yup' {
    export interface NumberSchema {
        myCustomFunc(errMessage: string): NumberSchema;
    }
}

yup.addMethod<yup.StringSchema<string>>(yup.number, 'myCustomFunc', function (errMessage: string) {
    return this.test('myCustomFunc', errMessage, async function (value: number) {
        return value >= 5;
    });
});

const buildCustom: BuildCustomSchema = (schema: CustomTypeSchema, forceRequired) => {
    return yup.number().myCustomFunc(errorMsg);
};

const yupSchema = toYup(
    {
        type: 'custom',
    } as CustomTypeSchema,
    false,
    buildCustom,
);

test('custom expect fail', async () => {
    expect(await yupSchema.isValid(4)).toBe(false);
});

test('custom expect pass', async () => {
    expect(await yupSchema.isValid(5)).toBe(true);
});

test('custom expect fail message', async () => {
    const [error] = await to(yupSchema.validate(4));
    expect((error as ValidationError).message).toBe(errorMsg);
});