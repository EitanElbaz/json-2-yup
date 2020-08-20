import DataType from './DataType';
import YupTypeErrors from './YupTypeErrors';

type YupTypeSchema = {
    type: DataType;
    required?: boolean;
    strict?: boolean;
    errors?: YupTypeErrors;
};

export default YupTypeSchema;
