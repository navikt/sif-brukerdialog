import { Heading } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { ValidationError, YesOrNo, getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { getListValidator, getYesOrNoValidator } from '@navikt/sif-common-validation';
import { getIntlFormErrorHandler } from '@navikt/sif-common-formik-ds';
import OpptjeningUtlandListAndDialog from '@navikt/sif-common-forms-ds/src/forms/opptjening-utland/OpptjeningUtlandListAndDialog';
import { OpptjeningUtland } from '@navikt/sif-common-forms-ds/src/forms/opptjening-utland/types';
import UtenlandskNæringListAndDialog from '@navikt/sif-common-forms-ds/src/forms/utenlandsk-næring/UtenlandskNæringListAndDialog';
import { UtenlandskNæring } from '@navikt/sif-common-forms-ds/src/forms/utenlandsk-næring/types';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { getDate1YearAgo, getDate1YearFromNow, getDateToday } from '@navikt/sif-common-utils';
import { useState } from 'react';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import getLenker from '../../../lenker';
import { Arbeidsgiver } from '../../../types/Arbeidsgiver';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import SøknadStep from '../../SøknadStep';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
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
import { AppText, useAppIntl } from '../../../i18n';
import { appArbeidsgivereService } from '../../../api/appArbeidsgiverService';

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

    const søknadsperiode = søknadsdata.tidsrom?.søknadsperiode;

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
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

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
                                    <p>
                                        <AppText id="steg.arbeidssituasjon.veileder.2" />
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
                                    <Heading level="2" size="medium">
                                        <AppText id="steg.arbeidssituasjon.opptjeningUtland.tittel" />
                                    </Heading>
                                    <Block margin="l">
                                        <YesOrNoQuestion
                                            legend={text('steg.arbeidssituasjon.opptjeningUtland.spm')}
                                            name={ArbeidssituasjonFormFields.harOpptjeningUtland}
                                            validate={getYesOrNoValidator()}
                                        />
                                        {harOpptjeningUtland === YesOrNo.YES && (
                                            <FormBlock>
                                                <OpptjeningUtlandListAndDialog
                                                    minDate={getDate1YearAgo()}
                                                    maxDate={getDate1YearFromNow()}
                                                    name={ArbeidssituasjonFormFields.opptjeningUtland}
                                                    validate={getListValidator({ required: true })}
                                                    labels={{
                                                        addLabel: text(
                                                            'steg.arbeidssituasjon.opptjeningUtland.addLabel',
                                                        ),
                                                        listTitle: text(
                                                            'steg.arbeidssituasjon.opptjeningUtland.listTitle',
                                                        ),
                                                        modalTitle: text(
                                                            'steg.arbeidssituasjon.opptjeningUtland.modalTitle',
                                                        ),
                                                    }}
                                                />
                                            </FormBlock>
                                        )}
                                        <FormBlock>
                                            <YesOrNoQuestion
                                                legend={text('steg.arbeidssituasjon.utenlandskNæring.spm')}
                                                name={ArbeidssituasjonFormFields.harUtenlandskNæring}
                                                validate={getYesOrNoValidator()}
                                            />
                                            {harUtenlandskNæring === YesOrNo.YES && (
                                                <FormBlock>
                                                    <UtenlandskNæringListAndDialog
                                                        name={ArbeidssituasjonFormFields.utenlandskNæring}
                                                        validate={getListValidator({ required: true })}
                                                        labels={{
                                                            addLabel: text(
                                                                'steg.arbeidssituasjon.utenlandskNæring.addLabel',
                                                            ),
                                                            listTitle: text(
                                                                'steg.arbeidssituasjon.utenlandskNæring.listTitle',
                                                            ),
                                                            modalTitle: text(
                                                                'steg.arbeidssituasjon.utenlandskNæring.modalTitle',
                                                            ),
                                                        }}
                                                    />
                                                </FormBlock>
                                            )}
                                        </FormBlock>
                                    </Block>
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
