import { SoknadApplicationType, SoknadStepsConfig, soknadStepUtils, StepConfig } from '@navikt/sif-common-soknad-ds';
import { StepId } from '../types/StepId';
import { ArbeidssituasjonSøknadsdata, Søknadsdata } from '../types/søknadsdata/Søknadsdata';
import { getSøknadStepRoute } from '../utils/søknadRoutesUtils';

//TODO
export const includeArbeidstidStep = (arbeidssituasjon?: ArbeidssituasjonSøknadsdata): boolean => {
    if (!arbeidssituasjon) {
        return false;
    }

    const { arbeidsgivere, frilans, selvstendig } = arbeidssituasjon;

    const erFrilanserISøknadsperiode =
        frilans && (frilans.type === 'pågående' || frilans.type === 'sluttetISøknadsperiode');

    const erSelvstendigISøknadsperiode = selvstendig && selvstendig.type === 'erSN';

    const erAnsattISøknadsperiode =
        (arbeidsgivere &&
            Object.entries(arbeidsgivere).some(([key, value]) => {
                // eslint-disable-next-line no-console
                //TODO slett console.log
                console.log(key);
                return value.type === 'pågående' || value.type === 'sluttetISøknadsperiode';
            })) ||
        false;

    return erFrilanserISøknadsperiode || erSelvstendigISøknadsperiode || erAnsattISøknadsperiode;
};

const getSøknadSteps = (søknadsdata: Søknadsdata): StepId[] => {
    return [
        StepId.OPPLYSNINGER_OM_PLEIETRENGENDE,
        StepId.LEGEERKLÆRING,
        StepId.TIDSROM,
        StepId.ARBEIDSSITUASJON,
        ...(includeArbeidstidStep(søknadsdata?.arbeidssituasjon) ? [StepId.ARBEIDSTID] : []),
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
