import { FrilansApiData } from '../../types/søknadApiData/SøknadApiData';
import { ArbeidFrilansSøknadsdata } from '../../types/søknadsdata/ArbeidFrilansSøknadsdata';

export const getFrilansApiDataFromSøknadsdata = (frilans?: ArbeidFrilansSøknadsdata): FrilansApiData | undefined => {
    if (!frilans) {
        return undefined;
    }
    switch (frilans.type) {
        case 'erIkkeFrilanser':
            return undefined;

        case 'sluttetISøknadsperiode':
            return {
                harHattInntektSomFrilanser: true,
                startdato: frilans.startdato,
                jobberFortsattSomFrilans: false,
                sluttdato: frilans.sluttdato,
                arbeidsforhold: {
                    jobberNormaltTimer: frilans.jobberNormaltTimer,
                },
            };

        case 'pågående':
            return {
                harHattInntektSomFrilanser: true,
                startdato: frilans.startdato,
                jobberFortsattSomFrilans: true,
                arbeidsforhold: {
                    jobberNormaltTimer: frilans.jobberNormaltTimer,
                },
            };
    }
};
