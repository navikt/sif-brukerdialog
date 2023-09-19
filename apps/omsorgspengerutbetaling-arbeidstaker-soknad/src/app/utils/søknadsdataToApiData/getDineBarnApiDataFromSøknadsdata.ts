import { AnnetBarn, BarnType } from '@navikt/sif-common-forms-ds/lib/forms/annet-barn/types';
import { RegistrertBarn } from '../../types/RegistrertBarn';
import { ApiBarn, RegistrertBarnTypeApi, SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import { DineBarnSøknadsdata } from '../../types/søknadsdata/DineBarnSøknadsdata';
import { formatName } from '@navikt/sif-common-core-ds/lib/utils/personUtils';
import { dateToISODate } from '@navikt/sif-common-utils/lib/dateUtils';

export type OmBarnaToApiData = Pick<SøknadApiData, 'barn'>;

const mapRegistrertBarnToApiBarn = (registrertBarn: RegistrertBarn): ApiBarn => {
    return {
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

export const getDineBarnApiDataFromSøknadsdata = (
    dineBarnSøknadsdata: DineBarnSøknadsdata,
    registrertBarn: RegistrertBarn[],
): ApiBarn[] => {
    if (dineBarnSøknadsdata === undefined) {
        throw Error('dineBarnSøknadsdata undefined');
    }

    switch (dineBarnSøknadsdata.type) {
        case 'dineBarnHarAnnetBarn':
            return [
                ...dineBarnSøknadsdata.andreBarn.map((barn) => mapAndreBarnToApiBarn(barn)),
                ...registrertBarn.map((barn) => mapRegistrertBarnToApiBarn(barn)),
            ];
        case 'dineBarnHarIkkeAnnetBarn':
            return [...registrertBarn.map((barn) => mapRegistrertBarnToApiBarn(barn))];
    }
};
