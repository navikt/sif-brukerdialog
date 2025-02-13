import { Heading } from '@navikt/ds-react';
import { useState } from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { getTypedFormComponents, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { getIntlFormErrorHandler } from '@navikt/sif-common-formik-ds';
import { OpptjeningUtland } from '@navikt/sif-common-forms-ds/src/forms/opptjening-utland/types';
import { UtenlandskNæring } from '@navikt/sif-common-forms-ds/src/forms/utenlandsk-næring/types';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { getDateToday } from '@navikt/sif-common-utils';
import { appArbeidsgivereService } from '../../../api/appArbeidsgiverService';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { AppText, useAppIntl } from '../../../i18n';
import getLenker from '../../../lenker';
import { Arbeidsgiver } from '../../../types/Arbeidsgiver';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import {
    getArbeidssituasjonStepInitialValues,
    getArbeidssituasjonSøknadsdataFromFormValues,
    visVernepliktSpørsmål,
} from './arbeidssituasjonStepUtils';
import { AnsattFormData } from './form-parts/ArbeidssituasjonAnsatt';
import ArbeidssituasjonArbeidsgivere from './form-parts/ArbeidssituasjonArbeidsgivere';
import ArbeidssituasjonFrilans, { FrilansFormData } from './form-parts/ArbeidssituasjonFrilans';
import ArbeidssituasjonSN, { SelvstendigFormData } from './form-parts/ArbeidssituasjonSN';
import { ArbeidssituasjonUtland } from './form-parts/ArbeidssituasjonUtland';

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

interface LoadState {
    isLoading: boolean;
    isLoaded: boolean;
}

const ArbeidssituasjonStep = () => {
    const { text, intl } = useAppIntl();
    const {
        state: { søknadsdata },
    } = useSøknadContext();
    const [arbeidsgivereIPerioden, setArbeidsgivereIPerioden] = useState<Arbeidsgiver[]>([]);
    const [loadState, setLoadState] = useState<LoadState>({ isLoading: false, isLoaded: false });

    const { isLoading, isLoaded } = loadState;

    const søknadsperiode = søknadsdata.kurs?.søknadsperiode;

    useEffectOnce(() => {
        const fetchData = async () => {
            if (søknadsperiode) {
                try {
                    const arbeidsgivere = await appArbeidsgivereService.fetch(søknadsperiode);
                    setArbeidsgivereIPerioden(arbeidsgivere);
                    setLoadState({ isLoading: false, isLoaded: true });
                } catch {
                    setLoadState({ isLoading: false, isLoaded: true });
                }
            }
        };
        if (søknadsperiode && !isLoaded && !isLoading) {
            setLoadState({ isLoading: true, isLoaded: false });
            fetchData();
        }
    });

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

    if (isLoading || !isLoaded) {
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
                    },
                }) => {
                    if (!søknadsperiode || !ansatt_arbeidsforhold || !frilans || !selvstendig) {
                        return undefined;
                    }

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
                                <SifGuidePanel>
                                    <p>
                                        <AppText id="steg.arbeidssituasjon.veileder.1" />
                                    </p>
                                </SifGuidePanel>

                                <FormBlock>
                                    <ArbeidssituasjonArbeidsgivere
                                        parentFieldName={ArbeidssituasjonFormFields.ansatt_arbeidsforhold}
                                        ansatt_arbeidsforhold={ansatt_arbeidsforhold}
                                        søknadsperiode={søknadsperiode}
                                    />
                                </FormBlock>

                                <FormBlock>
                                    <ArbeidssituasjonFrilans
                                        formValues={frilans}
                                        frilansoppdrag={frilansoppdrag || []}
                                        søknadsperiode={søknadsperiode}
                                        søknadsdato={getDateToday()}
                                        urlSkatteetaten={getLenker(intl.locale).skatteetaten}
                                    />
                                </FormBlock>

                                <FormBlock>
                                    <ArbeidssituasjonSN
                                        formValues={selvstendig}
                                        urlSkatteetatenSN={getLenker(intl.locale).skatteetatenSN}
                                        søknadsperiode={søknadsperiode}
                                    />
                                </FormBlock>

                                <FormBlock>
                                    <ArbeidssituasjonUtland
                                        harOpptjeningUtland={harOpptjeningUtland}
                                        harUtenlandskNæring={harUtenlandskNæring}
                                    />
                                </FormBlock>

                                {visVernepliktSpørsmål(
                                    søknadsperiode,
                                    ansatt_arbeidsforhold,
                                    frilans,
                                    selvstendig,
                                    frilansoppdrag,
                                ) && (
                                    <FormBlock>
                                        <Heading level="2" size="medium">
                                            <AppText id="steg.arbeidssituasjon.verneplikt.tittel" />
                                        </Heading>
                                        <Block margin="l">
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
                                        </Block>
                                    </FormBlock>
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
