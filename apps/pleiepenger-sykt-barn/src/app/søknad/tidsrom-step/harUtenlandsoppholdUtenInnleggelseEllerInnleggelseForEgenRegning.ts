import {
    UtenlandsoppholdUtvidet,
    UtenlandsoppholdÅrsak,
} from '@navikt/sif-common-forms-ds/src/forms/utenlandsopphold/types';

const erOppholdMedInnlagtBarnForEgenRegning = (opphold: UtenlandsoppholdUtvidet): boolean =>
    opphold.type === 'utenfor_eøs' && opphold.erBarnetInnlagt === true && opphold.årsak === UtenlandsoppholdÅrsak.ANNET;

const erOppholdUtenInnlagtBarn = (opphold: UtenlandsoppholdUtvidet): boolean =>
    opphold.type === 'utenfor_eøs' && opphold.erBarnetInnlagt === true;

const harUtenlandsoppholdUtenInnleggelseEllerInnleggeleForEgenRegning = (
    utenlandsopphold: UtenlandsoppholdUtvidet[],
): boolean => {
    return (
        utenlandsopphold.filter(
            (opphold) => erOppholdMedInnlagtBarnForEgenRegning(opphold) || erOppholdUtenInnlagtBarn(opphold),
        ).length > 0
    );
};

export default harUtenlandsoppholdUtenInnleggelseEllerInnleggeleForEgenRegning;
