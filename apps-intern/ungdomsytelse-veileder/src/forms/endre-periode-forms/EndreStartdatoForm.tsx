import { Alert, Bleed, VStack } from '@navikt/ds-react';
import { useIntl } from 'react-intl';
import { getIntlFormErrorHandler, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { dateToISODate, getDateToday } from '@navikt/sif-common-utils';
import { getCheckedValidator } from '@navikt/sif-validation';
import dayjs from 'dayjs';
import ApiErrorAlert from '../../components/api-error-alert/ApiErrorAlert';
import { usePeriodeForDeltakelse } from '../../hooks/usePeriodeForDeltakelse';
import StartdatoInfo from '../../pages/deltaker-page/StartdatoInfo';
import { Deltakelse } from '../../types/Deltakelse';
import { Deltaker } from '../../types/Deltaker';
import { EndrePeriodeVariant } from '../../types/EndrePeriodeVariant';
import { AppHendelse } from '../../utils/analytics';
import { useAppEventLogger } from '../../utils/analyticsHelper';
import {
    getStartdatobegrensningForDeltaker,
    getTillattEndringsperiode,
    kanEndreStartdato,
} from '../../utils/deltakelseUtils';
import { getPeriodeDatoValidator } from '../../utils/getPeriodeDatoValidator';

enum FieldNames {
    startdato = 'startdato',
    bekrefterEndring = 'bekrefterEndring',
}
type FormValues = {
    [FieldNames.startdato]: string;
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

const EndreStartdatoForm = ({ deltakelse, deltaker, onCancel, onDeltakelseChanged }: Props) => {
    const intl = useIntl();
    const { log } = useAppEventLogger();

    const { mutate, isPending, error } = usePeriodeForDeltakelse({
        variant: EndrePeriodeVariant.startdato,
        deltakelseId: deltakelse.id,
        deltakerId: deltaker.id,
    });

    const startdatoMinMax = getStartdatobegrensningForDeltaker(
        deltaker.førsteMuligeInnmeldingsdato,
        deltaker.sisteMuligeInnmeldingsdato,
        getDateToday(),
    );

    if (startdatoMinMax === 'fomFørTom') {
        return (
            <Alert variant="info">
                Deltakers først eller siste mulige innmeldingsdato er utenfor tillatt endringsperiode som er 6 måneder
                før og etter dagens dato.
            </Alert>
        );
    }

    const handleOnSubmit = async (values: FormValues) => {
        const { startdato } = values;
        if (!startdato) {
            return;
        }
        mutate(
            {
                dato: startdato,
            },
            {
                onSuccess: onDeltakelseChanged,
            },
        );
        await log(AppHendelse.startdatoEndret, {
            endring: dayjs(startdato).diff(deltakelse.fraOgMed, 'day'),
        });
    };

    if (kanEndreStartdato(deltakelse, getTillattEndringsperiode(getDateToday())) === false) {
        return <Alert variant="info">Startdato kan ikke endres.</Alert>;
    }

    return (
        <FormikWrapper
            initialValues={{
                startdato: dateToISODate(deltakelse.fraOgMed),
            }}
            onSubmit={handleOnSubmit}
            renderForm={() => {
                return (
                    <VStack gap="space-24">
                        <StartdatoInfo />
                        <Form
                            formErrorHandler={getIntlFormErrorHandler(intl, 'endrePeriodeForm')}
                            submitPending={isPending}
                            showSubmitButton={true}
                            submitButtonLabel="Bekreft og lagre"
                            cancelButtonLabel="Avbryt"
                            onCancel={onCancel}
                            showButtonArrows={false}>
                            <VStack gap="space-24">
                                <VStack gap="space-32" className="rounded-xs">
                                    <DatePicker
                                        name={FieldNames.startdato}
                                        label="Oppgi startdato:"
                                        minDate={startdatoMinMax.from}
                                        maxDate={startdatoMinMax.to}
                                        defaultMonth={deltakelse.fraOgMed}
                                        disableWeekends={true}
                                        validate={getPeriodeDatoValidator(startdatoMinMax, deltakelse.fraOgMed)}
                                    />
                                    <Bleed marginBlock="space-16 space-0">
                                        <ConfirmationCheckbox
                                            name={FieldNames.bekrefterEndring}
                                            label="Jeg bekrefter endring av startdato"
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

export default EndreStartdatoForm;
