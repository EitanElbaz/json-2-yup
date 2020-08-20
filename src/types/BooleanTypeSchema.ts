import YupTypeSchema from './YupTypeSchema';
import WhenSchema from './WhenSchema';
import YupTypeErrors from './YupTypeErrors';

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
