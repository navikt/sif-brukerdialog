import { HStack } from '@navikt/ds-react';
import { FormikDatepicker } from '@navikt/sif-common-formik-ds';
import { GYLDIG_PERIODE } from '../../settings';
import { getDateValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { max, min } from 'date-fns';
import { Deltakelse } from '../../api/types';
import { DateRange } from '@navikt/sif-common-utils';

interface Props {
    tomDate?: Date;
    fomDate?: Date;
    deltakelser: Deltakelse[];
    deltakelseId?: string;
}

const PeriodeFormPart = ({ fomDate, tomDate, deltakelser = [], deltakelseId }: Props) => {
    const periodeSomIkkeKanVelges: DateRange[] = deltakelser
        .filter((d) => d.id !== deltakelseId && d.tilOgMed !== undefined)
        .map((d) => ({ from: d.fraOgMed, to: d.tilOgMed! }));
    return (
        <HStack gap="6">
            <FormikDatepicker
                name="fom"
                label="Fra og med"
                description="Pga status på appen nå, kreves fra og med, selv om en kun skal sende inn til og med"
                minDate={GYLDIG_PERIODE.from}
                maxDate={min([tomDate ? tomDate : GYLDIG_PERIODE.to, GYLDIG_PERIODE.to])}
                defaultMonth={fomDate || new Date()}
                disabledDateRanges={periodeSomIkkeKanVelges}
                validate={getDateValidator({
                    required: true,
                    max: tomDate || GYLDIG_PERIODE.to,
                })}
            />
            <FormikDatepicker
                name="tom"
                label="Til og med"
                minDate={max([fomDate || GYLDIG_PERIODE.from, GYLDIG_PERIODE.from])}
                maxDate={GYLDIG_PERIODE.to}
                disabledDateRanges={periodeSomIkkeKanVelges}
                defaultMonth={tomDate || fomDate || new Date()}
                validate={getDateValidator({
                    min: fomDate || GYLDIG_PERIODE.from,
                })}
            />
        </HStack>
    );
};

export default PeriodeFormPart;
