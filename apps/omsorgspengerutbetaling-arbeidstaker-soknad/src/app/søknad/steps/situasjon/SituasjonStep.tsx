import { Buildings3Icon } from '@navikt/aksel-icons';
import { Alert, VStack } from '@navikt/ds-react';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { getIntlFormErrorHandler, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { FormLayout, HentArbeidsforholdFeiletInfo } from '@navikt/sif-common-ui';
import { DateRange, getDateToday } from '@navikt/sif-common-utils';

import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useArbeidsgivereQuery } from '../../../hooks/useArbeidsgivereQuery';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { AppText, useAppIntl } from '../../../i18n';
import { Arbeidsforhold } from '../../../types/ArbeidsforholdTypes';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { StepId } from '../../../types/StepId';
import {
    checkHarKlikketJaJaPåAlle,
    checkHarKlikketNeiElleJajaBlanding,
    checkHarKlikketNeiPåAlle,
} from '../../../utils/arbeidsforholdValidations';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import { getAlleVedleggFraSituasjonFormValues, getAlleVedleggFraSøknadsdata } from '../../../utils/søknadVedleggUtils';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import ArbeidsforholdSituasjon from './form-parts/ArbeidsforholdSituasjon';
import ArbeidsforholdUtbetalingsårsak from './form-parts/ArbeidsforholdUtbetalingsårsak';
import {
    getNMonthsAgo,
    getSituasjonSøknadsdataFromFormValues,
    getSituasjonStepInitialValues,
} from './SituasjonStepUtils';

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
    const { intl } = useAppIntl();
    const {
        state: { søknadsdata },
    } = useSøknadContext();

    const søknadsperiode: DateRange = { from: getNMonthsAgo(3), to: getDateToday() };
    const { data, isLoading, isSuccess, error } = useArbeidsgivereQuery(søknadsperiode);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const stepId = StepId.SITUASJON;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { goBack } = useStepNavigation(step);

    const { bostedVedlegg, legeerklæringer } = getAlleVedleggFraSøknadsdata(søknadsdata);

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

    if (isLoading || (!isSuccess && !error)) {
        return <LoadingSpinner size="3xlarge" style="block" />;
    }

    const arbeidsgivere = data?.organisasjoner || [];

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getSituasjonStepInitialValues(søknadsdata, arbeidsgivere, stepFormValues[stepId])}
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

                    const andreVedlegg = [
                        ...bostedVedlegg,
                        ...legeerklæringer,
                        ...getAlleVedleggFraSituasjonFormValues(values),
                    ];

                    return (
                        <>
                            <PersistStepFormValues stepId={stepId} />
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                submitDisabled={isSubmitting || !harIkkeMottatLønnHosEnEllerFlere}
                                onBack={goBack}
                                runDelayedFormValidation={true}>
                                <FormLayout.Guide>
                                    <p>
                                        <AppText id="step.situasjon.arbeidsforhold.aktivtArbeidsforhold.info.del1" />
                                    </p>
                                    <p>
                                        <AppText id="step.situasjon.arbeidsforhold.aktivtArbeidsforhold.info.del2" />
                                    </p>
                                </FormLayout.Guide>

                                {error ? (
                                    <HentArbeidsforholdFeiletInfo />
                                ) : (
                                    <VStack gap="space-32">
                                        <FormLayout.Sections>
                                            {arbeidsforhold.map((forhold, index) => (
                                                <FormLayout.Section
                                                    key={forhold.organisasjonsnummer}
                                                    data-testid={`arbeidsforhold-liste-${index}`}
                                                    title={forhold.navn || forhold.organisasjonsnummer}
                                                    titleIcon={
                                                        <Buildings3Icon role="presentation" aria-hidden={true} />
                                                    }>
                                                    <FormLayout.Questions>
                                                        <ArbeidsforholdSituasjon
                                                            arbeidsforhold={forhold}
                                                            parentFieldName={`${SituasjonFormFields.arbeidsforhold}.${index}`}
                                                        />
                                                        {forhold.harHattFraværHosArbeidsgiver === YesOrNo.YES &&
                                                            forhold.arbeidsgiverHarUtbetaltLønn === YesOrNo.NO && (
                                                                <ArbeidsforholdUtbetalingsårsak
                                                                    arbeidsforhold={forhold}
                                                                    andreVedlegg={andreVedlegg}
                                                                    parentFieldName={`${SituasjonFormFields.arbeidsforhold}.${index}`}
                                                                />
                                                            )}
                                                    </FormLayout.Questions>
                                                </FormLayout.Section>
                                            ))}
                                        </FormLayout.Sections>

                                        {arbeidsforhold.length === 0 && (
                                            <Alert variant="info">
                                                <AppText id="step.situasjon.arbeidsforhold.ingen.info.text" />
                                            </Alert>
                                        )}

                                        {arbeidsforhold.length > 0 && harKlikketNeiPåAlle && (
                                            <Alert variant="warning">
                                                <AppText id="step.situasjon.arbeidsforhold.ingenGjeldende.info.text.nei" />
                                            </Alert>
                                        )}
                                    </VStack>
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
