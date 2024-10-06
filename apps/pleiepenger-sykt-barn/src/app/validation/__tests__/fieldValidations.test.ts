import { hasValue } from '@navikt/sif-common-formik-ds/src/validation/validationUtils';
import { vi } from 'vitest';

vi.mock('@navikt/sif-common-core-ds/src/utils/envUtils', () => {
    return {
        getEnvironmentVariable: () => 'someEnvVar',
    };
});

vi.mock('@navikt/sif-common/src/env/commonEnv', () => {
    return {
        getEnvironmentVariable: () => 'mockedApiUrl',
        getEnvVariableOrDefault: () => 'mockedApiUrl',
    };
});

describe('fieldValidations', () => {
    describe('hasValue', () => {
        it('should return true if provided value is not undefined, null or empty string', () => {
            expect(hasValue('someValue')).toBe(true);
            expect(hasValue(1234)).toBe(true);
            expect(hasValue([])).toBe(true);
            expect(hasValue({})).toBe(true);
            expect(hasValue(true)).toBe(true);
            expect(hasValue(false)).toBe(true);
        });

        it('should return false if the provided value is undefined, null or empty string', () => {
            expect(hasValue('')).toBe(false);

            expect(hasValue(null)).toBe(false);
            expect(hasValue(undefined)).toBe(false);
        });
    });
});
