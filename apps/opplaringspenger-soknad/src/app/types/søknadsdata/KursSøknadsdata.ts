import { DateRange } from '@navikt/sif-common-formik-ds';
import { Kursperiode } from '../Kursperiode';
import { FerieuttakIPeriodenSøknadsdata } from './FerieuttakIPeriodenSøknadsdata';

export interface KursSøknadsdata {
    søknadsperiode: DateRange;
    søknadsdatoer: Date[];
    kursholder: string;
    kursperioder: Kursperiode[];
    ferieuttakIPerioden?: FerieuttakIPeriodenSøknadsdata;
}
