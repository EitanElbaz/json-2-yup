import toYupString from './toYupString';
import toYupNumber from './toYupNumber';
import toYupBoolean from './toYupBoolean';
import toYupDate from './toYupDate';
import toYupObject from './toYupObject';
import toYupArray from './toYupArray';
import {
    ArrayTypeSchema,
    BooleanTypeSchema,
    DateTypeSchema,
    NumberTypeSchema,
    ObjectTypeSchema,
    StringTypeSchema,
    YupTypeSchema,
} from '../types';

const toYup = (schema: YupTypeSchema, forceRequired: boolean = false) => {
    switch (schema.type) {
        case 'string':
            return toYupString(schema as StringTypeSchema, forceRequired);
        case 'number':
            return toYupNumber(schema as NumberTypeSchema, forceRequired);
        case 'boolean':
            return toYupBoolean(schema as BooleanTypeSchema, forceRequired);
        case 'date':
            return toYupDate(schema as DateTypeSchema, forceRequired);
        case 'object':
            return toYupObject(schema as ObjectTypeSchema, forceRequired);
        case 'array':
            return toYupArray(schema as ArrayTypeSchema, forceRequired);
    }
};

export default toYup;
