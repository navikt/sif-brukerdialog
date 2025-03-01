import {
    // hentAlleDeltakelserGittDeltakerId,
    hentDeltakerInfoGittDeltaker,
    hentDeltakerInfoGittDeltakerId,
} from '@navikt/ung-deltakelse-opplyser';
import { hentAlleDeltakelserGittDeltakerId } from '@navikt/ung-deltakelse-opplyser-hey-api';
import { Deltaker, UregistrertDeltaker, uregistrertDeltakerSchema, registrertDeltakerSchema } from '../types';
import { Deltakelse, deltakelserSchema } from '../types/Deltakelse';

/**
 * Henter enten registrert eller uregistrert deltaker basert på deltakerIdent (fnr/dnr).
 * @param deltakerIdent fnr/dnr
 * @returns  Deltaker | UregistrertDeltaker
 */
export const findDeltakerByDeltakerIdent = async (deltakerIdent: string): Promise<Deltaker | UregistrertDeltaker> => {
    const respons = await hentDeltakerInfoGittDeltaker({ deltakerIdent });
    return respons.id ? registrertDeltakerSchema.parse(respons) : uregistrertDeltakerSchema.parse(respons);
};

/**
 * Returnerer en registrert deltaker basert på deltaker-id.
 * @param deltakerIdent
 * @returns
 */
export const getDeltakerByDeltakerId = async (deltakerIdent: string): Promise<Deltaker> => {
    const respons = await hentDeltakerInfoGittDeltakerId(deltakerIdent);
    if (respons.id) {
        return registrertDeltakerSchema.parse(respons);
    }
    throw new Error('Deltaker funnet, men uten deltaker id');
};

/**
 *
 * @param deltakerId deltaker-id
 * @returns Deltalser for deltaker
 */
export const getDeltakelser = async (deltakerId: string): Promise<Deltakelse[]> => {
    const respons = await hentAlleDeltakelserGittDeltakerId({ path: { deltakerId } });
    return deltakelserSchema.parse(respons.data);
};
