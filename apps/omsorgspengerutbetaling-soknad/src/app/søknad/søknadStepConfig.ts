import { SoknadApplicationType, SoknadStepsConfig, soknadStepUtils, StepConfig } from '@navikt/sif-common-soknad-ds';
import { StepId } from '../types/StepId';
import { ArbeidSøknadsdata, Søknadsdata } from '../types/søknadsdata/Søknadsdata';
import { getSøknadStepRoute } from '../utils/søknadRoutesUtils';
import {
    brukEndringeneFor2023,
    harFraværPgaSmittevernhensyn,
    harFraværPgaStengBhgSkole,
} from '../utils/midlertidigUtils';

export const includeFraværFraStep = (arbeidssituasjon?: ArbeidSøknadsdata): boolean => {
    if (!arbeidssituasjon) {
        return false;
    }

    const { frilans, selvstendig } = arbeidssituasjon;

    if (!frilans || !selvstendig) {
        return false;
    }

    const erFrilanser = frilans.type === 'pågående' || frilans.type === 'sluttetISøknadsperiode';
    const erSelvstendigNæringsdrivende = selvstendig.type === 'erSN';

    return erFrilanser && erSelvstendigNæringsdrivende;
};

const getSøknadSteps = (søknadsdata: Søknadsdata): StepId[] => {
    const fraværDager =
        søknadsdata.fravaer?.type === 'harFulltOgDelvisFravær' || søknadsdata.fravaer?.type === 'harKunDelvisFravær'
            ? søknadsdata.fravaer.fraværDager
            : [];
    const fraværPerioder =
        søknadsdata.fravaer?.type === 'harFulltOgDelvisFravær' || søknadsdata.fravaer?.type === 'harKunFulltFravær'
            ? søknadsdata.fravaer.fraværPerioder
            : [];
    return [
        StepId.DINE_BARN,
        StepId.FRAVÆR,
        ...(harFraværPgaSmittevernhensyn(fraværPerioder, fraværDager) ? [StepId.DOKUMENTER_SMITTEVERNHENSYN] : []),
        ...(harFraværPgaStengBhgSkole(fraværPerioder, fraværDager) ? [StepId.DOKUMENTER_STENGT_SKOLE_BHG] : []),
        ...(brukEndringeneFor2023(fraværDager, fraværPerioder) ? [StepId.LEGEERKLÆRING] : []),
        StepId.ARBEIDSSITUASJON,
        ...(includeFraværFraStep(søknadsdata?.arbeidssituasjon) ? [StepId.FRAVÆR_FRA] : []),
        StepId.MEDLEMSKAP,
        StepId.OPPSUMMERING,
    ];
};

export const getSøknadStepConfig = (søknadsdata: Søknadsdata): SoknadStepsConfig<StepId> =>
    soknadStepUtils.getStepsConfig(getSøknadSteps(søknadsdata), SoknadApplicationType.SOKNAD, (step) => {
        return getSøknadStepRoute(step);
    });

export const getSøknadStepConfigForStep = (søknadsdata: Søknadsdata, stepId: StepId): StepConfig<StepId> => {
    const config = getSøknadStepConfig(søknadsdata)[stepId];
    if (!config) {
        throw `Missing step config ${stepId}`;
    }
    return config;
};
