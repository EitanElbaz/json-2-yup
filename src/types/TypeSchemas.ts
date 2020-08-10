import StringTypeSchema from 'src/types/StringTypeSchema';
import NumberTypeSchema from 'src/types/NumberTypeSchema';
import ObjectTypeSchema from 'src/types/ObjectTypeSchema';
import BooleanTypeSchema from 'src/types/BooleanTypeSchema';
import ArrayTypeSchema from 'src/types/ArrayTypeSchema';

type TypeSchemas =
    | StringTypeSchema
    | NumberTypeSchema
    | ObjectTypeSchema
    | BooleanTypeSchema
    | ArrayTypeSchema;

export default TypeSchemas;
