### Object

Converting a string type json schema to a yup object will return an object the equivalent of `yup.object()` with all of the additional validation configuration.

- [Usage](#usage)
- [ObjectTypeSchema](../src/types/ObjectTypeSchema.ts)
- [YupTypeSchema](../src/types/YupTypeSchema.ts)
- [YupTypeErrors](../src/types/YupTypeErrors.ts)
- [WhenSchema](../src/types/WhenSchema.ts)
- [Type Definition](#type)


#### Usage

For more advanced usage, check out the [object type test suite](../src/tests/types/object).

```typescript
import { toYup, ObjectTypeSchema } from 'json-2-yup';
import * as yup from 'yup';

const schema: ObjectTypeSchema = {
    type: 'object',
    strict: true,
    properties: {
        firstName: {
            type: 'string',
            minLength: 2,
            strict: true,
            required: true,
            errors: {
                minLength: 'first name too short',
                required: 'first name required',
            },
        },
        lastName: {
            type: 'string',
            minLength: 2,
            strict: true,
            required: true,
            errors: {
                minLength: 'last name too short',
                required: 'last name required',
            },
        },
    },
};


const yupSchema = toYup(schema);

console.log(yupSchema.isValidSync({
    firstName: 'Bob',
    lastName: 'Jones',
})); //true

console.log(yupSchema.isValidSync({
    firstName: 'Bobby',
    lastName: 'W',
})); //false


// Equivalent to

const yupBooleanSchema = yup
        .object({
            firstName: yup.string()
                        .min(2, 'first name too short')
                        .required('first name required')
                        .strict(true),
            lastName: yup.string()
                        .min(2, 'last name too short')
                        .required('last name required')
                        .strict(true),
        })
        .strict(true);
```

#### Type

```typescript
type ObjectTypeSchema = Omit<YupTypeSchema, 'required'> & {
    type: 'object';
    properties: Record<string, TypeSchemas>;
};

```