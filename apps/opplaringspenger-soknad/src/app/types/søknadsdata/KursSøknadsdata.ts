import { DateRange } from '@navikt/sif-common-formik-ds';
import { Kursperiode } from '../Kursperiode';
import { FerieuttakIPeriodenSøknadsdata } from './FerieuttakIPeriodenSøknadsdata';
import { ReisedagerSøknadsdata } from './ReisedagerSøknadsdata';

export type Opplæringsinstitusjon =
    | {
          uuid: string;
          navn: string;
      }
    | {
          navn: string;
      };

export type KursSøknadsdata = {
    søknadsperiode: DateRange;
    søknadsdatoer: Date[];
    reisedager: ReisedagerSøknadsdata;
    opplæringsinstitusjon: Opplæringsinstitusjon;
    kursperioder: Kursperiode[];
    ferieuttakIPerioden?: FerieuttakIPeriodenSøknadsdata;
};
