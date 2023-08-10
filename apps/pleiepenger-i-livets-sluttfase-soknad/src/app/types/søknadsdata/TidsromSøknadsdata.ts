import { Ferieuttak, Utenlandsopphold } from '@navikt/sif-common-forms-ds/lib';
import { YesOrNoDontKnow } from '../YesOrNoDontKnow';

interface BaseTidsrom {
    periodeFra: string;
    periodeTil: string;
    flereSokere: YesOrNoDontKnow;
}

interface TidsromUtenUtenlandsoppholdUtenFerie extends BaseTidsrom {
    type: 'tidsromUtenUtenlandsoppholdUtenFerie';
    skalOppholdeSegIUtlandetIPerioden: false;
    skalTaUtFerieIPerioden: false;
}

interface TidsromKunMedUtenlandsopphold extends BaseTidsrom {
    type: 'tidsromKunMedUtenlandsopphold';
    skalOppholdeSegIUtlandetIPerioden: true;
    utenlandsoppholdIPerioden: Utenlandsopphold[];
    skalTaUtFerieIPerioden: false;
}

interface TidsromKunMedFerie extends BaseTidsrom {
    type: 'tidsromKunMedFerie';
    skalOppholdeSegIUtlandetIPerioden: false;
    skalTaUtFerieIPerioden: true;
    ferieuttakIPerioden: Ferieuttak[];
}

interface TidsromMedUtenlandsoppholdMedFerie extends BaseTidsrom {
    type: 'tidsromMedUtenlandsoppholdMedFerie';
    skalOppholdeSegIUtlandetIPerioden: true;
    utenlandsoppholdIPerioden: Utenlandsopphold[];
    skalTaUtFerieIPerioden: true;
    ferieuttakIPerioden: Ferieuttak[];
}

export type TidsromSøknadsdata =
    | TidsromUtenUtenlandsoppholdUtenFerie
    | TidsromKunMedUtenlandsopphold
    | TidsromKunMedFerie
    | TidsromMedUtenlandsoppholdMedFerie;
