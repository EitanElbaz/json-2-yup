import YupTypeSchema from 'src/types/YupTypeSchema';
import toYupString from 'src/toYup/toYupString';
import toYupNumber from 'src/toYup/toYupNumber';
import toYupBoolean from 'src/toYup/toYupBoolean';
import toYupObject from 'src/toYup/toYupObject';
import StringTypeSchema from 'src/types/StringTypeSchema';
import NumberTypeSchema from 'src/types/NumberTypeSchema';
import BooleanTypeSchema from 'src/types/BooleanTypeSchema';
import ObjectTypeSchema from 'src/types/ObjectTypeSchema';
import toYupArray from 'src/toYup/toYupArray';
import ArrayTypeSchema from 'src/types/ArrayTypeSchema';
import DateTypeSchema from 'src/types/DateTypeSchema';
import toYupDate from 'src/toYup/toYupDate';

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
