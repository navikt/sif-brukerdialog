import React from 'react';
import { useIntl } from 'react-intl';
import { useOnValidSubmit, useSøknadContext } from '@hooks';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds/lib';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { ArbeidAktivitetType, ArbeiderIPeriodenSvar, ArbeidstidEndringMap, SøknadContextState } from '@types';
import { getArbeidAktiviteterForUkjenteArbeidsgivere } from '@utils';
import PersistStepFormValues from '../../../modules/persist-step-form-values/PersistStepFormValues';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import { StepId } from '../../config/StepId';
import actionsCreator from '../../context/action/actionCreator';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import ArbeidAktivitetFormPart from './arbeid-aktivitet-form-part/ArbeidAktivitetFormPart';
import {
    getAktiviteterSomSkalEndres,
    getArbeidstidStepInitialValues,
    getArbeidstidSøknadsdataFromFormValues,
} from './arbeidstidStepUtils';

const { FormikWrapper, Form } = getTypedFormComponents<ArbeidstidFormFields, ArbeidstidFormValues, ValidationError>();

export type ArbeidAktivitetFormValuesMap = {
    [aktivitetId: string]: ArbeidsaktivitetFormValues;
};

export interface ArbeidstidFormValues {
    [ArbeidstidFormFields.arbeidAktivitet]: ArbeidAktivitetFormValuesMap;
}
export interface ArbeidsaktivitetFormValues {
    endringer: ArbeidstidEndringMap;
    arbeiderIPerioden?: ArbeiderIPeriodenSvar;
}

export enum ArbeidstidFormFields {
    arbeidAktivitet = 'arbeidAktivitet',
}

interface Props {
    goBack?: () => void;
}

const ArbeidstidForm: React.FunctionComponent<Props> = ({ goBack }) => {
    const stepId = StepId.ARBEIDSTID;
    const intl = useIntl();
    const {
        dispatch,
        state: { søknadsdata, sak },
    } = useSøknadContext();
    const { clearStepFormValues, stepFormValues } = useStepFormValuesContext();

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

    const onArbeidstidAktivitetChange = (
        arbeidAktivitetKey: string,
        arbeidstidEndringMap: ArbeidstidEndringMap,
        values: Partial<ArbeidstidFormValues>,
        setValues: (values: ArbeidstidFormValues) => void
    ) => {
        const currentAktivitetValues = (values.arbeidAktivitet || {})[arbeidAktivitetKey];
        const newValues: ArbeidstidFormValues = {
            arbeidAktivitet: {
                ...values.arbeidAktivitet,
                [arbeidAktivitetKey]: {
                    arbeiderIPerioden: currentAktivitetValues?.arbeiderIPerioden,
                    endringer: arbeidstidEndringMap,
                },
            },
        };

        setValues(newValues);

        /** Oppdater state før mellomlagring */
        const arbeidstidSøknadsdata = getArbeidstidSøknadsdataFromFormValues(newValues);
        if (arbeidstidSøknadsdata) {
            dispatch(actionsCreator.setSøknadArbeidstid(arbeidstidSøknadsdata));
            dispatch(actionsCreator.requestLagreSøknad());
        }
    };
    return (
        <FormikWrapper
            initialValues={getArbeidstidStepInitialValues(søknadsdata, stepFormValues?.arbeidstid)}
            onSubmit={handleSubmit}
            renderForm={({ setValues, values }) => {
                const aktiviteterValuesMap = values.arbeidAktivitet || {};
                const arbeidAktiviteter = [
                    ...getArbeidAktiviteterForUkjenteArbeidsgivere(
                        sak.søknadsperioder,
                        sak.ukjenteArbeidsgivere,
                        aktiviteterValuesMap,
                        søknadsdata.ukjentArbeidsforhold
                    ),
                    ...getAktiviteterSomSkalEndres(sak.arbeidAktiviteter),
                ];
                return (
                    <>
                        <PersistStepFormValues stepId={stepId} />
                        <Form
                            formErrorHandler={getIntlFormErrorHandler(intl, 'arbeidstidForm')}
                            includeValidationSummary={true}
                            submitPending={isSubmitting}
                            runDelayedFormValidation={true}
                            onBack={goBack}>
                            {arbeidAktiviteter.map((arbeidAktivitet) => (
                                <Block margin="l" key={arbeidAktivitet.key}>
                                    <ArbeidAktivitetFormPart
                                        arbeidAktivitet={arbeidAktivitet}
                                        lovbestemtFerie={søknadsdata.lovbestemtFerie}
                                        aktivitetFormValues={(values.arbeidAktivitet || {})[arbeidAktivitet.key]}
                                        onArbeidstidChange={(arbeidstidEndringer) => {
                                            onArbeidstidAktivitetChange(
                                                arbeidAktivitet.key,
                                                arbeidstidEndringer,
                                                values,
                                                setValues
                                            );
                                        }}
                                        renderAsExpansionCard={arbeidAktiviteter.length > 1}
                                        expansionCardDefaultOpen={
                                            arbeidAktiviteter.length <= 2 ||
                                            (arbeidAktivitet.type === ArbeidAktivitetType.arbeidstaker &&
                                                arbeidAktivitet.erUkjentArbeidsforhold === true)
                                        }
                                    />
                                </Block>
                            ))}
                        </Form>
                    </>
                );
            }}
        />
    );
};

export default ArbeidstidForm;
