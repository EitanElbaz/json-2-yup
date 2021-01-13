import { Schema } from 'yup';

export type DataType = 'string' | 'number' | 'boolean' | 'array' | 'object' | 'date' | 'custom';

export type TypeSchemas =
    | StringTypeSchema
    | NumberTypeSchema
    | BooleanTypeSchema
    | DateTypeSchema
    | ObjectTypeSchema
    | ArrayTypeSchema
    | CustomTypeSchema;

export type YupTypeErrors = {
    required?: string;
    typeError?: string;
};

export type YupTypeSchema = {
    type: DataType;
    required?: boolean;
    strict?: boolean;
    errors?: YupTypeErrors;
};

export type ArrayTypeSchema = YupTypeSchema & {
    type: 'array';
    of?: TypeSchemas;
    min?: number;
    max?: number;
    nullable?: boolean;
    errors?: YupTypeErrors & {
        min?: string;
        max?: string;
    };
    when?: WhenSchema<ArrayTypeSchema>[];
};

export type CustomTypeSchema = Pick<YupTypeSchema, 'type' | 'required' | 'errors'> & {
    type: 'custom';
    [key: string]: unknown;
    errors?: YupTypeErrors & {
        [key: string]: string;
    };
};

export type BooleanTypeSchema = YupTypeSchema & {
    type: 'boolean';
    oneOf?: boolean[];
    notOneOf?: boolean[];
    nullable?: boolean;
    errors?: YupTypeErrors & {
        oneOf?: string;
        notOneOf?: string;
    };
    when?: WhenSchema<BooleanTypeSchema>[];
};

export type DateTypeSchema = YupTypeSchema & {
    type: 'date';

    /**
     * number: as a unix timestamp in seconds
     * string: anything parsable by `new Date(string)` e.g. '2020-12-01'
     */
    min?: number | string;

    /**
     * number: as a unix timestamp in seconds
     * string: anything parsable by `new Date(string)` e.g. '2020-12-01'
     */
    max?: number | string;

    /**
     * Min age of a date as a number of months.
     *
     * For example, a value of 5 would mean that the selected date has to be at least
     * 5 months old.
     */
    minAgeMonths?: number;

    /**
     * Max age of a date as a number of months.
     *
     * For example, a value of 5 would mean that the selected date can be no more than
     * 5 months old.
     */
    maxAgeMonths?: number;

    /**
     * https://date-fns.org/v2.16.1/docs/format
     *
     * Setting this property will attempt to transform a string input into a date object.
     * YUP transforms only work when a field is not marked as strict.
     */
    inputFormat?: string;

    nullable?: boolean;
    errors?: YupTypeErrors & {
        min?: string;
        max?: string;
        minAgeMonths?: string;
        maxAgeMonths?: string;
    };
    when?: WhenSchema<DateTypeSchema>[];
};

export type NumberTypeSchema = YupTypeSchema & {
    type: 'number';
    min?: number;
    max?: number;
    lessThan?: number;
    moreThan?: number;
    sign?: 'positive' | 'negative';
    integer?: boolean;
    oneOf?: number[];
    notOneOf?: number[];
    round?: 'floor' | 'ceil' | 'trunc' | 'round';
    nullable?: boolean;
    errors?: YupTypeErrors & {
        min?: string;
        max?: string;
        lessThan?: string;
        moreThan?: string;
        positive?: string;
        negative?: string;
        integer?: string;
        oneOf?: string;
        notOneOf?: string;
    };
    when?: WhenSchema<NumberTypeSchema>[];
};

export type ObjectTypeSchema = Omit<YupTypeSchema, 'required'> & {
    type: 'object';
    properties: Record<string, TypeSchemas>;
};

export type StringTypeSchema = YupTypeSchema & {
    type: 'string';
    minLength?: number;
    maxLength?: number;
    case?: 'lowercase' | 'uppercase';
    uppercase?: number;
    matches?: { regex: string; excludeEmptyString?: boolean };
    format?: 'email' | 'url';
    oneOf?: string[];
    notOneOf?: string[];
    nullable?: boolean;
    errors?: YupTypeErrors & {
        minLength?: string;
        maxLength?: string;
        lowercase?: string;
        uppercase?: string;
        matches?: string;
        email?: string;
        url?: string;
        oneOf?: string;
        notOneOf?: string;
    };
    when?: WhenSchema<StringTypeSchema>[];
};

export type WhenSchema<T extends YupTypeSchema> = {
    fields: string | string[];
    is: string | number | boolean | any[] | object | YupTypeSchema;
    then: T;
    otherwise?: T;
};

export type BuildCustomSchema = (schema: CustomTypeSchema, forceRequired?: boolean) => Schema<any>;
