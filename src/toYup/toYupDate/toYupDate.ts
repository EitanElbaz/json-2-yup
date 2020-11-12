import * as yup from 'yup';
import { DateSchema } from 'yup';
import { parse, subMonths } from 'date-fns';
import withWhen from '../withWhen';
import { DateTypeSchema } from '../../types';
import { valueToDate } from 'src/lib/date';
import { withTypeError } from 'src/toYup';

const toYupDate = (jsonSchema: DateTypeSchema, forceRequired?: boolean): DateSchema => {
    let yupSchema = yup.date();

    if (jsonSchema.inputFormat != null) {
        yupSchema = yupSchema.transform((value, originalValue) => {
            if (typeof originalValue === 'string' && jsonSchema.inputFormat != null) {
                try {
                    return parse(originalValue, jsonSchema.inputFormat, new Date());
                } catch (e) {
                    return null;
                }
            }

            return value;
        });
    }

    if (jsonSchema.min != null) {
        yupSchema = withMin(yupSchema, jsonSchema);
    }

    if (jsonSchema.max != null) {
        yupSchema = withMax(yupSchema, jsonSchema);
    }

    if (jsonSchema.minAgeMonths != null) {
        yupSchema = withMinAgeMonths(yupSchema, jsonSchema);
    }

    if (jsonSchema.maxAgeMonths != null) {
        yupSchema = withMaxAgeMonths(yupSchema, jsonSchema);
    }

    if (jsonSchema.required === true || forceRequired === true) {
        yupSchema = withRequired(yupSchema, jsonSchema);
    }

    if (jsonSchema?.errors?.typeError != null) {
        yupSchema = withTypeError(yupSchema, jsonSchema);
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

function withMinDate(schema: DateSchema, dateValue: Date, errorMessage?: string): DateSchema {
    return schema.min(dateValue, errorMessage);
}

function withMin(schema: DateSchema, jsonSchema: DateTypeSchema): DateSchema {
    let date = valueToDate(jsonSchema.min);

    if (date != null) {
        return withMinDate(schema, date, jsonSchema?.errors?.min);
    }

    return schema;
}

function withMaxDate(schema: DateSchema, dateValue: Date, errorMessage?: string): DateSchema {
    return schema.max(dateValue, errorMessage);
}

function withMax(schema: DateSchema, jsonSchema: DateTypeSchema): DateSchema {
    let date = valueToDate(jsonSchema.max);

    if (date != null) {
        return withMaxDate(schema, date, jsonSchema?.errors?.max);
    }
    return schema;
}

function withMinAgeMonths(schema: DateSchema, jsonSchema: DateTypeSchema): DateSchema {
    if (typeof jsonSchema.minAgeMonths === 'number') {
        const date = subMonths(new Date(), Math.round(jsonSchema.minAgeMonths));
        // end of day so any date on that day is valid in the yup max check
        date.setHours(23);
        date.setMinutes(59);
        date.setSeconds(59);
        date.setMilliseconds(0);
        return withMaxDate(schema, date, jsonSchema?.errors?.minAgeMonths);
    }

    return schema;
}

function withMaxAgeMonths(schema: DateSchema, jsonSchema: DateTypeSchema): DateSchema {
    if (typeof jsonSchema.maxAgeMonths === 'number') {
        const date = subMonths(new Date(), Math.round(jsonSchema.maxAgeMonths));
        // start of day so any date on that day is valid in the yup min check
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return withMinDate(schema, date, jsonSchema?.errors?.maxAgeMonths);
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
