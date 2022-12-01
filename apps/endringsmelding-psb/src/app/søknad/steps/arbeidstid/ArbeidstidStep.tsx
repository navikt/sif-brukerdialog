import { Panel } from '@navikt/ds-react';
import React from 'react';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
// import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { ArbeidAktivitet, ArbeidAktiviteter, ArbeidAktivitetType } from '../../../types/Sak';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import { StepId } from '../../config/StepId';
import { getSøknadStepConfig } from '../../config/søknadStepConfig';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getArbeidstidStepInitialValues, getArbeidstidSøknadsdataFromFormValues } from './arbeidstidStepUtils';
import { ArbeidIPeriodeFormValues } from './arbeid-i-periode/ArbeidIPeriodeFormValues';
import ArbeidAktivitetFormPart from './arbeid-i-periode/ArbeidAktivitetFormPart';

export enum ArbeidstidFormFields {
    arbeidAktivitet = 'arbeidAktivitet',
}

export interface ArbeidstidFormValues {
    [ArbeidstidFormFields.arbeidAktivitet]: { [key: string]: ArbeidIPeriodeFormValues };
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

    const valgteAktiviteter = søknadsdata.arbeidAktivitet?.aktiviteterSomSkalEndres || [];

    const aktiviteter: ArbeidAktivitet[] = getAktiviteterSomSkalEndres(sak.arbeidAktivitet, valgteAktiviteter);

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getArbeidstidStepInitialValues(søknadsdata, stepFormValues?.arbeidstid)}
                onSubmit={handleSubmit}
                renderForm={({ values }) => (
                    <>
                        {/* <PersistStepFormValues stepId={stepId} /> */}
                        <Form
                            includeValidationSummary={true}
                            submitPending={isSubmitting}
                            runDelayedFormValidation={true}
                            onBack={goBack}>
                            {aktiviteter.map((a) => {
                                const aktivitetValues = (values.arbeidAktivitet || {})[a.id];
                                return (
                                    <FormBlock key={a.id}>
                                        <Panel
                                            border={true}
                                            style={{
                                                backgroundColor: 'var(--a-bg-subtle)',
                                                borderStyle: 'dashed',
                                            }}>
                                            <ArbeidAktivitetFormPart
                                                parentFieldName={
                                                    `${ArbeidstidFormFields.arbeidAktivitet}.${a.id}` as any
                                                }
                                                arbeidAktivitet={a}
                                                values={aktivitetValues || {}}
                                            />
                                        </Panel>
                                    </FormBlock>
                                );
                            })}
                        </Form>
                    </>
                )}
            />
        </SøknadStep>
    );
};

export default ArbeidstidStep;

const getAktiviteterSomSkalEndres = (
    arbeidAktiviteter: ArbeidAktiviteter,
    valgteAktiviteter: string[] = []
): ArbeidAktivitet[] => {
    const { arbeidstaker, frilanser, selvstendigNæringsdrivende } = arbeidAktiviteter;

    const aktiviteter: ArbeidAktivitet[] = arbeidstaker.filter((a) => (valgteAktiviteter || []).includes(a.id));
    if (frilanser !== undefined && valgteAktiviteter.includes(ArbeidAktivitetType.frilanser)) {
        aktiviteter.push({ ...frilanser });
    }

    if (
        selvstendigNæringsdrivende !== undefined &&
        valgteAktiviteter.includes(ArbeidAktivitetType.selvstendigNæringsdrivende)
    ) {
        aktiviteter.push({ ...selvstendigNæringsdrivende });
    }
    return aktiviteter;
};
