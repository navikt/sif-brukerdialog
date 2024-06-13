import { AnnetBarn, BarnType } from '@navikt/sif-common-forms-ds/src/forms/annet-barn/types';
import { ApiBarn, DineBarnApiData, RegistrertBarnTypeApi } from '../../types/søknadApiData/SøknadApiData';
import { DineBarnSøknadsdata } from '../../types/søknadsdata/DineBarnSøknadsdata';
import { dateToISODate } from '@navikt/sif-common-utils';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { RegistrertBarn } from '../../types/RegistrertBarn';

export const mapRegistrertBarnToApiBarn = (registrertBarn: RegistrertBarn): ApiBarn => {
    return {
        identitetsnummer: undefined,
        aktørId: registrertBarn.aktørId,
        navn: formatName(registrertBarn.fornavn, registrertBarn.etternavn, registrertBarn.mellomnavn),
        fødselsdato: dateToISODate(registrertBarn.fødselsdato),
        type: RegistrertBarnTypeApi.fraOppslag,
    };
};

const mapAndreBarnToApiBarn = (annetBarn: AnnetBarn): ApiBarn => {
    return {
        aktørId: undefined,
        identitetsnummer: annetBarn.fnr,
        navn: annetBarn.navn,
        fødselsdato: dateToISODate(annetBarn.fødselsdato),
        type: annetBarn.type ? annetBarn.type : BarnType.annet,
    };
};

export const getBarnApiDataFromSøknadsdata = (dineBarnSøknadsdata: DineBarnSøknadsdata): ApiBarn[] => {
    if (dineBarnSøknadsdata === undefined) {
        throw Error('dineBarnSøknadsdata undefined');
    }
    const { andreBarn } = dineBarnSøknadsdata;
    return [...andreBarn.map(mapAndreBarnToApiBarn)];
};

export const getDineBarnApiDataFromSøknadsdata = (dineBarnSøknadsdata: DineBarnSøknadsdata): DineBarnApiData => {
    const barn: ApiBarn[] = getBarnApiDataFromSøknadsdata(dineBarnSøknadsdata);

    return {
        barn,
        harDeltBosted: dineBarnSøknadsdata.harDeltBosted,
    };
};
