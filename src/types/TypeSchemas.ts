import StringTypeSchema from 'src/types/StringTypeSchema';
import NumberTypeSchema from 'src/types/NumberTypeSchema';
import ObjectTypeSchema from 'src/types/ObjectTypeSchema';
import BooleanTypeSchema from 'src/types/BooleanTypeSchema';
import { ArraySchema } from 'yup';

type TypeSchemas =
    | StringTypeSchema
    | NumberTypeSchema
    | ObjectTypeSchema
    | BooleanTypeSchema
    | ArraySchema<any>;

export default TypeSchemas;
