import { ValidationError, YesOrNo, getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { Arbeidsgiver } from '../../../types/Arbeidsgiver';
import ArbeidssituasjonFrilans, { FrilansFormData } from './form-parts/ArbeidssituasjonFrilans';
import { OpptjeningUtland } from '@navikt/sif-common-forms-ds/lib/forms/opptjening-utland/types';
import { UtenlandskNæring } from '@navikt/sif-common-forms-ds/lib/forms/utenlandsk-næring/types';
import ArbeidssituasjonSN, { SelvstendigFormData } from './form-parts/ArbeidssituasjonSN';
import { AnsattFormData } from './form-parts/ArbeidssituasjonAnsatt';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { StepId } from '../../../types/StepId';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import actionsCreator from '../../context/action/actionCreator';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import SøknadStep from '../../SøknadStep';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import ArbeidssituasjonArbeidsgivere from './form-parts/ArbeidssituasjonArbeidsgivere';
import { FormattedMessage, useIntl } from 'react-intl';
import getLenker from '../../../lenker';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { getListValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import OpptjeningUtlandListAndDialog from '@navikt/sif-common-forms-ds/lib/forms/opptjening-utland/OpptjeningUtlandListAndDialog';
import { date1YearAgo, date1YearFromNow, dateToday } from '@navikt/sif-common-utils/lib';
import UtenlandskNæringListAndDialog from '@navikt/sif-common-forms-ds/lib/forms/utenlandsk-næring/UtenlandskNæringListAndDialog';
import { Heading } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import {
    getArbeidssituasjonStepInitialValues,
    getArbeidssituasjonSøknadsdataFromFormValues,
    visVernepliktSpørsmål,
} from './arbeidssituasjonStepUtils';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { useState } from 'react';
import { arbeidsgivereEndpoint } from '../../../api/endpoints/arbeidsgiverEndpoint';
import LoadingSpinner from '@navikt/sif-common-core-ds/lib/atoms/loading-spinner/LoadingSpinner';

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
    const intl = useIntl();
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
                const arbeidsgivere = await arbeidsgivereEndpoint.fetch(søknadsperiode);
                setArbeidsgivereIPerioden(arbeidsgivere);
                setLoadState({ isLoading: false, isLoaded: true });
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
                                        <FormattedMessage id="steg.arbeidssituasjon.veileder.1" />
                                    </p>
                                    <p>
                                        <FormattedMessage id="steg.arbeidssituasjon.veileder.2" />
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
                                        søknadsdato={dateToday}
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
                                    <Heading level="2" size="large">
                                        <FormattedMessage id="steg.arbeidssituasjon.opptjeningUtland.tittel" />
                                    </Heading>
                                    <YesOrNoQuestion
                                        legend={intlHelper(intl, 'steg.arbeidssituasjon.opptjeningUtland.spm')}
                                        name={ArbeidssituasjonFormFields.harOpptjeningUtland}
                                        validate={getYesOrNoValidator()}
                                        data-testid="opptjeningUtland.spm"
                                    />
                                    {harOpptjeningUtland === YesOrNo.YES && (
                                        <FormBlock>
                                            <OpptjeningUtlandListAndDialog
                                                minDate={date1YearAgo}
                                                maxDate={date1YearFromNow}
                                                name={ArbeidssituasjonFormFields.opptjeningUtland}
                                                validate={getListValidator({ required: true })}
                                                labels={{
                                                    addLabel: 'Legg til jobb i et annet EØS-land',
                                                    listTitle: 'Registrert jobb i et annet EØS-land',
                                                    modalTitle: 'Jobbet i et annet EØS-land',
                                                }}
                                            />
                                        </FormBlock>
                                    )}
                                    <FormBlock>
                                        <YesOrNoQuestion
                                            legend={intlHelper(intl, 'steg.arbeidssituasjon.utenlandskNæring.spm')}
                                            name={ArbeidssituasjonFormFields.harUtenlandskNæring}
                                            validate={getYesOrNoValidator()}
                                            data-testid="utenlandskNæring.spm"
                                        />
                                        {harUtenlandskNæring === YesOrNo.YES && (
                                            <FormBlock>
                                                <UtenlandskNæringListAndDialog
                                                    name={ArbeidssituasjonFormFields.utenlandskNæring}
                                                    validate={getListValidator({ required: true })}
                                                    labels={{
                                                        addLabel: intlHelper(
                                                            intl,
                                                            'steg.arbeidssituasjon.utenlandskNæring.infoDialog.registrerKnapp',
                                                        ),
                                                        deleteLabel: intlHelper(
                                                            intl,
                                                            'steg.arbeidssituasjon.utenlandskNæring.infoDialog.fjernKnapp',
                                                        ),
                                                        editLabel: intlHelper(
                                                            intl,
                                                            'steg.arbeidssituasjon.utenlandskNæring.infoDialog.endreKnapp',
                                                        ),
                                                        infoTitle: intlHelper(
                                                            intl,
                                                            'steg.arbeidssituasjon.utenlandskNæring.infoDialog.infoTittel',
                                                        ),
                                                        modalTitle: intlHelper(
                                                            intl,
                                                            'steg.arbeidssituasjon.utenlandskNæring.infoDialog.modal.tittel',
                                                        ),
                                                    }}
                                                />
                                            </FormBlock>
                                        )}
                                    </FormBlock>
                                </FormBlock>
                                {visVernepliktSpørsmål(
                                    søknadsperiode,
                                    ansatt_arbeidsforhold,
                                    frilans,
                                    selvstendig,
                                    frilansoppdrag,
                                ) && (
                                    <FormBlock>
                                        <Heading level="2" size="large">
                                            <FormattedMessage id="steg.arbeidssituasjon.verneplikt.tittel" />
                                        </Heading>
                                        <Block margin="l">
                                            <YesOrNoQuestion
                                                name={ArbeidssituasjonFormFields.harVærtEllerErVernepliktig}
                                                legend={intlHelper(intl, 'steg.arbeidssituasjon.verneplikt.spm')}
                                                validate={getYesOrNoValidator()}
                                                description={
                                                    <ExpandableInfo
                                                        title={intlHelper(
                                                            intl,
                                                            'steg.arbeidssituasjon.verneplikt.info.tittel',
                                                        )}>
                                                        <FormattedMessage id="steg.arbeidssituasjon.verneplikt.info.tekst" />
                                                    </ExpandableInfo>
                                                }
                                                data-testid="harVærtEllerErVernepliktig"
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
