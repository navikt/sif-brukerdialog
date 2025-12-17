import { Alert, Bleed, BodyShort, BoxNew, Button, Heading, HStack, VStack } from '@navikt/ds-react';
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
import GruppertSjekkliste from '../../components/sjekkliste/GruppertSjekkliste';
import { useState } from 'react';
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

    const [sjekkListeResultat, setSjekkListeResultat] = useState<boolean>(false);

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

                const kanMeldesInn = Features.sjekkliste
                    ? sjekkListeResultat === true || harSjekketSjekkliste === YesOrNo.YES
                    : true;

                return (
                    <TypedFormikForm
                        includeButtons={false}
                        formErrorHandler={getIntlFormErrorHandler(intl, 'meldInnDeltakerForm')}>
                        <VStack gap="4" marginBlock="4 0">
                            <Heading level="2" size="medium">
                                Registrer ny deltaker
                            </Heading>

                            {Features.sjekkliste && (
                                <>
                                    <FormikYesOrNoQuestion
                                        name="harSjekketSjekkliste"
                                        legend="Har du gjennomført sjekklisten for å se om deltaker kan meldes inn?"
                                        validate={getYesOrNoValidator()}
                                    />
                                    {harSjekketSjekkliste === YesOrNo.NO && (
                                        <Bleed marginInline="4">
                                            <BoxNew
                                                padding="4"
                                                borderRadius="large"
                                                background="default"
                                                borderWidth="1"
                                                marginBlock="0 4"
                                                borderColor="neutral-subtle">
                                                <GruppertSjekkliste
                                                    onChange={(resultat) => setSjekkListeResultat(resultat)}
                                                    visResultat={true}
                                                />
                                            </BoxNew>
                                        </Bleed>
                                    )}
                                </>
                            )}

                            {kanMeldesInn && (
                                <FormikYesOrNoQuestion
                                    name="erVedtaksbrevSendt"
                                    legend="Er vedtaksbrev om deltakelse i ungdomsprogrammet sendt fra gosys?"
                                    validate={getYesOrNoValidator()}
                                />
                            )}

                            {kanMeldesInn && erVedtaksbrevSendt === YesOrNo.NO && (
                                <Alert variant="warning">
                                    Deltaker må ha et vedtak om at de er med i ungdomsprogrammet før vi kan behandle en
                                    søknad om ungdomsprogramytelse.
                                </Alert>
                            )}

                            {kanMeldesInn && erVedtaksbrevSendt === YesOrNo.YES && (
                                <>
                                    <FormikDatepicker
                                        name="startDato"
                                        label="Når starter deltakeren i ungdomsprogrammet?"
                                        disableWeekends={true}
                                        description={
                                            <>Tidligste startdato er {dateFormatter.compact(startdatoMinMax.from)}</>
                                        }
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

                                    <HStack gap="2">
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
