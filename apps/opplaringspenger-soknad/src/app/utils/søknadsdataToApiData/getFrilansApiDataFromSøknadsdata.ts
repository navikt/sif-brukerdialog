import { DateRange } from '@navikt/sif-common-formik-ds';
import { FrilansApiData } from '../../types/søknadApiData/SøknadApiData';
import { ArbeidFrilansSøknadsdata } from '../../types/søknadsdata/ArbeidFrilansSøknadsdata';
import { getArbeidIPeriodeApiDataFromSøknadsdata } from './getArbeidIPeriodeApiDataFromSøknadsdata';
import { ArbeidIPeriodeSøknadsdata } from '../../types/søknadsdata/ArbeidIPeriodeSøknadsdata';

export const getFrilansApiDataFromSøknadsdata = (props: {
    søknadsperiode: DateRange;
    dagerMedOpplæring: Date[];
    frilans: ArbeidFrilansSøknadsdata | undefined;
    arbeidIPeriode: ArbeidIPeriodeSøknadsdata | undefined;
}): FrilansApiData | undefined => {
    const { søknadsperiode, dagerMedOpplæring, frilans, arbeidIPeriode } = props;
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
                            dagerMedOpplæring,
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
                        dagerMedOpplæring,
                    ),
                },
            };
    }
};
