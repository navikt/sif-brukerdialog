import { BodyLong, Panel } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import InfoList from '@navikt/sif-common-core-ds/lib/components/info-list/InfoList';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { dateRangeToISODateRange } from '@navikt/sif-common-utils/lib';
import Arbeidsaktivitet from '../../../components/arbeidsaktivitet/Arbeidsaktivitet';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { ArbeidstidAktivitetEndring, ArbeidstidAktivitetEndringMap } from '../../../types/ArbeidstidAktivitetEndring';
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

export interface ArbeidstidFormValues {
    [ArbeidstidFormFields.arbeidAktivitetEndring]: { [aktivitetId: string]: ArbeidstidAktivitetEndringMap };
}

enum ArbeidstidFormFields {
    arbeidAktivitetEndring = 'arbeidAktivitetEndring',
}

const { FormikWrapper, Form } = getTypedFormComponents<ArbeidstidFormFields, ArbeidstidFormValues, ValidationError>();

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

    const valgteAktiviteter = søknadsdata.aktivitet?.aktiviteterSomSkalEndres || [];
    const arbeidAktiviteter: ArbeidAktivitet[] = getAktiviteterSomSkalEndres(sak.arbeidAktiviteter, valgteAktiviteter);

    const onArbeidstidAktivitetChange = (
        endring: ArbeidstidAktivitetEndring[],
        values: Partial<ArbeidstidFormValues>,
        setValues: (values: ArbeidstidFormValues) => void
    ) => {
        const alleEndringer = values[ArbeidstidFormFields.arbeidAktivitetEndring] || {};
        const { arbeidAktivitetId } = endring[0];
        const tidligereEndringer: ArbeidstidAktivitetEndringMap = alleEndringer[arbeidAktivitetId];
        const nyeEndringer: ArbeidstidAktivitetEndringMap = {};
        endring.forEach((endring) => {
            endring.perioder.forEach((periode) => {
                nyeEndringer[dateRangeToISODateRange(periode)] = endring;
            });
        });
        const newValues: ArbeidstidFormValues = {
            arbeidAktivitetEndring: {
                ...values[ArbeidstidFormFields.arbeidAktivitetEndring],
                [arbeidAktivitetId]: {
                    ...tidligereEndringer,
                    ...nyeEndringer,
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
                <BodyLong as="div">
                    {valgteAktiviteter.length === 1 ? (
                        <p>
                            Listen nedenfor viser arbeidsforholdet du har valgt, med de periodene du har søkt om
                            pleiepenger for, og som du kan endre på.
                        </p>
                    ) : (
                        <p>
                            Listen nedenfor viser de arbeidsforholdene du har valgt, med de periodene du har søkt om
                            pleiepenger for, og som du kan endre på.
                        </p>
                    )}

                    <InfoList>
                        <li>Du kan velge å endre enkeltuker, eller flere uker innenfor samme periode</li>
                        <li>Du kan oppgi arbeidstid per uke i timer eller som prosent</li>
                        <li>Du kan kun oppgi arbeidstid innenfor perioder du har søkt</li>
                    </InfoList>
                    <p>
                        Du kan kun endre faktisk arbeidstid, det vil si hvor mye du får jobbet i perioden med
                        pleiepenger, og ikke hvor mye du jobbet før du startet med pleiepenger.
                    </p>
                    <ExpandableInfo title="Hva er forskjellen på normal og faktisk arbeidstid?">
                        <p>
                            Med <strong>«normal arbeidstid»</strong> mener vi hvor mye du jobbet før du startet med
                            pleiepenger.
                        </p>
                        <p>
                            Med <strong>«faktisk arbeidstid»</strong> mener vi hvor mye du får jobbet i perioden når du
                            har pleiepenger.
                        </p>
                    </ExpandableInfo>
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
                                    return (
                                        <FormBlock key={arbeidAktivitet.id}>
                                            <Panel border={true}>
                                                <Arbeidsaktivitet
                                                    arbeidAktivitet={arbeidAktivitet}
                                                    endringer={endringer[arbeidAktivitet.id]}
                                                    onArbeidstidAktivitetChange={(endringer) => {
                                                        onArbeidstidAktivitetChange(endringer, values, setValues);
                                                    }}
                                                />
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
    const { arbeidstakerArktiviteter: arbeidstaker, frilanser, selvstendigNæringsdrivende } = arbeidAktiviteter;

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
