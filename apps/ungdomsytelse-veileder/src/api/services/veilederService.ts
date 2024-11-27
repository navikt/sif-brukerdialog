import getSentryLoggerForApp from '@navikt/sif-common-sentry';
import { v4 } from 'uuid';
import { ungDeltakelseOpplyserApiClient } from '../apiClient';
import { deltakelserSchema } from '../schemas/deltakelserSchema';
import { deltakelseSchema } from '../schemas/deltakelseSchema';
import { Deltakelse, Deltaker, isNyDeltaker, NyDeltaker } from '../types';
import { deltakerSchema } from '../schemas/deltakerSchema';
import { nyDeltakerSchema } from '../schemas/nyDeltakerSchema';
import { z } from 'zod';

/**
 * -----------------------------
 * Finn deltaker med fnr/dnr
 * -----------------------------
 */

const findDeltakerRequestSchema = z.object({
    deltakerIdent: z.string().optional(),
});
type OppslagDeltakerRequestPayload = z.infer<typeof findDeltakerRequestSchema>;

const findDeltaker = async (deltakerIdent: string): Promise<Deltaker | NyDeltaker> => {
    const payload: OppslagDeltakerRequestPayload = { deltakerIdent };
    const response = await ungDeltakelseOpplyserApiClient.post(`/oppslag/deltaker`, payload);
    try {
        const deltaker = isNyDeltaker(response.data)
            ? await nyDeltakerSchema.parse(response.data)
            : await deltakerSchema.parse(response.data);
        return deltaker;
    } catch (e) {
        getSentryLoggerForApp('sif-common', []).logError('ZOD parse error', e);
        throw e;
    }
};

/**
 * -----------------------------
 * Hent deltaker med deltakerId
 * -----------------------------
 */

const getDeltakerByDeltakerId = async (deltakerId: string): Promise<Deltaker> => {
    const response = await ungDeltakelseOpplyserApiClient.get(`/oppslag/deltaker/${deltakerId}`);
    try {
        return await deltakerSchema.parse(response.data);
    } catch (e) {
        getSentryLoggerForApp('sif-common', []).logError('ZOD parse error', e);
        throw e;
    }
};

const getDeltakelser = async (deltakerId: string): Promise<Deltakelse[]> => {
    const response = await ungDeltakelseOpplyserApiClient.post(`/veileder/register/hent/alle`, { deltakerId });
    try {
        const deltakelse = deltakelserSchema.parse(response.data);
        return deltakelse;
    } catch (e) {
        getSentryLoggerForApp('sif-common', []).logError('ZOD parse error', e);
        throw e;
    }
};

/**
 * -----------------------------
 * Innmelding av ny deltaker
 * -----------------------------
 */

const innmeldingRequestSchema = z.object({
    deltakerIdent: z.string(),
    startdato: z.string(),
});
type InnmeldingRequestPayload = z.infer<typeof innmeldingRequestSchema>;

const meldInnDeltaker = async ({
    deltakerIdent,
    startdato,
}: {
    deltakerIdent: string;
    startdato: string;
}): Promise<Deltakelse> => {
    const payload: InnmeldingRequestPayload = {
        deltakerIdent,
        startdato,
    };
    const response = await ungDeltakelseOpplyserApiClient.post(`/veileder/register/innmelding`, payload);
    try {
        const deltakelse = await deltakelseSchema.parse(response.data);
        return deltakelse;
    } catch (e) {
        getSentryLoggerForApp('sif-common', []).logError('ZOD parse error', e);
        throw e;
    }
};

/**
 * -----------------------------
 * Utmelding av deltaker
 * -----------------------------
 */

const utmeldingRequestSchema = z.object({
    utmeldingsdato: z.string(),
});
type UtmeldingRequestPayload = z.infer<typeof utmeldingRequestSchema>;

const meldUtDeltaker = async ({
    deltakerId,
    utmeldingsdato,
}: {
    deltakerId: string;
    utmeldingsdato: string;
}): Promise<Deltakelse> => {
    const payload: UtmeldingRequestPayload = {
        utmeldingsdato,
    };
    const response = await ungDeltakelseOpplyserApiClient.put(`/veileder/register/utmelding/${deltakerId}`, payload);
    try {
        const deltakelse = await deltakelseSchema.parse(response.data);
        return deltakelse;
    } catch (e) {
        getSentryLoggerForApp('sif-common', []).logError('ZOD parse error', e);
        throw e;
    }
};

const createDeltakelse = async (data: {
    deltakerId: string;
    fraOgMed: string;
    tilOgMed?: string;
}): Promise<Deltakelse> => {
    const response = await ungDeltakelseOpplyserApiClient.post(`/veileder/register/legg-til`, {
        id: v4(),
        ...data,
    });
    try {
        const deltakelse = deltakelseSchema.parse(response.data);
        return deltakelse;
    } catch (e) {
        getSentryLoggerForApp('sif-common', []).logError('ZOD parse error', e);
        throw e;
    }
};

/**
 * -----------------------------
 * Oppdater en deltakelse
 * -----------------------------
 */

const oppdaterDeltakelseRequestSchema = z.object({
    id: z.string().optional(),
    deltakerIdent: z.string(),
    harSøkt: z.boolean(),
    fraOgMed: z.string(),
    tilOgMed: z.string().optional(),
});
type OppdaterDeltakelseRequestPayload = z.infer<typeof oppdaterDeltakelseRequestSchema>;

const updateDeltakelse = async (data: OppdaterDeltakelseRequestPayload): Promise<Deltakelse> => {
    const payload: OppdaterDeltakelseRequestPayload = {
        ...data,
    };
    const response = await ungDeltakelseOpplyserApiClient.put(`/veileder/register/oppdater/${data.id}`, payload);
    try {
        const deltakelse = deltakelseSchema.parse(response.data);
        return deltakelse;
    } catch (e) {
        getSentryLoggerForApp('sif-common', []).logError('ZOD parse error', e);
        throw e;
    }
};

/**
 * -----------------------------
 * Slett deltakelse
 * -----------------------------
 */

const deleteDeltakelse = async (id: string): Promise<any> => {
    return await ungDeltakelseOpplyserApiClient.delete(`/veileder/register/fjern/${id}`);
};

export const veilederService = {
    findDeltaker,
    getDeltakerByDeltakerId,
    getDeltakelser,
    createDeltakelse,
    updateDeltakelse,
    deleteDeltakelse,
    meldInnDeltaker,
    meldUtDeltaker,
};
