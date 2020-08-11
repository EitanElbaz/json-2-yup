import YupTypeSchema from 'src/types/YupTypeSchema';
import TypeSchemas from 'src/types/TypeSchemas';

type ObjectTypeSchema = Omit<YupTypeSchema, 'required'> & {
    type: 'object';
    properties: Record<string, TypeSchemas>;
};

export default ObjectTypeSchema;
