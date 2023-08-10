import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { ArbeidIPeriode } from './ArbeidstidTypes';
import { DateRange, ValidationError } from '@navikt/sif-common-formik-ds/lib';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { StepId } from '../../../types/StepId';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import actionsCreator from '../../context/action/actionCreator';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { prettifyDateExtended } from '@navikt/sif-common-utils/lib';
import datepickerUtils from '@navikt/sif-common-formik-ds/lib/components/formik-datepicker/datepickerUtils';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { getArbeidstidStepInitialValues, getArbeidstidSøknadsdataFromFormValues } from './arbeidstidStepUtils';
import ArbeidIPeriodeSpørsmål from './form-parts/arbeid-i-periode-spørsmål/ArbeidIPeriodeSpørsmål';
import { ArbeidsforholdType } from './form-parts/types';
import { søkerKunHelgedager } from '../tidsrom/tidsromStepUtils';
import { Heading } from '@navikt/ds-react';
import { getPeriodeSomFrilanserInnenforPeriode } from '../arbeidssituasjon/form-parts/arbeidssituasjonFrilansUtils';
import { getPeriodeSomSelvstendigInnenforPeriode } from '../arbeidssituasjon/form-parts/arbeidssituasjonSelvstendigUtils';
import useLogSøknadInfo from '../../../hooks/useLogSøknadInfo';

export enum ArbeidsaktivitetType {
    arbeidstaker = 'arbeidstaker',
    frilanser = 'frilanser',
    selvstendigNæringsdrivende = 'selvstendigNæringsdrivende',
}

export interface AnsattArbeidstid {
    organisasjonsnummer: string;
    navn: string;
    jobberNormaltTimer: number;
    arbeidIPeriode?: ArbeidIPeriode;
}

export enum SelvstendigArbeidstidFormFields {
    'type' = 'selvstendigArbeidstid.type',
    'jobberNormaltTimer' = 'selvstendigArbeidstid.jobberNormaltTimer',
    'arbeidIPeriode' = 'selvstendigArbeidstid.arbeidIPeriode',
}

export enum FrilansArbeidstidFormFields {
    'type' = 'frilansArbeidstid.type',
    'jobberNormaltTimer' = 'frilansArbeidstid.jobberNormaltTimer',
    'arbeidIPeriode' = 'frilansArbeidstid.arbeidIPeriode',
}

export interface FrilansSNArbeidstid {
    type: ArbeidsaktivitetType;
    jobberNormaltTimer: number;
    arbeidIPeriode?: ArbeidIPeriode;
}

export enum ArbeidstidFormFields {
    ansattArbeidstid = 'ansattArbeidstid',
    frilansArbeidstid = 'frilansArbeidstid',
    selvstendigArbeidstid = 'selvstendigArbeidstid',
}

export interface ArbeidstidFormValues {
    [ArbeidstidFormFields.ansattArbeidstid]?: AnsattArbeidstid[];
    [ArbeidstidFormFields.frilansArbeidstid]?: FrilansSNArbeidstid;
    [ArbeidstidFormFields.selvstendigArbeidstid]?: FrilansSNArbeidstid;
}

const { FormikWrapper, Form } = getTypedFormComponents<ArbeidstidFormFields, ArbeidstidFormValues, ValidationError>();

const ArbeidstidStep = () => {
    const intl = useIntl();
    const {
        state: { søknadsdata },
    } = useSøknadContext();

    const { logArbeidPeriodeRegistrert, logArbeidEnkeltdagRegistrert } = useLogSøknadInfo();

    const stepId = StepId.ARBEIDSTID;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

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
        },
    );
    const { tidsrom } = søknadsdata;

    const periodeFra = datepickerUtils.getDateFromDateString(tidsrom?.periodeFra);
    const periodeTil = datepickerUtils.getDateFromDateString(tidsrom?.periodeTil);

    if (!periodeFra || !periodeTil) {
        // TODO
        return undefined;
    }

    const periode: DateRange = { from: periodeFra, to: periodeTil };

    const handleArbeidstidChanged = () => {
        // TODO;
    };

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getArbeidstidStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={({ values: { ansattArbeidstid, frilansArbeidstid, selvstendigArbeidstid } }) => {
                    if (!ansattArbeidstid && !frilansArbeidstid && !selvstendigArbeidstid) {
                        return undefined;
                    }
                    // TODO logBekreftIngenFraværFraJobb

                    const periodeSomFrilanserISøknadsperiode =
                        frilansArbeidstid && periode
                            ? getPeriodeSomFrilanserInnenforPeriode(periode, søknadsdata.arbeidssituasjon?.frilans)
                            : undefined;

                    const periodeSomSelvstendigISøknadsperiode =
                        selvstendigArbeidstid && periode
                            ? getPeriodeSomSelvstendigInnenforPeriode(
                                  periode,
                                  søknadsdata.arbeidssituasjon?.selvstendig,
                              )
                            : undefined;

                    return (
                        <>
                            <PersistStepFormValues stepId={stepId} />
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                onBack={goBack}
                                runDelayedFormValidation={true}>
                                <FormBlock>
                                    <SifGuidePanel>
                                        <p>
                                            <FormattedMessage
                                                id={'arbeidIPeriode.StepInfo.1'}
                                                values={
                                                    periode
                                                        ? {
                                                              fra: prettifyDateExtended(periode.from),
                                                              til: prettifyDateExtended(periode.to),
                                                          }
                                                        : undefined
                                                }
                                            />
                                        </p>
                                        <p>
                                            <FormattedMessage id={'arbeidIPeriode.StepInfo.2'} />
                                        </p>
                                    </SifGuidePanel>

                                    {ansattArbeidstid && (
                                        <FormBlock>
                                            {ansattArbeidstid.map((arbeidsforhold, index) => {
                                                return (
                                                    <FormBlock key={arbeidsforhold.organisasjonsnummer}>
                                                        <Heading level="2" size="large">
                                                            {arbeidsforhold.navn}
                                                        </Heading>
                                                        <ArbeidIPeriodeSpørsmål
                                                            arbeidsstedNavn={arbeidsforhold.navn}
                                                            arbeidsforholdType={ArbeidsforholdType.ANSATT}
                                                            arbeidIPeriode={arbeidsforhold.arbeidIPeriode}
                                                            jobberNormaltTimer={arbeidsforhold.jobberNormaltTimer}
                                                            periode={periode}
                                                            parentFieldName={`${ArbeidstidFormFields.ansattArbeidstid}.${index}`}
                                                            søkerKunHelgedager={søkerKunHelgedager(
                                                                periode.from,
                                                                periode.to,
                                                            )}
                                                            onArbeidstidVariertChange={handleArbeidstidChanged}
                                                            onArbeidPeriodeRegistrert={logArbeidPeriodeRegistrert}
                                                            onArbeidstidEnkeltdagRegistrert={
                                                                logArbeidEnkeltdagRegistrert
                                                            }
                                                        />
                                                    </FormBlock>
                                                );
                                            })}
                                        </FormBlock>
                                    )}

                                    {frilansArbeidstid && periodeSomFrilanserISøknadsperiode && (
                                        <FormBlock>
                                            <Heading level="2" size="large">
                                                <FormattedMessage id="arbeidIPeriode.FrilansLabel" />
                                            </Heading>
                                            <ArbeidIPeriodeSpørsmål
                                                arbeidsstedNavn="Frilansoppdrag"
                                                arbeidsforholdType={ArbeidsforholdType.FRILANSER}
                                                arbeidIPeriode={frilansArbeidstid.arbeidIPeriode}
                                                jobberNormaltTimer={frilansArbeidstid.jobberNormaltTimer}
                                                periode={periodeSomFrilanserISøknadsperiode}
                                                parentFieldName={FrilansArbeidstidFormFields.arbeidIPeriode}
                                                søkerKunHelgedager={søkerKunHelgedager(periode.from, periode.to)}
                                                onArbeidstidVariertChange={handleArbeidstidChanged}
                                                onArbeidPeriodeRegistrert={logArbeidPeriodeRegistrert}
                                                onArbeidstidEnkeltdagRegistrert={logArbeidEnkeltdagRegistrert}
                                            />
                                        </FormBlock>
                                    )}

                                    {selvstendigArbeidstid && periode && periodeSomSelvstendigISøknadsperiode && (
                                        <FormBlock>
                                            <Heading level="2" size="large">
                                                <FormattedMessage id="arbeidIPeriode.SNLabel" />
                                            </Heading>
                                            <ArbeidIPeriodeSpørsmål
                                                arbeidsstedNavn="Selvstendig næringsdrivende"
                                                arbeidsforholdType={ArbeidsforholdType.SELVSTENDIG}
                                                jobberNormaltTimer={selvstendigArbeidstid.jobberNormaltTimer}
                                                arbeidIPeriode={selvstendigArbeidstid.arbeidIPeriode}
                                                periode={periodeSomSelvstendigISøknadsperiode}
                                                parentFieldName={SelvstendigArbeidstidFormFields.arbeidIPeriode}
                                                søkerKunHelgedager={søkerKunHelgedager(periode.from, periode.to)}
                                                onArbeidstidVariertChange={handleArbeidstidChanged}
                                                onArbeidPeriodeRegistrert={logArbeidPeriodeRegistrert}
                                                onArbeidstidEnkeltdagRegistrert={logArbeidEnkeltdagRegistrert}
                                            />
                                        </FormBlock>
                                    )}
                                </FormBlock>
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default ArbeidstidStep;
