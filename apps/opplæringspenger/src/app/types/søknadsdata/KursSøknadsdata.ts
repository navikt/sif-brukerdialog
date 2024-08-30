import { DateRange } from '@navikt/sif-common-formik-ds';
import { Kursholder } from '../Kursholder';
import { Kursperiode } from '../Kursperiode';

export interface KursSøknadsdata {
    søknadsperiode?: DateRange;
    kursholder: Kursholder | 'annen';
    kursperioder: Kursperiode[];
}
