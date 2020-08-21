import { WhenSchema, YupTypeSchema } from '../../types';
import { Schema } from 'yup';
import { toYup } from '..';

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
