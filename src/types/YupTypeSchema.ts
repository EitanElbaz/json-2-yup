import DataType from 'src/types/DataType';

type YupTypeSchema = {
    type: DataType;
    required?: boolean;
    strict?: boolean;
};

export default YupTypeSchema;
