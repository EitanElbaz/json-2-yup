import * as yup from 'yup';
import { BooleanSchema } from 'yup';
import BooleanTypeSchema from 'src/types/BooleanTypeSchema';
import withWhen from 'src/toYup/withWhen';

const toYupBoolean = (jsonSchema: BooleanTypeSchema): BooleanSchema => {
    let yupSchema = yup.boolean();

    if (jsonSchema.nullable != null) {
        yupSchema = withNullable(yupSchema, jsonSchema);
    }

    if (jsonSchema.required === true) {
        yupSchema = withRequired(yupSchema, jsonSchema);
    }

    if (jsonSchema.strict) {
        yupSchema = withStrict(yupSchema, jsonSchema);
    }

    withWhen(yupSchema, jsonSchema.when);

    return yupSchema;
};

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
