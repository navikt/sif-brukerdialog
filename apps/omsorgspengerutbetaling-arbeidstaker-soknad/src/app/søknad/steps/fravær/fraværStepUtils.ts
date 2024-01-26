import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { Fravær } from '../../../types/FraværTypes';
import { FraværSøknadsdata, FraværSøknadsdataMap, FraværTypes } from '../../../types/søknadsdata/FraværSøknadsdata';
import { FraværStepFormValues } from './FraværStep';
import { Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';

const getFraværSøknadsdata = (fraværFormData: Fravær): FraværTypes | undefined => {
    const { harPerioderMedFravær, fraværPerioder, harDagerMedDelvisFravær, fraværDager } = fraværFormData;
    const harFulltFravær = harPerioderMedFravær === YesOrNo.YES && fraværPerioder.length > 0;
    const harDelvisFravær = harDagerMedDelvisFravær === YesOrNo.YES && fraværDager.length > 0;

    if (harFulltFravær && !harDelvisFravær) {
        return {
            type: 'harKunFulltFravær',
            harPerioderMedFravær: YesOrNo.YES,
            fraværPerioder,
            harDagerMedDelvisFravær: YesOrNo.NO,
        };
    }

    if (harDelvisFravær && !harFulltFravær) {
        return {
            type: 'harKunDelvisFravær',
            harPerioderMedFravær: YesOrNo.NO,
            harDagerMedDelvisFravær: YesOrNo.YES,
            fraværDager,
        };
    }

    if (harDelvisFravær && harFulltFravær) {
        return {
            type: 'harFulltOgDelvisFravær',
            harPerioderMedFravær: YesOrNo.YES,
            fraværPerioder,
            harDagerMedDelvisFravær: YesOrNo.YES,
            fraværDager,
        };
    }
    return undefined;
};

export const getFraværSøknadsdataFromFormValues = (values: FraværStepFormValues): FraværSøknadsdata | undefined => {
    const { fravær, perioderHarVærtIUtlandet, perioderUtenlandsopphold } = values;

    if (!fravær) {
        return undefined;
    }

    if (Object.keys(fravær).length === 0) {
        //TODO error?
        return undefined;
    }

    if (!perioderHarVærtIUtlandet || perioderHarVærtIUtlandet === YesOrNo.UNANSWERED) {
        //TODO error
        return undefined;
    }

    if (perioderHarVærtIUtlandet === YesOrNo.YES && perioderUtenlandsopphold.length === 0) {
        //TODO error?
        return undefined;
    }

    const fraværSøknadsdataMap: FraværSøknadsdataMap = {};

    Object.entries(fravær).forEach(([key, value]) => {
        const fraværSøknadsdata = getFraværSøknadsdata(value);
        if (fraværSøknadsdata) {
            fraværSøknadsdataMap[key] = fraværSøknadsdata;
        }
    });

    if (Object.keys(fraværSøknadsdataMap).length > 0) {
        return {
            fravær: fraværSøknadsdataMap,
            perioderHarVærtIUtlandet,
            perioderUtenlandsopphold,
        };
    }

    return undefined;
};

const getDefaultFraværFrømSøknadsdata = (fravær?: FraværTypes): Fravær => {
    const harPerioderMedFravær = fravær?.harPerioderMedFravær || YesOrNo.UNANSWERED;
    const harDagerMedDelvisFravær = fravær?.harDagerMedDelvisFravær || YesOrNo.UNANSWERED;
    const fraværPerioder =
        fravær?.type === 'harKunFulltFravær' || fravær?.type === 'harFulltOgDelvisFravær' ? fravær.fraværPerioder : [];
    const fraværDager =
        fravær?.type === 'harKunDelvisFravær' || fravær?.type === 'harFulltOgDelvisFravær' ? fravær.fraværDager : [];

    return {
        harPerioderMedFravær,
        harDagerMedDelvisFravær,
        fraværPerioder,
        fraværDager,
    };
};

export const getFraværStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: FraværStepFormValues,
): FraværStepFormValues => {
    const { situasjon, fravær } = søknadsdata;

    if (formValues) {
        if (situasjon) {
            Object.entries(situasjon).forEach(([key, value]) => {
                if (value.type !== 'harIkkeHattFravær' && value.type !== 'harHattFraværMedLønn') {
                    const organisasjonsnummerKey = getOrganisasjonsnummerKey(key);
                    const fraværEnkelt = formValues.fravær[organisasjonsnummerKey] || {
                        harPerioderMedFravær: YesOrNo.UNANSWERED,
                        fraværPerioder: [],
                        harDagerMedDelvisFravær: YesOrNo.UNANSWERED,
                        fraværDager: [],
                    };
                    return { ...formValues, ...(formValues.fravær[organisasjonsnummerKey] = fraværEnkelt) };
                }
            });
        }
        return formValues;
    }

    const defaultUtenlandsoppholdValues = {
        perioderHarVærtIUtlandet: fravær ? fravær.perioderHarVærtIUtlandet : YesOrNo.UNANSWERED,
        perioderUtenlandsopphold: fravær ? fravær.perioderUtenlandsopphold : [],
    };

    const defaultFraværMap = {};
    if (situasjon) {
        Object.entries(situasjon).forEach(([key, value]) => {
            if (value.type !== 'harIkkeHattFravær' && value.type !== 'harHattFraværMedLønn') {
                const organisasjonsnummerKey = getOrganisasjonsnummerKey(key);
                const fraværEnkelt = fravær?.fravær[organisasjonsnummerKey];

                defaultFraværMap[organisasjonsnummerKey] = getDefaultFraværFrømSøknadsdata(fraværEnkelt);
            }
        });
    }

    return {
        ...defaultUtenlandsoppholdValues,
        fravær: defaultFraværMap,
    };
};

export const getOrganisasjonsnummerKey = (organisasjonsnummer: string): string => {
    return `key_${organisasjonsnummer}`;
};

export const getOrganisasjonsnummerFromKey = (organisasjonsnummerKey: string): string => {
    return organisasjonsnummerKey.replace('key_', '');
};
