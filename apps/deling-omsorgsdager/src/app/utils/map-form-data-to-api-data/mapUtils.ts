import { formatDateToApiFormat } from '@navikt/sif-common-core/lib/utils/dateUtils';
import { formatName } from '@navikt/sif-common-core/lib/utils/personUtils';
import { AnnetBarn } from '@navikt/sif-common-forms/lib/annet-barn/types';
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
        fødselsdato: formatDateToApiFormat(annetBarn.fødselsdato),
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
        fødselsdato: formatDateToApiFormat(registrertBarn.fødselsdato),
        aktørId: registrertBarn.aktørId,
        identitetsnummer: undefined,
        aleneOmOmsorgen: barnFinnesIArray(registrertBarn.aktørId, harAleneomsorgFor),
        utvidetRett: barnFinnesIArray(registrertBarn.aktørId, harUtvidetRettFor),
    };
};
