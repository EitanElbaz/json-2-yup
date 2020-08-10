import YupTypeSchema from 'src/types/YupTypeSchema';
import WhenSchema from 'src/types/WhenSchema';
import YupTypeErrors from 'src/types/YupTypeErrors';

type BooleanTypeSchema = YupTypeSchema & {
    type: 'boolean';
    nullable?: boolean;
    errors?: YupTypeErrors & {
        nullable?: string;
    };
    when?: WhenSchema<BooleanTypeSchema>[];
};

export default BooleanTypeSchema;
