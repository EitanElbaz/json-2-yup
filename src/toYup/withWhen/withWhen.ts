import YupTypeSchema from 'src/types/YupTypeSchema';
import WhenSchema from 'src/types/WhenSchema';
import { Schema } from 'yup';
import toYup from 'src/toYup';

const withWhen = <T extends YupTypeSchema, U extends Schema<any>>(
    schema: U,
    jsonSchema: WhenSchema<T>[],
): U => {
    if (Array.isArray(jsonSchema) && jsonSchema.length > 0) {
        jsonSchema.forEach(({ fields, is, then, otherwise }) => {
            schema = schema.when(fields, {
                is,
                then: toYup(then),
                otherwise: otherwise != null ? toYup(otherwise) : undefined,
            });
        });
    }

    return schema;
};

export default withWhen;
