import { BodyShort } from '@navikt/ds-react';
import React from 'react';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import { FormikCheckboxGroupCheckboxProp } from '@navikt/sif-common-formik-ds/lib/components/formik-checkbox-group/FormikCheckboxGroup';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { getListValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { ArbeidsgiverType } from '../../../types/Arbeidsgiver';
import { ArbeidAktiviteter, ArbeidAktivitetType } from '../../../types/Sak';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import { StepId } from '../../config/StepId';
import { getSøknadStepConfig } from '../../config/søknadStepConfig';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getAktivitetStepInitialValues, getAktivitetSøknadsdataFromFormValues } from './aktivitetStepUtils';

export enum AktivitetFormFields {
    aktivitet = 'aktivitet',
}
export interface AktivitetFormValues {
    [AktivitetFormFields.aktivitet]: [];
}

const { FormikWrapper, Form, CheckboxGroup } = getTypedFormComponents<AktivitetFormFields, AktivitetFormValues>();

const AktivitetStep = () => {
    const stepId = StepId.AKTIVITET;

    const {
        state: { søknadsdata, sak },
    } = useSøknadContext();
    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();
    const stepConfig = getSøknadStepConfig();
    const step = stepConfig[stepId];

    const { goBack } = useStepNavigation(step);

    const onValidSubmitHandler = (values: AktivitetFormValues) => {
        const aktivitetSøknadsdata = getAktivitetSøknadsdataFromFormValues(values);
        if (aktivitetSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadAktivitet(aktivitetSøknadsdata)];
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
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getAktivitetStepInitialValues(søknadsdata, stepFormValues?.aktivitet)}
                onSubmit={handleSubmit}
                renderForm={() => (
                    <>
                        <PersistStepFormValues stepId={stepId} />
                        <Form
                            includeValidationSummary={true}
                            submitPending={isSubmitting}
                            runDelayedFormValidation={true}
                            onBack={goBack}>
                            <CheckboxGroup
                                legend={'Velg hvilke arbeidsforhold du ønsker å endre arbeidstiden for:'}
                                description={
                                    <ExpandableInfo title="Mangler du noen arbeidsforhold?">Mer info</ExpandableInfo>
                                }
                                name={AktivitetFormFields.aktivitet}
                                validate={getListValidator({ required: true })}
                                checkboxes={getOpptjeningAktivitetCheckboxes(sak.arbeidAktivitet)}
                            />
                        </Form>
                    </>
                )}
            />
        </SøknadStep>
    );
};

export default AktivitetStep;

const getAktivitetCheckboxLabel = ({ title, info }: { title: string; info?: React.ReactNode }): React.ReactNode => {
    return (
        <BodyShort>
            <strong>{title}</strong>
            {info ? <div>{info}</div> : null}
        </BodyShort>
    );
};

export const getOpptjeningAktivitetCheckboxes = (
    arbeidAktiviteter: ArbeidAktiviteter
): FormikCheckboxGroupCheckboxProp[] => {
    const checkboxProps: FormikCheckboxGroupCheckboxProp[] = [];

    const { arbeidstaker, frilanser, selvstendingNæringsdrivende } = arbeidAktiviteter;

    arbeidstaker.forEach(({ arbeidsgiver: { id, navn, type } }) => {
        checkboxProps.push({
            label: getAktivitetCheckboxLabel({
                title: navn,
                info: type === ArbeidsgiverType.ORGANISASJON ? `Orgnr. ${id}` : 'Privatperson',
            }),
            value: id,
        });
    });

    if (frilanser) {
        checkboxProps.push({
            label: getAktivitetCheckboxLabel({
                title: 'Frilanser',
            }),
            value: ArbeidAktivitetType.frilanser,
        });
    }
    if (selvstendingNæringsdrivende) {
        checkboxProps.push({
            label: getAktivitetCheckboxLabel({
                title: 'Selvstendig næringsdrivende',
            }),
            value: ArbeidAktivitetType.selvstendigNæringsdrivende,
        });
    }

    return checkboxProps;
};
