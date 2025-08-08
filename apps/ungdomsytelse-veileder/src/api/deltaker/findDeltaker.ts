import { handleApiError } from '@navikt/ung-common';
import { Oppslag } from '@navikt/ung-deltakelse-opplyser-api-veileder';
import {
    Deltaker,
    registrertDeltakerSchema,
    UregistrertDeltaker,
    uregistrertDeltakerSchema,
} from '../../types/Deltaker';

/**
 * Henter informasjon om en deltaker basert på ident (fnr/dnr).
 *
 * @param ident Identifikatoren til deltakeren som skal hentes - f-nr eller d-nr
 * @returns Et validert deltakerobjekt (registrert eller uregistrert).
 * @throws Kaster en FinnDeltakerError eller ApiError hvis noe går galt.
 */
export const findDeltakerByIdent = async (ident: string): Promise<Deltaker | UregistrertDeltaker> => {
    try {
        const { data } = await Oppslag.hentDeltakerInfoGittDeltaker({ body: { deltakerIdent: ident } });
        return data?.id ? registrertDeltakerSchema.parse(data) : uregistrertDeltakerSchema.parse(data);
    } catch (e) {
        throw handleApiError(e, 'findDeltakerByIdent');
    }
};
