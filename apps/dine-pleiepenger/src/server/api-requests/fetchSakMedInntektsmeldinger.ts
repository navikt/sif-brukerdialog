import axios from 'axios';
import { NextApiRequest } from 'next';
import { ZodError } from 'zod';

import { Inntektsmeldinger } from '../../types/Inntektsmelding';
import { getContextForApiHandler } from '../../utils/apiUtils';
import { getServerEnv } from '../../utils/env';
import { getLogger } from '../../utils/getLogCorrelationID';
import { sortBehandlingerNyesteFørst } from '../../utils/sakUtils';
import { getZodErrorsInfo } from '../../utils/zodUtils';
import { Innsendelse } from '../api-models/InnsendelseSchema';
import { SakMedInntektsmeldinger } from '../api-models/SakMedInntektsmeldingerSchema';
import { Sak, SakSchema } from '../api-models/SakSchema';
import { ApiServices } from '../types/ApiServices';
import { exchangeTokenAndPrepRequest } from '../utils/exchangeTokenPrepRequest';
import { serverApiUtils } from '../utils/serverApiUtils';
import { fetchInntektsmeldinger } from './fetchInntektsmeldinger';

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
        ApiServices.k9SakInnsyn,
        context,
        `sak/${saksnummer}`,
        'application/json',
    );
    const logger = getLogger(req);
    logger.info(`Fetching sak ${saksnummer} from url: ${url}`);
    const response = await axios.get(url, { headers });
    logger.info(`Response-status from request: ${response.status}`);

    if (serverApiUtils.shouldReturnRawData(raw)) {
        return response.data;
    }
    try {
        // Parse med Zod for validering og filtrering (men date-konvertering skjer client-side)
        logger.info(`PreParsing; fjerner innsendelser av type UKJENT i sak`);
        const sakUtenUkjenteInnsendelser = fjernUkjenteInnsendelserISak(response.data);

        logger.info(`Parsing sak response data for saksnummer: ${saksnummer}`);
        const sak = SakSchema.parse(sakUtenUkjenteInnsendelser);
        logger.info(`Parsing gjennomført for sak ${saksnummer}`);

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
