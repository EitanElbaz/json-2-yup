import YupTypeErrors from 'src/types/YupTypeErrors';
import YupTypeSchema from 'src/types/YupTypeSchema';

type StringTypeSchema = YupTypeSchema & {
    minLength?: number;
    maxLength?: number;
    matches?: { regex: string; excludeEmptyString?: boolean };
    format: 'email' | 'url';
    errors?: YupTypeErrors & {
        minLength?: string;
        maxLength?: string;
        matches?: string;
        email?: string;
        url?: string;
    };
};

export default StringTypeSchema;
