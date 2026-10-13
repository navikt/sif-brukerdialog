import { IntlShape } from 'react-intl';
import { describe, expect, it, vi } from 'vitest';

import { sifValidateField } from '../sifValidate';

const mockIntl = {
    formatMessage: vi.fn(({ id }: { id: string }, values?: Record<string, unknown>) =>
        values ? `translated:${id}:${JSON.stringify(values)}` : `translated:${id}`,
    ),
} as unknown as IntlShape;

describe('sifValidate', () => {
    it('returns undefined when validator passes', () => {
        const validate = sifValidateField(() => undefined, 'name', mockIntl, 'myForm');
        expect(validate('any')).toBeUndefined();
    });

    it('returns translated message when validator returns error code', () => {
        const validate = sifValidateField(() => 'required', 'name', mockIntl, 'myForm');
        expect(validate('')).toBe('translated:myForm.validation.name.required');
    });

    it('uses provided scope in message key', () => {
        const validate = sifValidateField(() => 'tooShort', 'email', mockIntl, 'registrationForm');
        expect(validate('')).toBe('translated:registrationForm.validation.email.tooShort');
    });

    it('passes interpolation values when provided', () => {
        const validate = sifValidateField(
            () => 'dateIsAfterMax',
            'fom',
            mockIntl,
            '@sifSoknadForms.bostedUtlandForm',
            (errorCode) => (errorCode === 'dateIsAfterMax' ? { dato: '19.04.2026' } : undefined),
        );
        expect(validate('')).toBe(
            'translated:@sifSoknadForms.bostedUtlandForm.validation.fom.dateIsAfterMax:{"dato":"19.04.2026"}',
        );
    });
});
