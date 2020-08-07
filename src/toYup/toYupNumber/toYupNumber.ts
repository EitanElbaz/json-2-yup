import * as yup from 'yup';
import { NumberSchema } from 'yup';
import { NumberTypeSchema } from 'src/types';

const toYupNumber = (jsonSchema: NumberTypeSchema): NumberSchema => {
    let yupSchema = yup.number();

    if (jsonSchema.min) {
        yupSchema = withMin(yupSchema, jsonSchema);
    }

    if (jsonSchema.max) {
        yupSchema = withMax(yupSchema, jsonSchema);
    }

    if (jsonSchema.lessThan) {
        yupSchema = withLessThan(yupSchema, jsonSchema);
    }

    if (jsonSchema.moreThan) {
        yupSchema = withMoreThan(yupSchema, jsonSchema);
    }

    if (jsonSchema.sign === 'positive') {
        yupSchema = withPositive(yupSchema, jsonSchema);
    }

    if (jsonSchema.sign === 'negative') {
        yupSchema = withNegative(yupSchema, jsonSchema);
    }

    if (jsonSchema.integer === true) {
        yupSchema = withInteger(yupSchema, jsonSchema);
    }

    if (Array.isArray(jsonSchema.oneOf)) {
        yupSchema = withOneOf(yupSchema, jsonSchema);
    }

    if (Array.isArray(jsonSchema.notOneOf)) {
        yupSchema = withNotOneOf(yupSchema, jsonSchema);
    }

    if (jsonSchema.truncate === true) {
        yupSchema = withTruncate(yupSchema, jsonSchema);
    }

    if (jsonSchema.round != null) {
        yupSchema = withRound(yupSchema, jsonSchema);
    }

    if (jsonSchema.nullable != null) {
        yupSchema = withNullable(yupSchema, jsonSchema);
    }

    if (jsonSchema.required === true) {
        yupSchema = withRequired(yupSchema, jsonSchema);
    }

    if (jsonSchema.strict) {
        yupSchema = withStrict(yupSchema, jsonSchema);
    }

    return yupSchema;
};

function withMin(schema: NumberSchema, jsonSchema: NumberTypeSchema): NumberSchema {
    return schema.min(jsonSchema.min, jsonSchema?.errors?.min);
}

function withMax(schema: NumberSchema, jsonSchema: NumberTypeSchema): NumberSchema {
    return schema.max(jsonSchema.max, jsonSchema?.errors?.max);
}

function withLessThan(schema: NumberSchema, jsonSchema: NumberTypeSchema): NumberSchema {
    return schema.lessThan(jsonSchema.lessThan, jsonSchema?.errors?.lessThan);
}

function withMoreThan(schema: NumberSchema, jsonSchema: NumberTypeSchema): NumberSchema {
    return schema.moreThan(jsonSchema.moreThan, jsonSchema?.errors?.moreThan);
}

function withPositive(schema: NumberSchema, jsonSchema: NumberTypeSchema): NumberSchema {
    return schema.positive(jsonSchema?.errors?.positive);
}

function withNegative(schema: NumberSchema, jsonSchema: NumberTypeSchema): NumberSchema {
    return schema.negative(jsonSchema?.errors?.negative);
}

function withInteger(schema: NumberSchema, jsonSchema: NumberTypeSchema): NumberSchema {
    return schema.integer(jsonSchema?.errors?.integer);
}

function withOneOf(schema: NumberSchema, jsonSchema: NumberTypeSchema): NumberSchema {
    return schema.oneOf(jsonSchema.oneOf, jsonSchema?.errors?.oneOf);
}

function withNotOneOf(schema: NumberSchema, jsonSchema: NumberTypeSchema): NumberSchema {
    return schema.notOneOf(jsonSchema.notOneOf, jsonSchema?.errors?.notOneOf);
}

function withTruncate(schema: NumberSchema, jsonSchema: NumberTypeSchema): NumberSchema {
    return schema.truncate();
}

function withRound(schema: NumberSchema, jsonSchema: NumberTypeSchema): NumberSchema {
    return schema.round(jsonSchema.round);
}

function withNullable(schema: NumberSchema, jsonSchema: NumberTypeSchema): NumberSchema {
    return schema.nullable(jsonSchema.nullable);
}

function withRequired(schema: NumberSchema, jsonSchema: NumberTypeSchema): NumberSchema {
    return schema.required(jsonSchema?.errors?.required);
}

function withStrict(schema: NumberSchema, jsonSchema: NumberTypeSchema): NumberSchema {
    return schema.strict(jsonSchema.strict);
}

export default toYupNumber;
