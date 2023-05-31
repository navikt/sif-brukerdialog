import { SøknadFormValues } from '../../types/SøknadFormValues';
import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { getHarVærtEllerErVernepliktigFromFormData, getSøknadsperiodeFromFormData } from '../formDataUtils';
import { extractArbeidSøknadsdata } from './extractArbeidSøknadsdata';
import { extractBarnSøknadsdata } from './extractBarnSøknadsdata';
import { extractBeredskapSøknadsdata } from './extractBeredskapSøknadsdata';
import { extractFerieuttakIPeriodenSøknadsdata } from './extractFerieuttakIPeriodenSøknadsdata';
import { extractMedlemskapSøknadsdata } from './extractMedlemskapSøknadsdata';
import { extractNattevåkSøknadsdata } from './extractNattevåkSøknadsdata';
import { extractOmsorgstibudSøknadsdata } from './extractOmsorgstibudSøknadsdata';
import { extractStønadGodtgjørelseSøknadsdata } from './extractStønadGodtgjørelseSøknadsdata';
import { extractUtenlandsoppholdIPeriodenSøknadsdata } from './extractUtenlandsoppholdIPeriodenSøknadsdata';

export const getSøknadsdataFromFormValues = (values: SøknadFormValues): Søknadsdata => {
    const harForståttRettigheterOgPlikter = values.harForståttRettigheterOgPlikter;
    const søknadsperiode = getSøknadsperiodeFromFormData(values);
    if (søknadsperiode === undefined) {
        return {};
    }
    const søknadsdata: Søknadsdata = {
        harForståttRettigheterOgPlikter,
        søknadsperiode,
        barn: extractBarnSøknadsdata(values),
        utenlandsoppholdIPerioden: extractUtenlandsoppholdIPeriodenSøknadsdata(values),
        ferieuttakIPerioden: extractFerieuttakIPeriodenSøknadsdata(values),
        arbeid: extractArbeidSøknadsdata(values, søknadsperiode),
        stønadGodtgjørelse: extractStønadGodtgjørelseSøknadsdata(values.stønadGodtgjørelse),
        harVærtEllerErVernepliktig: getHarVærtEllerErVernepliktigFromFormData(values),
        omsorgstibud: extractOmsorgstibudSøknadsdata(values.omsorgstilbud),
        nattevåk: extractNattevåkSøknadsdata(values),
        beredskap: extractBeredskapSøknadsdata(values),
        medlemskap: extractMedlemskapSøknadsdata(values),
        legeerklæring: values.legeerklæring,
    };
    return søknadsdata;
};
