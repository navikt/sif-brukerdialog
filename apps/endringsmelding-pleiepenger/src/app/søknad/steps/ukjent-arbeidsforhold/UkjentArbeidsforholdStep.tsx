import { BodyLong, Heading } from '@navikt/ds-react';
import { useIntl } from 'react-intl';
import { useOnValidSubmit, useStepNavigation, useSøknadContext } from '@hooks';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { SøknadContextState } from '@types';
import PersistStepFormValues from '../../../modules/persist-step-form-values/PersistStepFormValues';
import { StepId } from '../../config/StepId';
import { getSøknadStepConfig } from '../../config/søknadStepConfig';
import actionsCreator from '../../context/action/actionCreator';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import {
    getUkjentArbeidsforholdStepInitialValues,
    getUkjentArbeidsforholdSøknadsdataFromFormValues,
} from './ukjentArbeidsforholdStepUtils';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import UkjentArbeidsgiverFormPart, {
    UkjentArbeidsgiverFormValues,
} from './ukjent-arbeidsgiver-form-part/UkjentArbeidsgiverFormPart';

export interface UkjentArbeidsgiverMap {
    [arbeidsgiverKey: string]: UkjentArbeidsgiverFormValues;
}

export interface UkjentArbeidsforholdFormValues {
    [UkjentArbeidsforholdFormFields.arbeidsforhold]: UkjentArbeidsgiverMap;
}

enum UkjentArbeidsforholdFormFields {
    arbeidsforhold = 'arbeidsforhold',
}

const { FormikWrapper, Form } = getTypedFormComponents<
    UkjentArbeidsforholdFormFields,
    UkjentArbeidsforholdFormValues,
    ValidationError
>();

const UkjentArbeidsforholdStep = () => {
    const stepId = StepId.UKJENT_ARBEIDSFOHOLD;
    const intl = useIntl();

    const {
        state: { søknadsdata, valgtHvaSkalEndres: hvaSkalEndres, sak, arbeidsgivere },
    } = useSøknadContext();

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();
    const stepConfig = getSøknadStepConfig(hvaSkalEndres, søknadsdata, sak.harUkjentArbeidsforhold);
    const step = stepConfig[stepId];

    const { goBack } = useStepNavigation(step);

    const onValidSubmitHandler = (values: UkjentArbeidsforholdFormValues) => {
        const ukjentArbeidsforholdSøknadsdata = getUkjentArbeidsforholdSøknadsdataFromFormValues(values, arbeidsgivere);
        if (ukjentArbeidsforholdSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadUkjentArbeidsforhold(ukjentArbeidsforholdSøknadsdata)];
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
                            Vi har funnet et nytt arbeidsforhold på deg i{' '}
                            <abbr title="Arbeidsgiver- og arbeidstakerregisteret">Aa-registeret</abbr>, som ikke var
                            registrert da du søkte om pleiepenger. Vi trenger litt mer informasjon før du kan fortsette.
                        </p>
                    </BodyLong>
                </>
            </SifGuidePanel>

            <Block margin="xl">
                <FormikWrapper
                    initialValues={getUkjentArbeidsforholdStepInitialValues(
                        søknadsdata,
                        stepFormValues?.ukjentArbeidsforhold,
                        sak.ukjenteArbeidsgivere
                    )}
                    onSubmit={handleSubmit}
                    renderForm={({ values }) => {
                        return (
                            <>
                                <PersistStepFormValues stepId={stepId} />
                                <Form
                                    formErrorHandler={getIntlFormErrorHandler(intl, 'arbeidsaktivitetForm')}
                                    includeValidationSummary={true}
                                    submitPending={isSubmitting}
                                    runDelayedFormValidation={true}
                                    onBack={goBack}>
                                    {sak.ukjenteArbeidsgivere.map((a) => {
                                        const fieldName = `${UkjentArbeidsforholdFormFields.arbeidsforhold}.${a.key}`;
                                        return (
                                            <div key={a.key} data-testid={`ukjentArbeidsforhold_${a.key}`}>
                                                <UkjentArbeidsgiverFormPart
                                                    arbeidsgiver={a}
                                                    values={(values.arbeidsforhold || {})[a.key]}
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

export default UkjentArbeidsforholdStep;
