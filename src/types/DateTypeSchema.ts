import YupTypeSchema from './YupTypeSchema';
import YupTypeErrors from './YupTypeErrors';
import WhenSchema from './WhenSchema';

type DateTypeSchema = YupTypeSchema & {
    type: 'date';

    /**
     * number: as a unix timestamp in seconds
     * string: anything parsable by `new Date(string)` e.g. '2020-12-01'
     */
    min?: number | string;

    /**
     * number: as a unix timestamp in seconds
     * string: anything parsable by `new Date(string)` e.g. '2020-12-01'
     */
    max?: number | string;

    nullable?: boolean;
    errors?: YupTypeErrors & { min?: string; max?: string };
    when?: WhenSchema<DateTypeSchema>[];
};

export default DateTypeSchema;
