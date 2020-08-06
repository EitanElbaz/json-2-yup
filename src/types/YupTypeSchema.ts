import DataType from '~/types/DataType';

type YupTypeSchema = {
    type: DataType;
    required?: boolean;
    strict?: boolean;
};

export default YupTypeSchema;
