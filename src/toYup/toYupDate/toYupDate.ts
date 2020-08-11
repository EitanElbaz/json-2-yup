import * as yup from 'yup';
import { DateSchema } from 'yup';
import withWhen from 'src/toYup/withWhen';
import DateTypeSchema from 'src/types/DateTypeSchema';
import { fromUnix } from 'src/lib/date';

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
    return schema.min(fromUnix(jsonSchema.min), jsonSchema?.errors?.min);
}

function withMax(schema: DateSchema, jsonSchema: DateTypeSchema): DateSchema {
    return schema.max(fromUnix(jsonSchema.max), jsonSchema?.errors?.max);
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
