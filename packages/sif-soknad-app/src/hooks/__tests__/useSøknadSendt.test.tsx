import { renderHook, waitFor } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { SøknadAppContext, SøknadAppContextValue } from '../../context/SøknadAppContext';
import { createSøknadAppStore } from '../../store/createSøknadAppStore';
import { useSøknadSendt } from '../useSøknadSendt';

const renderUseSøknadSendt = (slettMellomlagring: () => Promise<void>) => {
    const config = { start: { route: 'start' } };
    const stepOrder = ['start'];
    const store = createSøknadAppStore({ config, stepOrder });

    const contextValue: SøknadAppContextValue = {
        store,
        config,
        stepOrder,
        versjon: 1,
        basePath: '/soknad',
        applicationTitle: 'Test',
        resumeLaterUrl: 'https://www.nav.no/minside',
        lagreMellomlagring: vi.fn().mockResolvedValue(undefined),
        slettMellomlagring,
    };

    const wrapper = ({ children }: PropsWithChildren) => (
        <SøknadAppContext.Provider value={contextValue}>{children}</SøknadAppContext.Provider>
    );

    return { store, ...renderHook(() => useSøknadSendt(), { wrapper }) };
};

describe('useSøknadSendt', () => {
    it('markerer søknaden som sendt', async () => {
        const { store, result } = renderUseSøknadSendt(vi.fn().mockResolvedValue(undefined));

        await result.current.onSøknadSendt();

        await waitFor(() => expect(store.getState().søknadSendt).toBe(true));
    });

    /**
     * Invariant: mønsteret `useMutation({ onSuccess: onSøknadSendt })` er avhengig av at denne
     * aldri rejecter. En rejection ville sendt mutasjonen til error-state og vist innsendingsfeil
     * til brukeren, selv om søknaden faktisk ble sendt.
     */
    it('markerer søknaden som sendt selv om opprydding feiler', async () => {
        const { store, result } = renderUseSøknadSendt(vi.fn().mockRejectedValue(new Error('sletting feilet')));

        await expect(result.current.onSøknadSendt()).resolves.toBeUndefined();

        expect(store.getState().søknadSendt).toBe(true);
    });
});
