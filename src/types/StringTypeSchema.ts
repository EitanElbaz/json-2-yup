import YupTypeErrors from './YupTypeErrors';
import YupTypeSchema from './YupTypeSchema';
import WhenSchema from './WhenSchema';

type StringTypeSchema = YupTypeSchema & {
    minLength?: number;
    maxLength?: number;
    case?: 'lowercase' | 'uppercase';
    uppercase?: number;
    matches?: { regex: string; excludeEmptyString?: boolean };
    format?: 'email' | 'url';
    oneOf?: string[];
    notOneOf?: string[];
    nullable?: boolean;
    errors?: YupTypeErrors & {
        minLength?: string;
        maxLength?: string;
        lowercase?: string;
        uppercase?: string;
        matches?: string;
        email?: string;
        url?: string;
        oneOf?: string;
        notOneOf?: string;
    };
    when?: WhenSchema<StringTypeSchema>[];
};

export default StringTypeSchema;
