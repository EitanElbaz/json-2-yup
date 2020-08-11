import YupTypeSchema from 'src/types/YupTypeSchema';

type WhenSchema<T extends YupTypeSchema> = {
    fields: string | string[];
    is: unknown;
    then: T;
    otherwise?: T;
};

export default WhenSchema;
