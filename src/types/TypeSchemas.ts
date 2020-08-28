import StringTypeSchema from './StringTypeSchema';
import NumberTypeSchema from './NumberTypeSchema';
import BooleanTypeSchema from './BooleanTypeSchema';
import DateTypeSchema from './DateTypeSchema';
import ObjectTypeSchema from './ObjectTypeSchema';
import ArrayTypeSchema from './ArrayTypeSchema';

type TypeSchemas =
    | StringTypeSchema
    | NumberTypeSchema
    | BooleanTypeSchema
    | DateTypeSchema
    | ObjectTypeSchema
    | ArrayTypeSchema;

export default TypeSchemas;
