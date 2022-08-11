import { formatName } from '@navikt/sif-common-core-ds/lib/utils/personUtils';
import { AnnetBarn } from '@navikt/sif-common-forms-ds/lib/forms/annet-barn/types';
import { dateToISODate } from '@navikt/sif-common-utils/lib/dateUtils';
import { ApiBarn } from '../../types/SoknadApiData';
import { Barn } from '../../types/SoknadFormData';

const barnFinnesIArray = (barnId: string, idArray: string[]): boolean => {
    return (idArray || []).find((id) => id === barnId) !== undefined;
};

export const mapAnnetBarnToApiBarn = (
    annetBarn: AnnetBarn,
    harAleneomsorgFor: string[],
    harUtvidetRettFor: string[]
): ApiBarn => {
    return {
        navn: annetBarn.navn,
        fødselsdato: dateToISODate(annetBarn.fødselsdato),
        aktørId: undefined,
        identitetsnummer: annetBarn.fnr,
        aleneOmOmsorgen: barnFinnesIArray(annetBarn.fnr, harAleneomsorgFor),
        utvidetRett: barnFinnesIArray(annetBarn.fnr, harUtvidetRettFor),
    };
};

export const mapBarnToApiBarn = (
    registrertBarn: Barn,
    harAleneomsorgFor: string[],
    harUtvidetRettFor: string[]
): ApiBarn => {
    return {
        navn: formatName(registrertBarn.fornavn, registrertBarn.etternavn, registrertBarn.mellomnavn),
        fødselsdato: dateToISODate(registrertBarn.fødselsdato),
        aktørId: registrertBarn.aktørId,
        identitetsnummer: undefined,
        aleneOmOmsorgen: barnFinnesIArray(registrertBarn.aktørId, harAleneomsorgFor),
        utvidetRett: barnFinnesIArray(registrertBarn.aktørId, harUtvidetRettFor),
    };
};
