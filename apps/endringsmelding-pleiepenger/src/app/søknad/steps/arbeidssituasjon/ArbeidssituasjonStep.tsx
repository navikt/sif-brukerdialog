import { BodyLong, Heading } from '@navikt/ds-react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import PersistStepFormValues from '../../../modules/persist-step-form-values/PersistStepFormValues';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import { StepId } from '../../config/StepId';
import { getSøknadStepConfig } from '../../config/søknadStepConfig';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import {
    getArbeidsforholdFormFieldKey,
    getArbeidssituasjonStepInitialValues,
    getArbeidssituasjonSøknadsdataFromFormValues,
    harSvartErIkkeAnsattHosNyArbeidsgiver,
} from './arbeidssituasjonStepUtils';
import ArbeidsforholdForm, { ArbeidsforholdFormValues } from './components/ArbeidsforholdForm';

export interface NyttArbeidsforholdMap {
    [id: string]: ArbeidsforholdFormValues;
}

export interface ArbeidssituasjonFormValues {
    [ArbeidssituasjonFormFields.arbeidsforhold]: NyttArbeidsforholdMap;
}

enum ArbeidssituasjonFormFields {
    arbeidsforhold = 'arbeidsforhold',
}

const { FormikWrapper, Form } = getTypedFormComponents<
    ArbeidssituasjonFormFields,
    ArbeidssituasjonFormValues,
    ValidationError
>();

const ArbeidssituasjonStep = () => {
    const stepId = StepId.ARBEIDSSITUASJON;
    const intl = useIntl();

    const {
        state: { søknadsdata, hvaSkalEndres, sak, arbeidsgivere },
    } = useSøknadContext();
    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const stepConfig = getSøknadStepConfig(hvaSkalEndres, søknadsdata, sak.harNyArbeidsgiver);
    const step = stepConfig[stepId];

    const { goBack } = useStepNavigation(step);

    const onValidSubmitHandler = (values: ArbeidssituasjonFormValues) => {
        const arbeidssituasjonSøknadsdata = getArbeidssituasjonSøknadsdataFromFormValues(values, arbeidsgivere);
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
            return lagreSøknadState(state);
        }
    );

    return (
        <SøknadStep stepId={stepId} stepConfig={stepConfig}>
            <SifGuidePanel>
                <>
                    <BodyLong as="div">
                        <Heading level="2" size="xsmall" spacing={true}>
                            Nytt arbeidsforhold
                        </Heading>
                    </BodyLong>
                </>
            </SifGuidePanel>

            <Block margin="xl">
                <FormikWrapper
                    initialValues={getArbeidssituasjonStepInitialValues(
                        søknadsdata,
                        stepFormValues?.arbeidssituasjon,
                        sak.nyeArbeidsgivere
                    )}
                    onSubmit={handleSubmit}
                    renderForm={({ values }) => {
                        return (
                            <>
                                <PersistStepFormValues stepId={stepId} />
                                <Form
                                    formErrorHandler={getIntlFormErrorHandler(intl, 'arbeidAktivitetForm')}
                                    includeValidationSummary={true}
                                    submitPending={isSubmitting}
                                    runDelayedFormValidation={true}
                                    submitDisabled={
                                        values[ArbeidssituasjonFormFields.arbeidsforhold] !== undefined &&
                                        harSvartErIkkeAnsattHosNyArbeidsgiver(
                                            values[ArbeidssituasjonFormFields.arbeidsforhold]
                                        )
                                    }
                                    onBack={goBack}>
                                    {sak.nyeArbeidsgivere.map((a) => {
                                        const arbeidsgiverFieldKey = getArbeidsforholdFormFieldKey(
                                            a.organisasjonsnummer
                                        );
                                        const fieldName = `${ArbeidssituasjonFormFields.arbeidsforhold}.${arbeidsgiverFieldKey}`;
                                        return (
                                            <div
                                                key={a.organisasjonsnummer}
                                                data-testid={`nyArbeidsgiver_${a.organisasjonsnummer}`}>
                                                <ArbeidsforholdForm
                                                    arbeidsgiver={a}
                                                    values={(values.arbeidsforhold || {})[arbeidsgiverFieldKey]}
                                                    parentFieldName={fieldName}
                                                />
                                            </div>
                                        );
                                    })}
                                </Form>
                            </>
                        );
                    }}
                />
            </Block>
        </SøknadStep>
    );
};

export default ArbeidssituasjonStep;
