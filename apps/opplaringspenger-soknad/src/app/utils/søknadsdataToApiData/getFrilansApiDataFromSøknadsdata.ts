import { DateRange } from '@navikt/sif-common-formik-ds';

import { FrilansApiData } from '../../types/søknadApiData/SøknadApiData';
import { ArbeidFrilansSøknadsdata } from '../../types/søknadsdata/ArbeidFrilansSøknadsdata';
import { ArbeidIPeriodeSøknadsdata } from '../../types/søknadsdata/ArbeidIPeriodeSøknadsdata';
import { getArbeidIPeriodeApiDataFromSøknadsdata } from './getArbeidIPeriodeApiDataFromSøknadsdata';
import { getFraværIPeriodeApiDataFromSøknadsdata } from './getFraværIPeriodeApiDataFromSøknadsdata';

export const getFrilansApiDataFromSøknadsdata = (props: {
    søknadsperiode: DateRange;
    dagerMedOpplæring: Date[];
    frilans: ArbeidFrilansSøknadsdata | undefined;
    arbeidIPeriode: ArbeidIPeriodeSøknadsdata | undefined;
    spørOmFraværIPeriode: boolean;
}): FrilansApiData | undefined => {
    const { søknadsperiode, dagerMedOpplæring, frilans, arbeidIPeriode, spørOmFraværIPeriode } = props;
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
                        arbeidIPeriode: spørOmFraværIPeriode
                            ? getFraværIPeriodeApiDataFromSøknadsdata({
                                  arbeidIPeriodeSøknadsdata: arbeidIPeriode,
                                  periode: søknadsperiode,
                                  jobberNormaltTimer: frilans.jobberNormaltTimer,
                                  valgteDatoer: dagerMedOpplæring,
                              })
                            : getArbeidIPeriodeApiDataFromSøknadsdata({
                                  arbeidIPeriodeSøknadsdata: arbeidIPeriode,
                                  periode: søknadsperiode,
                                  jobberNormaltTimer: frilans.jobberNormaltTimer,
                                  valgteDatoer: dagerMedOpplæring,
                              }),
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
                    arbeidIPeriode: getArbeidIPeriodeApiDataFromSøknadsdata({
                        arbeidIPeriodeSøknadsdata: arbeidIPeriode,
                        periode: søknadsperiode,
                        jobberNormaltTimer: frilans.jobberNormaltTimer,
                        valgteDatoer: dagerMedOpplæring,
                    }),
                },
            };
    }
};
