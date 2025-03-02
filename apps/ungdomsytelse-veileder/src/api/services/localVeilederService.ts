import getSentryLoggerForApp from '@navikt/sif-common-sentry';
import { dateToISODate } from '@navikt/sif-common-utils';
import { z } from 'zod';
import { ungDeltakelseOpplyserApiClient } from '../ungDeltakelseOpplyserApiClient';
import { Deltakelse, deltakelseSchema } from '../types';

/**
 * ----------------------------------------------------------
 * Innmelding av ny deltaker
 * ----------------------------------------------------------
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
    const response = await ungDeltakelseOpplyserApiClient.post(`/veileder/register/deltaker/innmelding`, payload);
    try {
        const deltakelse = await deltakelseSchema.parse(response.data);
        return deltakelse;
    } catch (e) {
        getSentryLoggerForApp('sif-common', []).logError('ZOD parse error', e);
        throw e;
    }
};

/**
 * ----------------------------------------------------------
 * Utmelding av deltaker
 * ----------------------------------------------------------
 */

const utmeldingRequestSchema = z.object({
    utmeldingsdato: z.string(),
});
type UtmeldingRequestPayload = z.infer<typeof utmeldingRequestSchema>;

const avsluttDeltakelse = async ({
    deltakelseId,
    utmeldingsdato,
}: {
    deltakelseId: string;
    utmeldingsdato: string;
}): Promise<Deltakelse> => {
    const payload: UtmeldingRequestPayload = {
        utmeldingsdato,
    };
    const response = await ungDeltakelseOpplyserApiClient.put(
        `/veileder/register/deltakelse/${deltakelseId}/avslutt`,
        payload,
    );
    try {
        const deltakelse = await deltakelseSchema.parse(response.data);
        return deltakelse;
    } catch (e) {
        getSentryLoggerForApp('sif-common', []).logError('ZOD parse error', e);
        throw e;
    }
};

/**
 * ----------------------------------------------------------
 * Oppdater en deltakelse
 * ----------------------------------------------------------
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
    const response = await ungDeltakelseOpplyserApiClient.put(
        `/veileder/register/deltakelse/${data.id}/oppdater`,
        payload,
    );
    try {
        const deltakelse = deltakelseSchema.parse(response.data);
        return deltakelse;
    } catch (e) {
        getSentryLoggerForApp('sif-common', []).logError('ZOD parse error', e);
        throw e;
    }
};

/**
 * ----------------------------------------------------------
 * Endre startdato
 * ----------------------------------------------------------
 */

const endreStartdato = async (
    deltakelseId: string,
    dato: Date,
    veilederRef: string,
    meldingFraVeileder?: string,
): Promise<any> => {
    return await ungDeltakelseOpplyserApiClient.put(`/veileder/register/deltakelse/${deltakelseId}/endre/startdato`, {
        dato: dateToISODate(dato),
        veilederRef,
        meldingFraVeileder,
    });
};

/**
 * ----------------------------------------------------------
 * Endre sluttdato
 * ----------------------------------------------------------
 */

const endreSluttdato = async (
    deltakelseId: string,
    dato: Date,
    veilederRef: string,
    meldingFraVeileder?: string,
): Promise<any> => {
    return await ungDeltakelseOpplyserApiClient.put(`/veileder/register/deltakelse/${deltakelseId}/endre/sluttdato`, {
        dato: dateToISODate(dato),
        veilederRef,
        meldingFraVeileder,
    });
};

/**
 * ----------------------------------------------------------
 * Slett deltakelse
 * ----------------------------------------------------------
 */

const deleteDeltakelse = async (id: string): Promise<any> => {
    return await ungDeltakelseOpplyserApiClient.delete(`/veileder/register/deltakelse/${id}/fjern`);
};

/**
 * ----------------------------------------------------------
 * Export service
 * ----------------------------------------------------------
 */

export const localVeilederService = {
    meldInnDeltaker,
    updateDeltakelse,
    avsluttDeltakelse,
    deleteDeltakelse,
    endreSluttdato,
    endreStartdato,
};
