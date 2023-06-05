import { TestType } from './types/TestTyper';
import { fyllUtArbeidIPeriodeSteg } from './steps/arbeid-i-periode/arbeidIPeriode';
import { fyllUtArbeidssituasjonSteg } from './steps/arbeidssituasjon/arbeidssituasjon';
import { fyllUtLegeerklæringSteg } from './steps/legeerklæring';
import { fyllUtMedlemskapSteg } from './steps/medlemskap';
import { fyllUtNattevåkOgBeredskapSteg } from './steps/nattevåkOgBeredskap';
import { fyllUtOmsorgstilbudSteg } from './steps/omsorgstilbud';
import { fyllUtOmBarnSteg } from './steps/opplysningerOmBarnet';
import { fyllUtPeriodeSteg } from './steps/periode';
import { fyllUtVelkommenSide } from './steps/velkommenside';

export const fyllUtEnkelSøknad = () => {
    fyllUtVelkommenSide();
    fyllUtOmBarnSteg();
    fyllUtPeriodeSteg();
    fyllUtArbeidssituasjonSteg();
    fyllUtArbeidIPeriodeSteg();
    fyllUtOmsorgstilbudSteg(); // Avhenger av perioden !!!
    fyllUtMedlemskapSteg();
    fyllUtLegeerklæringSteg();
};

export const fyllUtKomplettSøknad = () => {
    fyllUtVelkommenSide();
    fyllUtOmBarnSteg(TestType.KOMPLETT);
    fyllUtPeriodeSteg(TestType.KOMPLETT);
    fyllUtArbeidssituasjonSteg(TestType.KOMPLETT);
    fyllUtArbeidIPeriodeSteg();
    fyllUtOmsorgstilbudSteg(TestType.KOMPLETT); // Avhenger av peroden !!!
    fyllUtNattevåkOgBeredskapSteg(TestType.KOMPLETT);
    fyllUtMedlemskapSteg(TestType.KOMPLETT);
    fyllUtLegeerklæringSteg(TestType.KOMPLETT);
};
