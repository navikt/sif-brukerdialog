import { DateRange } from '@navikt/sif-common-formik-ds';
import { Kursperiode } from '../Kursperiode';
import { FerieuttakIPeriodenSøknadsdata } from './FerieuttakIPeriodenSøknadsdata';
import { ReisedagerSøknadsdata } from './ReisedagerSøknadsdata';
import { UtenlandsoppholdIPeriodenSøknadsdata } from './UtenlandsoppholdSøknadsdata';

export interface KursSøknadsdata {
    søknadsperiode: DateRange;
    søknadsdatoer: Date[];
    reisedager: ReisedagerSøknadsdata;
    kursholder: string;
    kursperioder: Kursperiode[];
    ferieuttakIPerioden?: FerieuttakIPeriodenSøknadsdata;
    utenlandsopphold?: UtenlandsoppholdIPeriodenSøknadsdata;
}
