import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import { FrilansApiData } from '../../types/søknadApiData/SøknadApiData';
import { ArbeidFrilansSøknadsdata } from '../../types/søknadsdata/ArbeidFrilansSøknadsdata';
import { ArbeidIPeriodeSøknadsdata } from '../../types/søknadsdata/arbeidIPeriodeSøknadsdata';
import { getArbeidIPeriodeApiDataFromSøknadsdata } from './getArbeidIPeriodeApiDataFromSøknadsdata';

export const getFrilansApiDataFromSøknadsdata = (
    søknadsperiode: DateRange,
    frilans?: ArbeidFrilansSøknadsdata,
    arbeidIperiode?: ArbeidIPeriodeSøknadsdata,
): FrilansApiData | undefined => {
    if (!frilans) {
        return undefined;
    }
    switch (frilans.type) {
        case 'erIkkeFrilanser':
            return undefined;

        case 'sluttetISøknadsperiode':
            if (arbeidIperiode) {
                return {
                    harHattInntektSomFrilanser: true,
                    startdato: frilans.startdato,
                    jobberFortsattSomFrilans: false,
                    sluttdato: frilans.sluttdato,
                    arbeidsforhold: {
                        jobberNormaltTimer: frilans.jobberNormaltTimer,
                        arbeidIPeriode: getArbeidIPeriodeApiDataFromSøknadsdata(arbeidIperiode, søknadsperiode),
                    },
                };
            } else return undefined;

        case 'pågående':
            if (arbeidIperiode) {
                return {
                    harHattInntektSomFrilanser: true,
                    startdato: frilans.startdato,
                    jobberFortsattSomFrilans: true,
                    arbeidsforhold: {
                        jobberNormaltTimer: frilans.jobberNormaltTimer,
                        arbeidIPeriode: getArbeidIPeriodeApiDataFromSøknadsdata(arbeidIperiode, søknadsperiode),
                    },
                };
            } else return undefined;
    }
};
