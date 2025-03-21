import { Alert, Button, HStack, VStack } from '@navikt/ds-react';
import { FormikDatepicker, FormikTextarea, FormikYesOrNoQuestion } from '@navikt/sif-common-formik-ds';
import { getDateValidator, getRequiredFieldValidator, getStringValidator } from '@navikt/sif-validation';
import { formaterNavn } from '@navikt/ung-common';
import { max, min } from 'date-fns';
import { GYLDIG_PERIODE } from '../../settings';
import { Veileder } from '../../types/Veileder';

interface Props {
    veileder: Veileder;
    deltakernavn: string;
    visStartdato?: boolean;
    visSluttdato?: boolean;
    tomDate?: Date;
    fomDate?: Date;
    pending?: boolean;
    onCancel?: () => void;
}

const MELDING_MAX_LENGTH = 250;
const MELDING_MIN_LENGTH = 5;

const PeriodeFormPart = ({
    veileder,
    deltakernavn,
    fomDate,
    tomDate,
    visStartdato = true,
    visSluttdato = true,
    pending,
    onCancel,
}: Props) => {
    return (
        <VStack gap="8" className="rounded-xs bg-bg-subtle p-5">
            {visStartdato ? (
                <FormikDatepicker
                    name="fom"
                    label="Ny startdato"
                    minDate={GYLDIG_PERIODE.from}
                    maxDate={min([tomDate ? tomDate : GYLDIG_PERIODE.to, GYLDIG_PERIODE.to])}
                    defaultMonth={fomDate || new Date()}
                    validate={getDateValidator({
                        required: true,
                        max: tomDate || GYLDIG_PERIODE.to,
                    })}
                />
            ) : null}
            {visSluttdato ? (
                <FormikDatepicker
                    name="tom"
                    label="Ny sluttdato"
                    minDate={max([fomDate || GYLDIG_PERIODE.from, GYLDIG_PERIODE.from])}
                    maxDate={GYLDIG_PERIODE.to}
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
            <FormikYesOrNoQuestion
                name="deltakerInformert"
                legend={`Er ${deltakernavn} informert om endringen?`}
                validate={getRequiredFieldValidator()}
            />
            <Alert variant="info" inline={true}>
                Oppgaven vil bli merket med navnet ditt (<strong>{formaterNavn(veileder)}</strong>).
            </Alert>
            <HStack gap="4">
                <Button type="submit" loading={pending} variant="primary">
                    Lagre endring
                </Button>
                {onCancel ? (
                    <Button type="button" variant="secondary" onClick={onCancel}>
                        Avbryt
                    </Button>
                ) : null}
            </HStack>
        </VStack>
    );
};

export default PeriodeFormPart;
