import {
    EndrePeriodeDatoDto,
    endreSluttdato,
    endreStartdato,
    hentAlleDeltakelserGittDeltakerId,
    hentDeltakerInfoGittDeltaker,
    hentDeltakerInfoGittDeltakerId,
} from '@navikt/ung-deltakelse-opplyser-api';
import { Deltaker, registrertDeltakerSchema, UregistrertDeltaker, uregistrertDeltakerSchema } from '../types';
import { Deltakelse, deltakelserSchema, deltakelseSchema } from '../types/Deltakelse';

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
 * Henter alle deltakelser som en deltaker har registrert
 * @param deltakerId deltaker-id
 * @returns Deltalser for deltaker
 */
export const getDeltakelser = async (deltakerId: string): Promise<Deltakelse[]> => {
    const { data } = await hentAlleDeltakelserGittDeltakerId({ path: { deltakerId } });
    return deltakelserSchema.parse(data);
};

/**
 * Lager en oppgave for å endre sluttdato for en deltakelse
 * @param deltakelseId
 * @param endrePeriodeData EndrePeriodeDatoDto
 * @returns
 */
export const endreStartdatoForDeltakelse = async (
    deltakelseId: string,
    endrePeriodeData: EndrePeriodeDatoDto,
): Promise<Deltakelse> => {
    const { data } = await endreStartdato({ path: { deltakelseId }, body: endrePeriodeData });
    return deltakelseSchema.parse(data);
};

/**
 * Lager en oppgave for å endre sluttdato for en deltakelse
 * @param deltakelseId
 * @param endrePeriodeData EndrePeriodeDatoDto
 * @returns
 */
export const endreSluttdatoForDeltakelse = async (
    deltakelseId: string,
    endrePeriodeData: EndrePeriodeDatoDto,
): Promise<Deltakelse> => {
    const { data } = await endreSluttdato({ path: { deltakelseId }, body: endrePeriodeData });
    return deltakelseSchema.parse(data);
};

export const veilederService = {
    findDeltakerByDeltakerIdent,
    getDeltakerByDeltakerId,
    getDeltakelser,
    endreStartdatoForDeltakelse,
    endreSluttdatoForDeltakelse,
};
