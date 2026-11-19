import { act, render } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

import OppsummeringSeksjon from './OppsummeringSeksjon';

vi.mock('@app/i18n', () => ({
    AppText: () => null,
}));

afterEach(() => {
    vi.unstubAllGlobals();
});

describe('OppsummeringSeksjon', () => {
    it('utsetter fokus til neste animasjonsramme', () => {
        let focusSeksjon: FrameRequestCallback | undefined;
        vi.stubGlobal('requestAnimationFrame', vi.fn((callback: FrameRequestCallback) => {
            focusSeksjon = callback;
            return 1;
        }));
        vi.stubGlobal('cancelAnimationFrame', vi.fn());

        const { container } = render(
            <OppsummeringSeksjon
                tittel="Arbeidstid"
                endreLabel="Endre arbeidstid"
                ingenEndringTekst="Ingen endring"
                onEndre={vi.fn()}
                harEndring={false}
                fokuser>
                <div>Endring</div>
            </OppsummeringSeksjon>,
        );
        const header = container.querySelector('[tabindex="-1"]');

        expect(document.activeElement).not.toBe(header);

        act(() => focusSeksjon?.(0));

        expect(document.activeElement).toBe(header);
    });
});
