## String

Converting a string type json schema to a yup object will return an object the equivalent of `yup.string()` with all of the additional validation configuration.

- [Usage](#usage)
- [StringTypeSchema](../src/types/StringTypeSchema.ts)
- [YupTypeSchema](../src/types/YupTypeSchema.ts)
- [YupTypeErrors](../src/types/YupTypeErrors.ts)
- [WhenSchema](../src/types/WhenSchema.ts)
- [Type Definition](#type)


### Usage

For more advanced usage, check out the [string type test suite](../src/tests/types/string).

```typescript
import { toYup, StringTypeSchema } from 'json-2-yup';
import * as yup from 'yup';

const schema: StringTypeSchema = {
    type: 'string',
    strict: true,
    required: true,
    minLength: 5,
    errors: {
        minLength: 'My custom min length message',
        required: 'My custom required message'
    },
};

const yupSchema = toYup(schema);

console.log(yupSchema.isValidSync('Hello')); //true
console.log(yupSchema.isValidSync('Hi')); //false

// Equivalent to 

const yupStringSchema = yup
        .string()
        .min(5, 'My custom min length message')
        .required('My custom required message')
        .strict(true);
```

### Type
```typescript
type StringTypeSchema = YupTypeSchema & {
    type: 'string';
    minLength?: number;
    maxLength?: number;
    case?: 'lowercase' | 'uppercase';
    uppercase?: number;
    matches?: { regex: string; excludeEmptyString?: boolean };
    format?: 'email' | 'url';
    oneOf?: string[];
    notOneOf?: string[];
    nullable?: boolean;
    errors?: YupTypeErrors & {
        minLength?: string;
        maxLength?: string;
        lowercase?: string;
        uppercase?: string;
        matches?: string;
        email?: string;
        url?: string;
        oneOf?: string;
        notOneOf?: string;
    };
    when?: WhenSchema<StringTypeSchema>[];
};
```