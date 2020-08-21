import * as yup from 'yup';
import { DateSchema } from 'yup';
import withWhen from '../withWhen';
import { DateTypeSchema } from '../../types';
import { valueToDate } from 'src/lib/date';

const toYupDate = (jsonSchema: DateTypeSchema): DateSchema => {
    let yupSchema = yup.date();

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

function withMin(schema: DateSchema, jsonSchema: DateTypeSchema): DateSchema {
    let date = valueToDate(jsonSchema.min);

    if (date != null) {
        return schema.min(date, jsonSchema?.errors?.min);
    }

    return schema;
}

function withMax(schema: DateSchema, jsonSchema: DateTypeSchema): DateSchema {
    let date = valueToDate(jsonSchema.max);

    if (date != null) {
        return schema.max(date, jsonSchema?.errors?.max);
    }
    return schema;
}

function withRequired(schema: DateSchema, jsonSchema: DateTypeSchema): DateSchema {
    return schema.required(jsonSchema?.errors?.required);
}

function withNullable(schema: DateSchema, jsonSchema: DateTypeSchema): DateSchema {
    return schema.nullable(jsonSchema.nullable);
}

function withStrict(schema: DateSchema, jsonSchema: DateTypeSchema): DateSchema {
    return schema.strict(jsonSchema.strict);
}

export default toYupDate;
