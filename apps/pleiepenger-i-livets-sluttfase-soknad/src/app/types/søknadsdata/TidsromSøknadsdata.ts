import { DateRange } from '@navikt/sif-common-formik-ds';
import { UtenlandsoppholdEnkel } from '@navikt/sif-common-forms-ds';

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
    utenlandsoppholdIPerioden: UtenlandsoppholdEnkel[];
}

export type TidsromSøknadsdata = TidsromUtenUtenlandsopphold | tidsromMedUtenlandsopphold;
