import { SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { getHarVærtEllerErVernepliktigFromFormValues, getSøknadsperiodeFromFormValues } from '../formValuesUtils';
import { extractArbeidssituasjonSøknadsdata } from './extractArbeidssituasjonSøknadsdata';
import { extractArbeidstidSøknadsdata } from './extractArbeidstidSøknadsdata';
import { extractBarnSøknadsdata } from './extractBarnSøknadsdata';
import { extractBeredskapSøknadsdata } from './extractBeredskapSøknadsdata';
import { extractFerieuttakIPeriodenSøknadsdata } from './extractFerieuttakIPeriodenSøknadsdata';
import { extractFosterhjemsgodtgjørelseSøknadsdata } from './extractFosterhjemsgodtgjørelseSøknadsdata';
import { extractMedlemskapSøknadsdata } from './extractMedlemskapSøknadsdata';
import { extractNattevåkSøknadsdata } from './extractNattevåkSøknadsdata';
import { extractOmsorgsstønadSøknadsdata } from './extractOmsorgsstønadSøknadsdata';
import { extractOmsorgstibudSøknadsdata } from './extractOmsorgstibudSøknadsdata';
import { extractUtenlandsoppholdIPeriodenSøknadsdata } from './extractUtenlandsoppholdIPeriodenSøknadsdata';

export const extractSøknadsdataFromFormValues = (values: SøknadFormValues): Søknadsdata => {
    const harForståttRettigheterOgPlikter = values.harForståttRettigheterOgPlikter;
    const søknadsperiode = getSøknadsperiodeFromFormValues(values);
    if (søknadsperiode === undefined) {
        return { isInitialized: false };
    }
    const søknadsdata: Søknadsdata = {
        isInitialized: true,
        harForståttRettigheterOgPlikter,
        søknadsperiode,
        barn: extractBarnSøknadsdata(values),
        utenlandsoppholdIPerioden: extractUtenlandsoppholdIPeriodenSøknadsdata(values),
        ferieuttakIPerioden: extractFerieuttakIPeriodenSøknadsdata(values),
        arbeidssituasjon: extractArbeidssituasjonSøknadsdata(søknadsperiode, values),
        arbeidstidIPerioden: extractArbeidstidSøknadsdata(values),
        omsorgsstønad: extractOmsorgsstønadSøknadsdata(values.omsorgsstønad),
        fosterhjemsgodtgjørelse: extractFosterhjemsgodtgjørelseSøknadsdata(values.fosterhjemsgodtgjørelse),
        harVærtEllerErVernepliktig: getHarVærtEllerErVernepliktigFromFormValues(values),
        omsorgstibud: extractOmsorgstibudSøknadsdata(values.omsorgstilbud),
        nattevåk: extractNattevåkSøknadsdata(values),
        beredskap: extractBeredskapSøknadsdata(values),
        medlemskap: extractMedlemskapSøknadsdata(values),
        legeerklæring: values.legeerklæring,
    };
    return søknadsdata;
};
