import { Button, HStack, VStack } from '@navikt/ds-react';
import { FormikDatepicker, FormikYesOrNoQuestion } from '@navikt/sif-common-formik-ds';
import { getDateValidator, getRequiredFieldValidator } from '@navikt/sif-validation';
import { max, min } from 'date-fns';
import { GYLDIG_PERIODE } from '../../settings';

interface Props {
    deltakernavn: string;
    visStartdato?: boolean;
    visSluttdato?: boolean;
    tomDate?: Date;
    fomDate?: Date;
    pending?: boolean;
    onCancel?: () => void;
}

const PeriodeFormPart = ({
    deltakernavn,
    fomDate,
    tomDate,
    visStartdato = true,
    visSluttdato = true,
    pending,
    onCancel,
}: Props) => {
    return (
        <VStack gap="8" className="rounded-xs">
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
            <FormikYesOrNoQuestion
                name="deltakerInformert"
                legend={`Er ${deltakernavn} informert om endringen?`}
                validate={getRequiredFieldValidator()}
            />
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
