import * as yup from 'yup';
import { ArraySchema, Schema } from 'yup';
import withWhen from 'src/toYup/withWhen';
import ArrayTypeSchema from 'src/types/ArrayTypeSchema';
import { toYup } from 'src/toYup';

const toYupArray = <T>(jsonSchema: ArrayTypeSchema): ArraySchema<T> => {
    let yupSchema = yup.array<T>();

    if (jsonSchema.of != null) {
        yupSchema = withOf(yupSchema, jsonSchema);
    }

    if (jsonSchema.min != null) {
        yupSchema = withMin(yupSchema, jsonSchema);
    }

    if (jsonSchema.max != null) {
        yupSchema = withMax(yupSchema, jsonSchema);
    }

    if (jsonSchema.required === true) {
        yupSchema = withRequired(yupSchema, jsonSchema);
    }

    if (jsonSchema.nullable != null) {
        yupSchema = withNullable(yupSchema, jsonSchema);
    }

    if (jsonSchema.strict) {
        yupSchema = withStrict(yupSchema, jsonSchema);
    }

    yupSchema = withWhen(yupSchema, jsonSchema.when);
    return yupSchema;
};

function withOf(schema: ArraySchema<any>, jsonSchema: ArrayTypeSchema): ArraySchema<any> {
    return schema.of(toYup(jsonSchema.of) as Schema<any>);
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
