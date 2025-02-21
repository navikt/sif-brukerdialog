import { Alert, VStack } from '@navikt/ds-react';
import { FormikConfirmationCheckbox, FormikDatepicker, FormikTextarea } from '@navikt/sif-common-formik-ds';
import { getCheckedValidator, getDateValidator, getStringValidator } from '@navikt/sif-validation';
import { DateRange } from '@navikt/sif-common-utils';
import { max, min } from 'date-fns';
import { Deltakelse } from '../../api/types';
import { GYLDIG_PERIODE } from '../../settings';

interface Props {
    visStartdato?: boolean;
    visSluttdato?: boolean;
    tomDate?: Date;
    fomDate?: Date;
    deltakelser: Deltakelse[];
    deltakelseId?: string;
}

const MELDING_MAX_LENGTH = 250;
const MELDING_MIN_LENGTH = 10;

const PeriodeFormPart = ({
    fomDate,
    tomDate,
    deltakelser = [],
    deltakelseId,
    visStartdato = true,
    visSluttdato = true,
}: Props) => {
    const periodeSomIkkeKanVelges: DateRange[] = deltakelser
        .filter((d) => d.id !== deltakelseId && d.tilOgMed !== undefined)
        .map((d) => ({ from: d.fraOgMed, to: d.tilOgMed! }));
    return (
        <VStack gap="6" className="rounded bg-bg-subtle p-5">
            {visStartdato ? (
                <FormikDatepicker
                    name="fom"
                    label="Startdato"
                    minDate={GYLDIG_PERIODE.from}
                    maxDate={min([tomDate ? tomDate : GYLDIG_PERIODE.to, GYLDIG_PERIODE.to])}
                    defaultMonth={fomDate || new Date()}
                    disabledDateRanges={periodeSomIkkeKanVelges}
                    validate={getDateValidator({
                        required: true,
                        max: tomDate || GYLDIG_PERIODE.to,
                    })}
                />
            ) : null}
            {visSluttdato ? (
                <FormikDatepicker
                    name="tom"
                    label="Sluttdato"
                    minDate={max([fomDate || GYLDIG_PERIODE.from, GYLDIG_PERIODE.from])}
                    maxDate={GYLDIG_PERIODE.to}
                    disabledDateRanges={periodeSomIkkeKanVelges}
                    defaultMonth={tomDate || fomDate || new Date()}
                    validate={getDateValidator({
                        min: fomDate || GYLDIG_PERIODE.from,
                    })}
                />
            ) : null}
            <FormikTextarea
                name="melding"
                label="Melding til deltaker (valgfritt)"
                maxLength={MELDING_MAX_LENGTH}
                minLength={MELDING_MIN_LENGTH}
                validate={getStringValidator({
                    required: false,
                    maxLength: MELDING_MAX_LENGTH,
                    minLength: MELDING_MIN_LENGTH,
                })}
            />
            <Alert variant="info" inline={true}>
                Oppgaven vil bli merket med navnet ditt (<strong>Navn Veiledersen</strong>).
            </Alert>
            <FormikConfirmationCheckbox
                name="bekrefterEndring"
                label="Bekreft endring av deltakerperiode"
                validate={getCheckedValidator()}
            />
        </VStack>
    );
};

export default PeriodeFormPart;
