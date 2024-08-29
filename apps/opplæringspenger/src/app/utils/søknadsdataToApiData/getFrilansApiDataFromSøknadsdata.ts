import { DateRange } from '@navikt/sif-common-formik-ds';
import { FrilansApiData } from '../../types/søknadApiData/SøknadApiData';
import { ArbeidFrilansSøknadsdata } from '../../types/søknadsdata/ArbeidFrilansSøknadsdata';
import { ArbeidIPeriodeSøknadsdata } from '../../types/søknadsdata/arbeidIPeriodeSøknadsdata';
import { getArbeidIPeriodeApiDataFromSøknadsdata } from './getArbeidIPeriodeApiDataFromSøknadsdata';

export const getFrilansApiDataFromSøknadsdata = (
    søknadsperiode: DateRange,
    dagerMedPleie: Date[],
    frilans?: ArbeidFrilansSøknadsdata,
    arbeidIPeriode?: ArbeidIPeriodeSøknadsdata,
): FrilansApiData | undefined => {
    if (!frilans) {
        return undefined;
    }
    switch (frilans.type) {
        case 'erIkkeFrilanser':
            return undefined;

        case 'sluttetISøknadsperiode':
            if (arbeidIPeriode) {
                return {
                    harHattInntektSomFrilanser: true,
                    startdato: frilans.startdato,
                    jobberFortsattSomFrilans: false,
                    sluttdato: frilans.sluttdato,
                    arbeidsforhold: {
                        jobberNormaltTimer: frilans.jobberNormaltTimer,
                        arbeidIPeriode: getArbeidIPeriodeApiDataFromSøknadsdata(
                            arbeidIPeriode,
                            søknadsperiode,
                            frilans.jobberNormaltTimer,
                            dagerMedPleie,
                        ),
                    },
                };
            } else return undefined;

        case 'pågående':
            return {
                harHattInntektSomFrilanser: true,
                startdato: frilans.startdato,
                jobberFortsattSomFrilans: true,
                arbeidsforhold: {
                    jobberNormaltTimer: frilans.jobberNormaltTimer,
                    arbeidIPeriode: getArbeidIPeriodeApiDataFromSøknadsdata(
                        arbeidIPeriode,
                        søknadsperiode,
                        frilans.jobberNormaltTimer,
                        dagerMedPleie,
                    ),
                },
            };
    }
};
