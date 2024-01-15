import { FormattedMessage, useIntl } from 'react-intl';
import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import {
    getTotalSizeOfAttachments,
    MAX_TOTAL_ATTACHMENT_SIZE_BYTES,
} from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';
import { Arbeidsforhold } from '../../../types/ArbeidsforholdTypes';
import { ValidationError, getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { StepId } from '../../../types/StepId';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import actionsCreator from '../../context/action/actionCreator';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import SøknadStep from '../../SøknadStep';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { Office1 } from '@navikt/ds-icons';
import { Alert } from '@navikt/ds-react';
import { getSituasjonStepInitialValues, getSituasjonSøknadsdataFromFormValues } from './SituasjonStepUtils';
import {
    checkHarKlikketJaJaPåAlle,
    checkHarKlikketNeiElleJajaBlanding,
    checkHarKlikketNeiPåAlle,
} from '../../../utils/arbeidsforholdValidations';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import ArbeidsforholdSituasjon from './form-parts/ArbeidsforholdSituasjon';
import ArbeidsforholdUtbetalingsårsak from './form-parts/ArbeidsforholdUtbetalingsårsak';
import { valuesToAlleDokumenterISøknaden } from '../../../utils/attachmentUtils';
import FormSection from '../../../components/form-section/FormSection';
import { Arbeidsgiver } from '../../../types/Arbeidsgiver';
import { useState } from 'react';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import arbeidsgivereEndpoint from '../../../api/endpoints/arbeidsgivereEndpoint';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';

export enum ArbeidsforholdFormFields {
    navn = 'navn',
    organisasjonsnummer = 'organisasjonsnummer',
    harHattFraværHosArbeidsgiver = 'harHattFraværHosArbeidsgiver',
    arbeidsgiverHarUtbetaltLønn = 'arbeidsgiverHarUtbetaltLønn',
    utbetalingsårsak = 'utbetalingsårsak',
    årsakNyoppstartet = 'årsakNyoppstartet',
    konfliktForklaring = 'konfliktForklaring',
    dokumenter = 'dokumenter',
}

export enum SituasjonFormFields {
    arbeidsforhold = 'arbeidsforhold',
}

export interface SituasjonFormValues {
    [SituasjonFormFields.arbeidsforhold]: Arbeidsforhold[];
}

interface LoadState {
    isLoading: boolean;
    isLoaded: boolean;
}

const { FormikWrapper, Form } = getTypedFormComponents<SituasjonFormFields, SituasjonFormValues, ValidationError>();

const SituasjonStep = () => {
    const intl = useIntl();
    const {
        state: { søknadsdata },
    } = useSøknadContext();

    const [arbeidsgivere, setArbeidsgivere] = useState<Arbeidsgiver[]>([]);
    const [loadState, setLoadState] = useState<LoadState>({ isLoading: false, isLoaded: false });

    const { isLoading, isLoaded } = loadState;

    useEffectOnce(() => {
        const fetchData = async () => {
            const arbeidsgivere = await arbeidsgivereEndpoint.fetch();
            setArbeidsgivere(arbeidsgivere);
            setLoadState({ isLoading: false, isLoaded: true });
        };
        if (!isLoaded && !isLoading) {
            setLoadState({ isLoading: true, isLoaded: false });
            fetchData();
        }
    });

    const stepId = StepId.SITUASJON;
    const step = getSøknadStepConfigForStep(stepId);

    const { goBack } = useStepNavigation(step);

    const { clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: SituasjonFormValues) => {
        const situasjonSøknadsdata = getSituasjonSøknadsdataFromFormValues(values);

        if (situasjonSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadSituasjon(situasjonSøknadsdata)];
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
        return <LoadingSpinner size="3xlarge" style="block" title="Henter arbeidsforhold" />;
    }

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getSituasjonStepInitialValues(søknadsdata, arbeidsgivere)}
                onSubmit={handleSubmit}
                renderForm={({ values }) => {
                    const arbeidsforhold: Arbeidsforhold[] = values[SituasjonFormFields.arbeidsforhold] || [];
                    const harKlikketJaJaPåAlle = checkHarKlikketJaJaPåAlle([...arbeidsforhold]);
                    const harKlikketNeiPåAlle = checkHarKlikketNeiPåAlle([...arbeidsforhold]);
                    const harKlikketNeiElleJajaBlanding = checkHarKlikketNeiElleJajaBlanding([...arbeidsforhold]);

                    const harIkkeMottatLønnHosEnEllerFlere =
                        harKlikketJaJaPåAlle === false &&
                        harKlikketNeiPåAlle === false &&
                        harKlikketNeiElleJajaBlanding === false;

                    const alleDokumenterISøknaden: Attachment[] = valuesToAlleDokumenterISøknaden(arbeidsforhold);

                    const attachmentsSizeOver24Mb =
                        getTotalSizeOfAttachments(alleDokumenterISøknaden) > MAX_TOTAL_ATTACHMENT_SIZE_BYTES;

                    return (
                        <>
                            <PersistStepFormValues stepId={stepId} />
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                submitDisabled={
                                    isSubmitting || !harIkkeMottatLønnHosEnEllerFlere || attachmentsSizeOver24Mb
                                }
                                onBack={goBack}
                                runDelayedFormValidation={true}>
                                <SifGuidePanel>
                                    <p>
                                        <FormattedMessage id="step.situasjon.arbeidsforhold.aktivtArbeidsforhold.info.del1" />
                                    </p>
                                    <p>
                                        <FormattedMessage id="step.situasjon.arbeidsforhold.aktivtArbeidsforhold.info.del2" />
                                    </p>
                                </SifGuidePanel>

                                {arbeidsforhold.length > 0 && (
                                    <FormBlock margin="xxl">
                                        <div className="arbeidsforhold-liste">
                                            {arbeidsforhold.map((forhold, index) => (
                                                <Block
                                                    key={forhold.organisasjonsnummer}
                                                    data-testid={`arbeidsforhold-liste-${index}`}>
                                                    <FormSection
                                                        titleTag="h2"
                                                        title={forhold.navn || forhold.organisasjonsnummer}
                                                        titleIcon={<Office1 role="presentation" aria-hidden={true} />}>
                                                        <ArbeidsforholdSituasjon
                                                            arbeidsforhold={forhold}
                                                            parentFieldName={`${SituasjonFormFields.arbeidsforhold}.${index}`}
                                                        />
                                                        {forhold.harHattFraværHosArbeidsgiver === YesOrNo.YES &&
                                                            forhold.arbeidsgiverHarUtbetaltLønn === YesOrNo.NO && (
                                                                <ArbeidsforholdUtbetalingsårsak
                                                                    arbeidsforhold={forhold}
                                                                    parentFieldName={`${SituasjonFormFields.arbeidsforhold}.${index}`}
                                                                />
                                                            )}
                                                    </FormSection>
                                                </Block>
                                            ))}
                                        </div>
                                    </FormBlock>
                                )}

                                {arbeidsforhold.length === 0 && (
                                    <FormBlock>
                                        <Alert variant={'info'}>
                                            <FormattedMessage id={'step.situasjon.arbeidsforhold.ingen.info.text'} />
                                        </Alert>
                                    </FormBlock>
                                )}

                                {arbeidsforhold.length > 0 && harKlikketNeiPåAlle && (
                                    <FormBlock paddingBottom={'l'}>
                                        <Alert variant={'warning'}>
                                            <FormattedMessage
                                                id={'step.situasjon.arbeidsforhold.ingenGjeldende.info.text.nei'}
                                            />
                                        </Alert>
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

export default SituasjonStep;
