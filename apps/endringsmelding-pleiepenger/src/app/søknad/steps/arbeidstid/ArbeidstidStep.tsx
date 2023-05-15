import { Alert, BodyLong, Heading } from '@navikt/ds-react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import InfoList from '@navikt/sif-common-core-ds/lib/components/lists/info-list/InfoList';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import Arbeidsaktivitet from '../../../modules/arbeidsaktivitet/Arbeidsaktivitet';
import PersistStepFormValues from '../../../modules/persist-step-form-values/PersistStepFormValues';
import { ArbeidstidEndringMap } from '../../../types/ArbeidstidEndring';
import { ArbeidAktivitetType } from '../../../types/Sak';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import { harFjernetLovbestemtFerie } from '../../../utils/lovbestemtFerieUtils';
import { getArbeidAktiviteterForUkjenteArbeidsgivere } from '../../../utils/ukjentArbeidsgiverUtils';
import { StepId } from '../../config/StepId';
import { getSøknadStepConfig } from '../../config/søknadStepConfig';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import {
    getAktiviteterSomSkalEndres,
    getArbeidstidStepInitialValues,
    getArbeidstidSøknadsdataFromFormValues,
    validateUkjentArbeidsaktivitetArbeidstid,
} from './arbeidstidStepUtils';

export interface ArbeidstidFormValues {
    [ArbeidstidFormFields.arbeidAktivitetEndring]: { [aktivitetId: string]: ArbeidstidEndringMap };
}

enum ArbeidstidFormFields {
    arbeidAktivitetEndring = 'arbeidAktivitetEndring',
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
        state: { søknadsdata, sak, hvaSkalEndres },
    } = useSøknadContext();
    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const harFjernetFerie = harFjernetLovbestemtFerie(søknadsdata.lovbestemtFerie);
    const stepConfig = getSøknadStepConfig(hvaSkalEndres, søknadsdata, sak.harUkjentArbeidsgiver);
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

    const arbeidAktiviteter = [
        ...getArbeidAktiviteterForUkjenteArbeidsgivere(
            sak.søknadsperioder,
            sak.ukjenteArbeidsgivere,
            søknadsdata.arbeidssituasjon
        ),
        ...getAktiviteterSomSkalEndres(sak.arbeidAktiviteter),
    ];

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

            {harFjernetFerie && (
                <Block margin="xl">
                    <Alert variant="warning">
                        Du har fjernet dager med ferie. Skal du jobbe disse dagene, se over at jobb i perioden er
                        riktig.
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
                                    const inputGroupName = `arbeidsgiver_${arbeidAktivitet.id}` as any;
                                    return (
                                        <Block key={arbeidAktivitet.id} margin="l" id={inputGroupName} tabIndex={-1}>
                                            <InputGroup
                                                legend={arbeidAktivitet.navn}
                                                hideLegend={true}
                                                name={inputGroupName}
                                                validate={() => {
                                                    const arbeidsforhold =
                                                        søknadsdata.arbeidssituasjon?.arbeidsforhold.find(
                                                            (a) => a.arbeidsgiverId === arbeidAktivitet.id
                                                        );

                                                    if (!arbeidsforhold || arbeidsforhold.erAnsatt === false) {
                                                        return;
                                                    }

                                                    if (
                                                        arbeidAktivitet.type === ArbeidAktivitetType.arbeidstaker &&
                                                        arbeidAktivitet.erUkjentArbeidsaktivitet === true
                                                    ) {
                                                        return validateUkjentArbeidsaktivitetArbeidstid(
                                                            arbeidAktivitet,
                                                            endringer[arbeidAktivitet.id],
                                                            arbeidsforhold.arbeiderIPerioden
                                                        );
                                                    }
                                                    return undefined;
                                                }}>
                                                <Arbeidsaktivitet
                                                    renderAsExpansionCard={arbeidAktiviteter.length > 1}
                                                    expansionCardDefaultOpen={
                                                        arbeidAktiviteter.length <= 2 ||
                                                        (arbeidAktivitet.type === ArbeidAktivitetType.arbeidstaker &&
                                                            arbeidAktivitet.erUkjentArbeidsaktivitet === true)
                                                    }
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
                                            </InputGroup>
                                        </Block>
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
