import { DateRange } from '@navikt/sif-common-utils';

import { JobberIPeriodeSvar } from '../../søknad/steps/arbeidstid/ArbeidstidTypes';
import { ArbeidIPeriodeType } from '../../types/ArbeidIPeriodeType';
import { ArbeidIPeriodeApiData } from '../../types/søknadApiData/SøknadApiData';
import { ArbeidIPeriodeSøknadsdata } from '../../types/søknadsdata/ArbeidIPeriodeSøknadsdata';
import {
    getEnkeltdagerIPeriodeApiData,
    getEnkeltdagerMedTidPerDag,
    getNormalarbeidstidPerDag,
} from './tidsbrukApiUtils';

export const getArbeidIPeriodeApiDataFromSøknadsdata = ({
    arbeidIPeriodeSøknadsdata,
    periode,
    jobberNormaltTimer,
    valgteDatoer,
}: {
    arbeidIPeriodeSøknadsdata: ArbeidIPeriodeSøknadsdata | undefined;
    periode: DateRange;
    jobberNormaltTimer: number;
    valgteDatoer: Date[];
}): ArbeidIPeriodeApiData => {
    if (!arbeidIPeriodeSøknadsdata) {
        return {
            jobberIPerioden: JobberIPeriodeSvar.heltFravær,
            enkeltdager: getEnkeltdagerIPeriodeApiData(
                valgteDatoer,
                getEnkeltdagerMedTidPerDag(valgteDatoer, { hours: '0', minutes: '0' }),
                periode,
            ),
            enkeltdagerFravær: [],
        };
    }
    switch (arbeidIPeriodeSøknadsdata.type) {
        case ArbeidIPeriodeType.arbeiderIkke:
            /** Arbeidstid settes til 0 */
            return {
                jobberIPerioden: JobberIPeriodeSvar.heltFravær,
                enkeltdager: getEnkeltdagerIPeriodeApiData(
                    valgteDatoer,
                    getEnkeltdagerMedTidPerDag(valgteDatoer, { hours: '0', minutes: '0' }),
                    periode,
                ),
                enkeltdagerFravær: [],
            };
        case ArbeidIPeriodeType.arbeiderVanlig:
            /** Arbeidstid settes til normalarbeidstid */
            return {
                jobberIPerioden: JobberIPeriodeSvar.somVanlig,
                enkeltdager: getEnkeltdagerIPeriodeApiData(
                    valgteDatoer,
                    getEnkeltdagerMedTidPerDag(valgteDatoer, getNormalarbeidstidPerDag(jobberNormaltTimer)),
                    periode,
                ),
                enkeltdagerFravær: [],
            };
        case ArbeidIPeriodeType.arbeiderUlikeUkerTimer:
            return {
                jobberIPerioden: JobberIPeriodeSvar.redusert,
                enkeltdager: getEnkeltdagerIPeriodeApiData(
                    valgteDatoer,
                    arbeidIPeriodeSøknadsdata.enkeltdager,
                    periode,
                ),
                enkeltdagerFravær: [],
            };
    }
};
