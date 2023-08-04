import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import { StepID } from '../types/StepID';
import { SøknadFormValues } from '../types/SøknadFormValues';
import { YesOrNoOrDoNotKnow } from '../types/YesOrNoOrDoNotKnow';
import {
    arbeidssituasjonStepIsValid,
    legeerklæringStepIsValid,
    medlemskapStepIsValid,
    opplysningerOmBarnetStepIsValid,
    opplysningerOmTidsromStepIsValid,
    welcomingPageIsValid,
} from '../validation/stepValidations';
import { erAnsattISøknadsperiode } from './ansattUtils';
import { erFrilanserISøknadsperiode } from './frilanserUtils';
import { isAvailable } from './routeUtils';
import { erSNISøknadsperiode } from './selvstendigUtils';
import { getSøknadStepConfig } from '../søknad/søknadStepConfig';

export const opplysningerOmBarnetStepAvailable = (formData: SøknadFormValues) => {
    return welcomingPageIsValid(formData);
};

export const opplysningerOmTidsromStepAvailable = (formData: SøknadFormValues) =>
    welcomingPageIsValid(formData) && opplysningerOmBarnetStepIsValid(formData);

export const arbeidssituasjonStepAvailable = (formData: SøknadFormValues) =>
    welcomingPageIsValid(formData) &&
    opplysningerOmBarnetStepIsValid(formData) &&
    opplysningerOmTidsromStepIsValid(formData);

export const arbeidIPeriodeStepIsAvailable = (formData: SøknadFormValues) =>
    welcomingPageIsValid(formData) &&
    opplysningerOmBarnetStepIsValid(formData) &&
    opplysningerOmTidsromStepIsValid(formData) &&
    arbeidssituasjonStepIsValid();

export const omsorgstilbudStepAvailable = (formData: SøknadFormValues) =>
    welcomingPageIsValid(formData) &&
    opplysningerOmBarnetStepIsValid(formData) &&
    opplysningerOmTidsromStepIsValid(formData) &&
    arbeidssituasjonStepIsValid();

export const nattevåkOgBeredskapStepAvailable = (formData: SøknadFormValues) =>
    welcomingPageIsValid(formData) &&
    opplysningerOmBarnetStepIsValid(formData) &&
    opplysningerOmTidsromStepIsValid(formData) &&
    arbeidssituasjonStepIsValid() &&
    omsorgstilbudStepAvailable(formData);

export const medlemskapStepAvailable = (formData: SøknadFormValues) =>
    welcomingPageIsValid(formData) &&
    opplysningerOmBarnetStepIsValid(formData) &&
    opplysningerOmTidsromStepIsValid(formData) &&
    arbeidssituasjonStepIsValid();

export const legeerklæringStepAvailable = (formData: SøknadFormValues) =>
    welcomingPageIsValid(formData) &&
    opplysningerOmBarnetStepIsValid(formData) &&
    opplysningerOmTidsromStepIsValid(formData) &&
    arbeidssituasjonStepIsValid() &&
    medlemskapStepIsValid(formData);

export const oppsummeringStepAvailable = (formData: SøknadFormValues) =>
    welcomingPageIsValid(formData) &&
    opplysningerOmBarnetStepIsValid(formData) &&
    opplysningerOmTidsromStepIsValid(formData) &&
    arbeidssituasjonStepIsValid() &&
    medlemskapStepIsValid(formData) &&
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
