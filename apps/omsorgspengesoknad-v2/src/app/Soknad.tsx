import { RegistrertBarn, Søker } from '@sif/api/k9-prosessering';

import { SøknadMellomlagring } from './types/Mellomlagring';

interface Props {
    søker: Søker;
    barn: RegistrertBarn[];
    mellomlagring?: SøknadMellomlagring;
}

// TODO: Implementeres i fase 5
export const Søknad = (_props: Props) => {
    return <div>Søknad — under utvikling</div>;
};
