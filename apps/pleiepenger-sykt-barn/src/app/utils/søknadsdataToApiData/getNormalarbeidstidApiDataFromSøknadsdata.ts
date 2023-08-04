import { decimalDurationToISODuration } from '@navikt/sif-common-utils/lib';
import { NormalarbeidstidApiData } from '../../types/søknad-api-data/_SøknadApiData';
import { NormalarbeidstidSøknadsdata } from '../../types/søknadsdata/_Søknadsdata';

export const getNormalarbeidstidApiDataFromSøknadsdata = (
    normalarbeidstid: NormalarbeidstidSøknadsdata
): NormalarbeidstidApiData => {
    return {
        timerPerUkeISnitt: decimalDurationToISODuration(normalarbeidstid.timerPerUkeISnitt),
    };
};
