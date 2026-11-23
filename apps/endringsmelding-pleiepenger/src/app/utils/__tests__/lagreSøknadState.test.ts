import { SøknadContextState } from '@app/types';
import { describe, expect, it, vi } from 'vitest';

import { søknadStateEndpoint } from '../../api/endpoints/søknadStateEndpoint';
import { lagreSøknadState, ventPåMellomlagring } from '../lagreSøknadState';

vi.mock('../../api/endpoints/søknadStateEndpoint', () => ({
    søknadStateEndpoint: { update: vi.fn() },
}));

describe('ventPåMellomlagring', () => {
    it('venter til pågående lagring er ferdig', async () => {
        let fullførLagring = () => {};
        vi.mocked(søknadStateEndpoint.update).mockReturnValue(
            new Promise((resolve) => (fullførLagring = () => resolve({} as never))),
        );
        lagreSøknadState({ sak: { barn: { aktørId: '1' } } } as SøknadContextState);

        let ferdig = false;
        const venter = ventPåMellomlagring().then(() => (ferdig = true));
        await Promise.resolve();
        expect(ferdig).toBe(false);

        fullførLagring();
        await venter;
        expect(ferdig).toBe(true);
    });
});
