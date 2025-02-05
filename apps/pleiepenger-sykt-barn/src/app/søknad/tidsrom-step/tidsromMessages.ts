const nb = {
    'step.tidsrom.søkerKunHelgedager.alert':
        'Du kan kun få utbetalt pleiepenger for hverdager. Det utbetales ikke pleiepenger for lørdag eller søndag selv om du har hatt fravær fra jobb for å pleie barn. Du kan derfor ikke søke pleiepenger kun for lørdag og/eller søndag.',
    'steg.tidsrom.veileder.utenlandsopphold':
        'Når du oppholder deg i et land utenfor EØS, kan du beholde pleiepengene i en begrenset periode på opptil 8 uker av en 12 måneder lang periode.',

    'step.tidsrom.pageTitle': 'Pleiepengesøknad - periode',
    'step.tidsrom.stepTitle': 'Perioden med pleiepenger',
    'step.tidsrom.stepIndicatorLabel': 'Periode',

    'steg.tidsrom.iUtlandetIPerioden.spm': 'Skal du reise til utlandet i perioden du søker for?',
    'steg.tidsrom.iUtlandetIPerioden.listTitle': 'Utenlandsopphold i perioden',
    'steg.tidsrom.iUtlandetIPerioden.modalTitle': 'Utenlandsopphold',
    'steg.tidsrom.iUtlandetIPerioden.addLabel': 'Legg til utenlandsopphold',

    'steg.tidsrom.ferieuttakIPerioden.spm': 'Skal du ha ferie i perioden du søker for?',
    'steg.tidsrom.ferieuttakIPerioden.listTitle': 'Ferie i perioden',
    'steg.tidsrom.ferieuttakIPerioden.modalTitle': 'Ferie',
    'steg.tidsrom.ferieuttakIPerioden.addLabel': 'Legg til ferie',

    'steg.tidsrom.hvilketTidsrom.spm': 'Hvilken periode søker du for?',
    'steg.tidsrom.hvilketTidsrom.fom': 'Fra og med',
    'steg.tidsrom.hvilketTidsrom.tom': 'Til og med',
    'steg.tidsrom.hvilketTidsrom.info.tittel': 'Søker du forlengelse?',
    'steg.tidsrom.hvilketTidsrom.info.1':
        'Når du søker forlengelse av pleiepengeperioden uten noe opphold, må du velge «fra og med»-datoen til dagen etter du fikk innvilget pleiepenger sist.',
    'steg.tidsrom.hvilketTidsrom.info.2': 'Eksempel:',
    'steg.tidsrom.hvilketTidsrom.info.3':
        'Du har innvilget pleiepenger fra 1.-15. januar. Du skal søke om forlengelse, og velger 16. januar som fra og med-dato.',

    'validation.periodeFra.dateHasNoValue': 'Du må fylle ut periodens fra-dato.',
    'validation.periodeFra.dateHasInvalidFormat':
        'Du må oppgi periodens fra-dato i et gyldig datoformat. Gyldig format er dd.mm.åååå.',
    'validation.periodeFra.fromDateIsAfterToDate':
        'Fra-datoen kan ikke være etter til-datoen. Skriv inn eller velg dato fra kalenderen.',
    'validation.periodeFra.dateIsBeforeMin':
        'Du kan ikke søke om pleiepenger for en periode som er lenger enn 3 år tilbake i tid.',
    'validation.periodeFra.dateIsBeforeMin.fødselsdato': 'Pleiepengeperioden kan ikke starte før barnet er født.',
    'validation.periodeFra.dateIsNotWeekday':
        'Periodens fra-dato må være en ukedag, det kan ikke være en lørdag eller søndag. Skriv inn eller velg dato fra kalenderen.',
    'validation.periodeTil.dateHasNoValue': 'Du må fylle ut periodens til-dato.',
    'validation.periodeTil.dateHasInvalidFormat':
        'Du må oppgi periodens til-dato i et gyldig datoformat. Gyldig format er dd.mm.åååå.',
    'validation.periodeTil.dateIsBeforeMin':
        'Du kan ikke søke om pleiepenger for en periode som er lenger enn 3 år tilbake i tid.',
    'validation.periodeTil.dateIsNotWeekday':
        'Periodens til-dato må være en ukedag, det kan ikke være en lørdag eller søndag. Skriv inn eller velg dato fra kalenderen.',
    'validation.periodeTil.dateIsAfterMax':
        'Du kan kun søke pleiepenger for opptil ett år av gangen, og ett år frem i tid.',
    'validation.periodeTil.toDateIsBeforeFromDate':
        'Til-datoen kan ikke være før fra-datoen. Skriv inn eller velg dato fra kalenderen.',
    'validation.skalOppholdeSegIUtlandetIPerioden.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du skal reise til utlandet i perioden du søker for.',
    'validation.utenlandsoppholdIPerioden.utenlandsopphold_ikke_registrert':
        'Du har svart ja til at du skal til utlandet i perioden med pleiepenger. Legg til minst ett utenlandsopphold.',
    'validation.utenlandsoppholdIPerioden.utenlandsopphold_overlapper':
        'Du har lagt inn utenlandsopphold med datoer som overlapper hverandre.',
    'validation.utenlandsoppholdIPerioden.utenlandsopphold_utenfor_periode':
        'Du har lagt inn utenlandsopphold som er utenfor søknadsperioden.',
    'validation.utenlandsoppholdIPerioden.utenlandsopphold_overlapper_samme_start_slutt':
        'Et utenlandsopphold kan ikke starte samme dag som et annet avsluttes.',
    'validation.ferieuttakIPerioden.ferieuttak_ikke_registrert':
        'Du har svart ja til at du skal ha ferie i perioden med pleiepenger. Legg til minst ett ferieuttak.',
    'validation.ferieuttakIPerioden.ferieuttak_utenfor_periode':
        'Du har lagt inn ferie som er utenfor søknadsperioden.',
    'validation.ferieuttakIPerioden.ferieuttak_overlapper': 'Du har lagt inn ferier som overlapper hverandre.',
    'validation.skalTaUtFerieIPerioden.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du skal ha ferie i perioden du søker for.',
};

const nn: Record<keyof typeof nb, string> = {
    'step.tidsrom.søkerKunHelgedager.alert':
        'Du kan berre få utbetalt pleiepengar for vekedagar. Det blir ikkje utbetalt pleiepengar for laurdag eller sundag sjølv om du har hatt fråvær frå jobb for å pleie barn. Du kan difor ikkje søkje pleiepengar berre for laurdag og/eller sundag.',
    'steg.tidsrom.veileder.utenlandsopphold':
        'Når du oppheld deg i eit land utanfor EØS, kan du behalde pleiepengane i ein avgrensa periode på opptil 8 veker av ein 12 månaders periode.',

    'step.tidsrom.pageTitle': 'Pleiepengesøknad - periode',
    'step.tidsrom.stepTitle': 'Perioden med pleiepengar',
    'step.tidsrom.stepIndicatorLabel': 'Periode',

    'steg.tidsrom.iUtlandetIPerioden.spm': 'Skal du reise til utlandet i perioden du søkjer for?',
    'steg.tidsrom.iUtlandetIPerioden.listTitle': 'Utlandsopphald i perioden',
    'steg.tidsrom.iUtlandetIPerioden.modalTitle': 'Utlandsopphald',
    'steg.tidsrom.iUtlandetIPerioden.addLabel': 'Legg til utlandsopphald',

    'steg.tidsrom.ferieuttakIPerioden.spm': 'Skal du ha ferie i perioden du søkjer for?',
    'steg.tidsrom.ferieuttakIPerioden.listTitle': 'Ferie i perioden',
    'steg.tidsrom.ferieuttakIPerioden.modalTitle': 'Ferie',
    'steg.tidsrom.ferieuttakIPerioden.addLabel': 'Legg til ferie',

    'steg.tidsrom.hvilketTidsrom.spm': 'Kva for ein periode søkjer du for?',
    'steg.tidsrom.hvilketTidsrom.fom': 'Frå og med',
    'steg.tidsrom.hvilketTidsrom.tom': 'Til og med',
    'steg.tidsrom.hvilketTidsrom.info.tittel': 'Søkjer du forlenging?',
    'steg.tidsrom.hvilketTidsrom.info.1':
        'Når du søkjer forlenging av pleiepengeperioden utan opphald, må du velje «frå og med»-datoen til dagen etter du fekk innvilga pleiepengar sist.',
    'steg.tidsrom.hvilketTidsrom.info.2': 'Døme:',
    'steg.tidsrom.hvilketTidsrom.info.3':
        'Du har innvilga pleiepengar frå 1.-15. januar. Du skal søkje om forlenging og vel 16. januar som frå og med-dato.',

    'validation.periodeFra.dateHasNoValue': 'Du må fylle ut frå-datoen for perioden.',
    'validation.periodeFra.dateHasInvalidFormat':
        'Du må oppgi frå-datoen i eit gyldig datoformat. Gyldig format er dd.mm.åååå.',
    'validation.periodeFra.fromDateIsAfterToDate':
        'Frå-datoen kan ikkje vere etter til-datoen. Skriv inn eller vel dato frå kalenderen.',
    'validation.periodeFra.dateIsBeforeMin':
        'Du kan ikkje søkje om pleiepengar for ein periode som er meir enn 3 år tilbake i tid.',
    'validation.periodeFra.dateIsBeforeMin.fødselsdato': 'Pleiepengeperioden kan ikkje starte før barnet er fødd.',
    'validation.periodeFra.dateIsNotWeekday':
        'Frå-datoen må vere ein vekedag, det kan ikkje vere ein laurdag eller sundag. Skriv inn eller vel dato frå kalenderen.',
    'validation.periodeTil.dateHasNoValue': 'Du må fylle ut til-datoen for perioden.',
    'validation.periodeTil.dateHasInvalidFormat':
        'Du må oppgi til-datoen i eit gyldig datoformat. Gyldig format er dd.mm.åååå.',
    'validation.periodeTil.dateIsBeforeMin':
        'Du kan ikkje søkje om pleiepengar for ein periode som er meir enn 3 år tilbake i tid.',
    'validation.periodeTil.dateIsNotWeekday':
        'Til-datoen må vere ein vekedag, det kan ikkje vere ein laurdag eller sundag. Skriv inn eller vel dato frå kalenderen.',
    'validation.periodeTil.dateIsAfterMax':
        'Du kan berre søkje pleiepengar for opptil eitt år av gangen, og eitt år fram i tid.',
    'validation.periodeTil.toDateIsBeforeFromDate':
        'Til-datoen kan ikkje vere før frå-datoen. Skriv inn eller vel dato frå kalenderen.',
    'validation.skalOppholdeSegIUtlandetIPerioden.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du skal reise til utlandet i perioden du søkjer for.',
    'validation.utenlandsoppholdIPerioden.utenlandsopphold_ikke_registrert':
        'Du har svart ja på at du skal til utlandet i perioden med pleiepengar. Legg til minst eitt utlandsopphald.',
    'validation.utenlandsoppholdIPerioden.utenlandsopphold_overlapper':
        'Du har lagt inn utlandsopphald med datoar som overlappar kvarandre.',
    'validation.utenlandsoppholdIPerioden.utenlandsopphold_utenfor_periode':
        'Du har lagt inn utlandsopphald som er utanfor søknadsperioden.',
    'validation.utenlandsoppholdIPerioden.utenlandsopphold_overlapper_samme_start_slutt':
        'Eit utlandsopphald kan ikkje starte same dag som eit anna avsluttast.',
    'validation.ferieuttakIPerioden.ferieuttak_ikke_registrert':
        'Du har svart ja på at du skal ha ferie i perioden med pleiepengar. Legg til minst eitt ferieuttak.',
    'validation.ferieuttakIPerioden.ferieuttak_utenfor_periode':
        'Du har lagt inn ferie som er utanfor søknadsperioden.',
    'validation.ferieuttakIPerioden.ferieuttak_overlapper': 'Du har lagt inn feriar som overlappar kvarandre.',
    'validation.skalTaUtFerieIPerioden.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du skal ha ferie i perioden du søkjer for.',
};

export const tidsromMessages = {
    nb,
    nn,
};
