## Object

Converting a string type json schema to a yup object will return an object the equivalent of `yup.object()` with all of the additional validation configuration.

- [Usage](#usage)
- [Types](../src/types/index.ts)
- [Type Definition](#type)
- [Keypath Conversion](#keypath-conversion)


### Usage

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

### Type

```typescript
type ObjectTypeSchema = Omit<YupTypeSchema, 'required'> & {
    type: 'object';
    properties: Record<string, TypeSchemas>;
};

```

### Keypath Conversion

Object property keys containing dots will be automatically converted and nested into child object validation types, 

- [Basic Keypath Example](../src/tests/types/object/withKeypaths.test.ts).
- [Advanced Keypath Example](../src/tests/types/object/withNestedKeypaths.test.ts).

 The following example demonstrates how an object definition will be validated once it is converted into a YUP object. It's important to note that this dot notation keypathing can be done at any level of an object type validation schema.
 
 ```typescript
import { ObjectTypeSchema } from 'json-2-yup';

// Property names with dot notation keypaths

const objectSchema: ObjectTypeSchema = {
    type: 'object',
    strict: true,
    properties: {
        'user.details.firstName': {
            type: 'string',
            required: true,
        },
    },
}

// Will actually be converted into this object before being 'YUP-ified'

const actualObjectSchema: ObjectTypeSchema = {
    type: 'object',
    strict: true,
    properties: {
        user: {
            type: 'object',
            properties: {
                details: {
                    type: 'object',
                    properties: {
                        firstName: {
                            type: 'string',
                            required: true,
                        },
                    },
                },
            },
        },
    },
}
```