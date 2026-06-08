import { DateRange } from '@navikt/sif-common-formik-ds';

import { EnkeltdagEllerPeriode } from '../../søknad/steps/kurs/KursStepForm';
import { Kursdag } from '../Kursdag';
import { Kursperiode } from '../Kursperiode';
import { FerieuttakIPeriodenSøknadsdata } from './FerieuttakIPeriodenSøknadsdata';
import { ReisedagerSøknadsdata } from './ReisedagerSøknadsdata';
import { UtenlandsoppholdIPeriodenSøknadsdata } from './UtenlandsoppholdSøknadsdata';

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
