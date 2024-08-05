const nb = {
    'steg.omOmsorgenForBarn.dineBarn.seksjonsTittel': 'Dine barn',

    'steg.omOmsorgenForBarn.info.spm.andreBarn': 'Har du barn som ikke er registrert her?',
    'steg.omOmsorgenForBarn.info.spm.flereBarn': 'Har du flere barn som ikke er registrert her?',
    'steg.omOmsorgenForBarn.info.spm.text':
        'Hvis du har barn som ikke er registrert her, kan du legge inn disse selv. Det kan for eksempel være fosterbarn.',

    'steg.omOmsorgenForBarn.annetBarnListAndDialog.addLabel': 'Legg til barn',
    'steg.omOmsorgenForBarn.annetBarnListAndDialog.listTitle': 'Barn du har lagt til',
    'steg.omOmsorgenForBarn.annetBarnListAndDialog.modalTitle': 'Legg til barn',
    'steg.omOmsorgenForBarn.formLeggTilBarn.aldersGrenseInfo':
        '(Du kan ikke legge til barn som er 19 år i år eller eldre)',

    'steg.omOmsorgenForBarn.aleneomsorg.seksjonsTittel': 'Aleneomsorg',
    'steg.omOmsorgenForBarn.form.spm.hvilkeAvBarnaAleneomsorg': 'Kryss av for barn du er alene om omsorgen for:',

    'steg.omOmsorgenForBarn.deltBosted.seksjonsTittel': 'Delt fast bosted',
    'steg.omOmsorgenForBarn.deltBosted.spm': 'Har du avtale om delt fast bosted for barnet?',
    'steg.omOmsorgenForBarn.deltBosted.flereBarn.spm': 'Har du avtale om delt fast bosted for noen av barna?',
    'steg.omOmsorgenForBarn.deltBosted.description.tittel': 'Hva er avtale om delt fast bosted?',
    'steg.omOmsorgenForBarn.deltBosted.description':
        'Avtale om delt fast bosted er en juridisk avtale i henhold til barneloven §36 og betyr at barnet har fast bosted hos begge foreldrene. Hvis det er avtalt delt fast bosted er ingen av foreldrene alene om omsorgen for barnet, men begge har rett til ordinære omsorgsdager.',
    'steg.omOmsorgenForBarna.deltBosted.velgMinstEttBarnMedDeltBostedAdvarsel':
        'Du må ha aleneomsorg for minst ett barn for å kunne svare på hvilke(t) barn man har avtale om delt fast bosted for.',

    'steg.omOmsorgenForBarn.form.født': 'Født {dato}',
    'steg.omOmsorgenForBarn.form.fødtNavn': 'Født {dato} {navn}',

    'steg.omOmsorgenForBarn.alleBarnMedDeltBosted':
        'Du kan kun søke for barn du er alene med omsorgen for, og ikke har avtale om delt fast bosted for. Hvis du og den andre forelderen har en avtale om delt fast bosted, bor barnet fast hos dere begge. I disse tilfellene kan ingen av dere få ekstra dager på grunn av aleneomsorg, men dere har begge rett til ordinære omsorgsdager.',
    'steg.omOmsorgenForBarn.ingenbarn': 'Du må ha minst ett barn for å kunne gå videre.',
    'steg.omOmsorgenForBarn.nextButtonLabel': 'Fortsett',

    'validation.avtaleOmDeltBosted.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om har du avtale om delt fast bosted.',
    'validation.harAvtaleOmDeltBostedFor.listIsEmpty':
        'Du må krysse av for barn du har delt fast bosted for eller svare «Nei» på spørsmålet ovenfor.',
    'validation.harAleneomsorgFor.listIsEmpty': 'Du må krysse av for barn du er alene om omsorgen for.',
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
};

export const omOmsorgenForBarnMessages = { nb, nn };
