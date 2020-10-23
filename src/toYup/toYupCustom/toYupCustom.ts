import { BuildCustomSchema, CustomTypeSchema } from '../../types';

const toYupCustom = (
    jsonSchema: CustomTypeSchema,
    builder: BuildCustomSchema,
    forceRequired?: boolean,
) => {
    return builder(jsonSchema, forceRequired);
};

export default toYupCustom;
