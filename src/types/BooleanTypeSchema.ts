import YupTypeSchema from 'src/types/YupTypeSchema';
import WhenSchema from 'src/types/WhenSchema';
import YupTypeErrors from 'src/types/YupTypeErrors';

type BooleanTypeSchema = YupTypeSchema & {
    type: 'boolean';
    oneOf?: boolean[];
    notOneOf?: boolean[];
    nullable?: boolean;
    errors?: YupTypeErrors & {
        oneOf?: string;
        notOneOf?: string;
    };
    when?: WhenSchema<BooleanTypeSchema>[];
};

export default BooleanTypeSchema;
