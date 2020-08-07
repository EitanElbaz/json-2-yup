import { StringSchema } from 'yup';
import to from 'await-to-js';
import StringTypeSchema from 'src/types/StringTypeSchema';
import toYup from 'src/toYup';

const errorMsg = 'Must be "hi" or "bye';
const schema: StringTypeSchema = {
    type: 'string',
    strict: true,
    matches: { regex: '(hi|bye)' },
    errors: {
        matches: errorMsg,
    },
};

const yupSchema = toYup(schema) as StringSchema;

test('matches expect fail', async () => {
    const valid = await yupSchema.isValid('hello');
    expect(valid).toBe(false);
});

test('matches expect pass', async () => {
    const valid1 = await yupSchema.isValid('hi');
    const valid2 = await yupSchema.isValid('bye');
    expect(valid1).toBe(true);
    expect(valid2).toBe(true);
});

test('matches expect error message', async () => {
    const [error] = await to(yupSchema.validate('hello'));
    expect(error.message).toBe(errorMsg);
});

test('matches expect fail empty string', async () => {
    const valid = await yupSchema.isValid('');
    expect(valid).toBe(false);
});

test('matches expect ignore empty string', async () => {
    const excludeEmptyStrings = {
        ...schema,
        matches: { ...schema.matches, excludeEmptyString: true },
    };
    const valid = await toYup(excludeEmptyStrings).isValid('');
    expect(valid).toBe(true);
});
