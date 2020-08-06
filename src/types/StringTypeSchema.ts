import YupTypeSchema from './YupTypeSchema';
import YupTypeErrors from './YupTypeErrors';

type StringTypeSchema = YupTypeSchema & {
    minLength?: number;
    maxLength?: number;
    errors?: YupTypeErrors & {
        minLength?: string;
        maxLength?: string;
    };
};

export default StringTypeSchema;
