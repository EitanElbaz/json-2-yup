import YupTypeSchema from './YupTypeSchema';

type WhenSchema<T extends YupTypeSchema> = {
    fields: string | string[];
    is: unknown;
    then: T;
    otherwise?: T;
};

export default WhenSchema;
