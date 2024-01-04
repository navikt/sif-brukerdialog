import { AnnetBarn, BarnType } from '@navikt/sif-common-forms-ds/src/forms/annet-barn/types';
import { RegistrertBarn } from '../../types/RegistrertBarn';
import { ApiBarn, DineBarnApiData, RegistrertBarnTypeApi } from '../../types/søknadApiData/SøknadApiData';
import { DineBarnSøknadsdata, DineBarnSøknadsdataType } from '../../types/søknadsdata/DineBarnSøknadsdata';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { dateToISODate } from '@navikt/sif-common-utils';

const mapRegistrertBarnToApiBarn = (registrertBarn: RegistrertBarn): ApiBarn => {
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

export const getBarnApiDataFromSøknadsdata = (
    dineBarnSøknadsdata: DineBarnSøknadsdata,
    registrertBarn: RegistrertBarn[],
): ApiBarn[] => {
    if (dineBarnSøknadsdata === undefined) {
        throw Error('dineBarnSøknadsdata undefined');
    }
    if (dineBarnSøknadsdata.type === DineBarnSøknadsdataType.HAR_IKKE_RETT_STOPPES) {
        throw Error('dineBarnSøknadsdata - har ikke rett');
    }
    const { andreBarn } = dineBarnSøknadsdata;
    return [...registrertBarn.map(mapRegistrertBarnToApiBarn), ...andreBarn.map(mapAndreBarnToApiBarn)];
};

export const getDineBarnApiDataFromSøknadsdata = (
    dineBarnSøknadsdata: DineBarnSøknadsdata,
    registrertBarn: RegistrertBarn[],
): DineBarnApiData => {
    const barn: ApiBarn[] = getBarnApiDataFromSøknadsdata(dineBarnSøknadsdata, registrertBarn);

    switch (dineBarnSøknadsdata.type) {
        case DineBarnSøknadsdataType.HAR_IKKE_RETT_STOPPES:
            throw new Error('DineBarnSøknadsdataType.HAR_IKKE_RETT_STOPPES:');
        case DineBarnSøknadsdataType.UTVIDET_RETT_PGA_SYKDOM_ELLER_ALENEOMSORG:
            return {
                barn,
                harAleneomsorg: dineBarnSøknadsdata.harAleneomsorg,
                harDekketTiFørsteDagerSelv: dineBarnSøknadsdata.harDekketTiFørsteDagerSelv,
                harSyktBarn: dineBarnSøknadsdata.harSyktBarn,
            };
        case DineBarnSøknadsdataType.UTVIDET_RETT_PGA_ANTALL_BARN:
            return {
                barn,
                harDekketTiFørsteDagerSelv: dineBarnSøknadsdata.harDekketTiFørsteDagerSelv,
            };
        case DineBarnSøknadsdataType.UTVIDET_RETT_PGA_SYKT_BARN_OVER_13:
            return {
                barn,
                harSyktBarn: true,
            };
    }
};
