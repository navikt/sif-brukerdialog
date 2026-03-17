import { IntlShape } from 'react-intl';
import { describe, expect, it, vi } from 'vitest';

import { sifValidate } from '../sifValidate';

const mockIntl = {
    formatMessage: vi.fn(({ id }: { id: string }) => `translated:${id}`),
} as unknown as IntlShape;

describe('sifValidate', () => {
    it('returns undefined when validator passes', () => {
        const validate = sifValidate(() => undefined, 'name', mockIntl);
        expect(validate('any')).toBeUndefined();
    });

    it('returns translated message when validator returns error code', () => {
        const validate = sifValidate(() => 'required', 'name', mockIntl);
        expect(validate('')).toBe('translated:validation.name.required');
    });

    it('uses custom error prefix', () => {
        const validate = sifValidate(() => 'tooShort', 'email', mockIntl, 'errors');
        expect(validate('')).toBe('translated:errors.email.tooShort');
    });
});
