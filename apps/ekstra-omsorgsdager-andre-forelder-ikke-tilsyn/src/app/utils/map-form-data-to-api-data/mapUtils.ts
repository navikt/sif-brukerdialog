import { formatName } from '@navikt/sif-common-core/lib/utils/personUtils';
import { AndreBarn } from 'app/pre-common/forms/barn/types';
import { ApiBarn } from '../../types/SoknadApiData';
import { Barn } from '../../types/SoknadFormData';

export const mapAndreBarnToApiBarn = (annetBarn: AndreBarn): ApiBarn => {
    return {
        navn: annetBarn.navn,
        aktørId: undefined,
        norskIdentifikator: annetBarn.fnr,
    };
};

export const mapBarnToApiBarn = (registrertBarn: Barn): ApiBarn => {
    return {
        navn: formatName(registrertBarn.fornavn, registrertBarn.etternavn, registrertBarn.mellomnavn),
        aktørId: registrertBarn.aktørId,
        norskIdentifikator: undefined,
    };
};
