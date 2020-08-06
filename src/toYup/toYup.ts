import toYupString from './toYupString';
import YupTypeSchema from '../types/YupTypeSchema';
import StringTypeSchema from '../types/StringTypeSchema';

const toYup = (schema: YupTypeSchema) => {
    switch (schema.type) {
        case 'string':
            return toYupString(schema as StringTypeSchema);
    }
};

export default toYup;
