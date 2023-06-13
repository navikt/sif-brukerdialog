import { FrilansApiData } from '../../types/søknadApiData/FrilansApiData';
import { ArbeidFrilansSøknadsdata } from '../../types/søknadsdata/ArbeidFrilansSøknadsdata';

export const getFrilansApiDataFromSøknadsdata = (frilans: ArbeidFrilansSøknadsdata): FrilansApiData | undefined => {
    switch (frilans.type) {
        case 'erIkkeFrilanser':
            return undefined;

        case 'sluttetISøknadsperiode':
            return {
                startdato: frilans.startdato,
                jobberFortsattSomFrilans: false,
                sluttdato: frilans.sluttdato,
            };

        case 'pågående':
            return {
                startdato: frilans.startdato,
                jobberFortsattSomFrilans: true,
            };
    }
};
