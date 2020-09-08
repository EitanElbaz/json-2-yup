## Date

Converting a string type json schema to a yup object will return an object the equivalent of `yup.date()` with all of the additional validation configuration.

- [Usage](#usage)
- [Types](../src/types/index.ts)
- [Type Definition](#type)


### Usage

For more advanced usage, check out the [date type test suite](../src/tests/types/date).

```typescript
import { toYup, DateTypeSchema } from 'json-2-yup';
import * as yup from 'yup';

const schema: DateTypeSchema = {
    type: 'date',
    strict: true,
    required: true,
    min: '2020-01-01',
    errors: {
        min: 'MY custom min date message',
        required: 'MY custom required message',
    },
};


const yupSchema = toYup(schema);

console.log(yupSchema.isValidSync('2020-01-02')); //true
console.log(yupSchema.isValidSync('2019-12-31')); //false


// Equivalent to

const yupDateSchema = yup
        .date()
        .min(2, 'My custom min date message')
        .required('My custom required message')
        .strict(true);
```

### Type

```typescript
type DateTypeSchema = YupTypeSchema & {
    type: 'date';

    /**
     * number: as a unix timestamp in seconds
     * string: anything parsable by `new Date(string)` e.g. '2020-12-01'
     */
    min?: number | string;

    /**
     * number: as a unix timestamp in seconds
     * string: anything parsable by `new Date(string)` e.g. '2020-12-01'
     */
    max?: number | string;

    nullable?: boolean;
    errors?: YupTypeErrors & { min?: string; max?: string };
    when?: WhenSchema<DateTypeSchema>[];
};
```