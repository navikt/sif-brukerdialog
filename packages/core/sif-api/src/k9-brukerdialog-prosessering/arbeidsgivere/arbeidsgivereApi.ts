import { ArbeidsgivereController } from '@navikt/k9-brukerdialog-prosessering-api';

import { handleApiError } from '../../shared/errorHandlers';
import { Arbeidsgivere, arbeidsgivereSchema } from './Arbeidsgivere';

/**
 * Henter informasjon om arbeidsgivere fra k9-brukerdialog-prosessering-api
 *
 * @param fraOgMed Startdato for perioden (YYYY-MM-DD format)
 * @param tilOgMed Sluttdato for perioden (YYYY-MM-DD format)
 * @param options Valgfrie parametere for søket
 * @returns Promise med arbeidsgiverdata
 * @throws Error hvis API-kallet feiler eller data ikke kan parses
 */
export const hentArbeidsgivere = async (
    fraOgMed: string,
    tilOgMed: string,
    options?: {
        inkluderAlleAnsettelsesperioder?: boolean;
        frilansoppdrag?: boolean;
        privateArbeidsgivere?: boolean;
    },
): Promise<Arbeidsgivere> => {
    try {
        const response = await ArbeidsgivereController.hentArbeidsgivere({
            query: {
                fra_og_med: fraOgMed,
                til_og_med: tilOgMed,
                ...options,
            },
        });
        return arbeidsgivereSchema.parse(response.data);
    } catch (e) {
        throw handleApiError(e, 'hentArbeidsgivere');
    }
};
