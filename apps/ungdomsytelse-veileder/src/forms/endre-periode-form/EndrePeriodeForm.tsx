import { Alert, Bleed, Box, VStack } from '@navikt/ds-react';
import { useIntl } from 'react-intl';
import {
    getIntlFormErrorHandler,
    getTypedFormComponents,
    ValidationError,
    YesOrNo,
} from '@navikt/sif-common-formik-ds';
import { dateToISODate, getDateToday } from '@navikt/sif-common-utils';
import { getCheckedValidator, getRequiredFieldValidator } from '@navikt/sif-validation';
import { Deltakelse, Deltaker, formaterNavn } from '@navikt/ung-common';
import { max } from 'date-fns';
import ApiErrorAlert from '../../components/api-error-alert/ApiErrorAlert';
import { usePeriodeForDeltakelse } from '../../hooks/usePeriodeForDeltakelse';
import { GYLDIG_PERIODE } from '../../settings';
import { EndrePeriodeVariant } from '../../types/EndrePeriodeVariant';
import {
    getStartdatobegrensningForDeltaker,
    getTillattEndringsperiode,
    kanEndreSluttdato,
    kanEndreStartdato,
} from '../../utils/deltakelseUtils';
import { getSluttdatoValidator, getStartdatoValidator } from './endrePeriodeFormUtils';

type FormValues = {
    fom?: string;
    tom?: string;
    bekrefterEndring: boolean;
    deltakerErInformert: YesOrNo;
};

enum FieldNames {
    fom = 'fom',
    tom = 'tom',
    bekrefterEndring = 'bekrefterEndring',
    deltakerErInformert = 'deltakerErInformert',
}

const { FormikWrapper, Form, DatePicker, ConfirmationCheckbox, YesOrNoQuestion } = getTypedFormComponents<
    FieldNames,
    FormValues,
    ValidationError
>();

interface Props {
    variant: EndrePeriodeVariant;
    deltaker: Deltaker;
    deltakelse: Deltakelse;
    onCancel?: () => void;
    onDeltakelseChanged: (oppdatertDeltakelse: Deltakelse) => void;
}

const EndrePeriodeForm = ({ variant, deltakelse, deltaker, onCancel, onDeltakelseChanged }: Props) => {
    const intl = useIntl();
    const { mutate, isPending, error } = usePeriodeForDeltakelse({
        variant,
        deltakelseId: deltakelse.id,
        deltakerId: deltaker.id,
    });

    const deltakernavn = formaterNavn(deltaker.navn);

    const startdatoMinMax = getStartdatobegrensningForDeltaker(
        deltaker.førsteMuligeInnmeldingsdato,
        deltaker.sisteMuligeInnmeldingsdato,
        GYLDIG_PERIODE.from,
        getDateToday(),
    );

    if (variant === EndrePeriodeVariant.startdato && startdatoMinMax === 'fomFørTom') {
        return (
            <Alert variant="info">
                Deltakers først eller siste mulige innmeldingsdato er utenfor tillatt endringsperiode som er 6 måneder
                før og etter dagens dato.
            </Alert>
        );
    }

    const sluttdatoMinMax = {
        from: max([deltakelse.fraOgMed || GYLDIG_PERIODE.from, GYLDIG_PERIODE.from]),
        to: GYLDIG_PERIODE.to,
    };

    const handleOnSubmit = async (values: FormValues) => {
        const dato = variant === EndrePeriodeVariant.startdato ? values.fom : values.tom;

        if (!dato) {
            return;
        }
        mutate(
            {
                dato,
            },
            {
                onSuccess: onDeltakelseChanged,
            },
        );
    };

    if (
        variant === EndrePeriodeVariant.startdato &&
        kanEndreStartdato(deltakelse, getTillattEndringsperiode(getDateToday())) === false
    ) {
        return <Alert variant="info">Startdato kan ikke endres.</Alert>;
    }

    if (
        variant === EndrePeriodeVariant.sluttdato &&
        kanEndreSluttdato(deltakelse, getTillattEndringsperiode(getDateToday())) === false
    ) {
        return <Alert variant="info">Sluttdato kan ikke endres.</Alert>;
    }

    return (
        <FormikWrapper
            initialValues={{
                fom: dateToISODate(deltakelse.fraOgMed),
                tom: deltakelse.tilOgMed ? dateToISODate(deltakelse.tilOgMed) : undefined,
            }}
            onSubmit={handleOnSubmit}
            renderForm={({ values }) => {
                return (
                    <VStack gap="6">
                        <Form
                            formErrorHandler={getIntlFormErrorHandler(intl, 'endrePeriodeForm')}
                            submitPending={isPending}
                            showSubmitButton={true}
                            submitButtonLabel="Bekreft og lagre"
                            cancelButtonLabel="Avbryt"
                            onCancel={onCancel}
                            showButtonArrows={false}>
                            <VStack gap="6">
                                <VStack gap="8" className="rounded-xs">
                                    {variant === EndrePeriodeVariant.startdato && startdatoMinMax !== 'fomFørTom' ? (
                                        <DatePicker
                                            name={FieldNames.fom}
                                            label="Oppgi startdato:"
                                            minDate={startdatoMinMax.from}
                                            maxDate={startdatoMinMax.to}
                                            defaultMonth={deltakelse.fraOgMed}
                                            validate={getStartdatoValidator(startdatoMinMax, deltakelse.fraOgMed)}
                                        />
                                    ) : (
                                        <DatePicker
                                            name={FieldNames.tom}
                                            label="Oppgi sluttdato:"
                                            minDate={sluttdatoMinMax.from}
                                            maxDate={sluttdatoMinMax.to}
                                            defaultMonth={deltakelse.tilOgMed}
                                            validate={getSluttdatoValidator(sluttdatoMinMax, deltakelse.tilOgMed)}
                                        />
                                    )}

                                    <VStack gap="2">
                                        <YesOrNoQuestion
                                            name={FieldNames.deltakerErInformert}
                                            legend={`Er denne endringen avklart med ${deltakernavn}?`}
                                            validate={getRequiredFieldValidator()}
                                        />

                                        {values.deltakerErInformert === YesOrNo.NO ? (
                                            <Box marginBlock="0 4">
                                                <Alert variant="info">
                                                    Vurder om du skal skal avklare dette med deltaker før du registrerer
                                                    endringen.
                                                </Alert>
                                            </Box>
                                        ) : null}
                                    </VStack>

                                    <Bleed marginBlock="4 0">
                                        <ConfirmationCheckbox
                                            name={FieldNames.bekrefterEndring}
                                            label={
                                                variant === EndrePeriodeVariant.startdato
                                                    ? `Jeg bekrefter endring av startdato`
                                                    : `Jeg bekrefter endring av sluttdato`
                                            }
                                            validate={getCheckedValidator()}
                                        />
                                    </Bleed>
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

export default EndrePeriodeForm;
