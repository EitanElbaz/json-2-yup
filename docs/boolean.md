## Boolean

Converting a string type json schema to a yup object will return an object the equivalent of `yup.boolean()` with all of the additional validation configuration.

- [Usage](#usage)
- [Types](../src/types/index.ts)
- [Type Definition](#type)


### Usage

For more advanced usage, check out the [boolean type test suite](../src/tests/types/boolean).

```typescript
import { toYup, BooleanTypeSchema } from 'json-2-yup';
import * as yup from 'yup';

const schema: BooleanTypeSchema = {
    type: 'boolean',
    strict: true,
    required: true,
    errors: {
        required: 'MY custom required message',
    },
};


const yupSchema = toYup(schema);

console.log(yupSchema.isValidSync(true)); //true
console.log(yupSchema.isValidSync(false)); //true
console.log(yupSchema.isValidSync('true')); //false
console.log(yupSchema.isValidSync('false')); //false


// Equivalent to

const yupBooleanSchema = yup
        .boolean()
        .required('My custom required message')
        .strict(true);
```

### Type

```typescript
type BooleanTypeSchema = YupTypeSchema & {
    type: 'boolean';
    oneOf?: boolean[];
    notOneOf?: boolean[];
    nullable?: boolean;
    errors?: YupTypeErrors & {
        oneOf?: string;
        notOneOf?: string;
    };
    when?: WhenSchema<BooleanTypeSchema>[];
};
```