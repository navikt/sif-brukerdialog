import { AnnetBarn, BarnType } from '@navikt/sif-common-forms-ds/lib/forms/annet-barn/types';
import { RegistrertBarn } from '../../types/RegistrertBarn';
import { ApiBarn, RegistrertBarnTypeApi } from '../../types/søknadApiData/SøknadApiData';
import { DineBarnSøknadsdata } from '../../types/søknadsdata/DineBarnSøknadsdata';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { dateToISODate } from '@navikt/sif-common-utils/lib/dateUtils';

const mapRegistrertBarnToApiBarn = (
    registrertBarn: RegistrertBarn,
    harDekketTiFørsteDagerSelv?: boolean,
    harUtvidetRettFor?: string[],
): ApiBarn => {
    return {
        identitetsnummer: undefined,
        aktørId: registrertBarn.aktørId,
        navn: formatName(registrertBarn.fornavn, registrertBarn.etternavn, registrertBarn.mellomnavn),
        fødselsdato: dateToISODate(registrertBarn.fødselsdato),
        utvidetRett:
            !harDekketTiFørsteDagerSelv && harUtvidetRettFor
                ? harUtvidetRettFor.filter((aktørId) => aktørId === registrertBarn.aktørId).length === 1
                : undefined,
        type: RegistrertBarnTypeApi.fraOppslag,
    };
};

const mapAndreBarnToApiBarn = (
    annetBarn: AnnetBarn,
    harDekketTiFørsteDagerSelv?: boolean,
    harUtvidetRettFor?: string[],
): ApiBarn => {
    return {
        aktørId: undefined,
        identitetsnummer: annetBarn.fnr,
        navn: annetBarn.navn,
        fødselsdato: dateToISODate(annetBarn.fødselsdato),
        utvidetRett:
            !harDekketTiFørsteDagerSelv && harUtvidetRettFor
                ? harUtvidetRettFor.filter((fnr) => fnr === annetBarn.fnr).length === 1
                : undefined,
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
    const { andreBarn, type } = dineBarnSøknadsdata;

    switch (type) {
        case 'minstEtt12årEllerYngre':
            return [
                ...andreBarn.map((barn) => mapAndreBarnToApiBarn(barn, dineBarnSøknadsdata.harDekketTiFørsteDagerSelv)),
                ...registrertBarn.map((barn) =>
                    mapRegistrertBarnToApiBarn(barn, dineBarnSøknadsdata.harDekketTiFørsteDagerSelv),
                ),
            ];
        case 'alleBarnEldre12år':
            return [
                ...andreBarn.map((barn) =>
                    mapAndreBarnToApiBarn(barn, undefined, dineBarnSøknadsdata.harUtvidetRettFor),
                ),
                ...registrertBarn.map((barn) =>
                    mapRegistrertBarnToApiBarn(barn, undefined, dineBarnSøknadsdata.harUtvidetRettFor),
                ),
            ];
    }
};
