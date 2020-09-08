import * as yup from 'yup';
import { ObjectSchema, ObjectSchemaDefinition } from 'yup';
import { ObjectTypeSchema, YupTypeSchema } from '../../types';
import { toYup } from '..';
import { convertPropertyKeypaths } from 'src/lib/object';

const toYupObject = (jsonSchema: ObjectTypeSchema, forceRequired?: boolean): ObjectSchema => {
    const fields: ObjectSchemaDefinition<any> = {};

    const convertedSchema = convertPropertyKeypaths({ ...jsonSchema });
    const fieldNames = Object.keys(convertedSchema.properties);

    fieldNames.forEach((fieldName) => {
        let schema = convertedSchema.properties[fieldName];
        if (schema.type === 'object') {
            schema = convertPropertyKeypaths(schema as ObjectTypeSchema);
        }
        fields[fieldName] = toYup(schema, forceRequired);
    });

    const yupSchema = yup.object(fields);

    if (convertedSchema.strict === true) {
        withStrict(yupSchema, convertedSchema);
    }

    return yupSchema;
};

function withStrict(schema: ObjectSchema, jsonSchema: ObjectTypeSchema): ObjectSchema {
    return schema.strict(jsonSchema.strict);
}

export default toYupObject;
