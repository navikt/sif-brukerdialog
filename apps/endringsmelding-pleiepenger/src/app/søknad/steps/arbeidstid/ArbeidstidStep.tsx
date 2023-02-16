import { BodyLong, Heading, Panel } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import InfoList from '@navikt/sif-common-core-ds/lib/components/info-list/InfoList';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import Arbeidsaktivitet from '../../../components/arbeidsaktivitet/Arbeidsaktivitet';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { ArbeidstidEndringMap } from '../../../types/ArbeidstidEndring';
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
    [ArbeidstidFormFields.arbeidAktivitetEndring]: { [aktivitetId: string]: ArbeidstidEndringMap };
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

    const stepConfig = getSøknadStepConfig(sak);
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
        arbeidAktivitetId: string,
        arbeidstidEndringMap: ArbeidstidEndringMap,
        values: Partial<ArbeidstidFormValues>,
        setValues: (values: ArbeidstidFormValues) => void
    ) => {
        const newValues: ArbeidstidFormValues = {
            arbeidAktivitetEndring: {
                ...values.arbeidAktivitetEndring,
                [arbeidAktivitetId]: arbeidstidEndringMap,
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
        <SøknadStep stepId={stepId} sak={sak}>
            <SifGuidePanel>
                <>
                    <BodyLong as="div">
                        <p>
                            Før du går videre, trenger du å vite forskjellen på «normal arbeidstid» og «faktisk
                            arbeidstid»:
                        </p>
                        <p>
                            <strong>Normal arbeidstid</strong> er hvor mye du jobbet før du startet med pleiepenger, og
                            altså den tiden du har oppgitt som normal arbeidstid i søknaden. Dette trenger du ikke å
                            opplyse noe om her, det ligger allerede inne.
                        </p>

                        <p>
                            <strong>Faktisk arbeidstid</strong> er hvor mye du jobber i samme periode som du tar vare på
                            et sykt barn og har pleiepenger. Det er denne tiden du skal oppgi her.
                        </p>
                        <Block margin="xl">
                            <Heading level="2" size="xsmall" spacing={true}>
                                Slik gjør du det
                            </Heading>
                        </Block>
                        <InfoList>
                            <li>
                                Hvor mye du jobber endrer du per uke. Enten i timer eller prosent av det som er din
                                normale arbeidstid per uke. Se eksempler litt lenger ned på siden.
                            </li>

                            <li>
                                Du kan endre flere uker samtidig, eller bare én uke, om det er dette som passer din
                                situasjon.
                            </li>
                            <li>
                                Du kan gjøre endringer i opptil 3 måneder tilbake i tid, og i opptil 12 måneder frem i
                                tid.
                            </li>
                        </InfoList>
                        <Block margin="l">
                            <ExpandableInfo title="Eksempler på hvordan endre i forskjellige situasjoner">
                                <Heading level="3" size="small" spacing={true}>
                                    Eksempel 1
                                </Heading>
                                <p>Du jobber normalt 37,5 timer per uke, dette er din normale arbeidstid per uke.</p>
                                <p>
                                    I pleiepengeperioden kan du jobbe 1 dag per uke, som er 7,5 timer eller 20 prosent.
                                    Da blir din faktiske arbeidstid 7,5 timer per uke, eller 20 prosent om du velger å
                                    bruke prosent.
                                </p>
                                <Block margin="xl">
                                    <Heading level="3" size="small" spacing={true}>
                                        Eksempel 2
                                    </Heading>
                                </Block>
                                <p>
                                    Din normale arbeidstid per uke er 40 timer. I søknaden har du oppgitt at du ikke
                                    jobber noe mens du har pleiepenger.
                                </p>
                                <p>
                                    Nå får du likevel jobbet 2 dager i uke 28, og skal melde fra om det. Da oppgir du 16
                                    timer som din faktiske arbeidstid for den uken. Eller 40 prosent, om du vil bruke
                                    prosent.
                                </p>
                                <Block margin="xl">
                                    <Heading level="3" size="small" spacing={true}>
                                        Eksempel 3
                                    </Heading>
                                </Block>
                                <p>Din normale arbeidstid er 37,5 prosent.</p>
                                <p>
                                    I søknaden har du oppgitt at du jobber 50 prosent mens du har pleiepenger, men i én
                                    av ukene får du bare jobbet 20 prosent. Da oppgir du 7,5 timer som din faktiske
                                    arbeidstid for den uken. Eller 20 prosent, om du vil bruke prosent.
                                </p>
                            </ExpandableInfo>
                        </Block>
                    </BodyLong>
                </>
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
                                                    onArbeidstidAktivitetChange={(arbeidstidEndringer) => {
                                                        onArbeidstidAktivitetChange(
                                                            arbeidAktivitet.id,
                                                            arbeidstidEndringer,
                                                            values,
                                                            setValues
                                                        );
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
