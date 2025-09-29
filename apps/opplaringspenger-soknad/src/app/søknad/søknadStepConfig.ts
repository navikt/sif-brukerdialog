import { SoknadApplicationType, SoknadStepsConfig, soknadStepUtils, StepConfig } from '@navikt/sif-common-soknad-ds';
import { StepId } from '../types/StepId';
import { ArbeidssituasjonSøknadsdata, Søknadsdata } from '../types/søknadsdata/Søknadsdata';
import { getSøknadStepRoute } from '../utils/søknadRoutesUtils';

const getSøknadSteps = (søknadsdata: Søknadsdata): StepId[] => {
    return [
        StepId.OM_BARNET,
        StepId.KURS,
        StepId.ARBEIDSSITUASJON,
        ...(erAnsattFrilanserEllerSelvstendigNæringsdrivende(søknadsdata.arbeidssituasjon) ? [StepId.ARBEIDSTID] : []),
        StepId.MEDLEMSKAP,
        StepId.LEGEERKLÆRING,
        StepId.OPPSUMMERING,
    ];
};

export const getSøknadStepConfig = (søknadsdata: Søknadsdata): SoknadStepsConfig<StepId> =>
    soknadStepUtils.getStepsConfig(getSøknadSteps(søknadsdata), SoknadApplicationType.SOKNAD, (step) => {
        return getSøknadStepRoute(step);
    });

export const getSøknadStepConfigForStep = (stepId: StepId, søknadsdata: Søknadsdata): StepConfig<StepId> => {
    const config = getSøknadStepConfig(søknadsdata)[stepId];
    if (!config) {
        throw `Missing step config ${stepId}`;
    }
    return config;
};

export const erAnsattFrilanserEllerSelvstendigNæringsdrivende = (
    arbeidssituasjon?: ArbeidssituasjonSøknadsdata,
): boolean => {
    if (!arbeidssituasjon) {
        return false;
    }
    const { frilans, selvstendig, arbeidsgivere } = arbeidssituasjon;
    if (frilans.erFrilanser || selvstendig.erSelvstendigNæringsdrivende) {
        return true;
    }
    return arbeidsgivere === undefined
        ? false
        : Object.keys(arbeidsgivere)
              .map((key) => arbeidsgivere[key])
              .some(({ erAnsattISøknadsperiode }) => erAnsattISøknadsperiode);
};
