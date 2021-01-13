import { WhenSchema, YupTypeSchema } from '../../types';
import { Schema, WhenOptionsBuilderFunction, WhenOptionsBuilderObjectIs } from 'yup';
import { toYup } from '..';

const withWhen = <T extends YupTypeSchema, U extends Schema<any>>(
    schema: U,
    jsonSchema: WhenSchema<T>[],
): U => {
    if (Array.isArray(jsonSchema) && jsonSchema.length > 0) {
        jsonSchema.forEach(({ fields, is, then, otherwise }) => {
            const isCached = is;
            const thenCached = then;
            const otherwiseCached = otherwise;

            if (is != null && typeof is === 'object' && is?.hasOwnProperty('type')) {
                // probably a yup type schema
                schema = schema.when(fields, (value, currentSchema) => {
                    if (toYup(isCached as YupTypeSchema).isValidSync(value)) {
                        return toYup(thenCached);
                    }

                    if (otherwiseCached != null) {
                        return toYup(otherwiseCached);
                    }

                    return currentSchema;
                });
            } else {
                schema = schema.when(fields, {
                    is,
                    then: toYup(then),
                    otherwise: otherwise != null ? toYup(otherwise) : undefined,
                });
            }
        });
    }

    return schema;
};

export default withWhen;
