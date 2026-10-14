import { IngenTilgangÅrsak } from '@app/types';
import { describe, expect, it } from 'vitest';

import { lagSak, periode } from '../../../tilgang/__tests__/testdata';
import { IngenTilgangError } from '../initialDataError';
import { HentArbeidsgivere, tilgangKontroll } from '../tilgangKontroll';

const tillattEndringsperiode = periode('2024-01-01/2024-12-31');
const ingenArbeidsgivere: HentArbeidsgivere = async () => [];

const fangstAvslag = async (saker: any[], eldreSaker: any[] = []) => {
    try {
        await tilgangKontroll(saker, eldreSaker, tillattEndringsperiode, ingenArbeidsgivere);
        return undefined;
    } catch (error) {
        return error as IngenTilgangError;
    }
};

/**
 * Uten loggmetadataen mister analytics informasjonen om hvilke arbeidsforhold
 * de avviste faktisk har.
 */
describe('tilgangKontroll - ingenTilgangMeta', () => {
    it('sender med meta når arbeidsforholdene gir avslag', async () => {
        const avslag = await fangstAvslag([lagSak({ snTimerPerDag: 'PT7H30M' })]);

        expect(avslag?.årsak).toEqual([IngenTilgangÅrsak.harArbeidstidSomSelvstendigNæringsdrivende]);
        expect(avslag?.ingenTilgangMeta).toEqual({ erArbeidstaker: false, erFrilanser: false, erSN: true });
    });

    it('sender ikke med meta når avslaget kommer fra sakene', async () => {
        const avslag = await fangstAvslag([lagSak(), lagSak()]);

        expect(avslag?.årsak).toEqual([IngenTilgangÅrsak.harMerEnnEnSak]);
        expect(avslag?.ingenTilgangMeta).toBeUndefined();
    });
});
