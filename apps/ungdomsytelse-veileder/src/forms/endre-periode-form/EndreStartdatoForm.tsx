import { Alert, BodyShort, VStack } from '@navikt/ds-react';
import {
    getIntlFormErrorHandler,
    getTypedFormComponents,
    ValidationError,
    YesOrNo,
} from '@navikt/sif-common-formik-ds';
import { dateToISODate, getDateToday, ISODateToDate } from '@navikt/sif-common-utils';
import { getRequiredFieldValidator } from '@navikt/sif-validation';
import { Deltakelse, Deltaker, formaterNavn } from '@navikt/ung-common';
import { useIntl } from 'react-intl';
import { usePeriodeForDeltakelse } from '../../hooks/usePeriodeForDeltakelse';
import { GYLDIG_PERIODE } from '../../settings';
import { EndrePeriodeVariant } from '../../types/EndrePeriodeVariant';
import { getStartdatobegrensningForDeltaker } from '../../utils/deltakelseUtils';
import { getStartdatoValidator } from './endrePeriodeFormUtils';
import dayjs from 'dayjs';
import Dato from '../../atoms/Dato';

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
    deltaker: Deltaker;
    deltakelse: Deltakelse;
    onCancel?: () => void;
    onDeltakelseChanged: (oppdatertDeltakelse: Deltakelse) => void;
}

const EndreStartdatoForm = ({ deltakelse, deltaker, onCancel, onDeltakelseChanged }: Props) => {
    const intl = useIntl();
    const { mutate, isPending, error } = usePeriodeForDeltakelse({
        variant: EndrePeriodeVariant.startdato,
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

    const handleOnSubmit = async (values: FormValues) => {
        const dato = values.fom;
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
                const datoErEndret = fomDato !== undefined && !dayjs(fomDato).isSame(deltakelse.fraOgMed, 'day');

                return (
                    <VStack gap="6">
                        {startdatoMinMax === 'fomFørTom' ? (
                            <>dsf</>
                        ) : (
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
                                        <DatePicker
                                            name={FieldNames.fom}
                                            label={`Oppgi startdato:`}
                                            minDate={startdatoMinMax.from}
                                            maxDate={startdatoMinMax.to}
                                            defaultMonth={deltakelse.fraOgMed}
                                            validate={getStartdatoValidator(startdatoMinMax)}
                                        />

                                        <YesOrNoQuestion
                                            name={FieldNames.deltakerErInformert}
                                            legend={`Er denne endringen avklart med ${deltakernavn}?`}
                                            validate={getRequiredFieldValidator()}
                                        />

                                        {deltakerInformertBesvart && datoErEndret && fomDato ? (
                                            <ConfirmationCheckbox
                                                name={FieldNames.bekrefterEndring}
                                                label={`Dette er riktig`}
                                                validate={getRequiredFieldValidator()}>
                                                <VStack gap="2">
                                                    <BodyShort weight="semibold">
                                                        Bekreft endring av deltakerperiode
                                                    </BodyShort>
                                                    <BodyShort>
                                                        Dato {deltakernavn} går inn i programmet skal endres fra{' '}
                                                        <Dato dato={deltakelse.fraOgMed} /> til {` `}
                                                        <Dato dato={fomDato} />
                                                    </BodyShort>
                                                </VStack>
                                            </ConfirmationCheckbox>
                                        ) : null}

                                        {deltakerInformertBesvart && !datoErEndret ? (
                                            <Alert variant="warning">Dato er ikke endret fra opprinnelig dato</Alert>
                                        ) : null}
                                    </VStack>
                                    {error ? <Alert variant="error">{error.message}</Alert> : null}
                                </VStack>
                            </Form>
                        )}
                    </VStack>
                );
            }}
        />
    );
};

export default EndreStartdatoForm;
