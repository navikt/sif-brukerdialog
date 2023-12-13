import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { ApiBarn, RegisterteBarnTypeApi } from '../../types/søknadApiData/SøknadApiData';
import { RegistrertBarn } from '../../types/RegistrertBarn';
import {
    AleneomsorgTidspunkt,
    TidspunktForAleneomsorg,
} from '../../søknad/steps/tidspunkt-for-aleneomsorg/TidspunktForAleneomsorgStep';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { AnnetBarn, BarnType } from '@navikt/sif-common-forms-ds/lib/forms/annet-barn';
import { dateToISODate } from '@navikt/sif-common-utils/lib';

export const mapRegistrertBarnToApiBarn = (
    registrertBarn: RegistrertBarn,
    aleneomsorgTidspunkter: AleneomsorgTidspunkt,
): ApiBarn => {
    const { fornavn, etternavn, mellomnavn, aktørId } = registrertBarn;

    return {
        navn: formatName(fornavn, etternavn, mellomnavn),
        aktørId,
        tidspunktForAleneomsorg:
            aleneomsorgTidspunkter[aktørId].tidspunktForAleneomsorg === TidspunktForAleneomsorg.SISTE_2_ÅRENE
                ? TidspunktForAleneomsorg.SISTE_2_ÅRENE
                : TidspunktForAleneomsorg.TIDLIGERE,
        dato:
            aleneomsorgTidspunkter[aktørId].tidspunktForAleneomsorg === TidspunktForAleneomsorg.SISTE_2_ÅRENE
                ? aleneomsorgTidspunkter[aktørId].dato
                : undefined,
        type: RegisterteBarnTypeApi.fraOppslag,
    };
};

export const mapAnnetBarnToApiBarn = (annetBarn: AnnetBarn, aleneomsorgTidspunkter: AleneomsorgTidspunkt): ApiBarn => {
    const { navn, fnr, fødselsdato, type } = annetBarn;

    return {
        navn: navn,
        identitetsnummer: fnr,
        fødselsdato: dateToISODate(fødselsdato),
        tidspunktForAleneomsorg:
            aleneomsorgTidspunkter[fnr].tidspunktForAleneomsorg === TidspunktForAleneomsorg.SISTE_2_ÅRENE
                ? TidspunktForAleneomsorg.SISTE_2_ÅRENE
                : TidspunktForAleneomsorg.TIDLIGERE,
        dato:
            aleneomsorgTidspunkter[fnr].tidspunktForAleneomsorg === TidspunktForAleneomsorg.SISTE_2_ÅRENE
                ? aleneomsorgTidspunkter[fnr].dato
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
        ...annetBarnMedAleneomsorg.map((barn) => mapAnnetBarnToApiBarn(barn, aleneomsorgTidspunkt)),
        ...registrertBarnMedAleneomsorg.map((barn) => mapRegistrertBarnToApiBarn(barn, aleneomsorgTidspunkt)),
    ];

    return barn;
};
