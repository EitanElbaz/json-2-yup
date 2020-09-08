export type DataType = 'string' | 'number' | 'boolean' | 'array' | 'object' | 'date';

export type TypeSchemas =
    | StringTypeSchema
    | NumberTypeSchema
    | BooleanTypeSchema
    | DateTypeSchema
    | ObjectTypeSchema
    | ArrayTypeSchema;

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

    nullable?: boolean;
    errors?: YupTypeErrors & { min?: string; max?: string };
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
    is: unknown;
    then: T;
    otherwise?: T;
};

export type YupTypeErrors = {
    required?: string;
};

export type YupTypeSchema = {
    type: DataType;
    required?: boolean;
    strict?: boolean;
    errors?: YupTypeErrors;
};
