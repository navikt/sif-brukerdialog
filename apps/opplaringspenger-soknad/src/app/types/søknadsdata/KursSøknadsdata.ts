import { DateRange } from '@navikt/sif-common-formik-ds';
import { Kursperiode } from '../Kursperiode';
import { FerieuttakIPeriodenSøknadsdata } from './FerieuttakIPeriodenSøknadsdata';

export const INKLUDER_REISEDAGER_I_PERIODE = true;

export interface KursSøknadsdata {
    søknadsperiode: DateRange;
    søknadsdatoer: Date[];
    kursholder: string;
    kursperioder: Kursperiode[];
    arbeiderIKursperiode: boolean;
    ferieuttakIPerioden?: FerieuttakIPeriodenSøknadsdata;
}
