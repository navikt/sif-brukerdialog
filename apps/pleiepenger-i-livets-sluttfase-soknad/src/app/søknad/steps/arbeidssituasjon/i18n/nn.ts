import { arbeidssituasjonMessages_nb } from './nb';

export const arbeidssituasjonMessages_nn: Record<keyof typeof arbeidssituasjonMessages_nb, string> = {
    'step.arbeidssituasjon.pageTitle': 'Arbeidssituasjon',
    'step.arbeidssituasjon.stepTitle': 'Arbeidssituasjon',
    'step.arbeidssituasjon.stepIndicatorLabel': 'Arbeidssituasjon',
    'step.arbeidssituasjon.nextButtonLabel': 'Fortset',

    'steg.arbeidssituasjon.tittel': 'Arbeidsgjevarar',

    'steg.arbeidssituasjon.veileder.1':
        'No treng me å vite litt om arbeidssituasjonen din og kor mykje du normalt jobbar når du ikkje har fråvær frå jobben din.',
    'steg.arbeidssituasjon.veileder.2':
        'Om du er arbeidstakar og er usikker på kva som er din normale arbeidstid, finn du svaret i arbeidskontrakta din. Eventuelt kan du spørje arbeidsgjevaren din.',
    'steg.arbeidssituasjon.veileder.medArbeidsgiver':
        'Nedanfor ser du {antall, plural, one {arbeidsgjevar} other {arbeidsgjevarar}} du er registrert tilsett hos i AA-registeret i perioden du søkjer om pleiepengar. For at me skal vere sikre på at opplysningane er riktige må du stadfeste om du er, eller har vore, tilsett der.',
    'steg.arbeidssituasjon.veileder.ingenArbeidsgiverFunnet':
        'Me har ikkje funne nokon arbeidsgjevarar registrert på deg i AA-registeret.',
    'steg.arbeidssituasjon.veileder.manglerDetArbeidsgiver':
        'Om du i nokon av dagane du søkjer for er, eller var, tilsett hos ein arbeidsgjevar som ikkje er vist her, må du be arbeidsgjevaren sende ein ny A-melding. Dette gjer dei enten via sitt eige løns- og personalsystem, eller gjennom Altinn.',
    'steg.arbeidssituasjon.info.tekst':
        'Om det manglar ein arbeidsgjevar her, må du be arbeidsgjevaren din sende ny A-melding, enten via løns- og personalsystemet eller gjennom Altinn.',
    'steg.arbeidssituasjon.ingenOpplysninger': 'Me har ikkje funne nokon arbeidsgjevar registrert på deg.',

    'steg.arbeidssituasjon.intro': 'Me har funne desse arbeidsforholda registrert på deg.',
    'steg.arbeidssituasjon.info.tittel': 'Manglar det eit arbeidsforhold her?',
    'steg.arbeidssituasjon.frilanser.tittel': 'Frilans',
    'steg.arbeidssituasjon.sn.tittel': 'Sjølvstendig næringsdrivande',
    'steg.arbeidssituasjon.verneplikt.tittel': 'Verneplikt',
    'steg.arbeidssituasjon.verneplikt.spm': 'Utøvde du verneplikt på tidspunktet du søkjer pleiepengar frå?',
    'steg.arbeidssituasjon.verneplikt.info.tittel': 'Kva tyder dette?',
    'steg.arbeidssituasjon.verneplikt.info.tekst':
        'Du skal svare ja på dette spørsmålet om du har utøvd verneplikt i minst 28 dagar på starttidspunktet for perioden du søkjer for, eller om perioden med verneplikt var meint å vare i minst 28 dagar.',

    'steg.arbeidssituasjon.opptjeningUtland.tittel': 'Jobba i eit anna EØS-land',
    'steg.arbeidssituasjon.opptjeningUtland.spm':
        'Har du jobba som arbeidstakar eller frilansar i eit anna EØS-land i løpet av dei 3 siste månadane før perioden du søkjer om?',
    'steg.arbeidssituasjon.opptjeningUtland.addLabel': 'Legg til jobb i eit anna EØS-land',
    'steg.arbeidssituasjon.opptjeningUtland.listTitle': 'Registrert jobb i eit anna EØS-land',
    'steg.arbeidssituasjon.opptjeningUtland.modalTitle': 'Jobb i EØS-land',

    'steg.arbeidssituasjon.utenlandskNæring.spm':
        'Har du jobba som sjølvstendig næringsdrivande i eit anna EØS-land i løpet av dei 3 siste åra før perioden du søkjer om?',
    'steg.arbeidssituasjon.utenlandskNæring.addLabel': 'Legg til næringsverksemd i eit anna EØS-land',
    'steg.arbeidssituasjon.utenlandskNæring.modalTitle': 'Verksemd',
    'steg.arbeidssituasjon.utenlandskNæring.listTitle': 'Næringsverksemd i eit anna EØS-land',

    'arbeidsforhold.part.jobber': 'jobbar',
    'arbeidsforhold.part.jobbet': 'jobba',
    'arbeidsforhold.part.hosArbeidsgiver': 'hos {navn}',
    'arbeidsforhold.part.som.ANSATT': 'hos {navn}',
    'arbeidsforhold.part.som.FRILANSER': 'som frilansar',
    'arbeidsforhold.part.som.SELVSTENDIG': 'som sjølvstendig næringsdrivande',

    'arbeidsforhold.ikkeAnsatt.info':
        'Når du ikkje er tilsett her lenger, må du be denne arbeidsgjevaren sende ein ny A-melding med sluttdato. Dette gjer dei anten via sitt eige løns- og personalsystem, eller via Altinn.',
    'arbeidsforhold.ikkeFrilansoppdragIPerioden.info': 'Informasjon når frilansoppdraget ikkje gjeld perioden',

    'arbeidsforhold.erAnsatt.spm': 'Stemmer det at du er tilsett hos {navn} i perioden du søkjer for?',
    'arbeidsforhold.harFrilansoppdrag.spm':
        'Stemmer det at du har eit frilansoppdrag hos {navn} i perioden du søkjer for?',
    'arbeidsforhold.sluttetFørSøknadsperiode.spm': 'Slutta du hos {navn} før {fraDato}?',
    'arbeidsforhold.avsluttet.info':
        'Sluttdato var innanfor perioden du søkjer om pleiepengar. Me treng difor å vite korleis normalarbeidstida di var hos {navn}',

    'arbeidsforhold.jobberNormaltTimer.spm':
        'Kor mange timar jobbar du normalt per veke hos {navn} når du ikkje har fråvær?',
    'arbeidsforhold.jobberNormaltTimer.avsluttet.spm': 'Kor mange timar jobba du normalt per veke hos {navn}?',
    'arbeidsforhold.utledet': 'timar i veka',
    'arbeidsforhold.timer.suffix': 'timar per veke',

    'arbeidsforhold.normalTimer.info.tittel': 'Kva tyder dette?',
    'arbeidsforhold.ansatt.normalTimer.info':
        'Om du er usikker på kor mange timar du jobbar per veke, finn du som regel svaret i arbeidskontrakten din. Du kan også spørje arbeidsgjevaren din.',
    'arbeidsforhold.frilanser.normalTimer.info':
        'Her skal du oppgje kor mange timar du normalt jobbar som frilansar når du ikkje har fråvær på grunn av til dømes pleiepengar.',
    'arbeidsforhold.selvstendig.normalTimer.info':
        'Her skal du oppgje kor mange timar du normalt jobbar som sjølvstendig næringsdrivande når du ikkje har fråvær på grunn av til dømes pleiepengar.',
    'arbeidsforhold.normalTimer.info.list.item.1':
        'Om du jobbar like mange timar kvar veke, er det desse timane du oppgjev.',
    'arbeidsforhold.normalTimer.info.list.item.2':
        'Om du jobbar turnus eller har ein annan varierande arbeidstid, legg du inn eit snitt per veke.',

    'arbeidsforhold.normalTimer.info.turnus.tittel': 'Korleis reknar eg ut eit snitt når eg jobbar turnus?',
    'arbeidsforhold.normalTimer.info.turnus.avsnitt.1':
        'Du reknar ut snittet ved å legge saman talet på timar du jobbar totalt i heile turnusperioden din, og deler det med talet på veker som turnusperioden din består av.',
    'arbeidsforhold.normalTimer.info.turnus.avsnitt.2': 'Døme:',
    'arbeidsforhold.normalTimer.info.turnus.avsnitt.3':
        'Du har ein turnus som går over 3 veker. Den første veka jobbar du 20 timar, den andre 40 timar og den tredje veka jobbar du 15 timar. Då legg du saman talet på timar du har jobba og deler med talet på veker i turnusperioden din.',
    'arbeidsforhold.normalTimer.info.turnus.avsnitt.4': 'Då blir reknestykket slik i dette dømet:',
    'arbeidsforhold.normalTimer.info.turnus.avsnitt.4a': '20 timar + 40 timar + 15 timar = 75 timar',
    'arbeidsforhold.normalTimer.info.turnus.avsnitt.4b':
        'Så deler du talet på timar med talet på veker i turnusperioden din: 75 / 3 = 25',
    'arbeidsforhold.normalTimer.info.turnus.avsnitt.5':
        'Du jobbar altså i snitt 25 timar per veke, og det er dette talet du oppgjev.',

    'arbeidsforhold.normalTimer.info.varierende.tittel': 'Korleis reknar eg ut eit snitt ved varierande arbeidstid?',
    'arbeidsforhold.normalTimer.info.varierende.avsnitt.1':
        'Du reknar ut eit snitt ved å leggje saman talet på timar du totalt har jobba dei siste 12 vekene og deler det med 12. Om du ikkje har jobba i 12 veker, reknar du ut snittet på same måte ved å bruke dei vekene du har jobba.',
    'arbeidsforhold.normalTimer.info.varierende.avsnitt.2': 'Døme når du har jobba dei siste 12 vekene:',
    'arbeidsforhold.normalTimer.info.varierende.avsnitt.3':
        'Dei siste 12 vekene har du jobba 250 timar. Då deler du talet på timar du har jobba med 12: 250 timar / 12 veker = 20,8',
    'arbeidsforhold.normalTimer.info.varierende.avsnitt.4':
        'Du jobbar altså i snitt 20,8 timar per veke, og det er dette talet du oppgjev.',
    'arbeidsforhold.normalTimer.info.varierende.avsnitt.5':
        'Slik reknar du ut eit snitt når du har jobba mindre enn 12 veker:',
    'arbeidsforhold.normalTimer.info.varierende.avsnitt.6':
        'Då deler du talet på timar med talet på veker du har jobba. Om du til dømes har jobba i 7 veker, så deler du talet på timar du har jobba med 7.',

    'arbeidsforhold.normalTimer.info.utbetalingFraNAV.tittel': 'Kva om eg får utbetaling frå Nav no?',
    'arbeidsforhold.normalTimer.info.utbetalingFraNAV.avsnitt.1':
        'Om du for dette arbeidsforholdet til dømes får foreldrepengar, sjukepengar eller anna frå Nav no, registrerer du det som var normalarbeidstida di før du byrja å få denne utbetalinga frå Nav.',
};
