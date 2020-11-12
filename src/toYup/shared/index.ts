import { Schema } from 'yup';
import { YupTypeSchema } from '../../types';

export function withTypeError<T extends Schema<unknown>>(schema: T, jsonSchema: YupTypeSchema): T {
    return schema.typeError(jsonSchema?.errors?.typeError);
}
