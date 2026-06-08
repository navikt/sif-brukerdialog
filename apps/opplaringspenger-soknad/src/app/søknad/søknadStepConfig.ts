import { SoknadApplicationType, SoknadStepsConfig, soknadStepUtils, StepConfig } from '@navikt/sif-common-soknad-ds';
import { DateRange, isISODate } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';

import { ArbeidssituasjonSøknadsdata, Søknadsdata } from '../types/søknadsdata/Søknadsdata';
import { StepId } from '../types/StepId';
import { getSøknadStepRoute } from '../utils/søknadRoutesUtils';

const getSøknadSteps = (søknadsdata: Søknadsdata): StepId[] => {
    return [
        StepId.OM_BARNET,
        StepId.KURS,
        StepId.ARBEIDSSITUASJON,
        ...(søknadsdata.kurs &&
        erAnsattFrilanserEllerSelvstendigNæringsdrivende(søknadsdata.kurs?.søknadsperiode, søknadsdata.arbeidssituasjon)
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

export const getSøknadStepConfigForStep = (stepId: StepId, søknadsdata: Søknadsdata): StepConfig<StepId> => {
    const config = getSøknadStepConfig(søknadsdata)[stepId];
    if (!config) {
        throw `Missing step config ${stepId}`;
    }
    return config;
};

export const erAnsattFrilanserEllerSelvstendigNæringsdrivende = (
    søknadsperiode: DateRange,
    arbeidssituasjon?: ArbeidssituasjonSøknadsdata,
): boolean => {
    if (!arbeidssituasjon) {
        return false;
    }
    const { frilans, selvstendig, arbeidsgivere } = arbeidssituasjon;
    if (selvstendig.erSelvstendigNæringsdrivende) {
        return true;
    }
    if (frilans.erFrilanser) {
        if (frilans.jobberFortsattSomFrilans) {
            return true;
        }
        if (
            frilans.sluttdato &&
            isISODate(frilans.sluttdato) &&
            dayjs(frilans.sluttdato).isAfter(dayjs(søknadsperiode.from))
        ) {
            return true;
        }
    }
    return arbeidsgivere === undefined
        ? false
        : Object.keys(arbeidsgivere)
              .map((key) => arbeidsgivere[key])
              .some(({ erAnsattISøknadsperiode }) => erAnsattISøknadsperiode);
};
