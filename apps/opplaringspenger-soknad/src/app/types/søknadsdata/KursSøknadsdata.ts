import { DateRange } from '@navikt/sif-common-formik-ds';
import { Kursperiode } from '../Kursperiode';
import { FerieuttakIPeriodenSøknadsdata } from './FerieuttakIPeriodenSøknadsdata';
import { ReisedagerSøknadsdata } from './ReisedagerSøknadsdata';
import { UtenlandsoppholdIPeriodenSøknadsdata } from './UtenlandsoppholdSøknadsdata';
import { Kursdag } from '../Kursdag';
import { EnkeltdagEllerPeriode } from '../../søknad/steps/kurs/KursStep';

export interface KursSøknadsdata {
    søknadsperiode: DateRange;
    søknadsdatoer: Date[];
    reisedager?: ReisedagerSøknadsdata;
    kursholder: string;
    enkeltdagEllerPeriode: EnkeltdagEllerPeriode;
    kursperioder: Kursperiode[];
    kursdager: Kursdag[];
    ferieuttakIPerioden?: FerieuttakIPeriodenSøknadsdata;
    utenlandsopphold?: UtenlandsoppholdIPeriodenSøknadsdata;
}
