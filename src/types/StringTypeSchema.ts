import YupTypeSchema from './YupTypeSchema';

type StringTypeSchema = YupTypeSchema & {
    minLength?: number;
    maxLength?: number;
    errors?: {
        minLength?: string;
        maxLength?: string;
    };
};

export default StringTypeSchema;
