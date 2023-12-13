import { Heading } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { ValidationError, YesOrNo, getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { getListValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import OpptjeningUtlandListAndDialog from '@navikt/sif-common-forms-ds/src/forms/opptjening-utland/OpptjeningUtlandListAndDialog';
import { OpptjeningUtland } from '@navikt/sif-common-forms-ds/src/forms/opptjening-utland/types';
import UtenlandskNæringListAndDialog from '@navikt/sif-common-forms-ds/src/forms/utenlandsk-næring/UtenlandskNæringListAndDialog';
import { UtenlandskNæring } from '@navikt/sif-common-forms-ds/src/forms/utenlandsk-næring/types';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { date1YearAgo, date1YearFromNow, dateToday } from '@navikt/sif-common-utils';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { arbeidsgivereEndpoint } from '../../../api/endpoints/arbeidsgiverEndpoint';
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
                                    <Heading level="2" size="large" spacing={true}>
                                        <FormattedMessage id="steg.arbeidssituasjon.opptjeningUtland.tittel" />
                                    </Heading>
                                    <YesOrNoQuestion
                                        legend={intlHelper(intl, 'steg.arbeidssituasjon.opptjeningUtland.spm')}
                                        name={ArbeidssituasjonFormFields.harOpptjeningUtland}
                                        validate={getYesOrNoValidator()}
                                    />
                                    {harOpptjeningUtland === YesOrNo.YES && (
                                        <FormBlock>
                                            <OpptjeningUtlandListAndDialog
                                                minDate={date1YearAgo}
                                                maxDate={date1YearFromNow}
                                                name={ArbeidssituasjonFormFields.opptjeningUtland}
                                                validate={getListValidator({ required: true })}
                                                labels={{
                                                    addLabel: intlHelper(
                                                        intl,
                                                        'steg.arbeidssituasjon.opptjeningUtland.addLabel',
                                                    ),
                                                    listTitle: intlHelper(
                                                        intl,
                                                        'steg.arbeidssituasjon.opptjeningUtland.listTitle',
                                                    ),
                                                    modalTitle: intlHelper(
                                                        intl,
                                                        'steg.arbeidssituasjon.opptjeningUtland.modalTitle',
                                                    ),
                                                }}
                                            />
                                        </FormBlock>
                                    )}
                                    <FormBlock>
                                        <YesOrNoQuestion
                                            legend={intlHelper(intl, 'steg.arbeidssituasjon.utenlandskNæring.spm')}
                                            name={ArbeidssituasjonFormFields.harUtenlandskNæring}
                                            validate={getYesOrNoValidator()}
                                        />
                                        {harUtenlandskNæring === YesOrNo.YES && (
                                            <FormBlock>
                                                <UtenlandskNæringListAndDialog
                                                    name={ArbeidssituasjonFormFields.utenlandskNæring}
                                                    validate={getListValidator({ required: true })}
                                                    labels={{
                                                        addLabel: intlHelper(
                                                            intl,
                                                            'steg.arbeidssituasjon.utenlandskNæring.addLabel',
                                                        ),
                                                        listTitle: intlHelper(
                                                            intl,
                                                            'steg.arbeidssituasjon.utenlandskNæring.listTitle',
                                                        ),
                                                        modalTitle: intlHelper(
                                                            intl,
                                                            'steg.arbeidssituasjon.utenlandskNæring.modalTitle',
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
