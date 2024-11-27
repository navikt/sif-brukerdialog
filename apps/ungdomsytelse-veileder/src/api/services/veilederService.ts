import getSentryLoggerForApp from '@navikt/sif-common-sentry';
import { v4 } from 'uuid';
import { ungDeltakelseOpplyserApiClient } from '../apiClient';
import { deltakelserSchema } from '../schemas/deltakelserSchema';
import { deltakelseSchema } from '../schemas/deltakelseSchema';
import { Deltakelse, Deltaker, isNyDeltaker, NyDeltaker } from '../types';
import { deltakerSchema } from '../schemas/deltakerSchema';
import { nyDeltakerSchema } from '../schemas/nyDeltakerSchema';

const getDeltakerByFnr = async (fnr: string): Promise<Deltaker | NyDeltaker> => {
    const response = await ungDeltakelseOpplyserApiClient.post(`/oppslag/deltaker`, { fnr });
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

const getDeltaker = async (deltakerId: string): Promise<Deltaker> => {
    const response = await ungDeltakelseOpplyserApiClient.post(`/oppslag/deltaker`, { deltakerId });
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

const meldInnDeltaker = async ({
    deltakerIdent,
    fraOgMed,
}: {
    deltakerIdent: string;
    fraOgMed: string;
}): Promise<Deltakelse> => {
    const response = await ungDeltakelseOpplyserApiClient.post(`/veileder/register/innmelding`, {
        deltakerIdent,
        fraOgMed,
    });
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

const updateDeltakelse = async (data: {
    id: string;
    deltakerId: string;
    fraOgMed?: string;
    tilOgMed?: string;
}): Promise<Deltakelse> => {
    const response = await ungDeltakelseOpplyserApiClient.put(`/veileder/register/oppdater/${data.id}`, data);
    try {
        const deltakelse = deltakelseSchema.parse(response.data);
        return deltakelse;
    } catch (e) {
        getSentryLoggerForApp('sif-common', []).logError('ZOD parse error', e);
        throw e;
    }
};

const deleteDeltakelse = async (id: string): Promise<any> => {
    return await ungDeltakelseOpplyserApiClient.delete(`/veileder/register/fjern/${id}`);
};

export const veilederService = {
    getDeltakerByFnr,
    getDeltaker,
    getDeltakelser,
    createDeltakelse,
    updateDeltakelse,
    deleteDeltakelse,
    registrerDeltaker: meldInnDeltaker,
};
