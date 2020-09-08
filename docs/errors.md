## Custom Errors
Every schema type has an optional errors object which allow you to override the default YUP generated error messages for specific failure reasons.

For example, these are the [StringTypeSchema](../src/types/index.ts) error message options:

- [YupTypeErrors](../src/types/index.ts)
- [Example](#example)

```typescript
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
    }
```

### Example

In this example we will set and retrieve our custom Yup error messages, for the `minLength` and `required` rules. The same can be done for all schema types and all schema type rules. Check the schema type's custom error object type definition for which error messages are available.

```typescript
import { toYup, StringTypeSchema } from 'json-2-yup';
import to from 'await-to-js'; 

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

const [error] = await to(yupSchema.validate('Hi'));
console.log(error.errors); //["My custom min length message"]

const [error2] = await to(yupSchema.validate(undefined));
console.log(error2.errors); //["My custom required message"]


```