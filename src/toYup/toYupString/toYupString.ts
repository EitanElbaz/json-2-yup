import * as yup from 'yup';
import { StringSchema } from 'yup';
import { StringTypeSchema } from 'src/types';

const toYupString = (jsonSchema: StringTypeSchema): StringSchema => {
    let yupSchema = yup.string();

    if (jsonSchema.maxLength) {
        yupSchema = withMaxLength(yupSchema, jsonSchema);
    }

    if (jsonSchema.maxLength) {
        yupSchema = withMaxLength(yupSchema, jsonSchema);
    }

    if (jsonSchema.minLength) {
        yupSchema = withMinLength(yupSchema, jsonSchema);
    }

    if (jsonSchema.matches) {
        yupSchema = withMatches(yupSchema, jsonSchema);
    }

    if (jsonSchema.strict) {
        yupSchema = withStrict(yupSchema, jsonSchema);
    }

    return yupSchema;
};

function withMaxLength(schema: StringSchema, jsonSchema: StringTypeSchema): StringSchema {
    return schema.max(jsonSchema.maxLength, jsonSchema?.errors?.maxLength);
}

function withMinLength(schema: StringSchema, jsonSchema: StringTypeSchema): StringSchema {
    return schema.min(jsonSchema.minLength, jsonSchema?.errors?.minLength);
}

function withMatches(schema: StringSchema, jsonSchema: StringTypeSchema): StringSchema {
    return schema.matches(RegExp(jsonSchema.matches.regex), {
        message: jsonSchema?.errors?.matches,
        excludeEmptyString: jsonSchema.matches.excludeEmptyString || false,
    });
}

function withStrict(schema: StringSchema, jsonSchema: StringTypeSchema): StringSchema {
    return schema.strict(jsonSchema.strict);
}

export default toYupString;
