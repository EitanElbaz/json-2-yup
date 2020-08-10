import YupTypeSchema from 'src/types/YupTypeSchema';
import WhenSchema from 'src/types/WhenSchema';
import YupTypeErrors from 'src/types/YupTypeErrors';
import TypeSchemas from 'src/types/TypeSchemas';

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
