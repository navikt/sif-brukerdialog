import { SakerMetadataDto } from '@navikt/k9-sak-innsyn-api/src/generated/innsyn';
import axios from 'axios';
import { NextApiRequest } from 'next';
import { ZodError } from 'zod';

import { InnsendtSøknad } from '../types/InnsendtSøknad';
import { Inntektsmeldinger, InntektsmeldingerSchema } from '../types/Inntektsmelding';
import { getContextForApiHandler, serverResponseTransform } from '../utils/apiUtils';
import { getServerEnv } from '../utils/env';
import { getLogger } from '../utils/getLogCorrelationID';
import { sorterInntektsmeldingerPåInnsendingstidspunkt } from '../utils/inntektsmeldingUtils';
import { sortBehandlingerNyesteFørst } from '../utils/sakUtils';
import { getZodErrorsInfo } from '../utils/zodUtils';
import { Innsendelse } from './api-models/InnsendelseSchema';
import { InnsendtSøknaderSchema } from './api-models/InnsendtSøknadSchema';
import { SakMedInntektsmeldinger } from './api-models/SakMedInntektsmeldingerSchema';
import {
    Saksbehandlingstid as Saksbehandlingstid,
    SaksbehandlingstidSchema,
} from './api-models/SaksbehandlingstidSchema';
import { Sak, SakSchema } from './api-models/SakSchema';
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

export enum SifApiErrorType {
    UNAUTHORIZED = 'UNAUTHORIZED',
    NO_ACCESS = 'NO_ACCESS',
}

const shouldReturnRawData = (raw?: boolean): boolean => {
    return raw === true && getServerEnv().NEXT_PUBLIC_RUNTIME_ENVIRONMENT !== 'production';
};

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
    const response = await axios.get(url, { headers, transformResponse: [serverResponseTransform] });
    logger.info(`Søker fetched`);
    return await SøkerSchema.parse(response.data);
};

/**
 * Henter metadata for saker (uten behandlingsdetaljer)
 * @param req
 * @returns
 */
export const fetchSakerMetadata = async (req: NextApiRequest): Promise<SakerMetadataDto[]> => {
    const context = getContextForApiHandler(req);
    const { url, headers } = await exchangeTokenAndPrepRequest(
        ApiService.k9SakInnsyn,
        context,
        'saker/metadata',
        'application/json',
    );
    const logger = getLogger(req);
    logger.info(`Fetching sakerMetadata from url: ${url}`);
    const response = await axios.get(url, { headers, transformResponse: [serverResponseTransform] });
    logger.info(`Response-status from request: ${response.status}`);

    // Returner data (er allerede SakerMetadataDto[] fra backend)
    return response.data;
};

/**
 * Henter detaljer for én spesifikk sak basert på saksnummer
 * @param req
 * @param saksnummer
 * @returns
 */
export const fetchSakMedInntektsmeldinger = async (
    req: NextApiRequest,
    saksnummer: string,
    raw?: boolean,
): Promise<SakMedInntektsmeldinger> => {
    const context = getContextForApiHandler(req);
    const { url, headers } = await exchangeTokenAndPrepRequest(
        ApiService.k9SakInnsyn,
        context,
        `sak/${saksnummer}`,
        'application/json',
    );
    const logger = getLogger(req);
    logger.info(`Fetching sak ${saksnummer} from url: ${url}`);
    const response = await axios.get(url, { headers, transformResponse: [serverResponseTransform] });
    logger.info(`Response-status from request: ${response.status}`);
    logger.info(`Parsing sak response data for saksnummer: ${saksnummer}`);

    if (shouldReturnRawData(raw)) {
        return response.data;
    }
    try {
        // Parse med Zod for validering og filtrering (men date-konvertering skjer client-side)
        const sak = SakSchema.parse(fjernUkjenteInnsendelserISak(response.data));

        /** Hent inntektsmeldinger for saken hvis feature er enabled */
        let inntektsmeldinger: Inntektsmeldinger = [];

        if (getServerEnv().NEXT_PUBLIC_FEATURE_INNTEKTSMELDING === 'on') {
            try {
                logger.info('Henter inntektsmeldinger for sak', { saksnummer });
                inntektsmeldinger = await fetchInntektsmeldinger(req, saksnummer);
                logger.info(`Hentet ${inntektsmeldinger.length} inntektsmeldinger for sak ${saksnummer}`);
            } catch (error) {
                logger.warn(`Kunne ikke hente inntektsmeldinger for sak ${saksnummer}`, { error });
            }
        } else {
            logger.info('INNTEKTSMELDING_ENABLED er false, hopper over henting av inntektsmeldinger');
        }

        return {
            sak: {
                ...sak,
                behandlinger: sortBehandlingerNyesteFørst(sak.behandlinger),
            },
            inntektsmeldinger,
        };
    } catch (error) {
        if (error instanceof ZodError) {
            logger.error('Parsing av Sak feiler', { parseDetails: JSON.stringify(getZodErrorsInfo(error)) });
        } else if (typeof error === 'string') {
            logger.error(error, 'Ukjent feil ved parsing sak');
        }
        throw error;
    }
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
        'saker/saksbehandlingstid',
        'application/json',
    );
    const logger = getLogger(req);
    logger.info(`Fetching behandlingstid from url: ${url}`);
    const response = await axios.get(url, { headers, transformResponse: [serverResponseTransform] });
    logger.info(`Behandlingstid fetched`);
    return await SaksbehandlingstidSchema.parse(response.data);
};

/**
 * Henter inntektsmeldinger for en sak
 * @param req
 * @param saksnr
 * @param raw
 * @returns
 */
export const fetchInntektsmeldinger = async (
    req: NextApiRequest,
    saksnr: string,
    raw?: boolean,
): Promise<Inntektsmeldinger> => {
    const context = getContextForApiHandler(req);
    const { url, headers } = await exchangeTokenAndPrepRequest(
        ApiService.k9SakInnsyn,
        context,
        `sak/${saksnr}/inntektsmeldinger`,
        'application/json',
    );
    const logger = getLogger(req);
    logger.info(`Fetching inntektsmeldinger from url: ${url}`);
    const response = await axios.get(url, { headers, transformResponse: [serverResponseTransform] });
    logger.info(`Inntektsmeldinger fetched`);
    if (shouldReturnRawData(raw)) {
        logger.info('returning raw inntektsmeldinger data');
        return await response.data;
    }
    return await InntektsmeldingerSchema.parse(response.data).sort(sorterInntektsmeldingerPåInnsendingstidspunkt);
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
    const response = await axios.get(url, { headers, transformResponse: [serverResponseTransform] });
    logger.info(`Søknader fetched`);
    return await InnsendtSøknaderSchema.parse(response.data);
};

const fjernUkjenteInnsendelserISak = (sak: Sak): Sak => {
    return {
        ...sak,
        behandlinger: sak.behandlinger.map((behandling) => {
            return {
                ...behandling,
                innsendelser: filtrerUtUkjentInnsendelse(behandling.innsendelser),
            };
        }),
    };
};

const filtrerUtUkjentInnsendelse = (innsendelser: Innsendelse[]): Innsendelse[] => {
    return innsendelser.filter((i) => (i as any).innsendelsestype !== 'UKJENT');
};
