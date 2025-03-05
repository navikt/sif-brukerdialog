import {
    DeltakelseInnmeldingDto,
    EndrePeriodeDatoDto,
    OppslagService,
    VeilederService,
} from '@navikt/ung-deltakelse-opplyser-api';
import { handleError } from '@navikt/ung-common/src/api/errorHandlers';
import {
    Deltaker,
    registrertDeltakerSchema,
    UregistrertDeltaker,
    uregistrertDeltakerSchema,
} from '@navikt/ung-common/src/types';
import { Deltakelse, deltakelserSchema, deltakelseSchema } from '@navikt/ung-common/src/types/Deltakelse';

/**
 * Henter enten registrert eller uregistrert deltaker basert på deltakerIdent (fnr/dnr).
 * @param deltakerIdent fnr/dnr
 * @returns {Promise<Deltaker | UregistrertDeltaker>}
 * @throws {ApiErrorObject}
 */
const findDeltakerByDeltakerIdent = async (deltakerIdent: string): Promise<Deltaker | UregistrertDeltaker> => {
    try {
        const { data } = await OppslagService.hentDeltakerInfoGittDeltaker({ body: { deltakerIdent } });
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
const getDeltakerByDeltakerId = async (deltakerIdent: string): Promise<Deltaker> => {
    try {
        const { data } = await OppslagService.hentDeltakerInfoGittDeltakerId({ path: { id: deltakerIdent } });
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
const getDeltakelser = async (deltakerId: string): Promise<Deltakelse[]> => {
    try {
        const { data } = await VeilederService.hentAlleDeltakelserGittDeltakerId({ path: { deltakerId } });
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
const meldInnDeltaker = async (dto: DeltakelseInnmeldingDto): Promise<Deltakelse> => {
    try {
        const { data } = await VeilederService.meldInnDeltaker({ body: dto });
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
const meldUtDeltaker = async (deltakelseId: string, utmeldingsdato: string): Promise<Deltakelse> => {
    try {
        const { data } = await VeilederService.meldUtDeltaker({ path: { deltakelseId }, body: { utmeldingsdato } });
        return deltakelseSchema.parse(data);
    } catch (e) {
        throw handleError(e);
    }
};

/**
 * Endrer startdato for en deltakelse, og oppretter en oppgave for deltake
 * @param deltakelseId
 * @param endrePeriodeData EndrePeriodeDatoDto
 * @returns {Promise<Deltakelse>}
 * @throws {ApiErrorObject}
 */
const endreStartdatoForDeltakelse = async (
    deltakelseId: string,
    endrePeriodeData: EndrePeriodeDatoDto,
): Promise<Deltakelse> => {
    try {
        const { data } = await VeilederService.endreStartdato({ path: { deltakelseId }, body: endrePeriodeData });
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
const endreSluttdatoForDeltakelse = async (
    deltakelseId: string,
    endrePeriodeData: EndrePeriodeDatoDto,
): Promise<Deltakelse> => {
    try {
        const { data } = await VeilederService.endreSluttdato({ path: { deltakelseId }, body: endrePeriodeData });
        return deltakelseSchema.parse(data);
    } catch (e) {
        throw handleError(e);
    }
};

/**
 * Sletter en deltakelse
 * @param deltakelseId
 * @returns {Promise<void>}
 * @throws {ApiErrorObject}
 */
const fjernDeltakelse = async (deltakelseId: string): Promise<void> => {
    try {
        await VeilederService.fjernFraProgram({ path: { deltakelseId } });
    } catch (e) {
        throw handleError(e);
    }
};

export const veilederApiService = {
    findDeltakerByDeltakerIdent,
    getDeltakerByDeltakerId,
    getDeltakelser,
    endreStartdatoForDeltakelse,
    endreSluttdatoForDeltakelse,
    fjernDeltakelse,
    meldInnDeltaker,
    meldUtDeltaker,
};
