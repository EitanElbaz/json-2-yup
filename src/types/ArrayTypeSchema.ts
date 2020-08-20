import YupTypeSchema from './YupTypeSchema';
import WhenSchema from './WhenSchema';
import YupTypeErrors from './YupTypeErrors';
import TypeSchemas from './TypeSchemas';

type ArrayTypeSchema = YupTypeSchema & {
    type: 'array';
    of?: TypeSchemas;
    min?: number;
    max?: number;
    nullable?: boolean;
    errors?: YupTypeErrors & {
        min?: string;
        max?: string;
    };
    when?: WhenSchema<ArrayTypeSchema>[];
};

export default ArrayTypeSchema;
