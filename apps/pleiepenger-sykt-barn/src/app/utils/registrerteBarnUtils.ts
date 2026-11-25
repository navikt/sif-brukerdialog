import type { RegistrertBarn } from '@navikt/sif-common-api';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';

const getVisningsnøkkel = ({ fornavn, mellomnavn, etternavn, fødselsdato }: RegistrertBarn): string =>
    JSON.stringify([formatName(fornavn, etternavn, mellomnavn), fødselsdato.getTime()]);

export const fjernTvetydigeRegistrerteBarn = (barn: RegistrertBarn[]): RegistrertBarn[] => {
    const antallPerVisningsnøkkel = barn.reduce((antall, registrertBarn) => {
        const nøkkel = getVisningsnøkkel(registrertBarn);
        antall.set(nøkkel, (antall.get(nøkkel) ?? 0) + 1);
        return antall;
    }, new Map<string, number>());

    return barn.filter((registrertBarn) => antallPerVisningsnøkkel.get(getVisningsnøkkel(registrertBarn)) === 1);
};
