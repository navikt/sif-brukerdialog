import { DateRange } from '@navikt/sif-common-formik-ds';

export interface TidsromSøknadsdata {
    søknadsperiode: DateRange;
    dagerMedPleie: Date[];
}
