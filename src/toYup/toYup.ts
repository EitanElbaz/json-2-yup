import YupTypeSchema from 'src/types/YupTypeSchema';
import StringTypeSchema from 'src/types/StringTypeSchema';
import toYupString from 'src/toYup/toYupString';

const toYup = (schema: YupTypeSchema) => {
    switch (schema.type) {
        case 'string':
            return toYupString(schema as StringTypeSchema);
    }
};

export default toYup;
