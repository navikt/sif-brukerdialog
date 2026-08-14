import { Alert, Bleed, BodyLong, ReadMore, VStack } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    FormikRadioGroup,
    FormikYesOrNoQuestion,
    getIntlFormErrorHandler,
    getTypedFormComponents,
    ValidationError,
    YesOrNo,
} from '@navikt/sif-common-formik-ds';
import { dateFormatter, dateToISODate } from '@navikt/sif-common-utils';
import { getCheckedValidator, getRequiredFieldValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import ApiErrorAlert from '../../components/api-error-alert/ApiErrorAlert';
import { usePeriodeForDeltakelse } from '../../hooks/usePeriodeForDeltakelse';
import { Deltakelse } from '../../types/Deltakelse';
import { Deltaker } from '../../types/Deltaker';
import { EndrePeriodeVariant } from '../../types/EndrePeriodeVariant';
import { AppHendelse } from '../../utils/analytics';
import { useAppEventLogger } from '../../utils/analyticsHelper';
import { getPeriodeDatoValidator } from '../../utils/getPeriodeDatoValidator';
import dayjs from 'dayjs';
import { getDeltakelseHandlinger } from '../../utils/deltakelseUtils';
import { Avslutningsårsak } from '@navikt/ung-deltakelse-opplyser-api-veileder';

enum FieldNames {
    sluttdato = 'sluttdato',
    erVedtaksbrevSendt = 'erVedtaksbrevSendt',
    årsak = 'årsak',
    bekrefterEndring = 'bekrefterEndring',
}
type FormValues = {
    [FieldNames.sluttdato]: string;
    [FieldNames.årsak]: Avslutningsårsak;
    [FieldNames.erVedtaksbrevSendt]: YesOrNo;
    [FieldNames.bekrefterEndring]: boolean;
};

const { FormikWrapper, Form, DatePicker, ConfirmationCheckbox } = getTypedFormComponents<
    FieldNames,
    FormValues,
    ValidationError
>();

export const AvslutningsårsakerList = [
    Avslutningsårsak.ARBEID,
    Avslutningsårsak.UTDANNING,
    Avslutningsårsak.MANGLENDE_DELTAKELSE,
    Avslutningsårsak.DELTAKER_ØNSKER_IKKE_Å_DELTA,
    Avslutningsårsak.FLYTTET,
    Avslutningsårsak.ANNET,
];

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
    onCancel?: () => void;
    onDeltakelseChanged: (oppdatertDeltakelse: Deltakelse) => void;
}

const EndreSluttdatoForm = ({ deltakelse, deltaker, onCancel, onDeltakelseChanged }: Props) => {
    const intl = useIntl();
    const { log } = useAppEventLogger();

    const erEndringAvSluttdato = deltakelse.tilOgMed !== undefined;
    const handlinger = getDeltakelseHandlinger(deltakelse);

    const { mutate, isPending, error } = usePeriodeForDeltakelse({
        variant: erEndringAvSluttdato ? EndrePeriodeVariant.endreSluttdato : EndrePeriodeVariant.meldUtDeltaker,
        deltakelseId: deltakelse.id,
        deltakerId: deltaker.id,
    });

    const handleOnSubmit = async (values: FormValues) => {
        const { sluttdato, årsak } = values;
        if (!sluttdato) {
            return;
        }
        mutate(
            {
                dato: sluttdato,
                avslutningsårsak: årsak,
            },
            {
                onSuccess: onDeltakelseChanged,
            },
        );
        if (erEndringAvSluttdato) {
            await log(AppHendelse.sluttdatoEndret);
        } else {
            await log(AppHendelse.sluttdatoSattFørsteGang, { årsak: values[FieldNames.årsak] });
        }
    };

    const sluttdatoMinMax = {
        from: dayjs(deltakelse.fraOgMed).add(1, 'day').toDate(), // Skal ikke kunne sette sluttdato til å være lik eller før startdato
        to: dayjs(deltakelse.periodeMaksDato).subtract(1, 'day').toDate(), // Skal ikke kunne sette sluttdato til å være lik eller etter maksdato
    };

    const maksdatoTekst = dateFormatter.dayCompactDate(deltakelse.periodeMaksDato);
    return (
        <FormikWrapper
            initialValues={{
                sluttdato: deltakelse.tilOgMed ? dateToISODate(deltakelse.tilOgMed) : undefined,
            }}
            onSubmit={handleOnSubmit}
            renderForm={({ values }) => {
                const { erVedtaksbrevSendt } = values;
                return (
                    <VStack gap="space-24">
                        <VStack gap="space-16">
                            <BodyLong>
                                Maksdato for deltakerperioden er <strong>{maksdatoTekst}</strong>.
                            </BodyLong>
                            <BodyLong>
                                Du skal ikke registrere sluttdato hvis deltakelsen avsluttes på maksdatoen - dette går
                                automatisk.
                            </BodyLong>
                            {erEndringAvSluttdato === false && (
                                <ReadMore header="Mer om sluttdato og maksdato">
                                    <BodyLong>
                                        Når du setter en sluttdato før maksdato blir denne brukt til å opphøre
                                        ungdomsprogramytelsen. Deretter kan ikke deltakeren gis en ny periode.
                                    </BodyLong>
                                </ReadMore>
                            )}
                            {erEndringAvSluttdato === true && handlinger.kanSletteSluttdato.tillatt && (
                                <ReadMore header="Mer om sluttdato og maksdato">
                                    <BodyLong>
                                        Hvis sluttdatoen er satt ved en feil, og maksdato skal være gjeldende, kan du
                                        slette sluttdatoen under &quot;Vis unntakshendelser&quot;. Da vil
                                        ungdomsprogramytelsen igjen opphøre på maksdato.
                                    </BodyLong>
                                </ReadMore>
                            )}
                        </VStack>
                        <Form
                            formErrorHandler={getIntlFormErrorHandler(intl, 'endrePeriodeForm')}
                            submitPending={isPending}
                            showSubmitButton={true}
                            submitButtonLabel="Bekreft og lagre"
                            cancelButtonLabel="Avbryt"
                            onCancel={onCancel}
                            submitDisabled={erVedtaksbrevSendt === YesOrNo.NO}
                            showButtonArrows={false}>
                            <VStack gap="space-24">
                                <VStack gap="space-32" className="rounded-xs">
                                    {erEndringAvSluttdato === false && (
                                        <>
                                            <FormikYesOrNoQuestion
                                                name="erVedtaksbrevSendt"
                                                legend="Er vedtaksbrev om at deltaker er meldt ut av ungdomsprogrammet sendt fra gosys?"
                                                validate={getYesOrNoValidator()}
                                            />
                                            {erVedtaksbrevSendt === YesOrNo.NO && (
                                                <Alert variant="warning">
                                                    Deltaker må ha et vedtak om at de er meldt ut av ungdomsprogrammet
                                                    før sluttdato for deltakelsen kan registreres på ytelsen.
                                                </Alert>
                                            )}
                                        </>
                                    )}
                                    {(erVedtaksbrevSendt === YesOrNo.YES || erEndringAvSluttdato) && (
                                        <>
                                            <DatePicker
                                                name={FieldNames.sluttdato}
                                                label="Oppgi sluttdato:"
                                                minDate={sluttdatoMinMax.from}
                                                maxDate={sluttdatoMinMax.to}
                                                defaultMonth={deltakelse.tilOgMed}
                                                disableWeekends={true}
                                                validate={getPeriodeDatoValidator({
                                                    periode: sluttdatoMinMax,
                                                    registrertDato: deltakelse.tilOgMed,
                                                })}
                                            />

                                            {erEndringAvSluttdato === false && (
                                                <FormikRadioGroup
                                                    name={FieldNames.årsak}
                                                    legend="Hvorfor meldes deltaker ut?"
                                                    radios={AvslutningsårsakerList.map((årsak) => ({
                                                        value: årsak,
                                                        label: <FormattedMessage id={`utmeldingsårsak.${årsak}`} />,
                                                    }))}
                                                    validate={getRequiredFieldValidator()}
                                                />
                                            )}
                                            <Bleed marginBlock="space-16 space-0">
                                                <ConfirmationCheckbox
                                                    name={FieldNames.bekrefterEndring}
                                                    label={
                                                        erEndringAvSluttdato
                                                            ? 'Jeg bekrefter endring av sluttdato'
                                                            : 'Jeg bekrefter registrering av sluttdato'
                                                    }
                                                    validate={getCheckedValidator()}
                                                />
                                            </Bleed>
                                        </>
                                    )}
                                </VStack>
                                {error ? <ApiErrorAlert error={error} /> : null}
                            </VStack>
                        </Form>
                    </VStack>
                );
            }}
        />
    );
};

export default EndreSluttdatoForm;
