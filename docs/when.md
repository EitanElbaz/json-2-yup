## When

Yup allows you to alter the validation on your data depending on other values within the validated data payload using the `when()` method.

The test suite contains examples of how `when` validation configuration can be used with all the different data types.

- [Type Definition](#type)
- [Array When](../src/tests/types/array/when.test.ts)
- [Boolean When](../src/tests/types/boolean/when.test.ts)
- [Date When](../src/tests/types/date/when.test.ts)
- [Number When](../src/tests/types/number/when.test.ts)
- [Object When](../src/tests/types/object/whenChaining.test.ts)
- [String When](../src/tests/types/string/when.test.ts)

### Type
```typescript
type WhenSchema<T extends YupTypeSchema> = {
    fields: string | string[];
    is: unknown;
    then: T;
    otherwise?: T;
};
```