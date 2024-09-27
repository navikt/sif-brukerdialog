import { getInnsendingService, InnsendingType } from '@navikt/sif-common';
import { SøknadApiData } from '../../types/søknadApiData/SøknadApiData';

export const innsendingService = getInnsendingService<SøknadApiData>(InnsendingType.omsorgspenger_utbetaling_snf);
