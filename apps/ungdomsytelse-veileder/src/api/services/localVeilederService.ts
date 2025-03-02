import getSentryLoggerForApp from '@navikt/sif-common-sentry';
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
 * Export service
 * ----------------------------------------------------------
 */

export const localVeilederService = {
    meldInnDeltaker,
    avsluttDeltakelse,
};
