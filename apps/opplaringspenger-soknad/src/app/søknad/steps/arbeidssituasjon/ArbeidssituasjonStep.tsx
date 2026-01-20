import { Box } from '@navikt/ds-react';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import {
    getIntlFormErrorHandler,
    getTypedFormComponents,
    ValidationError,
    YesOrNo,
} from '@navikt/sif-common-formik-ds';
import { OpptjeningUtland } from '@navikt/sif-common-forms-ds/src/forms/opptjening-utland/types';
import { UtenlandskNæring } from '@navikt/sif-common-forms-ds/src/forms/utenlandsk-næring/types';
import { FormLayout } from '@navikt/sif-common-ui';
import { getDateToday } from '@navikt/sif-common-utils';
import { getYesOrNoValidator } from '@navikt/sif-validation';

import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useArbeidsgivereQuery } from '../../../hooks/useArbeidsgivereQuery';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { AppText, useAppIntl } from '../../../i18n';
import getLenker from '../../../lenker';
import { Arbeidsgiver } from '../../../types/Arbeidsgiver';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { StepId } from '../../../types/StepId';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import {
    getArbeidssituasjonSøknadsdataFromFormValues,
    getArbeidssituasjonStepInitialValues,
    visVernepliktSpørsmål,
} from './arbeidssituasjonStepUtils';
import { AnsattFormData } from './form-parts/ArbeidssituasjonAnsatt';
import ArbeidssituasjonArbeidsgivere from './form-parts/ArbeidssituasjonArbeidsgivere';
import ArbeidssituasjonFrilans, { FrilansFormData } from './form-parts/ArbeidssituasjonFrilans';
import ArbeidssituasjonSN, { SelvstendigFormData } from './form-parts/ArbeidssituasjonSN';
import { ArbeidssituasjonUtland } from './form-parts/ArbeidssituasjonUtland';
import KravTilJobbInfo from './form-parts/info/KravTilJobbInfo';

export enum ArbeidssituasjonFormFields {
    ansatt_arbeidsforhold = 'ansatt_arbeidsforhold',
    frilans = 'frilans',
    selvstendig = 'selvstendig',
    frilansoppdrag = 'frilansoppdrag',
    harVærtEllerErVernepliktig = 'harVærtEllerErVernepliktig',
    harOpptjeningUtland = 'harOpptjeningUtland',
    opptjeningUtland = 'opptjeningUtland',
    harUtenlandskNæring = 'harUtenlandskNæring',
    utenlandskNæring = 'utenlandskNæring',
}

export interface ArbeidssituasjonFormValues {
    [ArbeidssituasjonFormFields.ansatt_arbeidsforhold]: AnsattFormData[];
    [ArbeidssituasjonFormFields.frilans]: FrilansFormData;
    [ArbeidssituasjonFormFields.frilansoppdrag]: Arbeidsgiver[];
    [ArbeidssituasjonFormFields.selvstendig]: SelvstendigFormData;
    [ArbeidssituasjonFormFields.harVærtEllerErVernepliktig]?: YesOrNo;
    [ArbeidssituasjonFormFields.harOpptjeningUtland]: YesOrNo;
    [ArbeidssituasjonFormFields.opptjeningUtland]: OpptjeningUtland[];
    [ArbeidssituasjonFormFields.harUtenlandskNæring]: YesOrNo;
    [ArbeidssituasjonFormFields.utenlandskNæring]: UtenlandskNæring[];
}

const { FormikWrapper, Form, YesOrNoQuestion } = getTypedFormComponents<
    ArbeidssituasjonFormFields,
    ArbeidssituasjonFormValues,
    ValidationError
>();

const ArbeidssituasjonStep = () => {
    const { text, intl } = useAppIntl();
    const {
        state: { søknadsdata },
    } = useSøknadContext();

    const søknadsperiode = søknadsdata.kurs?.søknadsperiode;
    const { data: arbeidsgivereIPerioden = [], isLoading, isSuccess, error } = useArbeidsgivereQuery(søknadsperiode);

    const stepId = StepId.ARBEIDSSITUASJON;
    const step = getSøknadStepConfigForStep(stepId, søknadsdata);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: ArbeidssituasjonFormValues) => {
        const arbeidssituasjonSøknadsdata = getArbeidssituasjonSøknadsdataFromFormValues(values, søknadsperiode);
        if (arbeidssituasjonSøknadsdata) {
            clearStepFormValues(stepId);
            return [
                actionsCreator.setSøknadArbeidssituasjon(arbeidssituasjonSøknadsdata),
                actionsCreator.setSøknadFrilansoppdrag(values.frilansoppdrag),
            ];
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

    if (isLoading || (!isSuccess && !error)) {
        return <LoadingSpinner size="3xlarge" style="block" />;
    }

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getArbeidssituasjonStepInitialValues(
                    søknadsdata,
                    arbeidsgivereIPerioden,
                    stepFormValues[stepId],
                )}
                onSubmit={handleSubmit}
                renderForm={({
                    values: {
                        ansatt_arbeidsforhold,
                        frilans,
                        frilansoppdrag,
                        selvstendig,
                        harOpptjeningUtland,
                        harUtenlandskNæring,
                        harVærtEllerErVernepliktig,
                    },
                }) => {
                    if (!søknadsperiode || !ansatt_arbeidsforhold || !frilans || !selvstendig) {
                        return undefined;
                    }
                    const skalViseVernepliktSpørsmål = visVernepliktSpørsmål(
                        søknadsperiode,
                        ansatt_arbeidsforhold,
                        frilans,
                        selvstendig,
                        frilansoppdrag,
                    );

                    return (
                        <>
                            <PersistStepFormValues stepId={stepId} />
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                submitDisabled={isSubmitting}
                                onBack={goBack}
                                runDelayedFormValidation={true}>
                                <FormLayout.Guide>
                                    <p>
                                        <AppText id="steg.arbeidssituasjon.veileder.1" />
                                    </p>
                                </FormLayout.Guide>

                                <FormLayout.Sections>
                                    <FormLayout.Section title={text('steg.arbeidssituasjon.arbeidsgivere.tittel')}>
                                        <ArbeidssituasjonArbeidsgivere
                                            parentFieldName={ArbeidssituasjonFormFields.ansatt_arbeidsforhold}
                                            ansatt_arbeidsforhold={ansatt_arbeidsforhold}
                                            søknadsperiode={søknadsperiode}
                                            error={!!error}
                                        />
                                    </FormLayout.Section>

                                    <FormLayout.Section title={text('steg.arbeidssituasjon.frilanser.tittel')}>
                                        <ArbeidssituasjonFrilans
                                            formValues={frilans}
                                            frilansoppdrag={frilansoppdrag || []}
                                            søknadsperiode={søknadsperiode}
                                            søknadsdato={getDateToday()}
                                            urlSkatteetaten={getLenker(intl.locale).skatt_arbeidstakerinntekt}
                                        />
                                    </FormLayout.Section>

                                    <FormLayout.Section title={text('steg.arbeidssituasjon.sn.tittel')}>
                                        <ArbeidssituasjonSN
                                            formValues={selvstendig}
                                            urlSkatteetatenSN={getLenker(intl.locale).skatt_SNInntekt}
                                            søknadsperiode={søknadsperiode}
                                        />
                                    </FormLayout.Section>

                                    <FormLayout.Section title={text('steg.arbeidssituasjon.opptjeningUtland.tittel')}>
                                        <ArbeidssituasjonUtland
                                            harOpptjeningUtland={harOpptjeningUtland}
                                            harUtenlandskNæring={harUtenlandskNæring}
                                        />
                                    </FormLayout.Section>

                                    {skalViseVernepliktSpørsmål && (
                                        <FormLayout.Section title={text('steg.arbeidssituasjon.verneplikt.tittel')}>
                                            <YesOrNoQuestion
                                                name={ArbeidssituasjonFormFields.harVærtEllerErVernepliktig}
                                                legend={text('steg.arbeidssituasjon.verneplikt.spm')}
                                                validate={getYesOrNoValidator()}
                                                description={
                                                    <ExpandableInfo
                                                        title={text('steg.arbeidssituasjon.verneplikt.info.tittel')}>
                                                        <AppText id="steg.arbeidssituasjon.verneplikt.info.tekst" />
                                                    </ExpandableInfo>
                                                }
                                            />
                                        </FormLayout.Section>
                                    )}
                                </FormLayout.Sections>
                                {skalViseVernepliktSpørsmål && harVærtEllerErVernepliktig === YesOrNo.NO && (
                                    <Box marginBlock="6 0">
                                        <KravTilJobbInfo />
                                    </Box>
                                )}
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default ArbeidssituasjonStep;
