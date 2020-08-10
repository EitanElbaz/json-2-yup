import * as yup from 'yup';
import { StringSchema } from 'yup';
import { StringTypeSchema } from 'src/types';
import withWhen from 'src/toYup/withWhen';

const toYupString = (jsonSchema: StringTypeSchema): StringSchema => {
    let yupSchema = yup.string();

    if (jsonSchema.maxLength) {
        yupSchema = withMaxLength(yupSchema, jsonSchema);
    }

    if (jsonSchema.minLength) {
        yupSchema = withMinLength(yupSchema, jsonSchema);
    }

    if (jsonSchema.case === 'lowercase') {
        yupSchema = withLowercase(yupSchema, jsonSchema);
    }

    if (jsonSchema.case === 'uppercase') {
        yupSchema = withUppercase(yupSchema, jsonSchema);
    }

    if (jsonSchema.matches) {
        yupSchema = withMatches(yupSchema, jsonSchema);
    }

    if (jsonSchema.format === 'email') {
        yupSchema = withEmail(yupSchema, jsonSchema);
    }

    if (jsonSchema.format === 'url') {
        yupSchema = withUrl(yupSchema, jsonSchema);
    }

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

    yupSchema = withWhen(yupSchema, jsonSchema.when) as StringSchema;

    return yupSchema;
};

function withMaxLength(schema: StringSchema, jsonSchema: StringTypeSchema): StringSchema {
    return schema.max(jsonSchema.maxLength, jsonSchema?.errors?.maxLength);
}

function withMinLength(schema: StringSchema, jsonSchema: StringTypeSchema): StringSchema {
    return schema.min(jsonSchema.minLength, jsonSchema?.errors?.minLength);
}

function withLowercase(schema: StringSchema, jsonSchema: StringTypeSchema): StringSchema {
    return schema.lowercase(jsonSchema?.errors?.lowercase);
}

function withUppercase(schema: StringSchema, jsonSchema: StringTypeSchema): StringSchema {
    return schema.uppercase(jsonSchema?.errors?.uppercase);
}

function withEmail(schema: StringSchema, jsonSchema: StringTypeSchema): StringSchema {
    return schema.email(jsonSchema?.errors?.email);
}

function withUrl(schema: StringSchema, jsonSchema: StringTypeSchema): StringSchema {
    return schema.url(jsonSchema?.errors?.url);
}

function withMatches(schema: StringSchema, jsonSchema: StringTypeSchema): StringSchema {
    return schema.matches(RegExp(jsonSchema.matches.regex), {
        message: jsonSchema?.errors?.matches,
        excludeEmptyString: jsonSchema.matches.excludeEmptyString || false,
    });
}

function withOneOf(schema: StringSchema, jsonSchema: StringTypeSchema): StringSchema {
    return schema.oneOf(jsonSchema.oneOf, jsonSchema?.errors?.oneOf);
}

function withNotOneOf(schema: StringSchema, jsonSchema: StringTypeSchema): StringSchema {
    return schema.notOneOf(jsonSchema.notOneOf, jsonSchema?.errors?.notOneOf);
}

function withNullable(schema: StringSchema, jsonSchema: StringTypeSchema): StringSchema {
    return schema.nullable(jsonSchema.nullable);
}

function withRequired(schema: StringSchema, jsonSchema: StringTypeSchema): StringSchema {
    return schema.required(jsonSchema?.errors?.required);
}

function withStrict(schema: StringSchema, jsonSchema: StringTypeSchema): StringSchema {
    return schema.strict(jsonSchema.strict);
}

export default toYupString;
