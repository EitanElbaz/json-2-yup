import YupTypeSchema from 'src/types/YupTypeSchema';
import StringTypeSchema from 'src/types/StringTypeSchema';
import toYupString from 'src/toYup/toYupString';
import toYupNumber from 'src/toYup/toYupNumber';
import NumberTypeSchema from 'src/types/NumberTypeSchema';

const toYup = (schema: YupTypeSchema) => {
    switch (schema.type) {
        case 'string':
            return toYupString(schema as StringTypeSchema);
        case 'number':
            return toYupNumber(schema as NumberTypeSchema);
    }
};

export default toYup;
