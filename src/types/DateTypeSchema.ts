import YupTypeSchema from 'src/types/YupTypeSchema';
import YupTypeErrors from 'src/types/YupTypeErrors';
import WhenSchema from 'src/types/WhenSchema';

type DateTypeSchema = YupTypeSchema & {
    type: 'date';

    // min date as a unix timestamp
    min?: number;

    // max date as a unix timestamp
    max?: number;

    nullable?: boolean;
    errors?: YupTypeErrors & { min?: string; max?: string };
    when?: WhenSchema<DateTypeSchema>[];
};

export default DateTypeSchema;
