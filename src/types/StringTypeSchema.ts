import YupTypeErrors from 'src/types/YupTypeErrors';
import YupTypeSchema from 'src/types/YupTypeSchema';

type StringTypeSchema = YupTypeSchema & {
    minLength?: number;
    maxLength?: number;
    errors?: YupTypeErrors & {
        minLength?: string;
        maxLength?: string;
    };
};

export default StringTypeSchema;
