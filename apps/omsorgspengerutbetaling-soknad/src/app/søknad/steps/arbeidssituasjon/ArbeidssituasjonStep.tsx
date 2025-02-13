import { Alert } from '@navikt/ds-react';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { FormikInputGroup } from '@navikt/sif-common-formik-ds';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { getIntlFormErrorHandler } from '@navikt/sif-common-formik-ds';
import { ValidationError } from '@navikt/sif-common-formik-ds';
import { Virksomhet } from '@navikt/sif-common-forms-ds/src/forms/virksomhet/types';
import { mellomlagringService } from '../../../api/mellomlagringService';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { AppText, useAppIntl } from '../../../i18n';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
// import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import {
    getArbeidssituasjonStepInitialValues,
    getArbeidssituasjonSøknadsdataFromFormValues,
    getFrilanserSnSituasjon,
    validateArbeidssituasjonTidsrom,
} from './arbeidssituasjonStepUtils';
import FrilansFormPart from './form-parts/FrilansFormPart';
import SelvstendigNæringsdrivendeFormPart from './form-parts/SelvstendigNæringsdrivendeFormPart';

export enum ArbeidssituasjonFormFields {
    frilans_erFrilanser = 'frilans_erFrilanser',
    frilans_startdato = 'frilans_startdato',
    frilans_jobberFortsattSomFrilans = 'frilans_jobberFortsattSomFrilans',
    frilans_sluttdato = 'frilans_sluttdato',
    selvstendig_erSelvstendigNæringsdrivende = 'selvstendig_erSelvstendigNæringsdrivende',
    selvstendig_harFlereVirksomheter = 'selvstendig_harFlereVirksomheter',
    selvstendig_virksomhet = 'selvstendig_virksomhet',
}

export interface ArbeidssituasjonFormValues {
    [ArbeidssituasjonFormFields.frilans_erFrilanser]: YesOrNo;
    [ArbeidssituasjonFormFields.frilans_startdato]?: string;
    [ArbeidssituasjonFormFields.frilans_jobberFortsattSomFrilans]?: YesOrNo;
    [ArbeidssituasjonFormFields.frilans_sluttdato]?: string;
    [ArbeidssituasjonFormFields.selvstendig_erSelvstendigNæringsdrivende]: YesOrNo;
    [ArbeidssituasjonFormFields.selvstendig_harFlereVirksomheter]?: YesOrNo;
    [ArbeidssituasjonFormFields.selvstendig_virksomhet]?: Virksomhet;
}

const { FormikWrapper, Form } = getTypedFormComponents<
    ArbeidssituasjonFormFields,
    ArbeidssituasjonFormValues,
    ValidationError
>();

const submitDisabled = (values: Partial<ArbeidssituasjonFormValues>): boolean => {
    const erFrilanser = values[ArbeidssituasjonFormFields.frilans_erFrilanser];
    const erSelvstendigNæringsdrivende = values[ArbeidssituasjonFormFields.selvstendig_erSelvstendigNæringsdrivende];

    return erFrilanser === YesOrNo.NO && erSelvstendigNæringsdrivende === YesOrNo.NO;
};

const ArbeidssituasjonStep = () => {
    const { intl } = useAppIntl();
    const {
        state: { søknadsdata },
    } = useSøknadContext();

    const stepId = StepId.ARBEIDSSITUASJON;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: ArbeidssituasjonFormValues) => {
        const arbeidssituasjonSøknadsdata = getArbeidssituasjonSøknadsdataFromFormValues(values);
        if (arbeidssituasjonSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadArbeidssituasjon(arbeidssituasjonSøknadsdata)];
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        stepId,
        (state: SøknadContextState) => {
            return mellomlagringService.update(state);
        },
    );

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getArbeidssituasjonStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={({ values }) => {
                    return (
                        <>
                            <PersistStepFormValues stepId={stepId} />
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                submitDisabled={submitDisabled(values) || isSubmitting}
                                onBack={goBack}
                                runDelayedFormValidation={true}>
                                <SifGuidePanel>
                                    <p>
                                        <AppText id="step.arbeidssituasjon.info.1" />
                                    </p>
                                </SifGuidePanel>

                                <FormikInputGroup
                                    name={'arbeidssituasjon_tidsrom'}
                                    hideLegend={true}
                                    errorPropagation={false}
                                    legend="Registrer frilans og/eller selvstendig næringsdrivende"
                                    validate={() => {
                                        const error = validateArbeidssituasjonTidsrom(
                                            values,
                                            søknadsdata.fravaer?.førsteOgSisteDagMedFravær,
                                        );
                                        const situasjon = getFrilanserSnSituasjon(values);
                                        if (error && situasjon) {
                                            return {
                                                key: error,
                                                values: {
                                                    situasjon,
                                                },
                                            };
                                        }
                                        return undefined;
                                    }}>
                                    <div>
                                        <FormBlock>
                                            <FrilansFormPart
                                                values={values}
                                                fraværPeriode={søknadsdata.fravaer?.førsteOgSisteDagMedFravær}
                                            />
                                        </FormBlock>

                                        <FormBlock>
                                            <SelvstendigNæringsdrivendeFormPart values={values} />
                                        </FormBlock>
                                    </div>
                                </FormikInputGroup>

                                {submitDisabled(values) && (
                                    <FormBlock margin="l">
                                        <Alert variant="warning">
                                            <AppText id="step.arbeidssituasjon.advarsel.ingenSituasjonValgt" />
                                        </Alert>
                                    </FormBlock>
                                )}
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default ArbeidssituasjonStep;
