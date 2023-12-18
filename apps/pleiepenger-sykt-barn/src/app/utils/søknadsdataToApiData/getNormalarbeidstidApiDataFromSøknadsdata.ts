import { decimalDurationToISODuration } from '@navikt/sif-common-utils';
import { NormalarbeidstidApiData } from '../../types/søknad-api-data/SøknadApiData';
import { NormalarbeidstidSøknadsdata } from '../../types/søknadsdata/Søknadsdata';

export const getNormalarbeidstidApiDataFromSøknadsdata = (
    normalarbeidstid: NormalarbeidstidSøknadsdata,
): NormalarbeidstidApiData => {
    return {
        timerPerUkeISnitt: decimalDurationToISODuration(normalarbeidstid.timerPerUkeISnitt),
    };
};
