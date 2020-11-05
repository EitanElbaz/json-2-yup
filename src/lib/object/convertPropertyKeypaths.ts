const set = require('set-value');
import { get } from 'src/lib/fp';
import { ObjectTypeSchema } from '../../types';

const emptyObjectSchema: ObjectTypeSchema = { type: 'object', properties: {} };

const convertPropertyKeypaths = (schema: ObjectTypeSchema): ObjectTypeSchema => {
    if (schema.properties) {
        const newSchema = JSON.parse(JSON.stringify(schema));
        const keys = Object.keys(newSchema.properties);
        keys.forEach((key) => {
            if (key.indexOf('.') !== -1) {
                const fullPathParts = [];
                const parts = key.split('.');

                parts.forEach((part, pIndex) => {
                    const prevPart =
                        pIndex > 0 ? `${fullPathParts[pIndex - 1]}.properties.` : 'properties.';
                    fullPathParts.push(`${prevPart}${part}`);
                });

                fullPathParts.forEach((part: string, fIndex) => {
                    const current: ObjectTypeSchema = get(newSchema, part, emptyObjectSchema);
                    const lastPart = part.split('.').pop();
                    const currentKeys = Object.keys(current.properties);

                    if (currentKeys.indexOf(lastPart) === -1) {
                        const isLast = fIndex === fullPathParts.length - 1;
                        if (isLast) {
                            set(newSchema, part, {
                                ...newSchema.properties[key],
                            });
                        } else {
                            set(newSchema, part, {
                                ...current,
                                properties: { ...current.properties },
                            });
                        }
                    }
                });
                delete newSchema.properties[key];
            }
        });

        return newSchema;
    }

    return schema;
};

export default convertPropertyKeypaths;
