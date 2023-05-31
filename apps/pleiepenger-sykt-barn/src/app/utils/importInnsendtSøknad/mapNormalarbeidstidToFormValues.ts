import { ISODurationToDecimalDuration } from '@navikt/sif-common-utils/lib';
import { NormalarbeidstidFormValues } from '../../types/ArbeidsforholdFormValues';
import { NormalarbeidstidApiData } from '../../types/søknad-api-data/normalarbeidstidApiData';

export const mapNormalarbeidstidApiDataToFormValues = (
    normalarbeidstid?: NormalarbeidstidApiData
): NormalarbeidstidFormValues | undefined => {
    if (!normalarbeidstid) {
        return undefined;
    }
    return {
        timerPerUke: `${ISODurationToDecimalDuration(normalarbeidstid.timerPerUkeISnitt)}`.replace('.', ','),
    };
};
