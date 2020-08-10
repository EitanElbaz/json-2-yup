import YupTypeSchema from 'src/types/YupTypeSchema';
import WhenSchema from 'src/types/WhenSchema';
import { Schema } from 'yup';
import toYup from 'src/toYup';

const withWhen = <T extends YupTypeSchema>(schema: Schema<any>, jsonSchema: WhenSchema<T>[]) => {
    if (Array.isArray(jsonSchema) && jsonSchema.length > 0) {
        jsonSchema.forEach(({ fields, is, then, otherwise }) => {
            schema.when(fields, {
                is,
                then: toYup(then),
                otherwise: otherwise ? toYup(otherwise) : undefined,
            });
        });
    }

    return schema;
};

export default withWhen;
