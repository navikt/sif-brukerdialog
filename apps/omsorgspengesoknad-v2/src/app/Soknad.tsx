import { RegistrertBarn, Søker } from '@sif/api/k9-prosessering';
import { UtvidetKontonummerInfo } from '@sif/api/ung-deltaker';

import { SøknadMellomlagring } from './types/Mellomlagring';

interface Props {
    søker: Søker;
    barn: RegistrertBarn[];
    kontonummer: UtvidetKontonummerInfo;
    mellomlagring?: SøknadMellomlagring;
}

// TODO: Implementeres i fase 5
export const Søknad = (_props: Props) => {
    return <div>Søknad — under utvikling</div>;
};
