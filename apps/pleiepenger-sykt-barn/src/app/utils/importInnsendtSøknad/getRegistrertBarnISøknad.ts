import { dateToISODate } from '@navikt/sif-common-utils/lib';
import { RegistrerteBarn } from '../../types';
import { InnsendtSøknadBarn } from '../../types/InnsendtSøknad';

export const isBarnEtRegistrertBarn = (barn: InnsendtSøknadBarn, registrertBarn: RegistrerteBarn): boolean => {
    if (barn.aktørId) {
        return barn.aktørId === registrertBarn.aktørId;
    }
    if (barn.fødselsdato) {
        return barn.fødselsdato === dateToISODate(registrertBarn.fødselsdato);
    }
    return false;
};

export const getRegistrertBarnISøknad = (
    barnISøknad: InnsendtSøknadBarn,
    registrerteBarn: RegistrerteBarn[]
): RegistrerteBarn | undefined => {
    const barn = registrerteBarn.filter((registrertBarn) => isBarnEtRegistrertBarn(barnISøknad, registrertBarn));
    // Returner kun når det er bare én match, andre tilfeller er ikke tatt høyde for
    return barn.length === 1 ? barn[0] : undefined;
};
