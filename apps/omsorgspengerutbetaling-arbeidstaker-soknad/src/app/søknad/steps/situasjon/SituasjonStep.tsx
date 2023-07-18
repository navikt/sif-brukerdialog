// import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
// import { AxiosResponse } from 'axios';
import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import {
    getTotalSizeOfAttachments,
    MAX_TOTAL_ATTACHMENT_SIZE_BYTES,
} from '@navikt/sif-common-core-ds/lib/utils/attachmentUtils';
import { Arbeidsforhold } from '../../../types/ArbeidsforholdTypes';
import { ValidationError, getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
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
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
//import appSentryLogger from '../../../utils/appSentryLogger';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
// import LoadingSpinner from '@navikt/sif-common-core-ds/lib/atoms/loading-spinner/LoadingSpinner';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
// import { dateToday } from '@navikt/sif-common-utils/lib';
import { Office1 } from '@navikt/ds-icons';
import { Alert } from '@navikt/ds-react';
import {
    /// getNMonthsAgo,
    getSituasjonStepInitialValues,
    getSituasjonSøknadsdataFromFormValues,
} from './SituasjonStepUtils';
// import { Arbeidsgiver, ArbeidsgiverResponse, isArbeidsgivere } from '../../../types/Arbeidsgiver';
//import { getArbeidsgivere } from '../../../api/endpoints/arbeidsgiverEndpoint';
import {
    checkHarKlikketJaJaPåAlle,
    checkHarKlikketNeiElleJajaBlanding,
    checkHarKlikketNeiPåAlle,
} from '../../../utils/arbeidsforholdValidations';
import { Attachment } from '@navikt/sif-common-core-ds/lib/types/Attachment';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import ArbeidsforholdSituasjon from './form-parts/ArbeidsforholdSituasjon';
import ArbeidsforholdUtbetalingsårsak from './form-parts/ArbeidsforholdUtbetalingsårsak';
import { valuesToAlleDokumenterISøknaden } from '../../../utils/attachmentUtils';
import FormSection from '../../../components/form-section/FormSection';

const arbeidsgivereMock = require('../../../../../api-mock/mock-data/arbeidsgiver.json');

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

const { FormikWrapper, Form } = getTypedFormComponents<SituasjonFormFields, SituasjonFormValues, ValidationError>();

const SituasjonStep = () => {
    const intl = useIntl();
    const {
        state: { søknadsdata },
    } = useSøknadContext();

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

    const arbeidsgivere = arbeidsgivereMock.organisasjoner;

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
                                                <Block padBottom="l" key={forhold.organisasjonsnummer}>
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
                                    <FormBlock paddingBottom={'xl'}>
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
