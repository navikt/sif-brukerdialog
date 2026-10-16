import type { ValgteEndringer } from '@app/types';
import { describe, expect, it, vi } from 'vitest';

import type { InitialData } from '../../api/initialData/types';
import { getValgteEndringerInitielt } from '../useSøknadInitialData';

vi.hoisted(() => {
    const appSettings = new Proxy({}, { get: () => 'test' });
    (globalThis as any).appSettings = appSettings;
    if (typeof window !== 'undefined') {
        (window as any).appSettings = appSettings;
    }
});

const valgteEndringer: ValgteEndringer = {
    arbeidstid: true,
    lovbestemtFerie: false,
    tilsynsordning: true,
};

describe('getValgteEndringerInitielt', () => {
    it('bruker lagrede valg som baseline når eldre mellomlagring mangler baseline', () => {
        const lagretSøknadState = {
            valgteEndringer,
        } as InitialData['lagretSøknadState'];

        expect(getValgteEndringerInitielt(lagretSøknadState)).toEqual(valgteEndringer);
    });
});
