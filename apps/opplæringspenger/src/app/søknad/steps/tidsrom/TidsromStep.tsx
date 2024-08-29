import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { DateRange, getTypedFormComponents, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { UtenlandsoppholdEnkel } from '@navikt/sif-common-forms-ds';
import UtenlandsoppholdListAndDialog from '@navikt/sif-common-forms-ds/src/forms/utenlandsopphold/UtenlandsoppholdListAndDialog';
import { getDateRangeFromDates } from '@navikt/sif-common-utils';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { AppText, useAppIntl } from '../../../i18n';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import DagerMedPleieFormPart from './DagerMedPleieFormPart';
import {
    getTidsromStepInitialValues,
    getTidsromSøknadsdataFromFormValues,
    validateUtenlandsoppholdIPerioden,
} from './tidsromStepUtils';

export enum TidsromFormFields {
    dagerMedPleie = 'dagerMedPleie',
    skalOppholdeSegIUtlandetIPerioden = 'skalOppholdeSegIUtlandetIPerioden',
    utenlandsoppholdIPerioden = 'utenlandsoppholdIPerioden',
}

export interface TidsromFormValues {
    [TidsromFormFields.dagerMedPleie]?: Date[];
    [TidsromFormFields.skalOppholdeSegIUtlandetIPerioden]?: YesOrNo;
    [TidsromFormFields.utenlandsoppholdIPerioden]: UtenlandsoppholdEnkel[];
}

const { FormikWrapper, Form, YesOrNoQuestion } = getTypedFormComponents<
    TidsromFormFields,
    TidsromFormValues,
    ValidationError
>();

const TidsromStep = () => {
    const { text, intl } = useAppIntl();

    const {
        state: { søknadsdata },
    } = useSøknadContext();

    const stepId = StepId.TIDSROM;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: TidsromFormValues) => {
        const tidsromSøknadsdata = getTidsromSøknadsdataFromFormValues(values);
        if (tidsromSøknadsdata) {
            clearStepFormValues(stepId);
            return [
                actionsCreator.setSøknadTidsrom(tidsromSøknadsdata),
                actionsCreator.syncArbeidstidMedTidsrom(tidsromSøknadsdata),
            ];
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        stepId,
        (state: SøknadContextState) => {
            return lagreSøknadState({ ...state });
        },
    );

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getTidsromStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={({ values: { skalOppholdeSegIUtlandetIPerioden, dagerMedPleie } }) => {
                    const periode: DateRange | undefined =
                        dagerMedPleie && dagerMedPleie.length > 0 ? getDateRangeFromDates(dagerMedPleie) : undefined;

                    return (
                        <>
                            <PersistStepFormValues stepId={stepId} />
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                submitDisabled={isSubmitting}
                                onBack={goBack}
                                runDelayedFormValidation={true}>
                                <SifGuidePanel>
                                    <p>
                                        <AppText id="step.tidsrom.counsellorPanel.avsnitt.1" />
                                    </p>
                                    <p>
                                        <AppText id="step.tidsrom.counsellorPanel.avsnitt.2" />
                                    </p>
                                    <p>
                                        <AppText id="step.tidsrom.counsellorPanel.avsnitt.3" />
                                    </p>
                                </SifGuidePanel>

                                <FormBlock>
                                    <DagerMedPleieFormPart />
                                </FormBlock>
                                {periode && (
                                    <>
                                        <FormBlock>
                                            <YesOrNoQuestion
                                                legend={text('steg.tidsrom.iUtlandetIPerioden.spm')}
                                                name={TidsromFormFields.skalOppholdeSegIUtlandetIPerioden}
                                                validate={getYesOrNoValidator()}
                                            />
                                        </FormBlock>
                                        {skalOppholdeSegIUtlandetIPerioden === YesOrNo.YES && (
                                            <FormBlock>
                                                <UtenlandsoppholdListAndDialog<TidsromFormFields>
                                                    name={TidsromFormFields.utenlandsoppholdIPerioden}
                                                    minDate={periode.from}
                                                    maxDate={periode.to}
                                                    variant="enkel"
                                                    labels={{
                                                        modalTitle: text('steg.tidsrom.iUtlandetIPerioden.modalTitle'),
                                                        listTitle: text('steg.tidsrom.iUtlandetIPerioden.listTitle'),
                                                        addLabel: text('steg.tidsrom.iUtlandetIPerioden.addLabel'),
                                                    }}
                                                    validate={
                                                        periode
                                                            ? (opphold: UtenlandsoppholdEnkel[]) =>
                                                                  validateUtenlandsoppholdIPerioden(periode, opphold)
                                                            : undefined
                                                    }
                                                />
                                            </FormBlock>
                                        )}
                                    </>
                                )}
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default TidsromStep;
