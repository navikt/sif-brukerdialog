import { DateRange } from '@navikt/sif-common-formik-ds';
import { Kursperiode } from '../Kursperiode';
import { Ferieuttak } from '@navikt/sif-common-forms-ds/src';

export const INKLUDER_REISEDAGER_I_PERIODE = true;

export interface KursSøknadsdata {
    søknadsperiode: DateRange;
    søknadsdatoer: Date[];
    kursholder: string;
    kursperioder: Kursperiode[];
    arbeiderIKursperiode: boolean;
    harFerieIPerioden: boolean;
    ferieuttak?: Ferieuttak[];
}
