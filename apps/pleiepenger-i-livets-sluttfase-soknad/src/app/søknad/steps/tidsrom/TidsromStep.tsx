import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { DateRange, ValidationError, YesOrNo, getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { Utenlandsopphold } from '@navikt/sif-common-forms-ds/lib';
import UtenlandsoppholdListAndDialog from '@navikt/sif-common-forms-ds/lib/forms/utenlandsopphold/UtenlandsoppholdListAndDialog';
import { getDateRangeFromDates } from '@navikt/sif-common-utils/lib';
import { FormattedMessage, useIntl } from 'react-intl';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import SøknadStep from '../../SøknadStep';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import DagerMedPleieFormPart from './DagerMedPleieFormPart';
import {
    getTidsromStepInitialValues,
    getTidsromSøknadsdataFromFormValues,
    validateUtenlandsoppholdIPerioden,
} from './tidsromStepUtils';

export enum TidsromFormFields {
    dagerMedPleie = 'dagerMedPleie',
    skalJobbeIPerioden = 'skalJobbeIPerioden',
    skalOppholdeSegIUtlandetIPerioden = 'skalOppholdeSegIUtlandetIPerioden',
    utenlandsoppholdIPerioden = 'utenlandsoppholdIPerioden',
}

export interface TidsromFormValues {
    [TidsromFormFields.dagerMedPleie]?: Date[];
    [TidsromFormFields.skalJobbeIPerioden]?: YesOrNo;
    [TidsromFormFields.skalOppholdeSegIUtlandetIPerioden]?: YesOrNo;
    [TidsromFormFields.utenlandsoppholdIPerioden]: Utenlandsopphold[];
}

const { FormikWrapper, Form, YesOrNoQuestion } = getTypedFormComponents<
    TidsromFormFields,
    TidsromFormValues,
    ValidationError
>();

const TidsromStep = () => {
    const intl = useIntl();

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
                                        <FormattedMessage id="step.tidsrom.counsellorPanel.avsnitt.1" />
                                    </p>
                                    <p>
                                        <FormattedMessage id="step.tidsrom.counsellorPanel.avsnitt.2" />
                                    </p>
                                </SifGuidePanel>

                                <FormBlock>
                                    <DagerMedPleieFormPart />
                                </FormBlock>
                                {periode && (
                                    <>
                                        <FormBlock>
                                            <YesOrNoQuestion
                                                legend={intlHelper(intl, 'steg.tidsrom.skalJobbeIPerioden.spm')}
                                                name={TidsromFormFields.skalJobbeIPerioden}
                                                validate={getYesOrNoValidator()}
                                                data-testid="skalJobbeIPerioden.spm"
                                            />
                                        </FormBlock>
                                        <FormBlock>
                                            <YesOrNoQuestion
                                                legend={intlHelper(intl, 'steg.tidsrom.iUtlandetIPerioden.spm')}
                                                name={TidsromFormFields.skalOppholdeSegIUtlandetIPerioden}
                                                validate={getYesOrNoValidator()}
                                                data-testid="iUtlandetIPerioden.spm"
                                            />
                                        </FormBlock>
                                        {skalOppholdeSegIUtlandetIPerioden === YesOrNo.YES && (
                                            <FormBlock>
                                                <UtenlandsoppholdListAndDialog<TidsromFormFields>
                                                    name={TidsromFormFields.utenlandsoppholdIPerioden}
                                                    minDate={periode.from}
                                                    maxDate={periode.to}
                                                    excludeInnlagtQuestion={true}
                                                    labels={{
                                                        modalTitle: intlHelper(
                                                            intl,
                                                            'steg.tidsrom.iUtlandetIPerioden.modalTitle',
                                                        ),
                                                        listTitle: intlHelper(
                                                            intl,
                                                            'steg.tidsrom.iUtlandetIPerioden.listTitle',
                                                        ),
                                                        addLabel: intlHelper(
                                                            intl,
                                                            'steg.tidsrom.iUtlandetIPerioden.addLabel',
                                                        ),
                                                    }}
                                                    validate={
                                                        periode
                                                            ? (opphold: Utenlandsopphold[]) =>
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
