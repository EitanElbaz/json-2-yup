import YupTypeSchema from './YupTypeSchema';

type NumberTypeSchema = YupTypeSchema & {
    type: 'number';
    min: number;
    max: number;
};

export default NumberTypeSchema;
