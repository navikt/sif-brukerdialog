const nb = {
    'step.dineBarn.nextButtonLabel': 'Fortsett',
    'step.dineBarn.intro.tekst':
        'Vi må vite hvor mange barn du har, for å vurdere hvor mange omsorgsdager du har rett til.',

    'step.dineBarn.seksjonsTittel': 'Dine barn',
    'step.dineBarn.registrerteBarn.tekst': 'Barn vi har funnet på deg i folkeregisteret.',
    'step.dineBarn.registrerteBarn.ingenFunnet': 'Vi fant ikke noen barn registrert på deg.',
    'step.dineBarn.født': 'Født {dato}',

    'step.dineBarn.andreBarn.heading': 'Andre barn',
    'step.dineBarn.annetBarnListAndDialog.addLabel': 'Legg til barn',
    'step.dineBarn.annetBarnListAndDialog.listTitle': 'Har du barn som ikke er registrert her?',
    'step.dineBarn.annetBarnListAndDialog.listTitle.ingenRegistrerteBarn': 'Har du andre barn?',
    'step.dineBarn.annetBarnListAndDialog.modalTitle': 'Legg til barn',

    'step.dineBarn.harDeltBosted.spm': 'Er det avtalt delt fast bosted for noen av barna dine?  ',
    'step.dineBarn.harDeltBosted.info.tittel': 'Hva er delt fast bosted?',
    'step.dineBarn.harDeltBosted.info.tekst':
        'Hvis foreldrene til barnet ikke bor sammen, kan de inngå en avtale om delt fast bosted etter barneloven §36. Barnet bor da fast med begge sine foreldre.',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const dineBarnMessages = { nb, nn };
