import {
    DeltakelseInnmeldingDto,
    EndrePeriodeDatoDto,
    endreSluttdato,
    endreStartdato,
    fjernFraProgram,
    FjernFraProgramResponse,
    hentAlleDeltakelserGittDeltakerId,
    hentDeltakerInfoGittDeltaker,
    hentDeltakerInfoGittDeltakerId,
    meldInnDeltaker as generertMeldInnDeltaker,
    meldUtDeltaker as generertMeldUtDeltaker,
} from '@navikt/ung-deltakelse-opplyser-api';
import { Deltaker, registrertDeltakerSchema, UregistrertDeltaker, uregistrertDeltakerSchema } from '../types';
import { Deltakelse, deltakelserSchema, deltakelseSchema } from '../types/Deltakelse';
import { handleError } from '../utils/errorHandlers';

/**
 * Henter enten registrert eller uregistrert deltaker basert på deltakerIdent (fnr/dnr).
 * @param deltakerIdent fnr/dnr
 * @returns {Promise<Deltaker | UregistrertDeltaker>}
 * @throws {ApiErrorObject}
 */
export const findDeltakerByDeltakerIdent = async (deltakerIdent: string): Promise<Deltaker | UregistrertDeltaker> => {
    try {
        const { data } = await hentDeltakerInfoGittDeltaker({ body: { deltakerIdent } });
        return data?.id ? registrertDeltakerSchema.parse(data) : uregistrertDeltakerSchema.parse(data);
    } catch (e) {
        throw handleError(e);
    }
};

/**
 * Returnerer en registrert deltaker basert på deltaker-id.
 * @param deltakerIdent
 * @returns {Promise<Deltaker[]>}
 * @throws {ApiErrorObject}
 */
export const getDeltakerByDeltakerId = async (deltakerIdent: string): Promise<Deltaker> => {
    try {
        const { data } = await hentDeltakerInfoGittDeltakerId({ path: { id: deltakerIdent } });
        return registrertDeltakerSchema.parse(data);
    } catch (e) {
        throw handleError(e);
    }
};

/**
 * Henter alle deltakelser som en deltaker har registrert
 * @param deltakerId deltaker-id
 * @returns {Promise<Deltakelse[]>}
 * @throws {ApiErrorObject}
 */
export const getDeltakelser = async (deltakerId: string): Promise<Deltakelse[]> => {
    try {
        const { data } = await hentAlleDeltakelserGittDeltakerId({ path: { deltakerId } });
        return deltakelserSchema.parse(data);
    } catch (e) {
        throw handleError(e);
    }
};

/**
 * Melder inn en bruker til deltakelse
 * @param dto DeltakelseInnmeldingDto
 * @returns {Promise<Deltakelse>}
 * @throws {ApiErrorObject}
 */
export const meldInnDeltaker = async (dto: DeltakelseInnmeldingDto): Promise<Deltakelse> => {
    try {
        const { data } = await generertMeldInnDeltaker({ body: dto });
        return deltakelseSchema.parse(data);
    } catch (e) {
        throw handleError(e);
    }
};

/**
 * Melder ut en deltaker fra deltakelse
 * @param deltakelseId
 * @param utmeldingsdato
 * @returns {Promise<MeldUtDeltakerResponse>}
 * @throws {ApiErrorObject}
 */
export const meldUtDeltaker = async (deltakelseId: string, utmeldingsdato: string): Promise<Deltakelse> => {
    try {
        const { data } = await generertMeldUtDeltaker({ path: { deltakelseId }, body: { utmeldingsdato } });
        return deltakelseSchema.parse(data);
    } catch (e) {
        throw handleError(e);
    }
};

/**
 * Lager en oppgave for å endre sluttdato for en deltakelse
 * @param deltakelseId
 * @param endrePeriodeData EndrePeriodeDatoDto
 * @returns {Promise<Deltakelse>}
 * @throws {ApiErrorObject}
 */
export const endreStartdatoForDeltakelse = async (
    deltakelseId: string,
    endrePeriodeData: EndrePeriodeDatoDto,
): Promise<Deltakelse> => {
    try {
        const { data } = await endreStartdato({ path: { deltakelseId }, body: endrePeriodeData });
        return deltakelseSchema.parse(data);
    } catch (e) {
        throw handleError(e);
    }
};

/**
 * Lager en oppgave for å endre sluttdato for en deltakelse
 * @param deltakelseId
 * @param endrePeriodeData EndrePeriodeDatoDto
 * @returns {Promise<Deltakelse>}
 * @throws {ApiErrorObject}
 */
export const endreSluttdatoForDeltakelse = async (
    deltakelseId: string,
    endrePeriodeData: EndrePeriodeDatoDto,
): Promise<Deltakelse> => {
    try {
        const { data } = await endreSluttdato({ path: { deltakelseId }, body: endrePeriodeData });
        return deltakelseSchema.parse(data);
    } catch (e) {
        throw handleError(e);
    }
};

/**
 * Sletter en deltakelse
 * @param deltakelseId
 * @returns {Promise<FjernFraProgramResponse>}
 * @throws {ApiErrorObject}
 */
export const deleteDeltakelse = async (deltakelseId: string): Promise<FjernFraProgramResponse> => {
    try {
        await fjernFraProgram({ path: { deltakelseId } });
        return Promise.resolve();
    } catch (e) {
        throw handleError(e);
    }
};

export const veilederService = {
    findDeltakerByDeltakerIdent,
    getDeltakerByDeltakerId,
    getDeltakelser,
    endreStartdatoForDeltakelse,
    endreSluttdatoForDeltakelse,
    deleteDeltakelse,
};
