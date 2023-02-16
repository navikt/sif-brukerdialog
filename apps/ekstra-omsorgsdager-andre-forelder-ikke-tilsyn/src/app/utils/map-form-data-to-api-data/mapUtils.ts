import { formatName } from '@navikt/sif-common-core/lib/utils/personUtils';
import { AndreBarn } from '../../pre-common/forms/barn/types';
import { ApiBarn } from '../../types/søknadApiData/SøknadApiData';
import { RegistrertBarn } from '../../types/RegistrertBarn';

export const mapAndreBarnToApiBarn = (annetBarn: AndreBarn): ApiBarn => {
    return {
        navn: annetBarn.navn,
        aktørId: undefined,
        norskIdentifikator: annetBarn.fnr,
    };
};

export const mapBarnToApiBarn = (registrertBarn: RegistrertBarn): ApiBarn => {
    return {
        navn: formatName(registrertBarn.fornavn, registrertBarn.etternavn, registrertBarn.mellomnavn),
        aktørId: registrertBarn.aktørId,
        norskIdentifikator: undefined,
    };
};
