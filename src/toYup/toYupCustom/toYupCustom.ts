import { Schema } from 'yup';
import { BuildCustomSchema, CustomTypeSchema } from '../../types';

const toYupCustom = (jsonSchema: CustomTypeSchema, builder: BuildCustomSchema): Schema<any> => {
    return builder(jsonSchema);
};

export default toYupCustom;
