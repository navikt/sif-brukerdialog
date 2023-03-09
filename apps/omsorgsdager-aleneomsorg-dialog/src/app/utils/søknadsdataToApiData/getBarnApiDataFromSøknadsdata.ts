import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { ApiBarn, RegisterteBarnTypeApi } from '../../types/søknadApiData/SøknadApiData';
import { RegistrertBarn } from '../../types/RegistrertBarn';
import {
    AleneomsorgTidspunkt,
    TidspunktForAleneomsorg,
} from '../../søknad/steps/tidspunkt-for-aleneomsorg/TidspunktForAleneomsorgStep';
import { formatName } from '@navikt/sif-common-core-ds/lib/utils/personUtils';
import { AnnetBarn, BarnType } from '@navikt/sif-common-forms-ds/lib/forms/annet-barn';
import { dateToISODate } from '@navikt/sif-common-utils/lib';

const getTidspunktForAleneomsorg = (
    barnId: string,
    aleneomsorgTidspunkter: AleneomsorgTidspunkt[]
): TidspunktForAleneomsorg => {
    const tidspunkt = aleneomsorgTidspunkter.find((aleneomsorgTidspunkt) => aleneomsorgTidspunkt.fnrId === barnId);

    if (tidspunkt?.tidspunktForAleneomsorg === TidspunktForAleneomsorg.SISTE_2_ÅRENE)
        return TidspunktForAleneomsorg.SISTE_2_ÅRENE;
    else return TidspunktForAleneomsorg.TIDLIGERE;
};

export const mapRegistrertBarnToApiBarn = (
    registrertBarn: RegistrertBarn,
    aleneomsorgTidspunkter: AleneomsorgTidspunkt[]
): ApiBarn => {
    const { fornavn, etternavn, mellomnavn, aktørId } = registrertBarn;

    return {
        navn: formatName(fornavn, etternavn, mellomnavn),
        aktørId,
        tidspunktForAleneomsorg: getTidspunktForAleneomsorg(aktørId, aleneomsorgTidspunkter),
        dato: aleneomsorgTidspunkter.find((aleneomsorgTidspunkt) => aleneomsorgTidspunkt.fnrId === aktørId)?.dato,
        type: RegisterteBarnTypeApi.fraOppslag,
    };
};

export const mapAnnetBarnToApiBarn = (
    annetBarn: AnnetBarn,
    aleneomsorgTidspunkter: AleneomsorgTidspunkt[]
): ApiBarn => {
    const { navn, fnr, fødselsdato, type } = annetBarn;
    const tidspunktForAleneomsorg = getTidspunktForAleneomsorg(fnr, aleneomsorgTidspunkter);
    return {
        navn: navn,
        identitetsnummer: fnr,
        fødselsdato: dateToISODate(fødselsdato),
        tidspunktForAleneomsorg: tidspunktForAleneomsorg,
        dato: aleneomsorgTidspunkter.find((aleneomsorgTidspunkt) => aleneomsorgTidspunkt.fnrId === fnr)?.dato,
        type: type ? type : BarnType.annet,
    };
};

export const getBarnApiDataFromSøknadsdata = (
    { omOmsorgenForBarnData, tidspunktForAleneomsorgData }: Søknadsdata,
    registrertBarn: RegistrertBarn[]
): ApiBarn[] | undefined => {
    if (!omOmsorgenForBarnData || !tidspunktForAleneomsorgData) {
        return undefined;
    }
    const { annetBarn, harAleneomsorgFor } = omOmsorgenForBarnData;
    const { aleneomsorgTidspunkt } = tidspunktForAleneomsorgData;

    const registrertBarnMedAleneomsorg = registrertBarn.filter((barnet) => harAleneomsorgFor.includes(barnet.aktørId));
    const annetBarnMedAleneomsorg = annetBarn.filter((barnet) => harAleneomsorgFor.includes(barnet.fnr));

    const barn: ApiBarn[] = [
        ...annetBarnMedAleneomsorg.map((barn) => mapAnnetBarnToApiBarn(barn, aleneomsorgTidspunkt)),
        ...registrertBarnMedAleneomsorg.map((barn) => mapRegistrertBarnToApiBarn(barn, aleneomsorgTidspunkt)),
    ];

    return barn;
};
