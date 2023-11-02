import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import { Utenlandsopphold } from '@navikt/sif-common-forms-ds/lib';

interface BaseTidsrom {
    søknadsperiode: DateRange;
    dagerMedPleie: Date[];
    pleierDuDenSykeHjemme: boolean;
    skalJobbeOgPleieSammeDag: boolean;
}

interface TidsromUtenUtenlandsopphold extends BaseTidsrom {
    type: 'tidsromUtenUtenlandsopphold';
    skalOppholdeSegIUtlandetIPerioden: false;
}

interface tidsromMedUtenlandsopphold extends BaseTidsrom {
    type: 'tidsromMedUtenlandsopphold';
    skalOppholdeSegIUtlandetIPerioden: true;
    utenlandsoppholdIPerioden: Utenlandsopphold[];
}

export type TidsromSøknadsdata = TidsromUtenUtenlandsopphold | tidsromMedUtenlandsopphold;
