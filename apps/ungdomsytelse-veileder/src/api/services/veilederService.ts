import getSentryLoggerForApp from '@navikt/sif-common-sentry';
import { v4 } from 'uuid';
import { ungDeltakelseOpplyserApiClient } from '../apiClient';
import { deltakelserSchema } from '../schemas/deltakelserSchema';
import { deltakelseSchema } from '../schemas/deltakelseSchema';
import { deltakerOgDeltakelserSchema } from '../schemas/deltakerOgDeltakelserSchema';
import { Deltakelse, DeltakerOgDeltakelser } from '../types';

const getDeltaker = async ({
    fnr,
    deltakerId,
}: {
    fnr?: string;
    deltakerId?: string;
}): Promise<DeltakerOgDeltakelser> => {
    const response = await ungDeltakelseOpplyserApiClient.post(`/oppslag/deltaker`, { fnr, deltakerId });
    try {
        return await deltakerOgDeltakelserSchema.parse(response.data);
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
    getDeltakerOgDeltakelser: getDeltaker,
    getDeltakelser,
    createDeltakelse,
    updateDeltakelse,
    deleteDeltakelse,
};
