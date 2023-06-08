import { harFjernetLovbestemtFerie } from '../utils';
import { useSøknadContext } from './useSøknadContext';

export const useSøknadsdataInfo = () => {
    const {
        state: { søknadsdata },
    } = useSøknadContext();

    const harFjernetFerie = harFjernetLovbestemtFerie(søknadsdata.lovbestemtFerie);

    return { harFjernetFerie };
};
