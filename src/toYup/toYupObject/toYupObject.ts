import * as yup from 'yup';
import { ObjectSchema, ObjectSchemaDefinition } from 'yup';
import ObjectTypeSchema from 'src/types/ObjectTypeSchema';
import toYup from 'src/toYup';

const toYupObject = (jsonSchema: ObjectTypeSchema): ObjectSchema => {
    const fields: ObjectSchemaDefinition<any> = {};

    const fieldNames = Object.keys(jsonSchema.properties);

    fieldNames.forEach((fieldName) => {
        const schema = jsonSchema.properties[fieldName];
        fields[fieldName] = toYup(schema);
    });

    const yupSchema = yup.object(fields);

    if (jsonSchema.strict === true) {
        withStrict(yupSchema, jsonSchema);
    }

    return yupSchema;
};

function withStrict(schema: ObjectSchema, jsonSchema: ObjectTypeSchema): ObjectSchema {
    return schema.strict(jsonSchema.strict);
}

export default toYupObject;
