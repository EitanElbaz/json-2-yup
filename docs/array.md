## Array

Converting a string type json schema to a yup object will return an object the equivalent of `yup.array()` with all of the additional validation configuration.

- [Usage](#usage)
- [Types](../src/types/index.ts)
- [Type Definition](#type)


### Usage

For more advanced usage, check out the [array type test suite](../src/tests/types/array).

```typescript
import { toYup, ArrayTypeSchema } from 'json-2-yup';
import * as yup from 'yup';

const schema: ArrayTypeSchema = {
    type: 'array',
    strict: true,
    required: true,
    min: 2,
    errors: {
        min: 'My custom min length message',
        required: 'My custom required message'
    },
};

const yupSchema = toYup(schema);

console.log(yupSchema.isValidSync(['Good', 'Morning'])); //true
console.log(yupSchema.isValidSync('Hello')); //false


// Equivalent to

const yupArraySchema = yup
        .array()
        .min(2, 'My custom min length message')
        .required('My custom required message')
        .strict(true);
```

### Type

```typescript
type ArrayTypeSchema = YupTypeSchema & {
    type: 'array';
    of?: TypeSchemas;
    min?: number;
    max?: number;
    nullable?: boolean;
    errors?: YupTypeErrors & {
        min?: string;
        max?: string;
    };
    when?: WhenSchema<ArrayTypeSchema>[];
};
```