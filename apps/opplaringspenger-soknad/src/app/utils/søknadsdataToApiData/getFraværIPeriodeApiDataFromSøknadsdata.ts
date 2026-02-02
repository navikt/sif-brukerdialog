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

export const getFraværIPeriodeApiDataFromSøknadsdata = ({
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
            enkeltdager: [],
            enkeltdagerFravær: getEnkeltdagerIPeriodeApiData(
                valgteDatoer,
                getEnkeltdagerMedTidPerDag(valgteDatoer, { hours: '0', minutes: '0' }),
                periode,
            ),
        };
    }
    switch (arbeidIPeriodeSøknadsdata.type) {
        case ArbeidIPeriodeType.arbeiderIkke:
            /** Fraværstid settes til normalarbeidstid */
            return {
                jobberIPerioden: JobberIPeriodeSvar.heltFravær,
                enkeltdager: [],
                enkeltdagerFravær: getEnkeltdagerIPeriodeApiData(
                    valgteDatoer,
                    getEnkeltdagerMedTidPerDag(valgteDatoer, getNormalarbeidstidPerDag(jobberNormaltTimer)),
                    periode,
                ),
            };
        case ArbeidIPeriodeType.arbeiderVanlig:
            /** Fraværstid settes til 0 */
            return {
                jobberIPerioden: JobberIPeriodeSvar.somVanlig,
                enkeltdager: [],
                enkeltdagerFravær: getEnkeltdagerIPeriodeApiData(
                    valgteDatoer,
                    getEnkeltdagerMedTidPerDag(valgteDatoer, { hours: '0', minutes: '0' }),
                    periode,
                ),
            };

        case ArbeidIPeriodeType.arbeiderUlikeUkerTimer:
            return {
                jobberIPerioden: JobberIPeriodeSvar.redusert,
                enkeltdager: [],
                enkeltdagerFravær: getEnkeltdagerIPeriodeApiData(
                    valgteDatoer,
                    arbeidIPeriodeSøknadsdata.enkeltdager,
                    periode,
                ),
            };
    }
};
