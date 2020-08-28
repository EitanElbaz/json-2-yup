const set = require('set-value');
import { get } from 'src/lib/fp';
import ObjectTypeSchema from '../../types/ObjectTypeSchema';
import YupTypeSchema from 'src/types/YupTypeSchema';

const emptyObjectSchema: ObjectTypeSchema = { type: 'object', properties: {} };

const convertPropertyKeypaths = (schema: ObjectTypeSchema) => {
    if (schema.properties) {
        const keys = Object.keys(schema.properties);
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
                    const current: ObjectTypeSchema = get(schema, part, emptyObjectSchema);
                    const lastPart = part.split('.').pop();
                    const currentKeys = Object.keys(current.properties);

                    if (currentKeys.indexOf(lastPart) === -1) {
                        const isLast = fIndex === fullPathParts.length - 1;
                        if (isLast) {
                            set(schema, part, {
                                ...schema.properties[key],
                            });
                        } else {
                            set(schema, part, {
                                ...current,
                                properties: { ...current.properties },
                            });
                        }
                    }
                });
                delete schema.properties[key];
            }
        });
    }

    return schema;
};

export default convertPropertyKeypaths;
