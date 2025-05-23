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

export const getArbeidIPeriodeApiDataFromSøknadsdata = (
    arbeidIPeriodeSøknadsdata: ArbeidIPeriodeSøknadsdata | undefined,
    periode: DateRange,
    jobberNormaltTimer: number,
    valgteDatoer: Date[],
): ArbeidIPeriodeApiData => {
    if (!arbeidIPeriodeSøknadsdata) {
        return {
            jobberIPerioden: JobberIPeriodeSvar.heltFravær,
            enkeltdager: getEnkeltdagerIPeriodeApiData(
                valgteDatoer,
                getEnkeltdagerMedTidPerDag(valgteDatoer, { hours: '0', minutes: '0' }),
                periode,
            ),
        };
    }
    switch (arbeidIPeriodeSøknadsdata.type) {
        case ArbeidIPeriodeType.arbeiderIkke:
            return {
                jobberIPerioden: JobberIPeriodeSvar.heltFravær,
                enkeltdager: getEnkeltdagerIPeriodeApiData(
                    valgteDatoer,
                    getEnkeltdagerMedTidPerDag(valgteDatoer, { hours: '0', minutes: '0' }),
                    periode,
                ),
            };
        case ArbeidIPeriodeType.arbeiderVanlig:
            return {
                jobberIPerioden: JobberIPeriodeSvar.somVanlig,
                enkeltdager: getEnkeltdagerIPeriodeApiData(
                    valgteDatoer,
                    getEnkeltdagerMedTidPerDag(valgteDatoer, getNormalarbeidstidPerDag(jobberNormaltTimer)),
                    periode,
                ),
            };
        case ArbeidIPeriodeType.arbeiderUlikeUkerTimer:
            return {
                jobberIPerioden: JobberIPeriodeSvar.redusert,
                enkeltdager: getEnkeltdagerIPeriodeApiData(
                    valgteDatoer,
                    arbeidIPeriodeSøknadsdata.enkeltdager,
                    periode,
                ),
            };
    }
};
