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
} from './arbeidssituasjonStepUtils';
import ArbeidsforholdForm, { ArbeidsforholdFormValues } from './components/ArbeidsforholdForm';

export interface UkjentArbeidsforholdMap {
    [id: string]: ArbeidsforholdFormValues;
}

export interface ArbeidssituasjonFormValues {
    [ArbeidssituasjonFormFields.arbeidsforhold]: UkjentArbeidsforholdMap;
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
    const stepConfig = getSøknadStepConfig(hvaSkalEndres, søknadsdata, sak.harUkjentArbeidsgiver);
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
                            Vi trenger mer informasjon om ukjent arbeidsforhold
                        </Heading>
                        <p>
                            Vi har funnet et nytt arbeidsforhold på deg i aa-registeret, som ikke var registrert da du
                            søkte om pleiepenger. Vi trenger litt mer informasjon før du kan fortsette.
                        </p>
                    </BodyLong>
                </>
            </SifGuidePanel>

            <Block margin="xl">
                <FormikWrapper
                    initialValues={getArbeidssituasjonStepInitialValues(
                        søknadsdata,
                        stepFormValues?.arbeidssituasjon,
                        sak.ukjenteArbeidsgivere
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
                                    onBack={goBack}>
                                    {sak.ukjenteArbeidsgivere.map((a) => {
                                        const arbeidsgiverFieldKey = getArbeidsforholdFormFieldKey(a.id);
                                        const fieldName = `${ArbeidssituasjonFormFields.arbeidsforhold}.${arbeidsgiverFieldKey}`;
                                        return (
                                            <div key={a.id} data-testid={`ukjentArbeidsgiver_${a.id}`}>
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
