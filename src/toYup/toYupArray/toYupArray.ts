import * as yup from 'yup';
import { ArraySchema, Schema } from 'yup';
import withWhen from '../withWhen';
import { ArrayTypeSchema, BuildCustomSchema, YupTypeSchema } from '../../types';
import { toYup, withTypeError } from '..';

const toYupArray = <T>(
    jsonSchema: ArrayTypeSchema,
    forceRequired?: boolean,
    builder?: BuildCustomSchema,
): ArraySchema<T> => {
    let yupSchema = yup.array<T>();

    if (jsonSchema.of != null) {
        yupSchema = withOf(yupSchema, jsonSchema, forceRequired, builder);
    }

    if (jsonSchema.min != null) {
        yupSchema = withMin(yupSchema, jsonSchema);
    }

    if (jsonSchema.max != null) {
        yupSchema = withMax(yupSchema, jsonSchema);
    }

    if (jsonSchema.required === true || forceRequired === true) {
        yupSchema = withRequired(yupSchema, jsonSchema);
    }

    if (jsonSchema.nullable != null) {
        yupSchema = withNullable(yupSchema, jsonSchema);
    }

    if (jsonSchema?.errors?.typeError != null) {
        yupSchema = withTypeError(yupSchema, jsonSchema);
    }

    if (jsonSchema.strict) {
        yupSchema = withStrict(yupSchema, jsonSchema);
    }

    yupSchema = withWhen(yupSchema, jsonSchema.when);
    return yupSchema;
};

function withOf(
    schema: ArraySchema<any>,
    jsonSchema: ArrayTypeSchema,
    forceRequired: boolean,
    builder: BuildCustomSchema,
): ArraySchema<any> {
    return schema.of(toYup(jsonSchema.of, forceRequired, builder) as Schema<any>);
}

function withMin(schema: ArraySchema<any>, jsonSchema: ArrayTypeSchema): ArraySchema<any> {
    return schema.min(jsonSchema.min, jsonSchema?.errors?.min);
}

function withMax(schema: ArraySchema<any>, jsonSchema: ArrayTypeSchema): ArraySchema<any> {
    return schema.max(jsonSchema.max, jsonSchema?.errors?.max);
}

function withRequired(schema: ArraySchema<any>, jsonSchema: ArrayTypeSchema): ArraySchema<any> {
    return schema.required(jsonSchema?.errors?.required);
}

function withNullable(schema: ArraySchema<any>, jsonSchema: ArrayTypeSchema): ArraySchema<any> {
    return schema.nullable(jsonSchema.nullable);
}

function withStrict(schema: ArraySchema<any>, jsonSchema: ArrayTypeSchema): ArraySchema<any> {
    return schema.strict(jsonSchema.strict);
}

export default toYupArray;
