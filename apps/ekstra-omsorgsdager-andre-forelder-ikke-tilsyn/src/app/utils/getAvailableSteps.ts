import { Person } from 'app/types/Person';
import { StepID } from '../soknad/soknadStepsConfig';
import {
    AnnenForelderFormData,
    AnnenForeldrenSituasjon,
    Barn,
    OmBarnaFormData,
    SoknadFormData,
} from '../types/SoknadFormData';
import { getFødselsnummerValidator } from '@navikt/sif-common-formik/lib/validation';

const omAnnenForelderIsComplete = (
    { annenForelderNavn, annenForelderFnr }: Partial<AnnenForelderFormData>,
    søker: Person
): boolean => {
    const fnrError = getFødselsnummerValidator({ required: true, disallowedValues: [søker.fødselsnummer] })(
        annenForelderFnr
    );
    if (fnrError !== undefined) {
        return false;
    }
    if ((annenForelderNavn || '')?.length < 1) {
        return false;
    }
    return true;
};

const annenForelderSituasjonIsComplete = ({
    annenForelderSituasjon,
    annenForelderSituasjonBeskrivelse,
    annenForelderPeriodeFom,
    annenForelderPeriodeTom,
    annenForelderPeriodeMer6Maneder,
    annenForelderPeriodeVetIkkeTom,
}: Partial<AnnenForelderFormData>): boolean => {
    if (
        annenForelderSituasjon === AnnenForeldrenSituasjon.sykdom ||
        annenForelderSituasjon === AnnenForeldrenSituasjon.annet
    ) {
        return (annenForelderSituasjonBeskrivelse || '').length > 0 &&
            (annenForelderSituasjonBeskrivelse || '').length <= 1000 &&
            annenForelderPeriodeVetIkkeTom
            ? annenForelderPeriodeFom !== undefined && annenForelderPeriodeMer6Maneder !== undefined
            : annenForelderPeriodeFom !== undefined && annenForelderPeriodeTom !== undefined;
    } else
        return annenForelderPeriodeVetIkkeTom
            ? annenForelderPeriodeFom !== undefined && annenForelderPeriodeMer6Maneder !== undefined
            : annenForelderPeriodeFom !== undefined && annenForelderPeriodeTom !== undefined;
};

const omBarnaIsComplete = ({ andreBarn }: Partial<OmBarnaFormData>, barn: Barn[]): boolean => {
    return barn.length > 0 || (andreBarn || []).length > 0;
};

export const getAvailableSteps = (values: Partial<SoknadFormData>, søker: Person, barn: Barn[]): StepID[] => {
    const steps: StepID[] = [];
    steps.push(StepID.OM_ANNEN_FORELDER);

    if (omAnnenForelderIsComplete(values, søker)) {
        steps.push(StepID.ANNEN_FORELDER_SITUASJON);
    }
    if (annenForelderSituasjonIsComplete(values)) {
        steps.push(StepID.DERES_FELLES_BARN);
    }
    if (omBarnaIsComplete(values, barn)) {
        steps.push(StepID.OPPSUMMERING);
    }

    return steps;
};

export const isStepAvailable = (stepId: StepID, availableSteps: StepID[]): boolean => {
    return availableSteps.find((id) => id === stepId) !== undefined;
};
