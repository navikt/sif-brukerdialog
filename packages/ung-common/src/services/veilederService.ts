import {
    hentAlleDeltakelserGittDeltakerId,
    hentDeltakerInfoGittDeltaker,
    hentDeltakerInfoGittDeltakerId,
} from '@navikt/ung-deltakelse-opplyser-api';
import { Deltaker, registrertDeltakerSchema, UregistrertDeltaker, uregistrertDeltakerSchema } from '../types';
import { Deltakelse, deltakelserSchema } from '../types/Deltakelse';

/**
 * Henter enten registrert eller uregistrert deltaker basert på deltakerIdent (fnr/dnr).
 * @param deltakerIdent fnr/dnr
 * @returns  Deltaker | UregistrertDeltaker
 */
export const findDeltakerByDeltakerIdent = async (deltakerIdent: string): Promise<Deltaker | UregistrertDeltaker> => {
    const { data } = await hentDeltakerInfoGittDeltaker({ body: { deltakerIdent } });
    return data?.id ? registrertDeltakerSchema.parse(data) : uregistrertDeltakerSchema.parse(data);
};

/**
 * Returnerer en registrert deltaker basert på deltaker-id.
 * @param deltakerIdent
 * @returns
 */
export const getDeltakerByDeltakerId = async (deltakerIdent: string): Promise<Deltaker> => {
    const { data } = await hentDeltakerInfoGittDeltakerId({ path: { id: deltakerIdent } });
    if (data?.id) {
        return registrertDeltakerSchema.parse(data);
    }
    throw new Error('Deltaker funnet, men uten deltaker id');
};

/**
 *
 * @param deltakerId deltaker-id
 * @returns Deltalser for deltaker
 */
export const getDeltakelser = async (deltakerId: string): Promise<Deltakelse[]> => {
    const { data } = await hentAlleDeltakelserGittDeltakerId({ path: { deltakerId } });
    return deltakelserSchema.parse(data);
};
