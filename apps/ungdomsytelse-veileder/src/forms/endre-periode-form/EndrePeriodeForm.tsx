import { Alert, VStack } from '@navikt/ds-react';
import {
    getIntlFormErrorHandler,
    getTypedFormComponents,
    ValidationError,
    YesOrNo,
} from '@navikt/sif-common-formik-ds';
import { dateToISODate, getDateToday, ISODateToDate } from '@navikt/sif-common-utils';
import { getCheckedValidator, getRequiredFieldValidator } from '@navikt/sif-validation';
import { Deltakelse, Deltaker, formaterNavn } from '@navikt/ung-common';
import { max } from 'date-fns';
import { useIntl } from 'react-intl';
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
import dayjs from 'dayjs';
import BekreftEndretStartdatoInfo from './parts/BekreftEndretStartdatoInfo';
import BekreftEndretSluttdatoInfo from './parts/BekreftEndretSluttdatoInfo';
import ApiErrorAlert from '../../components/api-error-alert/ApiErrorAlert';

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
                const deltakerInformertBesvart = values.deltakerErInformert !== undefined;
                const fomDato = values.fom ? ISODateToDate(values.fom) : undefined;
                const tomDato = values.tom ? ISODateToDate(values.tom) : undefined;

                const startdatoErEndret =
                    variant === EndrePeriodeVariant.startdato &&
                    fomDato !== undefined &&
                    !dayjs(fomDato).isSame(deltakelse.fraOgMed, 'day');

                const sluttdatoErEndret =
                    variant === EndrePeriodeVariant.sluttdato &&
                    tomDato !== undefined &&
                    !dayjs(tomDato).isSame(deltakelse.tilOgMed, 'date');

                const datoErValgt =
                    (variant === EndrePeriodeVariant.startdato && !!fomDato) ||
                    (EndrePeriodeVariant.sluttdato && !!tomDato);
                const datoErEndret = startdatoErEndret || sluttdatoErEndret;

                return (
                    <VStack gap="6">
                        {/* {variant === EndrePeriodeVariant.startdato && <TillattStartdatoInfo deltaker={deltaker} />} */}
                        <Form
                            formErrorHandler={getIntlFormErrorHandler(intl, 'endrePeriodeForm')}
                            submitPending={isPending}
                            showSubmitButton={true}
                            submitDisabled={deltakerInformertBesvart && !datoErEndret}
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
                                            validate={getStartdatoValidator(startdatoMinMax)}
                                        />
                                    ) : (
                                        <DatePicker
                                            name={FieldNames.tom}
                                            label="Oppgi sluttdato:"
                                            minDate={sluttdatoMinMax.from}
                                            maxDate={sluttdatoMinMax.to}
                                            defaultMonth={deltakelse.tilOgMed}
                                            validate={getSluttdatoValidator(sluttdatoMinMax)}
                                        />
                                    )}

                                    <YesOrNoQuestion
                                        name={FieldNames.deltakerErInformert}
                                        legend={`Er denne endringen avklart med ${deltakernavn}?`}
                                        validate={getRequiredFieldValidator()}
                                    />

                                    {deltakerInformertBesvart && datoErEndret ? (
                                        <ConfirmationCheckbox
                                            name={FieldNames.bekrefterEndring}
                                            label="Dette er riktig"
                                            validate={getCheckedValidator()}>
                                            {variant === EndrePeriodeVariant.startdato && fomDato ? (
                                                <BekreftEndretStartdatoInfo
                                                    deltakernavn={deltakernavn}
                                                    opprinneligStartdato={deltakelse.fraOgMed}
                                                    nyStartdato={fomDato}
                                                />
                                            ) : null}
                                            {variant === EndrePeriodeVariant.sluttdato && tomDato ? (
                                                <BekreftEndretSluttdatoInfo
                                                    deltakernavn={deltakernavn}
                                                    opprinneligSluttdato={deltakelse.tilOgMed}
                                                    nySluttdato={tomDato}
                                                />
                                            ) : null}
                                        </ConfirmationCheckbox>
                                    ) : null}

                                    {deltakerInformertBesvart && datoErValgt && !datoErEndret ? (
                                        <Alert variant="warning">Dato er ikke endret fra opprinnelig dato</Alert>
                                    ) : null}
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
