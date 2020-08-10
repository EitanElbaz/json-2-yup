import YupTypeSchema from 'src/types/YupTypeSchema';
import toYupString from 'src/toYup/toYupString';
import toYupNumber from 'src/toYup/toYupNumber';
import toYupObject from 'src/toYup/toYupObject';
import StringTypeSchema from 'src/types/StringTypeSchema';
import NumberTypeSchema from 'src/types/NumberTypeSchema';
import ObjectTypeSchema from 'src/types/ObjectTypeSchema';

const toYup = (schema: YupTypeSchema) => {
    switch (schema.type) {
        case 'string':
            return toYupString(schema as StringTypeSchema);
        case 'number':
            return toYupNumber(schema as NumberTypeSchema);
        case 'object':
            return toYupObject(schema as ObjectTypeSchema);
    }
};

export default toYup;
