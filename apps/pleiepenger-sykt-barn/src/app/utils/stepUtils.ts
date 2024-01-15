import { DateRange } from '@navikt/sif-common-formik-ds/src';
import { StepID } from '../types/StepID';
import { SøknadFormValues } from '../types/søknad-form-values/SøknadFormValues';
import { YesOrNoOrDoNotKnow } from '../types/YesOrNoOrDoNotKnow';
import {
    arbeidssituasjonStepIsValid,
    legeerklæringStepIsValid,
    medlemskapStepIsValid,
    opplysningerOmBarnetStepIsValid,
    opplysningerOmTidsromStepIsValid,
    welcomingPageIsValid,
} from '../validation/stepValidations';
import { erAnsattISøknadsperiode } from './arbeidUtils';
import { erFrilanserISøknadsperiode } from './frilanserUtils';
import { isAvailable } from './routeUtils';
import { erSNISøknadsperiode } from './selvstendigUtils';
import { getSøknadStepConfig } from '../søknad/søknadStepConfig';

export const opplysningerOmBarnetStepAvailable = (formValues: SøknadFormValues) => {
    return welcomingPageIsValid(formValues);
};

export const opplysningerOmTidsromStepAvailable = (formValues: SøknadFormValues) =>
    welcomingPageIsValid(formValues) && opplysningerOmBarnetStepIsValid(formValues);

export const arbeidssituasjonStepAvailable = (formValues: SøknadFormValues) =>
    welcomingPageIsValid(formValues) &&
    opplysningerOmBarnetStepIsValid(formValues) &&
    opplysningerOmTidsromStepIsValid(formValues);

export const arbeidIPeriodeStepIsAvailable = (formValues: SøknadFormValues) =>
    welcomingPageIsValid(formValues) &&
    opplysningerOmBarnetStepIsValid(formValues) &&
    opplysningerOmTidsromStepIsValid(formValues) &&
    arbeidssituasjonStepIsValid();

export const omsorgstilbudStepAvailable = (formValues: SøknadFormValues) =>
    welcomingPageIsValid(formValues) &&
    opplysningerOmBarnetStepIsValid(formValues) &&
    opplysningerOmTidsromStepIsValid(formValues) &&
    arbeidssituasjonStepIsValid();

export const nattevåkOgBeredskapStepAvailable = (formValues: SøknadFormValues) =>
    welcomingPageIsValid(formValues) &&
    opplysningerOmBarnetStepIsValid(formValues) &&
    opplysningerOmTidsromStepIsValid(formValues) &&
    arbeidssituasjonStepIsValid() &&
    omsorgstilbudStepAvailable(formValues);

export const medlemskapStepAvailable = (formValues: SøknadFormValues) =>
    welcomingPageIsValid(formValues) &&
    opplysningerOmBarnetStepIsValid(formValues) &&
    opplysningerOmTidsromStepIsValid(formValues) &&
    arbeidssituasjonStepIsValid();

export const legeerklæringStepAvailable = (formValues: SøknadFormValues) =>
    welcomingPageIsValid(formValues) &&
    opplysningerOmBarnetStepIsValid(formValues) &&
    opplysningerOmTidsromStepIsValid(formValues) &&
    arbeidssituasjonStepIsValid() &&
    medlemskapStepIsValid(formValues);

export const oppsummeringStepAvailable = (formValues: SøknadFormValues) =>
    welcomingPageIsValid(formValues) &&
    opplysningerOmBarnetStepIsValid(formValues) &&
    opplysningerOmTidsromStepIsValid(formValues) &&
    arbeidssituasjonStepIsValid() &&
    medlemskapStepIsValid(formValues) &&
    legeerklæringStepIsValid();

export const skalBrukerSvarePåBeredskapOgNattevåk = (formValues?: SøknadFormValues): boolean => {
    return (
        formValues !== undefined &&
        formValues.omsorgstilbud !== undefined &&
        (formValues.omsorgstilbud.erIOmsorgstilbudFortid === YesOrNoOrDoNotKnow.YES ||
            formValues.omsorgstilbud.erIOmsorgstilbudFremtid === YesOrNoOrDoNotKnow.YES)
    );
};

export const skalBrukerSvareArbeidstid = (søknadsperiode: DateRange, formValues: SøknadFormValues): boolean => {
    if (!formValues) {
        return false;
    }
    const erAnsatt = erAnsattISøknadsperiode(formValues.ansatt_arbeidsforhold);
    const erFrilanser = erFrilanserISøknadsperiode(søknadsperiode, formValues.frilans);
    const erSelvstendig = erSNISøknadsperiode(søknadsperiode, formValues.selvstendig);

    return erAnsatt || erFrilanser || erSelvstendig;
};

export const getGyldigRedirectStepForMellomlagretSøknad = (lastStepID: StepID, values: SøknadFormValues): StepID => {
    const stepConfig = getSøknadStepConfig(values);
    /** Vi mellomlagrer steget bruker er på når hen går videre til neste steg. Derfor
     * skal vi redirekte til påfølgende steg.
     */
    const nextStep = stepConfig[lastStepID].nextStep;
    if (nextStep && isAvailable(nextStep, values)) {
        return nextStep;
    } else if (isAvailable(lastStepID, values)) {
        return lastStepID;
    } else {
        return StepID.OPPLYSNINGER_OM_BARNET;
    }
};
