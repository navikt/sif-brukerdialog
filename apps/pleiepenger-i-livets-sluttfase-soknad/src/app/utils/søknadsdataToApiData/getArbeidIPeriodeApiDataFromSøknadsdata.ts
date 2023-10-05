import { DateRange } from '@navikt/sif-common-utils/lib';
import { ArbeidIPeriodeSøknadsdata } from '../../types/søknadsdata/arbeidIPeriodeSøknadsdata';
import { ArbeidIPeriodeApiData } from '../../types/søknadApiData/SøknadApiData';
import { ArbeidIPeriodeType } from '../../types/arbeidIPeriodeType';
import { JobberIPeriodeSvar } from '../../søknad/steps/arbeidstid/ArbeidstidTypes';
import { getEnkeltdagerIPeriodeApiData } from './tidsbrukApiUtils';

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
        };
    }
    switch (arbeidIPeriodeSøknadsdata.type) {
        case ArbeidIPeriodeType.arbeiderIkke:
            return {
                jobberIPerioden: JobberIPeriodeSvar.heltFravær,
            };
        case ArbeidIPeriodeType.arbeiderVanlig:
            return {
                jobberIPerioden: JobberIPeriodeSvar.somVanlig,
            };
        case ArbeidIPeriodeType.arbeiderUlikeUkerTimer:
            const enkeltdager = getEnkeltdagerIPeriodeApiData(
                dagerMedPleie,
                arbeidIPeriodeSøknadsdata.enkeltdager,
                periode,
                jobberNormaltTimer,
            );

            return {
                jobberIPerioden: JobberIPeriodeSvar.redusert,
                enkeltdager,
            };
    }
};
