import { tidsromMessages_nb } from './nb';

export const tidsromMessages_nn: Record<keyof typeof tidsromMessages_nb, string> = {
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
