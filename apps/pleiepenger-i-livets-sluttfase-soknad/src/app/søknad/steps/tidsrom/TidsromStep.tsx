import { FormattedMessage, useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { DateRange, getTypedFormComponents, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { getRequiredFieldValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { Ferieuttak, Utenlandsopphold } from '@navikt/sif-common-forms-ds/lib';
import FerieuttakListAndDialog from '@navikt/sif-common-forms-ds/lib/forms/ferieuttak/FerieuttakListAndDialog';
import UtenlandsoppholdListAndDialog from '@navikt/sif-common-forms-ds/lib/forms/utenlandsopphold/UtenlandsoppholdListAndDialog';
import { getDateRangeFromDates } from '@navikt/sif-common-utils/lib';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { YesOrNoDontKnow } from '../../../types/YesOrNoDontKnow';
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
    validateFerieuttakIPerioden,
    validateUtenlandsoppholdIPerioden,
} from './tidsromStepUtils';

export enum TidsromFormFields {
    dagerMedPleie = 'dagerMedPleie',
    flereSokere = 'flereSokere',
    skalOppholdeSegIUtlandetIPerioden = 'skalOppholdeSegIUtlandetIPerioden',
    utenlandsoppholdIPerioden = 'utenlandsoppholdIPerioden',
    skalTaUtFerieIPerioden = 'skalTaUtFerieIPerioden',
    ferieuttakIPerioden = 'ferieuttakIPerioden',
}

export interface TidsromFormValues {
    [TidsromFormFields.dagerMedPleie]?: Date[];
    [TidsromFormFields.flereSokere]?: YesOrNoDontKnow;
    [TidsromFormFields.skalOppholdeSegIUtlandetIPerioden]?: YesOrNo;
    [TidsromFormFields.utenlandsoppholdIPerioden]: Utenlandsopphold[];
    [TidsromFormFields.skalTaUtFerieIPerioden]: YesOrNo;
    [TidsromFormFields.ferieuttakIPerioden]: Ferieuttak[];
}

const { FormikWrapper, Form, YesOrNoQuestion, RadioGroup } = getTypedFormComponents<
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
        const TidsromSøknadsdata = getTidsromSøknadsdataFromFormValues(values);
        if (TidsromSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadTidsrom(TidsromSøknadsdata)];
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
                renderForm={({
                    values: { skalOppholdeSegIUtlandetIPerioden, skalTaUtFerieIPerioden, dagerMedPleie },
                }) => {
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
                                    <FormattedMessage id="step.tidsrom.counsellorPanel.avsnitt.1" />

                                    <p>
                                        <FormattedMessage id="step.tidsrom.counsellorPanel.avsnitt.2" />
                                    </p>
                                    <p>
                                        <FormattedMessage id="step.tidsrom.counsellorPanel.avsnitt.3" />
                                    </p>
                                </SifGuidePanel>

                                <FormBlock>
                                    <DagerMedPleieFormPart />
                                </FormBlock>
                                {periode && (
                                    <>
                                        <FormBlock>
                                            <RadioGroup
                                                legend={intlHelper(intl, 'steg.tidsrom.flereSokere.spm')}
                                                name={TidsromFormFields.flereSokere}
                                                validate={getRequiredFieldValidator()}
                                                description={
                                                    <ExpandableInfo
                                                        title={intlHelper(
                                                            intl,
                                                            'steg.tidsrom.flereSokere.spm.description.tittle',
                                                        )}>
                                                        {intlHelper(intl, 'steg.tidsrom.flereSokere.spm.description')}
                                                    </ExpandableInfo>
                                                }
                                                radios={[
                                                    {
                                                        label: intlHelper(intl, `step.tidsrom.flereSokere.ja`),
                                                        value: YesOrNoDontKnow.YES,
                                                        'data-testid': `steg.tidsrom.flereSokere.spm_yes`,
                                                    },
                                                    {
                                                        label: intlHelper(intl, `step.tidsrom.flereSokere.nei`),
                                                        value: YesOrNoDontKnow.NO,
                                                        'data-testid': `steg.tidsrom.flereSokere.spm_no`,
                                                    },
                                                    {
                                                        label: intlHelper(intl, `step.tidsrom.flereSokere.usikker`),
                                                        value: YesOrNoDontKnow.DO_NOT_KNOW,
                                                        'data-testid': `steg.tidsrom.flereSokere.spm_usikker`,
                                                    },
                                                ]}
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
                                        <FormBlock>
                                            <YesOrNoQuestion
                                                legend={intlHelper(intl, 'steg.tidsrom.ferieuttakIPerioden.spm')}
                                                name={TidsromFormFields.skalTaUtFerieIPerioden}
                                                validate={getYesOrNoValidator()}
                                                data-testid="ferieuttakIPerioden.spm"
                                            />
                                        </FormBlock>
                                        {skalTaUtFerieIPerioden === YesOrNo.YES && (
                                            <FormBlock>
                                                <FerieuttakListAndDialog<TidsromFormFields>
                                                    name={TidsromFormFields.ferieuttakIPerioden}
                                                    minDate={periode.from}
                                                    maxDate={periode.to}
                                                    labels={{
                                                        modalTitle: intlHelper(
                                                            intl,
                                                            'steg.tidsrom.ferieuttakIPerioden.modalTitle',
                                                        ),
                                                        listTitle: intlHelper(
                                                            intl,
                                                            'steg.tidsrom.ferieuttakIPerioden.listTitle',
                                                        ),
                                                        addLabel: intlHelper(
                                                            intl,
                                                            'steg.tidsrom.ferieuttakIPerioden.addLabel',
                                                        ),
                                                    }}
                                                    validate={
                                                        periode
                                                            ? (ferie: Ferieuttak[]) =>
                                                                  validateFerieuttakIPerioden(periode, ferie)
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
