import { DateRange } from '@navikt/sif-common-formik-ds';
import { Opplæringsinstitusjon } from '../Opplæringsinstitusjon';
import { Kursperiode } from '../Kursperiode';

export const INKLUDER_REISEDAGER_I_PERIODE = true;

export interface KursSøknadsdata {
    søknadsperiode: DateRange;
    søknadsdatoer: Date[];
    kursholder: Opplæringsinstitusjon | 'annen';
    kursperioder: Kursperiode[];
    arbeiderIKursperiode: boolean;
}
