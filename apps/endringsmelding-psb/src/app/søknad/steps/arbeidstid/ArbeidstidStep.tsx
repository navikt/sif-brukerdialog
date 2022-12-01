import { Heading } from '@navikt/ds-react';
import React from 'react';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { OpptjeningAktivitetArbeidstaker } from '../../../types/Sak';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import { StepId } from '../../config/StepId';
import { getSøknadStepConfig } from '../../config/søknadStepConfig';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getArbeidstidStepInitialValues, getArbeidstidSøknadsdataFromFormValues } from './arbeidstidStepUtils';

export enum ArbeidstidFormFields {
    arbeidsgivere = 'arbeidsgivere',
}

export interface ArbeidstidFormValues {
    [ArbeidstidFormFields.arbeidsgivere]: [];
}

const { FormikWrapper, Form } = getTypedFormComponents<ArbeidstidFormFields, ArbeidstidFormValues>();

const ArbeidstidStep = () => {
    const stepId = StepId.ARBEIDSTID;

    const {
        state: { søknadsdata, sak },
    } = useSøknadContext();
    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const stepConfig = getSøknadStepConfig();
    const step = stepConfig[stepId];

    const { goBack } = useStepNavigation(step);

    const onValidSubmitHandler = (values: ArbeidstidFormValues) => {
        const arbeidstidSøknadsdata = getArbeidstidSøknadsdataFromFormValues(values);
        if (arbeidstidSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadArbeidstid(arbeidstidSøknadsdata)];
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

    const arbeidsgivere = getAktiviteterSomSkalEndres(
        sak.opptjeningAktivitet.arbeidstaker,
        søknadsdata.aktivitet?.aktivitet
    );

    // console.log(arbeidsgivere);

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getArbeidstidStepInitialValues(søknadsdata, stepFormValues?.arbeidstid)}
                onSubmit={handleSubmit}
                renderForm={() => (
                    <>
                        <PersistStepFormValues stepId={stepId} />
                        <Form
                            includeValidationSummary={true}
                            submitPending={isSubmitting}
                            runDelayedFormValidation={true}
                            onBack={goBack}>
                            {arbeidsgivere.length > 0 && (
                                <>
                                    <Heading level="2" size="small">
                                        Arbeidsgivere
                                    </Heading>
                                    {arbeidsgivere.map((a) => {
                                        <p key={a.arbeidsgiver.id}>sad{a.arbeidsgiver.navn}</p>;
                                    })}
                                </>
                            )}
                        </Form>
                    </>
                )}
            />
        </SøknadStep>
    );
};

export default ArbeidstidStep;

const getAktiviteterSomSkalEndres = (
    aktivitet: OpptjeningAktivitetArbeidstaker[],
    valgteAktiviteter: string[]
): OpptjeningAktivitetArbeidstaker[] => {
    return aktivitet.filter((a) => valgteAktiviteter.includes(a.arbeidsgiver.id));
};
