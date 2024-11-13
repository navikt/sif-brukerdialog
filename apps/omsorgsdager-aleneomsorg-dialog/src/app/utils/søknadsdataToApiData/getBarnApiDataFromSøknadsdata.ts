import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { ApiBarn, RegisterteBarnTypeApi } from '../../types/søknadApiData/SøknadApiData';
import { RegistrertBarn } from '../../types/RegistrertBarn';
import {
    AleneomsorgTidspunkt,
    TidspunktForAleneomsorg,
} from '../../søknad/steps/tidspunkt-for-aleneomsorg/TidspunktForAleneomsorgStep';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { AnnetBarn, BarnType } from '@navikt/sif-common-forms-ds/src/forms/annet-barn';
import { dateToISODate } from '@navikt/sif-common-utils';
import { prefixBarnIdFnr } from '../../søknad/steps/tidspunkt-for-aleneomsorg/tidspunktForAleneomsorgStepUtils';

export const mapRegistrertBarnToApiBarn = (
    registrertBarn: RegistrertBarn,
    aleneomsorgTidspunkter: AleneomsorgTidspunkt,
): ApiBarn => {
    const { fornavn, etternavn, mellomnavn, aktørId } = registrertBarn;

    const aleneomsorgTidspunkt = aleneomsorgTidspunkter[prefixBarnIdFnr(aktørId)];
    if (!aleneomsorgTidspunkt) {
        throw new Error('Aleneomsorgstidspunkt mangler for registrert barn');
    }
    return {
        navn: formatName(fornavn, etternavn, mellomnavn),
        aktørId,
        tidspunktForAleneomsorg:
            aleneomsorgTidspunkt.tidspunktForAleneomsorg === TidspunktForAleneomsorg.SISTE_2_ÅRENE
                ? TidspunktForAleneomsorg.SISTE_2_ÅRENE
                : TidspunktForAleneomsorg.TIDLIGERE,
        dato:
            aleneomsorgTidspunkt.tidspunktForAleneomsorg === TidspunktForAleneomsorg.SISTE_2_ÅRENE
                ? aleneomsorgTidspunkt.dato
                : undefined,
        type: RegisterteBarnTypeApi.fraOppslag,
    };
};

export const mapAnnetBarnToApiBarn = (annetBarn: AnnetBarn, aleneomsorgTidspunkter: AleneomsorgTidspunkt): ApiBarn => {
    const { navn, fnr, fødselsdato, type } = annetBarn;

    const aleneomsorgTidspunkt = aleneomsorgTidspunkter[prefixBarnIdFnr(fnr)];
    if (!aleneomsorgTidspunkt) {
        throw new Error('Aleneomsorgstidspunkt mangler for annet barn');
    }

    return {
        navn: navn,
        identitetsnummer: fnr,
        fødselsdato: dateToISODate(fødselsdato),
        tidspunktForAleneomsorg:
            aleneomsorgTidspunkt.tidspunktForAleneomsorg === TidspunktForAleneomsorg.SISTE_2_ÅRENE
                ? TidspunktForAleneomsorg.SISTE_2_ÅRENE
                : TidspunktForAleneomsorg.TIDLIGERE,
        dato:
            aleneomsorgTidspunkt.tidspunktForAleneomsorg === TidspunktForAleneomsorg.SISTE_2_ÅRENE
                ? aleneomsorgTidspunkt.dato
                : undefined,
        type: type ? type : BarnType.annet,
    };
};

export const getBarnApiDataFromSøknadsdata = (
    { omOmsorgenForBarn, tidspunktForAleneomsorg }: Søknadsdata,
    registrertBarn: RegistrertBarn[],
): ApiBarn[] | undefined => {
    if (!omOmsorgenForBarn || !tidspunktForAleneomsorg) {
        return undefined;
    }
    const { annetBarn, harAleneomsorgFor } = omOmsorgenForBarn;
    const { aleneomsorgTidspunkt } = tidspunktForAleneomsorg;

    const registrertBarnMedAleneomsorg = registrertBarn.filter((barnet) => harAleneomsorgFor.includes(barnet.aktørId));
    const annetBarnMedAleneomsorg = annetBarn.filter((barnet) => harAleneomsorgFor.includes(barnet.fnr));

    const barn: ApiBarn[] = [
        ...annetBarnMedAleneomsorg.map((b) => mapAnnetBarnToApiBarn(b, aleneomsorgTidspunkt)),
        ...registrertBarnMedAleneomsorg.map((b) => mapRegistrertBarnToApiBarn(b, aleneomsorgTidspunkt)),
    ];

    return barn;
};
