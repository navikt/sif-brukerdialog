/* eslint-disable max-len */

import { Alert, BodyShort, Box, Button, Heading, HStack, Process, VStack } from '@navikt/ds-react';
import { useIntl } from 'react-intl';
import { PaperplaneIcon } from '@navikt/aksel-icons';
import {
    FormikConfirmationCheckbox,
    FormikDatepicker,
    FormikYesOrNoQuestion,
    getIntlFormErrorHandler,
    TypedFormikForm,
    TypedFormikWrapper,
    YesOrNo,
} from '@navikt/sif-common-formik-ds';
import { dateFormatter, getDateToday } from '@navikt/sif-common-utils';
import { getCheckedValidator, getDateValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import { ApiErrorType } from '@navikt/ung-common';
import dayjs from 'dayjs';
import ApiErrorAlert from '../../components/api-error-alert/ApiErrorAlert';
import { useMeldInnDeltaker } from '../../hooks/useMeldInnDeltaker';
import { Deltakelse } from '../../types/Deltakelse';
import { Deltaker, UregistrertDeltaker } from '../../types/Deltaker';
import { AppHendelse } from '../../utils/analytics';
import { useAppEventLogger } from '../../utils/analyticsHelper';
import { getStartdatobegrensningForDeltaker } from '../../utils/deltakelseUtils';
import { Features } from '../../types/Features';

interface Props {
    deltaker: UregistrertDeltaker | Deltaker;
    onDeltakelseRegistrert: (deltakelse: Deltakelse) => void;
    onCancel: () => void;
}

interface FormValues {
    startDato: string;
    erVedtaksbrevSendt?: YesOrNo;
    harSjekketSjekkliste?: YesOrNo;
    bekreftRegistrering: boolean;
}

const MeldInnDeltakerForm = ({ deltaker, onCancel, onDeltakelseRegistrert }: Props) => {
    const intl = useIntl();

    const { mutateAsync, isPending, error } = useMeldInnDeltaker(deltaker.deltakerIdent);
    const { log } = useAppEventLogger();

    const handleOnSubmit = async (values: FormValues) => {
        const deltakelse = await mutateAsync({
            deltakerIdent: deltaker.deltakerIdent,
            startdato: values.startDato,
        });
        await log(AppHendelse.deltakerRegistrert);
        onDeltakelseRegistrert(deltakelse);
    };

    const startdatoMinMax = getStartdatobegrensningForDeltaker(
        deltaker.førsteMuligeInnmeldingsdato,
        deltaker.sisteMuligeInnmeldingsdato,
        getDateToday(),
    );

    if (startdatoMinMax === 'fomFørTom') {
        return (
            <Alert variant="error">
                Deltaker kan ikke meldes inn fordi perioden deltakeren kan meldes inn i, ikke er gyldig.
            </Alert>
        );
    }

    return (
        <TypedFormikWrapper<FormValues>
            initialValues={{}}
            onSubmit={handleOnSubmit}
            renderForm={({ values }) => {
                const { erVedtaksbrevSendt, harSjekketSjekkliste } = values;

                const kanMeldesInn = Features.sjekkliste ? harSjekketSjekkliste === YesOrNo.YES : false;

                const renderFormPart = () => (
                    <VStack gap="space-16">
                        <FormikDatepicker
                            name="startDato"
                            label="Når starter deltakeren i ungdomsprogrammet?"
                            disableWeekends={true}
                            description={<>Tidligste startdato er {dateFormatter.compact(startdatoMinMax.from)}</>}
                            minDate={startdatoMinMax.from}
                            maxDate={startdatoMinMax.to}
                            defaultMonth={dayjs.max([dayjs(startdatoMinMax.from), dayjs()]).toDate()}
                            validate={(value) => {
                                const e = getDateValidator({
                                    required: true,
                                    min: startdatoMinMax.from,
                                    max: startdatoMinMax.to,
                                    onlyWeekdays: true,
                                })(value);
                                return e
                                    ? {
                                          key: e,
                                          values: {
                                              min: dateFormatter.compact(startdatoMinMax.from),
                                              max: dateFormatter.compact(startdatoMinMax.to),
                                          },
                                      }
                                    : undefined;
                            }}
                        />
                        <FormikConfirmationCheckbox
                            label={<BodyShort>Bekreft deltakelse</BodyShort>}
                            name="bekreftRegistrering"
                            validate={getCheckedValidator()}
                        />

                        <HStack gap="space-8">
                            <Button
                                type="submit"
                                variant="primary"
                                loading={isPending}
                                iconPosition="right"
                                icon={<PaperplaneIcon aria-hidden />}>
                                Registrer
                            </Button>
                            <Button type="button" variant="tertiary" onClick={onCancel}>
                                Avbryt
                            </Button>
                        </HStack>
                    </VStack>
                );

                return (
                    <TypedFormikForm
                        includeButtons={false}
                        formErrorHandler={getIntlFormErrorHandler(intl, 'meldInnDeltakerForm')}>
                        <VStack gap="space-16" marginBlock="space-16 space-0">
                            {Features.sjekkliste ? (
                                <>
                                    <Heading level="2" size="medium">
                                        Registrer ny deltaker
                                    </Heading>
                                    <Process data-color="accent">
                                        <Process.Event
                                            status={
                                                kanMeldesInn
                                                    ? 'completed'
                                                    : harSjekketSjekkliste !== YesOrNo.YES
                                                      ? 'active'
                                                      : undefined
                                            }
                                            // status="completed"
                                            title="Kan deltaker meldes inn"
                                            bullet={1}>
                                            <Box paddingBlock="space-16" data-color="accent">
                                                <FormikYesOrNoQuestion
                                                    name="harSjekketSjekkliste"
                                                    legend="Har du kontrollert at deltaker kan meldes inn i ungdomsprogrammet ved å fylle ut sjekklisten for deltakelse?"
                                                    validate={getYesOrNoValidator()}
                                                />
                                                {harSjekketSjekkliste === YesOrNo.NO && (
                                                    <Alert variant="info">
                                                        Du finner sjekklisten i menyen oppe til høyre.
                                                    </Alert>
                                                )}
                                            </Box>
                                        </Process.Event>
                                        <Process.Event
                                            status={
                                                !kanMeldesInn
                                                    ? undefined
                                                    : erVedtaksbrevSendt
                                                      ? 'completed'
                                                      : erVedtaksbrevSendt === undefined && kanMeldesInn
                                                        ? 'active'
                                                        : undefined
                                            }
                                            // status="completed"
                                            title="Send vedtaksbrev om deltakelse fra gosys"
                                            bullet={2}>
                                            {kanMeldesInn && (
                                                <Box paddingBlock="space-16">
                                                    <FormikYesOrNoQuestion
                                                        name="erVedtaksbrevSendt"
                                                        legend="Er vedtaksbrev om deltakelse i ungdomsprogrammet sendt fra gosys?"
                                                        validate={getYesOrNoValidator()}
                                                    />
                                                </Box>
                                            )}
                                        </Process.Event>
                                        <Process.Event
                                            title="Registrer oppstartsdato"
                                            bullet={3}
                                            // status="completed"

                                            status={erVedtaksbrevSendt === YesOrNo.YES ? 'active' : undefined}>
                                            {kanMeldesInn && erVedtaksbrevSendt === YesOrNo.YES && (
                                                <Box paddingBlock="space-16" style={{ minWidth: '33rem' }}>
                                                    {renderFormPart()}
                                                </Box>
                                            )}
                                        </Process.Event>
                                    </Process>
                                    {kanMeldesInn && erVedtaksbrevSendt === YesOrNo.NO && (
                                        <Alert variant="warning">
                                            Deltaker må ha et vedtak om at de er med i ungdomsprogrammet før vi kan
                                            behandle en søknad om ungdomsprogramytelse.
                                        </Alert>
                                    )}
                                </>
                            ) : (
                                <>
                                    <Heading level="2" size="medium">
                                        Registrer ny deltaker
                                    </Heading>
                                    {kanMeldesInn && (
                                        <FormikYesOrNoQuestion
                                            name="erVedtaksbrevSendt"
                                            legend="Er vedtaksbrev om deltakelse i ungdomsprogrammet sendt fra gosys?"
                                            validate={getYesOrNoValidator()}
                                        />
                                    )}
                                    {kanMeldesInn && erVedtaksbrevSendt === YesOrNo.NO && (
                                        <Alert variant="warning">
                                            Deltaker må ha et vedtak om at de er med i ungdomsprogrammet før vi kan
                                            behandle en søknad om ungdomsprogramytelse.
                                        </Alert>
                                    )}
                                    {kanMeldesInn && erVedtaksbrevSendt === YesOrNo.YES && renderFormPart()}
                                </>
                            )}
                            {error && error.type === ApiErrorType.NetworkError && error.originalError ? (
                                <ApiErrorAlert error={error} />
                            ) : null}
                        </VStack>
                    </TypedFormikForm>
                );
            }}
        />
    );
};

export default MeldInnDeltakerForm;
