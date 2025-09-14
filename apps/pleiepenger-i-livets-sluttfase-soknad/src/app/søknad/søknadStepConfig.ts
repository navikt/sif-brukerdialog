import { SoknadApplicationType, SoknadStepsConfig, soknadStepUtils, StepConfig } from '@navikt/sif-common-soknad-ds';

import { ArbeidssituasjonSøknadsdata, Søknadsdata } from '../types/søknadsdata/Søknadsdata';
import { StepId } from '../types/StepId';
import { getSøknadStepRoute } from '../utils/søknadRoutesUtils';

export const includeArbeidstidStep = (
    arbeidssituasjon: ArbeidssituasjonSøknadsdata | undefined,
    skalJobbeIPerioden: boolean | undefined,
): boolean => {
    if (!arbeidssituasjon || !skalJobbeIPerioden) {
        return false;
    }

    const { arbeidsgivere, frilans, selvstendig } = arbeidssituasjon;

    const erFrilanserISøknadsperiode =
        frilans && (frilans.type === 'pågående' || frilans.type === 'sluttetISøknadsperiode');

    const erSelvstendigISøknadsperiode = selvstendig && selvstendig.type === 'erSN';

    const erAnsattISøknadsperiode = Object.values(arbeidsgivere || {}).some(
        (value) => value.type === 'pågående' || value.type === 'sluttetISøknadsperiode',
    );
    return erFrilanserISøknadsperiode || erSelvstendigISøknadsperiode || erAnsattISøknadsperiode;
};

const getSøknadSteps = (søknadsdata: Søknadsdata): StepId[] => {
    return [
        StepId.OPPLYSNINGER_OM_PLEIETRENGENDE,
        StepId.TIDSROM,
        StepId.ARBEIDSSITUASJON,
        ...(includeArbeidstidStep(søknadsdata?.arbeidssituasjon, søknadsdata?.tidsrom?.skalJobbeOgPleieSammeDag)
            ? [StepId.ARBEIDSTID]
            : []),
        StepId.MEDLEMSKAP,
        StepId.LEGEERKLÆRING,
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
