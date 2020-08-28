import { convertPropertyKeypaths } from 'src/lib/object';

test('Object schema nested single key', async () => {
    expect(
        convertPropertyKeypaths({
            type: 'object',
            strict: true,
            properties: {
                'user.firstName.something': {
                    type: 'string',
                    required: true,
                },
            },
        }),
    ).toMatchObject({
        type: 'object',
        strict: true,
        properties: {
            user: {
                type: 'object',
                properties: {
                    firstName: {
                        type: 'object',
                        properties: {
                            something: {
                                type: 'string',
                                required: true,
                            },
                        },
                    },
                },
            },
        },
    });
});

test('Object schema nested multiple keys', async () => {
    expect(
        convertPropertyKeypaths({
            type: 'object',
            strict: true,
            properties: {
                'user.details.something': {
                    type: 'string',
                    required: true,
                },
                'user.details.count': {
                    type: 'number',
                    required: true,
                },
                'user.firstName': {
                    type: 'string',
                    required: true,
                },
                'user.lastName': {
                    type: 'string',
                    required: true,
                },
            },
        }),
    ).toMatchObject({
        type: 'object',
        strict: true,
        properties: {
            user: {
                type: 'object',
                properties: {
                    details: {
                        type: 'object',
                        properties: {
                            something: {
                                type: 'string',
                                required: true,
                            },
                            count: {
                                type: 'number',
                                required: true,
                            },
                        },
                    },
                    firstName: {
                        type: 'string',
                        required: true,
                    },
                    lastName: {
                        type: 'string',
                        required: true,
                    },
                },
            },
        },
    });
});

test('Object schema weird nested multiple keys', async () => {
    expect(
        convertPropertyKeypaths({
            type: 'object',
            strict: true,
            properties: {
                user: {
                    type: 'object',
                    properties: {
                        details: {
                            type: 'object',
                            properties: {
                                something: {
                                    type: 'string',
                                    required: true,
                                },
                                count: {
                                    type: 'number',
                                    required: true,
                                },
                            },
                        },
                    },
                },
                'user.details.date': {
                    type: 'date',
                    required: true,
                },
                'user.firstName': {
                    type: 'string',
                    required: true,
                },
                'user.lastName': {
                    type: 'string',
                    required: true,
                },
            },
        }),
    ).toMatchObject({
        type: 'object',
        strict: true,
        properties: {
            user: {
                type: 'object',
                properties: {
                    details: {
                        type: 'object',
                        properties: {
                            something: {
                                type: 'string',
                                required: true,
                            },
                            count: {
                                type: 'number',
                                required: true,
                            },
                            date: {
                                type: 'date',
                                required: true,
                            },
                        },
                    },
                    firstName: {
                        type: 'string',
                        required: true,
                    },
                    lastName: {
                        type: 'string',
                        required: true,
                    },
                },
            },
        },
    });
});
