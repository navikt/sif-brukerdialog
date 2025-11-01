import { storageParser } from '@navikt/sif-common-core-ds/src/utils/persistence/storageParser';
import axios from 'axios';
import { NextApiRequest } from 'next';
import { ZodError } from 'zod';

import { InnsendtSøknad } from '../types/InnsendtSøknad';
import { Inntektsmeldinger, InntektsmeldingerSchema } from '../types/Inntektsmelding';
import { SakerParseError } from '../types/SakerParseError';
import { getContextForApiHandler } from '../utils/apiUtils';
import { getLogger } from '../utils/getLogCorrelationID';
import { sortBehandlingerNyesteFørst } from '../utils/sakUtils';
import { getZodErrorsInfo } from '../utils/zodUtils';
import { Innsendelse } from './api-models/InnsendelseSchema';
import { InnsendtSøknaderSchema } from './api-models/InnsendtSøknadSchema';
import { PleietrengendeMedSak, PleietrengendeMedSakResponseSchema } from './api-models/PleietrengendeMedSakSchema';
import {
    Saksbehandlingstid as Saksbehandlingstid,
    SaksbehandlingstidSchema,
} from './api-models/SaksbehandlingstidSchema';
import { Søker, SøkerSchema } from './api-models/SøkerSchema';
import { exchangeTokenAndPrepRequest } from './utils/exchangeTokenPrepRequest';

export enum ApiService {
    k9Brukerdialog = 'k9-brukerdialog-api',
    sifInnsyn = 'sif-innsyn-api',
    k9SakInnsyn = 'k9-sak-innsyn-api',
}

export enum ApiEndpointBrukerdialog {
    'søker' = 'oppslag/soker',
}
export enum ApiEndpointInnsyn {
    'søknad' = 'soknad',
}

export enum ApiEndpointK9SakInnsyn {
    'saker' = 'saker',
    /** Gjeldende behandlingsstid i antall uker*/
    'behandlingstid' = 'saker/saksbehandlingstid',
}

export enum SifApiErrorType {
    UNAUTHORIZED = 'UNAUTHORIZED',
    NO_ACCESS = 'NO_ACCESS',
}

export const fetchSøker = async (req: NextApiRequest): Promise<Søker> => {
    const context = getContextForApiHandler(req);
    const { url, headers } = await exchangeTokenAndPrepRequest(
        ApiService.k9Brukerdialog,
        context,
        ApiEndpointBrukerdialog.søker,
        'application/json',
    );
    const logger = getLogger(req);
    logger.info(`Fetching søker from url: ${url}`);
    const response = await axios.get(url, { headers });
    logger.info(`Søker fetched`);
    return await SøkerSchema.parse(response.data);
};

/**
 * Henter saker for bruker
 * @param req
 * @returns
 */
export const fetchSaker = async (req: NextApiRequest, raw?: boolean): Promise<PleietrengendeMedSak[]> => {
    const context = getContextForApiHandler(req);
    const { url, headers } = await exchangeTokenAndPrepRequest(
        ApiService.k9SakInnsyn,
        context,
        ApiEndpointK9SakInnsyn.saker,
        'application/json',
    );
    const logger = getLogger(req);
    logger.info(`Fetching saker from url: ${url}`);
    const response = await axios.get(url, { headers });
    logger.info(`Response-status from request: ${response.status}`);
    if (raw) {
        return response.data;
    }
    /** Logg antall pleietrengendeMedSak før parsing */
    let sakerLength = undefined;
    try {
        sakerLength = response.data?.length;
    } catch {
        /* empty */
    }
    logger.info(`Parsing saker response data`, {
        sakerLength,
    });

    const saker: PleietrengendeMedSak[] = [];
    try {
        const parsedSaker = await PleietrengendeMedSakResponseSchema.parse(
            fjernUkjenteInnsendelserISaker(response.data),
        );
        saker.push(...parsedSaker);
    } catch (error) {
        if (error instanceof ZodError) {
            logger.error('Parsing av Saker feiler', { parseDetails: JSON.stringify(getZodErrorsInfo(error)) });
            if (sakerLength !== undefined && sakerLength > 0) {
                const sakerParseError: SakerParseError = {
                    antallSaker: sakerLength,
                    error,
                };
                throw sakerParseError;
            }
        } else if (typeof error === 'string') {
            logger.error(error, 'Ukjent feil ved parsing saker');
        }
        throw error;
    }

    logger.info(`Saker response data parsed. Antall saker: ${saker.length}`);
    if (saker.length !== sakerLength) {
        logger.warn('Antall saker før og etter parsing stemmer ikke overens.', {
            sakerLength,
            parsedSakerLength: saker.length,
        });
        return Promise.reject(new Error('Antall saker før og etter parsing stemmer ikke overens.'));
    }

    return saker.map((ps): PleietrengendeMedSak => {
        return {
            pleietrengende: ps.pleietrengende,
            sak: {
                ...ps.sak,
                behandlinger: sortBehandlingerNyesteFørst(ps.sak.behandlinger),
            },
        };
    });
};

/**
 * Henter forventet behandlingstid for søknad på nåværende tidspunkt
 * @param req
 * @returns
 */
export const fetchSaksbehandlingstid = async (req: NextApiRequest): Promise<Saksbehandlingstid> => {
    const context = getContextForApiHandler(req);
    const { url, headers } = await exchangeTokenAndPrepRequest(
        ApiService.k9SakInnsyn,
        context,
        ApiEndpointK9SakInnsyn.behandlingstid,
        'application/json',
    );
    const logger = getLogger(req);
    logger.info(`Fetching behandlingstid from url: ${url}`);
    const response = await axios.get(url, { headers });
    logger.info(`Behandlingstid fetched`);
    return await SaksbehandlingstidSchema.parse(response.data);
};

/**
 * Henter inntektsmeldinger for en sak
 * @param req
 * @returns
 */
export const fetchInntektsmeldinger = async (
    req: NextApiRequest,
    saksnr: string,
    raw?: boolean,
): Promise<Inntektsmeldinger> => {
    const context = getContextForApiHandler(req);
    const inntektsmeldingerUrl = `${saksnr}/inntektsmeldinger`;
    const { url, headers } = await exchangeTokenAndPrepRequest(
        ApiService.k9SakInnsyn,
        context,
        inntektsmeldingerUrl,
        'application/json',
    );
    const logger = getLogger(req);
    logger.info(`Fetching inntektsmeldinger from url: ${url}`);
    const response = await axios.get(url, { headers, transformResponse: storageParser });
    logger.info(`Inntektsmeldinger fetched`);
    if (raw) {
        return response.data;
    }
    return await InntektsmeldingerSchema.parse(response.data);
};

export const fetchSøknader = async (req: NextApiRequest): Promise<InnsendtSøknad[]> => {
    const context = getContextForApiHandler(req);
    const { url, headers } = await exchangeTokenAndPrepRequest(
        ApiService.sifInnsyn,
        context,
        ApiEndpointInnsyn.søknad,
        'application/json',
    );
    const logger = getLogger(req);
    logger.info(`Fetching søknader from url: ${url}`);
    const response = await axios.get(url, { headers });
    logger.info(`Søknader fetched`);
    return await InnsendtSøknaderSchema.parse(response.data);
};

const fjernUkjenteInnsendelserISaker = (pleietrengendeMedSak: PleietrengendeMedSak[]): PleietrengendeMedSak[] => {
    return pleietrengendeMedSak.map((pt) => {
        return {
            ...pt,
            sak: {
                ...pt.sak,
                behandlinger: pt.sak.behandlinger.map((behandling) => {
                    return {
                        ...behandling,
                        innsendelser: filtrerUtUkjentInnsendelse(behandling.innsendelser),
                    };
                }),
            },
        };
    });
};

const filtrerUtUkjentInnsendelse = (innsendelser: Innsendelse[]): Innsendelse[] => {
    return innsendelser.filter((i) => (i as any).innsendelsestype !== 'UKJENT');
};
