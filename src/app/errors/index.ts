import { mapValues } from 'lodash';

enum ErrorCodes {
    TEMPLATE_TEST = 'Unicorn cries',
    // general errors
    e0000 = "I'm a teapot",
    e0001 = 'Question already is the same.',
    e0002 = 'Unknown problem type.',

    e4000 = 'Validation error.',
    e4001 = 'Not Authenticated.',
    e4002 = 'Only user that created a Problem is allowed to modify it.',
}

// Type hacking for simplified error notation and code suggestions
export const E_CODES = (mapValues(
    ErrorCodes,
    (message: string, code: string): any => ({ message, code })
) as any) as typeof ErrorCodes;
