import { ApiBarn, SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import { RegistrertBarn } from '../../types/RegistrertBarn';
import { OmBarnaSøknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { AndreBarn } from '../../pre-common/forms/barn/types';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';

export type OmBarnaToApiData = Pick<SøknadApiData, 'barn'>;

const mapAndreBarnToApiBarn = (annetBarn: AndreBarn): ApiBarn => {
    return {
        navn: annetBarn.navn,
        aktørId: undefined,
        norskIdentifikator: annetBarn.fnr,
    };
};

const mapRegistrertToApiBarn = (registrertBarn: RegistrertBarn): ApiBarn => {
    return {
        navn: formatName(registrertBarn.fornavn, registrertBarn.etternavn, registrertBarn.mellomnavn),
        aktørId: registrertBarn.aktørId,
        norskIdentifikator: undefined,
    };
};

export const getOmBarnaApiDataFromSøknadsdata = (
    omBarna: OmBarnaSøknadsdata,
    registrertBarn: RegistrertBarn[],
): OmBarnaToApiData => {
    const { andreBarn } = omBarna;

    const barn: ApiBarn[] = [
        ...andreBarn.map((b) => mapAndreBarnToApiBarn(b)),
        ...registrertBarn.map((b) => mapRegistrertToApiBarn(b)),
    ];
    return {
        barn: barn,
    };
};
