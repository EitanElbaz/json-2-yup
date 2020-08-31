### Number

Converting a string type json schema to a yup object will return an object the equivalent of `yup.number()` with all of the additional validation configuration.

- [Usage](#usage)
- [NumberTypeSchema](../src/types/NumberTypeSchema.ts)
- [YupTypeSchema](../src/types/YupTypeSchema.ts)
- [YupTypeErrors](../src/types/YupTypeErrors.ts)
- [WhenSchema](../src/types/WhenSchema.ts)
- [Type Definition](#type)


#### Usage

For more advanced usage, check out the [number type test suite](../src/tests/types/number).

```typescript
import { toYup, NumberTypeSchema } from 'json-2-yup';
import * as yup from 'yup';

const schema: NumberTypeSchema = {
    type: 'number',
    strict: true,
    required: true,
    min: 5,
    errors: {
        min: 'My custom min value message',
        required: 'My custom required message'
    },
};

const yupSchema = toYup(schema);

console.log(yupSchema.isValidSync(5)); //true
console.log(yupSchema.isValidSync(1)); //false

// Equivalent to 

const yupNumberSchema = yup
        .number()
        .min(5, 'My custom min value message')
        .required('My custom required message')
        .strict(true);
```

#### Type
```typescript
type NumberTypeSchema = YupTypeSchema & {
    type: 'number';
    min?: number;
    max?: number;
    lessThan?: number;
    moreThan?: number;
    sign?: 'positive' | 'negative';
    integer?: boolean;
    oneOf?: number[];
    notOneOf?: number[];
    round?: 'floor' | 'ceil' | 'trunc' | 'round';
    nullable?: boolean;
    errors?: YupTypeErrors & {
        min?: string;
        max?: string;
        lessThan?: string;
        moreThan?: string;
        positive?: string;
        negative?: string;
        integer?: string;
        oneOf?: string;
        notOneOf?: string;
    };
    when?: WhenSchema<NumberTypeSchema>[];
};
```