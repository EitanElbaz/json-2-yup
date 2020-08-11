import DataType from 'src/types/DataType';
import YupTypeErrors from 'src/types/YupTypeErrors';

type YupTypeSchema = {
    type: DataType;
    required?: boolean;
    strict?: boolean;
    errors?: YupTypeErrors;
};

export default YupTypeSchema;
