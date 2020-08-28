import toYupString from './toYupString';
import toYupNumber from './toYupNumber';
import toYupBoolean from './toYupBoolean';
import toYupDate from './toYupDate';
import toYupObject from './toYupObject';
import toYupArray from './toYupArray';
import YupTypeSchema from '../types/YupTypeSchema';
import StringTypeSchema from '../types/StringTypeSchema';
import NumberTypeSchema from '../types/NumberTypeSchema';
import BooleanTypeSchema from '../types/BooleanTypeSchema';
import DateTypeSchema from '../types/DateTypeSchema';
import ObjectTypeSchema from '../types/ObjectTypeSchema';
import ArrayTypeSchema from '../types/ArrayTypeSchema';

const toYup = (schema: YupTypeSchema) => {
    switch (schema.type) {
        case 'string':
            return toYupString(schema as StringTypeSchema);
        case 'number':
            return toYupNumber(schema as NumberTypeSchema);
        case 'boolean':
            return toYupBoolean(schema as BooleanTypeSchema);
        case 'date':
            return toYupDate(schema as DateTypeSchema);
        case 'object':
            return toYupObject(schema as ObjectTypeSchema);
        case 'array':
            return toYupArray(schema as ArrayTypeSchema);
    }
};

export default toYup;
