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
import { dateToISODate } from '@navikt/sif-common-utils';
import { getCheckedValidator, getRequiredFieldValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import dayjs from 'dayjs';
import ApiErrorAlert from '../../components/api-error-alert/ApiErrorAlert';
import { usePeriodeForDeltakelse } from '../../hooks/usePeriodeForDeltakelse';
import { Deltakelse } from '../../types/Deltakelse';
import { Deltaker } from '../../types/Deltaker';
import { EndrePeriodeVariant } from '../../types/EndrePeriodeVariant';
import { Utmeldingsårsak, UtmeldingsårsakerList } from '../../types/Utmeldingsårsaker';
import { AppHendelse } from '../../utils/analytics';
import { useAppEventLogger } from '../../utils/analyticsHelper';
import { getPeriodeDatoValidator } from '../../utils/getPeriodeDatoValidator';

enum FieldNames {
    sluttdato = 'sluttdato',
    erVedtaksbrevSendt = 'erVedtaksbrevSendt',
    årsak = 'årsak',
    bekrefterEndring = 'bekrefterEndring',
}
type FormValues = {
    [FieldNames.sluttdato]: string;
    [FieldNames.årsak]: Utmeldingsårsak;
    [FieldNames.erVedtaksbrevSendt]: YesOrNo;
    [FieldNames.bekrefterEndring]: boolean;
};

const { FormikWrapper, Form, DatePicker, ConfirmationCheckbox } = getTypedFormComponents<
    FieldNames,
    FormValues,
    ValidationError
>();

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

    const { mutate, isPending, error } = usePeriodeForDeltakelse({
        variant: erEndringAvSluttdato ? EndrePeriodeVariant.endreSluttdato : EndrePeriodeVariant.meldUtDeltaker,
        deltakelseId: deltakelse.id,
        deltakerId: deltaker.id,
    });

    const handleOnSubmit = async (values: FormValues) => {
        const { sluttdato } = values;
        if (!sluttdato) {
            return;
        }
        mutate(
            {
                dato: sluttdato,
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
        from: deltakelse.fraOgMed,
        to: dayjs(deltakelse.fraOgMed).add(15, 'months').toDate(),
    };

    return (
        <FormikWrapper
            initialValues={{
                sluttdato: deltakelse.tilOgMed ? dateToISODate(deltakelse.tilOgMed) : undefined,
            }}
            onSubmit={handleOnSubmit}
            renderForm={({ values }) => {
                const { erVedtaksbrevSendt } = values;
                return (
                    <VStack gap="6">
                        {erEndringAvSluttdato === false && (
                            <ReadMore header="Les mer om å registrere sluttdato for utmeldt deltaker">
                                <BodyLong spacing>
                                    Når du setter en sluttdato blir denne brukt til å opphøre ungdomsprogramytelsen.
                                    Deretter kan ikke deltakeren gis en ny periode.
                                </BodyLong>
                                <BodyLong>
                                    Du skal ikke registrere sluttdato når det har gått 260 dager (ett år), dette skjer
                                    automatisk.
                                </BodyLong>
                            </ReadMore>
                        )}
                        <Form
                            formErrorHandler={getIntlFormErrorHandler(intl, 'endrePeriodeForm')}
                            submitPending={isPending}
                            showSubmitButton={true}
                            submitButtonLabel="Bekreft og lagre"
                            cancelButtonLabel="Avbryt"
                            onCancel={onCancel}
                            submitDisabled={erVedtaksbrevSendt === YesOrNo.NO}
                            showButtonArrows={false}>
                            <VStack gap="6">
                                <VStack gap="8" className="rounded-xs">
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
                                                validate={getPeriodeDatoValidator(sluttdatoMinMax, deltakelse.tilOgMed)}
                                            />
                                            {erEndringAvSluttdato === false && (
                                                <FormikRadioGroup
                                                    name={FieldNames.årsak}
                                                    legend="Hvorfor meldes deltaker ut?"
                                                    radios={UtmeldingsårsakerList.map((årsak) => ({
                                                        value: årsak,
                                                        label: <FormattedMessage id={`utmeldingsårsak.${årsak}`} />,
                                                    }))}
                                                    validate={getRequiredFieldValidator()}
                                                />
                                            )}
                                            <Bleed marginBlock="4 0">
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
