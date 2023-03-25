import { Alert, BodyLong, Heading, Panel, ReadMore } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
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
import { harFjernetLovbestemtFerie } from '../../../utils/lovbestemtFerieUtils';
import { StepId } from '../../config/StepId';
import { getSøknadStepConfig } from '../../config/søknadStepConfig';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getArbeidstidStepInitialValues, getArbeidstidSøknadsdataFromFormValues } from './arbeidstidStepUtils';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import PeriodeTekst from '../../../components/periode-tekst/PeriodeTekst';
import { dateRangeToISODateRange } from '@navikt/sif-common-utils/lib';

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
        state: { søknadsdata, sak, hvaSkalEndres },
    } = useSøknadContext();
    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const harFjernetFerie = harFjernetLovbestemtFerie(søknadsdata.lovbestemtFerie);
    const stepConfig = getSøknadStepConfig(sak, hvaSkalEndres, harFjernetFerie);
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

    const valgteAktiviteter = søknadsdata.aktivitet?.aktivitetSomSkalEndres || [];
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
        <SøknadStep stepId={stepId} stepConfig={stepConfig}>
            <SifGuidePanel>
                <>
                    <BodyLong as="div">
                        <Heading level="2" size="xsmall" spacing={true}>
                            Slik endrer du jobb i pleiepengeperioden
                        </Heading>
                        <InfoList>
                            <li>Du oppgir hvor mye du jobber i timer eller prosent per uke.</li>
                            <li>Du kan endre flere uker samtidig, eller én og én uke.</li>
                            <li>
                                Hvis du har endring som gjelder kun enkeltdager, skal du fremdeles oppgi hvor mye du
                                jobber samlet for hele uken.
                            </li>
                        </InfoList>
                    </BodyLong>
                </>
            </SifGuidePanel>

            {harFjernetLovbestemtFerie(søknadsdata.lovbestemtFerie) && (
                <Block margin="xl">
                    <Alert variant="warning">
                        Du har fjernet dager med ferie:
                        <InfoList>
                            {søknadsdata.lovbestemtFerie?.perioderFjernet.map((periode) => (
                                <li key={dateRangeToISODateRange(periode)} className="capsFirstChar">
                                    <PeriodeTekst periode={periode} inkluderDagNavn={true} />
                                </li>
                            ))}
                        </InfoList>
                        <p>Skal du jobbe disse dagene, se over at jobb i perioden er riktig.</p>
                        <ReadMore header="Hvordan påvirker ferie arbeidstiden?">
                            <p>
                                Feriedager overstyrer alltid timer med arbeid i en uke. Det vil si at dersom du oppgir 5
                                dager med ferie i en uke, trenger du ikke justere ned antall timer du skal jobbe. Dette
                                fikser vi.
                            </p>
                            <p>
                                Dersom du tidligere har justert ned timer med jobb i en uke på grunn av ferie, og nå
                                fjerner feriedager denne uken, må du ser over at antall timer med jobb fortsatt stemmer.
                            </p>
                        </ReadMore>
                    </Alert>
                </Block>
            )}

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
                                                    lovbestemtFerie={søknadsdata.lovbestemtFerie}
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
