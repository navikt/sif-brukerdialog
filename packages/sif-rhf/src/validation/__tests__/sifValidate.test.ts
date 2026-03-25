import { IntlShape } from 'react-intl';
import { describe, expect, it, vi } from 'vitest';

import { sifValidate } from '../sifValidate';

const mockIntl = {
    formatMessage: vi.fn(({ id }: { id: string }) => `translated:${id}`),
} as unknown as IntlShape;

describe('sifValidate', () => {
    it('returns undefined when validator passes', () => {
        const validate = sifValidate(() => undefined, 'name', mockIntl, 'myForm');
        expect(validate('any')).toBeUndefined();
    });

    it('returns translated message when validator returns error code', () => {
        const validate = sifValidate(() => 'required', 'name', mockIntl, 'myForm');
        expect(validate('')).toBe('translated:myForm.validation.name.required');
    });

    it('uses provided scope in message key', () => {
        const validate = sifValidate(() => 'tooShort', 'email', mockIntl, 'registrationForm');
        expect(validate('')).toBe('translated:registrationForm.validation.email.tooShort');
    });
});
