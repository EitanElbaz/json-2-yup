import YupTypeSchema from './YupTypeSchema';
import TypeSchemas from './TypeSchemas';

type ObjectTypeSchema = Omit<YupTypeSchema, 'required'> & {
    type: 'object';
    properties: Record<string, TypeSchemas>;
};

export default ObjectTypeSchema;
