import { MixedSchema } from 'yup';
import { BuildCustomSchema, CustomTypeSchema } from '../../types';

const toYupCustom = (
    jsonSchema: CustomTypeSchema,
    builder: BuildCustomSchema,
    forceRequired?: boolean,
): MixedSchema => {
    let yupSchema = builder(jsonSchema, forceRequired);

    if (jsonSchema.required === true || forceRequired === true) {
        yupSchema = withRequired(yupSchema, jsonSchema);
    }

    return yupSchema;
};

function withRequired(schema: MixedSchema, jsonSchema: CustomTypeSchema): MixedSchema {
    return schema.required(jsonSchema?.errors?.required);
}
export default toYupCustom;
