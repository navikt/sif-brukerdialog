import { BodyLong, Panel } from '@navikt/ds-react';
import React from 'react';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { dateRangeToISODateRange } from '@navikt/sif-common-utils/lib';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import {
    ArbeidstidAktivitetEndring,
    ArbeidstidAktivitetEndringUkeMap,
} from '../../../types/ArbeidstidAktivitetEndring';
import { ArbeidAktivitet, ArbeidAktiviteter, ArbeidAktivitetType } from '../../../types/Sak';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import { StepId } from '../../config/StepId';
import { getSøknadStepConfig } from '../../config/søknadStepConfig';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import Arbeidsaktivitet from './Arbeidsaktivitet';
import { getArbeidstidStepInitialValues, getArbeidstidSøknadsdataFromFormValues } from './arbeidstidStepUtils';
import getValidateArbeidAktivitetEndring from './validateArbeidAktivitetEndring';
import { getArbeidAktivitetNavn } from '../../../utils/arbeidAktivitetUtils';
import { useIntl } from 'react-intl';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib';

export enum ArbeidstidFormFields {
    arbeidAktivitetEndring = 'arbeidAktivitetEndring',
}
export interface ArbeidstidFormValues {
    [ArbeidstidFormFields.arbeidAktivitetEndring]: { [aktivitetId: string]: ArbeidstidAktivitetEndringUkeMap };
}

const { FormikWrapper, Form, InputGroup } = getTypedFormComponents<
    ArbeidstidFormFields,
    ArbeidstidFormValues,
    ValidationError
>();

const ArbeidstidStep = () => {
    const stepId = StepId.ARBEIDSTID;
    const intl = useIntl();

    const {
        dispatch,
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
    const arbeidAktiviteter: ArbeidAktivitet[] = getAktiviteterSomSkalEndres(sak.arbeidAktiviteter, valgteAktiviteter);

    const onArbeidsukeChange = (
        endring: ArbeidstidAktivitetEndring,
        values: Partial<ArbeidstidFormValues>,
        setValues: (values: ArbeidstidFormValues) => void
    ) => {
        const alleEndringer = values[ArbeidstidFormFields.arbeidAktivitetEndring] || {};
        const endringerForAktivitet: ArbeidstidAktivitetEndringUkeMap = alleEndringer[endring.arbeidAktivitetId];
        const newValues: ArbeidstidFormValues = {
            arbeidAktivitetEndring: {
                ...values[ArbeidstidFormFields.arbeidAktivitetEndring],
                [endring.arbeidAktivitetId]: {
                    ...endringerForAktivitet,
                    [dateRangeToISODateRange(endring.periode)]: endring,
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
        <SøknadStep stepId={stepId}>
            <SifGuidePanel>
                <BodyLong>
                    Du kan melde om endringer i den perioden arbeidsforholdet er aktivt, og opptil 3 måneder tilbake i
                    tid, og 12 måneder frem i tid. Uker du ikke har søkt, vil ikke være med i listene nedefor.
                </BodyLong>
            </SifGuidePanel>
            <FormikWrapper
                initialValues={getArbeidstidStepInitialValues(søknadsdata, stepFormValues?.arbeidstid)}
                onSubmit={handleSubmit}
                renderForm={({ setValues, values }) => {
                    const endringer = values.arbeidAktivitetEndring || {};
                    return (
                        <>
                            <PersistStepFormValues stepId={stepId} />
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'arbeidAktivitetForm')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                runDelayedFormValidation={true}
                                onBack={goBack}>
                                {arbeidAktiviteter.map((arbeidAktivitet) => {
                                    const arbeidAktivitetNavn = getArbeidAktivitetNavn(arbeidAktivitet);
                                    return (
                                        <FormBlock key={arbeidAktivitet.id}>
                                            <Panel border={true}>
                                                <InputGroup
                                                    name={arbeidAktivitet.id as any}
                                                    legend={getArbeidAktivitetNavn(arbeidAktivitet)}
                                                    hideLegend={true}
                                                    validate={() => {
                                                        const error = getValidateArbeidAktivitetEndring(
                                                            arbeidAktivitet
                                                        )(endringer[arbeidAktivitet.id]);
                                                        return error
                                                            ? {
                                                                  key: `arbeidAktivitetForm.arbeidAktivitet.${error}`,
                                                                  keepKeyUnaltered: true,
                                                                  values: { arbeidAktivitetNavn },
                                                              }
                                                            : undefined;
                                                    }}>
                                                    <Arbeidsaktivitet
                                                        arbeidAktivitet={arbeidAktivitet}
                                                        endringer={endringer[arbeidAktivitet.id]}
                                                        onArbeidsukeChange={(endring) => {
                                                            onArbeidsukeChange(endring, values, setValues);
                                                        }}
                                                    />
                                                </InputGroup>
                                            </Panel>
                                        </FormBlock>
                                    );
                                })}
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default ArbeidstidStep;

const getAktiviteterSomSkalEndres = (
    arbeidAktiviteter: ArbeidAktiviteter,
    valgteAktiviteter: string[] = []
): ArbeidAktivitet[] => {
    const { arbeidstakerArr: arbeidstaker, frilanser, selvstendigNæringsdrivende } = arbeidAktiviteter;

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
