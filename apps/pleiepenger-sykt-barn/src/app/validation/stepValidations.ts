import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { VelgBarn_AnnetBarnValue } from '@navikt/sif-common-forms-ds';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import { BarnRelasjon } from '../types';
import { SøknadFormValues } from '../types/søknad-form-values/SøknadFormValues';
import { validateFødselsnummer, validateNavn, validateRelasjonTilBarnBeskrivelse } from './fieldValidations';

dayjs.extend(isSameOrBefore);

export const welcomingPageIsValid = ({ harForståttRettigheterOgPlikter }: SøknadFormValues) =>
    harForståttRettigheterOgPlikter === true;

export const opplysningerOmBarnetStepIsValid = ({
    barnetsNavn,
    barnetsFødselsnummer,
    barnetsFødselsdato,
    barnetHarIkkeFnr,
    årsakManglerIdentitetsnummer,
    barnetSøknadenGjelder,
    relasjonTilBarnet,
    relasjonTilBarnetBeskrivelse,
}: SøknadFormValues) => {
    /** Valgt registrert barn */
    if (
        barnetSøknadenGjelder !== VelgBarn_AnnetBarnValue &&
        validateFødselsnummer(barnetsFødselsnummer) === undefined
    ) {
        return true;
    }
    if (barnetSøknadenGjelder === VelgBarn_AnnetBarnValue) {
        if (barnetHarIkkeFnr && (barnetsFødselsdato === undefined || årsakManglerIdentitetsnummer === undefined)) {
            return false;
        }
        if (!barnetHarIkkeFnr && validateFødselsnummer(barnetsFødselsnummer) !== undefined) {
            return false;
        }
        if (validateNavn(barnetsNavn) !== undefined) {
            return false;
        }
        if (relasjonTilBarnet === undefined) {
            return false;
        }
        if (
            relasjonTilBarnet === BarnRelasjon.ANNET &&
            validateRelasjonTilBarnBeskrivelse(relasjonTilBarnetBeskrivelse) !== undefined
        ) {
            return false;
        }
    }
    return true;
};

export const opplysningerOmTidsromStepIsValid = ({ periodeFra, periodeTil }: Partial<SøknadFormValues>) => {
    return periodeFra !== undefined && periodeTil !== undefined && dayjs(periodeFra).isSameOrBefore(periodeTil, 'day');
};

export const arbeidssituasjonStepIsValid = () => true;

export const medlemskapStepIsValid = ({
    harBoddUtenforNorgeSiste12Mnd,
    skalBoUtenforNorgeNeste12Mnd,
}: SøknadFormValues) =>
    (harBoddUtenforNorgeSiste12Mnd === YesOrNo.YES || harBoddUtenforNorgeSiste12Mnd === YesOrNo.NO) &&
    (skalBoUtenforNorgeNeste12Mnd === YesOrNo.YES || skalBoUtenforNorgeNeste12Mnd === YesOrNo.NO);

export const legeerklæringStepIsValid = () => true;
