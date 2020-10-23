import { BuildCustomSchema, CustomTypeSchema } from '../../types';

const toYupCustom = (
    jsonSchema: CustomTypeSchema,
    builder: BuildCustomSchema,
    forceRequired?: boolean,
) => {
    if (builder != null) {
        return builder(jsonSchema, forceRequired);
    }

    console.warn('You need to pass a custom schema builder function for custom schemas to work.');

    return null;
};

export default toYupCustom;
