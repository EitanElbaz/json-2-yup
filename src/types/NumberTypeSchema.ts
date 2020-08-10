import YupTypeSchema from 'src/types/YupTypeSchema';
import YupTypeErrors from 'src/types/YupTypeErrors';
import WhenSchema from 'src/types/WhenSchema';

type NumberTypeSchema = YupTypeSchema & {
    type: 'number';
    min?: number;
    max?: number;
    lessThan?: number;
    moreThan?: number;
    sign?: 'positive' | 'negative';
    integer?: boolean;
    oneOf?: number[];
    notOneOf?: number[];
    round?: 'floor' | 'ceil' | 'trunc' | 'round';
    nullable?: boolean;
    errors?: YupTypeErrors & {
        min?: string;
        max?: string;
        lessThan?: string;
        moreThan?: string;
        positive?: string;
        negative?: string;
        integer?: string;
        oneOf?: string;
        notOneOf?: string;
    };
    when?: WhenSchema<NumberTypeSchema>[];
};

export default NumberTypeSchema;
