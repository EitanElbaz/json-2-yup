import StringTypeSchema from 'src/types/StringTypeSchema';
import NumberTypeSchema from 'src/types/NumberTypeSchema';
import BooleanTypeSchema from 'src/types/BooleanTypeSchema';
import DateTypeSchema from 'src/types/DateTypeSchema';
import ObjectTypeSchema from 'src/types/ObjectTypeSchema';
import ArrayTypeSchema from 'src/types/ArrayTypeSchema';

type TypeSchemas =
    | StringTypeSchema
    | NumberTypeSchema
    | BooleanTypeSchema
    | DateTypeSchema
    | ObjectTypeSchema
    | ArrayTypeSchema;

export default TypeSchemas;
