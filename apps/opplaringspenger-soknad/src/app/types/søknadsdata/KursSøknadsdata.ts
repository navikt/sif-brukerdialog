import { DateRange } from '@navikt/sif-common-formik-ds';
import { Kursholder } from '../Kursholder';
import { Kursperiode } from '../Kursperiode';

export const INKLUDER_REISEDAGER_I_PERIODE = true;

export interface KursSøknadsdata {
    søknadsperiode: DateRange;
    søknadsdatoer: Date[];
    kursholder: Kursholder | 'annen';
    kursperioder: Kursperiode[];
    arbeiderIKursperiode: boolean;
}
