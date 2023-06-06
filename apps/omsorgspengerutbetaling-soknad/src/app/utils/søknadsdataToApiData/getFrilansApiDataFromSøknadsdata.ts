import { FrilansApiData } from '../../types/søknadApiData/FrilansApiData';
import { ArbeidFrilansSøknadsdata } from '../../types/søknadsdata/ArbeidFrilansSøknadsdata';

export const getFrilansApiDataFromSøknadsdata = (frilans: ArbeidFrilansSøknadsdata): FrilansApiData => {
    switch (frilans.type) {
        case 'erIkkeFrilanser':
            return {
                harInntektSomFrilanser: false,
            };

        case 'sluttetISøknadsperiode':
            return {
                harInntektSomFrilanser: true,
                startdato: frilans.startdato,
                jobberFortsattSomFrilans: false,
                sluttdato: frilans.sluttdato,
            };

        case 'pågående':
            return {
                harInntektSomFrilanser: true,
                startdato: frilans.startdato,
                jobberFortsattSomFrilans: true,
            };
    }
};
