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
    skalJobbeIPerioden: boolean,
    arbeidIPeriodeSøknadsdata: ArbeidIPeriodeSøknadsdata | undefined,
    periode: DateRange,
    jobberNormaltTimer: number,
    dagerMedPleie: Date[],
): ArbeidIPeriodeApiData => {
    if (skalJobbeIPerioden === false || !arbeidIPeriodeSøknadsdata) {
        return {
            jobberIPerioden: JobberIPeriodeSvar.heltFravær,
            enkeltdager: getEnkeltdagerIPeriodeApiData(
                dagerMedPleie,
                getEnkeltdagerMedTidPerDag(dagerMedPleie, { hours: '0', minutes: '0' }),
                periode,
                jobberNormaltTimer,
            ),
        };
    }
    switch (arbeidIPeriodeSøknadsdata.type) {
        case ArbeidIPeriodeType.arbeiderIkke:
            return {
                jobberIPerioden: JobberIPeriodeSvar.heltFravær,
                enkeltdager: getEnkeltdagerIPeriodeApiData(
                    dagerMedPleie,
                    getEnkeltdagerMedTidPerDag(dagerMedPleie, { hours: '0', minutes: '0' }),
                    periode,
                    jobberNormaltTimer,
                ),
            };
        case ArbeidIPeriodeType.arbeiderVanlig:
            return {
                jobberIPerioden: JobberIPeriodeSvar.somVanlig,
                enkeltdager: getEnkeltdagerIPeriodeApiData(
                    dagerMedPleie,
                    getEnkeltdagerMedTidPerDag(dagerMedPleie, getNormalarbeidstidPerDag(jobberNormaltTimer)),
                    periode,
                    jobberNormaltTimer,
                ),
            };
        case ArbeidIPeriodeType.arbeiderUlikeUkerTimer:
            return {
                jobberIPerioden: JobberIPeriodeSvar.redusert,
                enkeltdager: getEnkeltdagerIPeriodeApiData(
                    dagerMedPleie,
                    arbeidIPeriodeSøknadsdata.enkeltdager,
                    periode,
                    jobberNormaltTimer,
                ),
            };
    }
};
