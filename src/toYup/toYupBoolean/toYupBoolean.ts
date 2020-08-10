import * as yup from 'yup';
import { BooleanSchema } from 'yup';
import BooleanTypeSchema from 'src/types/BooleanTypeSchema';
import withWhen from 'src/toYup/withWhen';

const toYupBoolean = (jsonSchema: BooleanTypeSchema): BooleanSchema => {
    let yupSchema = yup.boolean();

    if (Array.isArray(jsonSchema.oneOf)) {
        yupSchema = withOneOf(yupSchema, jsonSchema);
    }

    if (Array.isArray(jsonSchema.notOneOf)) {
        yupSchema = withNotOneOf(yupSchema, jsonSchema);
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

    yupSchema = withWhen(yupSchema, jsonSchema.when) as BooleanSchema;

    return yupSchema;
};

function withOneOf(schema: BooleanSchema, jsonSchema: BooleanTypeSchema): BooleanSchema {
    return schema.oneOf(jsonSchema.oneOf, jsonSchema?.errors?.oneOf);
}

function withNotOneOf(schema: BooleanSchema, jsonSchema: BooleanTypeSchema): BooleanSchema {
    return schema.notOneOf(jsonSchema.notOneOf, jsonSchema?.errors?.notOneOf);
}

function withNullable(schema: BooleanSchema, jsonSchema: BooleanTypeSchema): BooleanSchema {
    return schema.nullable(jsonSchema.nullable);
}

function withRequired(schema: BooleanSchema, jsonSchema: BooleanTypeSchema): BooleanSchema {
    return schema.required(jsonSchema?.errors?.required);
}

function withStrict(schema: BooleanSchema, jsonSchema: BooleanTypeSchema): BooleanSchema {
    return schema.strict(jsonSchema.strict);
}

export default toYupBoolean;
