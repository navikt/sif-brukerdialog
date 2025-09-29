/* eslint-disable max-len */
import { arbeidssituasjonMessages_nb } from './nb';

export const arbeidssituasjonMessages_nn: Record<keyof typeof arbeidssituasjonMessages_nb, string> = {
    'step.arbeidssituasjon.pageTitle': 'Pleiepengesøknad - opplysninger om din arbeidssituasjon',
    'step.arbeidssituasjon.stepTitle': 'Arbeidssituasjonen din',
    'step.arbeidssituasjon.stepIndicatorLabel': 'Om din arbeidssituasjon',

    'steg.arbeidssituasjon.tittel': 'Arbeidsgjevarar',
    'steg.arbeidssituasjon.veileder.1':
        'No treng me å vite litt om arbeidssituasjonen din, og kor mykje du normalt jobbar. Med «normalt» meiner me kor mykje du jobbar når du ikkje har fråvær på grunn av pleiepengar eller anna.',
    'steg.arbeidssituasjon.veileder.2':
        'Det er normalarbeidstida din <strong>før</strong> du startar med pleiepengar som me er ute etter her, uavhengig av om du søkjer for fyrste gong, eller om du søkjer forlenging.',
    'steg.arbeidssituasjon.veileder.3':
        'Viss du mottar yting frå Nav (til dømes foreldrepengar eller sjukepengar) opplyser du om det som var din normale arbeidstid før du starta å motta ytinga.',
    'steg.arbeidssituasjon.veileder.medArbeidsgiver':
        'Nedanfor ser du {antall, plural, one {arbeidsgjevaren} other {arbeidsgjevarar}} du er registrert tilsett hos i AA-registeret i perioden du søkjer om pleiepengar. For at vi skal vere sikre på at opplysningane er riktige, må du stadfeste om du er, eller har vore, tilsett der.',
    'steg.arbeidssituasjon.veileder.ingenArbeidsgiverFunnet':
        'Me har ikkje funne nokon arbeidsgjevarar registrert på deg i AA-registeret.',
    'steg.arbeidssituasjon.veileder.manglerDetArbeidsgiver.tittel': 'Har du arbeidsforhold som ikkje viser?',
    'steg.arbeidssituasjon.veileder.manglerDetArbeidsgiver':
        'Viss du i perioden du søkjer for er, eller var, tilsett hos ein arbeidsgjevar som ikkje visast her, må du be arbeidsgjevaren om å sende ei ny A-melding. Det gjer dei anten via eige løns- og personalsystem, eller via Altinn.',

    'steg.arbeidssituasjon.omsorgsstønad.mottarOmsorgsstønad.spm': 'Mottar du omsorgsstønad frå kommuna?',
    'steg.arbeidssituasjon.omsorgsstønad.mottarOmsorgsstønad.spm.description.tittel': 'Kva tyder dette?',
    'steg.arbeidssituasjon.omsorgsstønad.mottarOmsorgsstønad.spm.description':
        'Omsorgsstønad blir rekna som frilansinntekt, og kan påverke kor mykje du får i pleiepengar.',
    'steg.arbeidssituasjon.omsorgsstønad.antallTimer.spm': 'Kor mange timar i veka har du vedtak om omsorgsstønad?',
    'steg.arbeidssituasjon.omsorgsstønad.antallTimer.info.tittel': 'Kva tyder dette?',
    'steg.arbeidssituasjon.omsorgsstønad.antallTimer.info.tekst':
        'Når kommuna godkjenner søknaden din, reknar dei ut omsorgsstønaden ut frå kor mange timar med omsorgsarbeid stønaden skal dekkje. Du finn vanlegvis timeantalet i vedtaket om omsorgsstønad. Er du usikker, må du avklare dette med kommuna. Om vedtaket oppgjev timar per månad, deler du timeantalet med fire for å få timar per veke.',
    'steg.arbeidssituasjon.omsorgsstønad.mottarOmsorgsstønadIHelePerioden.spm':
        'Mottar du denne omsorgsstønaden gjennom heile perioden du søkjer om?',
    'steg.arbeidssituasjon.omsorgsstønad.starterUndeveis.spm':
        'Startar omsorgsstønaden undervegs i pleiepengeperioden?',
    'steg.arbeidssituasjon.omsorgsstønad.starterUndeveis.startdato': 'Startdato:',
    'steg.arbeidssituasjon.omsorgsstønad.slutterUndeveis.spm':
        'Stoppar omsorgsstønaden undervegs i pleiepengeperioden?',
    'steg.arbeidssituasjon.omsorgsstønad.starterUndeveis.sluttdato': 'Sluttdato:',

    'steg.arbeidssituasjon.frilanser.tittel': 'Frilans og oppdrag som blir rekna som frilansoppdrag',
    'steg.arbeidssituasjon.sn.tittel': 'Sjølvstendig næringsdrivande',

    'steg.arbeidssituasjon.arbeidssituasjonFrilanser.intro':
        'I tillegg til å jobbe som frilansar, er det andre oppdrag som blir rekna som frilansoppdrag. Les mer om kva frilansoppdrag som ein må oppgje i denne søknaden:',
    'steg.arbeidssituasjon.arbeidssituasjonFrilanser.intro.info.tittel':
        'Om frilans, honorar, fosterheimsgodtgjersle og omsorgsstønad',
    'steg.arbeidssituasjon.arbeidssituasjonFrilanser.intro.info.tekst.1':
        'Du er frilansar når du mottar løn som ein vanleg tilsett, <strong>uten</strong> å vere tilsett hos den du utfører arbeidet for. Som frilansar betaler du skatt på same måte som ein arbeidstakar, og leverar skattemelding som arbeidstakar.',
    'steg.arbeidssituasjon.arbeidssituasjonFrilanser.intro.info.tekst.2':
        'Du blir òg rekna som frilansar når du mottar <strong>honorar</strong>for eit utført oppdrag. Det kan til dømes vere utbetalt honorar i samband med eit styreverv i burettslaget, eller som trenar for eit handball-lag. Honorar blir òg ofte brukt av frie yrke som forfattarar, fotografar og kunstnarar.',
    'steg.arbeidssituasjon.arbeidssituasjonFrilanser.intro.info.tekst.3':
        'I tillegg er <strong>fosterheimsgodtgjersle</strong> og <strong>omsorgsstønad</strong> frå kommuna òg rekna som frilansoppdra.',

    'steg.arbeidssituasjon.opptjeningUtland.tittel': 'Jobbat i eit anna EØS-land',
    'steg.arbeidssituasjon.opptjeningUtland.spm':
        'Har du jobba som arbeidstakar eller frilansar i eit anna EØS-land i løpet av dei 3 siste månedane før perioden du søkjer om?',
    'steg.arbeidssituasjon.opptjeningUtland.listAndDialog.addLabel': 'Legg til jobb i eit anna EØS-land',
    'steg.arbeidssituasjon.opptjeningUtland.listAndDialog.listTitle': 'Registrert jobb i eit anna EØS-land',
    'steg.arbeidssituasjon.opptjeningUtland.listAndDialog.modalTitle': 'Jobba i eit anna EØS-land',

    'steg.arbeidssituasjon.utenlandskNæring.spm':
        'Har du jobba som sjølvstendig næringsdrivande i eit anna EØS-land i løpet av dei 3 siste åra før perioden du søkjer om?',

    'steg.arbeidssituasjon.verneplikt.tittel': 'Verneplikt',
    'steg.arbeidssituasjon.verneplikt.spm': 'Utøvde du verneplikt på tidspunktet du søkjer pleiepengar frå?',
    'steg.arbeidssituasjon.verneplikt.info.tittel': 'Kva tyder dette?',
    'steg.arbeidssituasjon.verneplikt.info.tekst':
        'Du skal svare ja på dette spørsmålet om du har utøvd verneplikt i minst 28 dagar på starttidspunktet for perioden du søkjer for, eller om perioden med verneplikt var meint å vare i minst 28 dagar.',

    'arbeidsforhold.ikkeAnsatt.info':
        'Når du ikkje er tilsett her lenger, må du be denne arbeidsgjevaren om å sende ei ny A-melding med sluttdato. Dette gjer dei anten via eige løns- og personalsystem, eller via Altinn.',

    'arbeidsforhold.erAnsatt.spm': 'Stemmer det at du er tilsett hos {navn} i perioden du søkjer for?',
    'arbeidsforhold.sluttetFørSøknadsperiode.spm': 'Slutta du hos {navn} før {fraDato}?',
    'arbeidsforhold.arbeiderNormaltTimerPerUke.snitt.spm':
        'Kor mange timar {jobber} du vanlegvis {hvor}? Oppgje tida i snitt per veke:',
    'arbeidsforhold.arbeiderNormaltTimerPerUke.snitt.infoOmsorgsstønad':
        'Du skal ikkje inkludere timar for omsorgsstønad/fosterheimgodtgjersle.',

    'arbeidsforhold.ansatt.normalTimer.info.tittel': 'Kva om eg jobbar turnus eller varierande?',
    'arbeidsforhold.selvstendig.normalTimer.info.tittel': 'Kva om eg jobbar turnus eller varierande?',
    'arbeidsforhold.frilanser.normalTimer.frilans.omsorgsstønad':
        'Du skal ikkje inkludere timar for fosterheimgodtgjersle og omsorgsstønad.',
    'arbeidsforhold.frilanser.normalTimer.frilans.info.tittel': 'Korleis reknar eg eit snitt?',
    'arbeidsforhold.frilanser.normalTimer.frilans.FRILANS.info.1':
        'Du reknar ut eit snitt ved å leggje saman alle timane du har jobba som frilansar dei siste 12 vekene, og delar dette på 12. Då får du eit snitt per veke.',
    'arbeidsforhold.frilanser.normalTimer.frilans.FRILANS.info.2':
        'Viss dei siste 12 vekene ikkje er representativ for kor mykje du jobbar som frilansar må du ta utgangspunkt i ei så lang periode som er representativ for deg.',
    'arbeidsforhold.frilanser.normalTimer.frilans.HONORAR.info.1':
        'Du reknar ut eit snitt ved å leggje saman  alle timane du har brukt på oppdraget du mottar honorar for dei siste 12 vekene, og delar dette på 12. Då får du eit snitt per veke.',
    'arbeidsforhold.frilanser.normalTimer.frilans.HONORAR.info.2':
        'Viss dei siste 12 vekene ikkje er representative i din situasjon, må du ta utgangspunkt i ei så lang periode som er representativ for deg.',
    'arbeidsforhold.frilanser.normalTimer.frilans.FRILANS_HONORAR.info.1':
        'Du reknar ut eit snitt ved å leggje saman antal timar du jobbar som frilansar med antal timar du brukar på det du mottar honorar for. Legg saman timane for dei siste 12 vekene, og så deler du dette på 12. Då får du eit snitt per veke.',
    'arbeidsforhold.frilanser.normalTimer.frilans.FRILANS_HONORAR.info.2':
        'Viss dei siste 12 vekene ikkje er representative i din situasjon, må du ta utgangspunkt i ei så lang periode som er representativ for deg.',
    'arbeidsforhold.frilanser.normalTimer.frilans.FRILANS_HONORAR.info.3': 'Døme på korleis du reknar det ut:',
    'arbeidsforhold.frilanser.normalTimer.frilans.FRILANS_HONORAR.info.4':
        'Du har dei siste 12 vekene jobba 40 timar som frilansar, og du har brukt 20 timar på det du mottar honorar for. Då får du til samen 60 timar, som du delar på 12 = 5. Du oppgjev altså at du jobba 5 timar i snitt per veke.',

    'arbeidsforhold.normalTimer.info.turnus':
        'Når du jobbar turnus, eller har anna varierande arbeidstid, oppgjev du eit snitt per veke.',
    'arbeidsforhold.normalTimer.info.turnus.tittel': 'Slik reknar du ut eit snitt når du jobbar turnus',
    'arbeidsforhold.normalTimer.info.turnus.avsnitt.1':
        'Du reknar ut snittet ved å leggje saman antal timar du jobbar totalt i heile turnusperioden din, og delar det med antal veker som turnusperiorden din består av.',
    'arbeidsforhold.normalTimer.info.turnus.avsnitt.2': 'Døme:',
    'arbeidsforhold.normalTimer.info.turnus.avsnitt.3':
        'Du har ein turnus som går over 3 veker. Den fyrste veka jobbar du 20 timar, den andre 40 timar og den tredje veka jobbar du 15 timar. Då legg du saman antal timar du har jobba og delar med antal veker i turnusperioden din.',
    'arbeidsforhold.normalTimer.info.turnus.avsnitt.4': 'Då blir reknestykket slik i dette dømet:',
    'arbeidsforhold.normalTimer.info.turnus.avsnitt.4a': '20 timar + 40 timar + 15 timar = 75 timar',
    'arbeidsforhold.normalTimer.info.turnus.avsnitt.4b':
        'Så delar du antal timar med antal veker i turnusperioden din: 75 / 3 = 25',
    'arbeidsforhold.normalTimer.info.turnus.avsnitt.5':
        'Du jobbar altså i snitt 25 timar per veke, og det er dette talet du oppgjev.',

    'arbeidsforhold.normalTimer.info.varierende.tittel': 'Slik reknar du ut eit snitt ved varierande arbeidstid',
    'arbeidsforhold.normalTimer.info.varierende.avsnitt.1':
        'Du reknar ut eit snitt ved å leggje saman antal timar du totalt har jobba dei siste 12 vekene og delar det med 12. Viss du ikkje har jobba i 12 veker, reknar du ut snittet på same måte ved å bruke dei vekene du har jobba.',
    'arbeidsforhold.normalTimer.info.varierende.avsnitt.2': 'Døme når du har jobba dei siste 12 vekene:',
    'arbeidsforhold.normalTimer.info.varierende.avsnitt.3':
        'Dei siste 12 vekene har du jobba 250 timar. Då delar du antal timar du har jobba med 12: 250 timar / 12 veker = 20,8',
    'arbeidsforhold.normalTimer.info.varierende.avsnitt.4':
        'Du jobbar altså i snitt 20,8 timar per veke, og det er dette talet du oppgjev.',

    'arbeidsforhold.normalTimer.info.varierende.avsnitt.5':
        'Slik reknar du ut eit snitt når du har jobba mindre enn 12 veker:',
    'arbeidsforhold.normalTimer.info.varierende.avsnitt.6':
        'Då delar du antal timar med antal veker du har jobba. Viss du til dømes jobba i 7 veker, så delar du antal timar du har jobba med 7.',

    'arbeidsforhold.arbeidsforholdIntlValues.jobber': 'jobbar',
    'arbeidsforhold.arbeidsforholdIntlValues.jobbet': 'jobba',
    'arbeidsforhold.arbeidsforholdIntlValues.somAnsatt': 'hos {arbeidsgiverNavn}',
    'arbeidsforhold.arbeidsforholdIntlValues.somFrilanser': 'som frilansar',
    'arbeidsforhold.arbeidsforholdIntlValues.somSN': 'som sjølvstendig næringsdrivande',

    'selvstendig.harDuHattInntekt.spm': 'Er du sjølvstendig næringsdrivande i perioden du søkjer for?',
    'selvstendig.harDuHattInntekt.hjelpetekst.tittel': 'Kva tyder det å vere sjølvstendig næringsdrivande?',
    'selvstendig.harDuHattInntekt.hjelpetekst':
        'Du er sjølvstendig næringsdrivande når du anten har eit enkeltpersonføretak (ENK), eit ansvarleg selskap (ANS), eller eit ansvarleg selskap med delt ansvar (DA).',
    'selvstendig.harDuHattInntekt.hjelpetekst.snSkatteetatenLenke':
        'I tillegg kan du lese på skatteetaten sine sider om andre situasjonar kor du kan reknast som sjølvstendig næringsdrivande.',
    'selvstendig.harFlereVirksomheter.spm': 'Har du fleire enn ei næringsverksemd som er aktiv?',
    'selvstendig.veileder.flereAktiveVirksomheter':
        'Når du har fleire aktive næringsverksemder skal du berre leggje inn den verksemda som er eldst av dei. Har du til dømes ei verksemd du starta i 2012 og ei anna som du starta i 2020, skal du berre leggje inn verksemda du starta i 2012.',

    'selvstendig.infoDialog.infoTittel': 'Næringsverksemd som du har lagt inn:',
    'selvstendig.infoDialog.registrerKnapp': 'Registrer verksemd',
    'selvstendig.infoDialog.endreKnapp': 'Endre opplysningar',
    'selvstendig.infoDialog.fjernKnapp': 'Fjern verksemd',
    'selvstendig.infoDialog.tittel.en': 'Opplysningar om verksemda di',
    'selvstendig.infoDialog.tittel.flere': 'Opplysningar om den eldste verksemda di',

    'frilanser.harDuHattInntekt.spm': 'Jobbar du som frilansar eller mottar du honorar?',
    'frilanser.harDuHattInntekt.omsorgsstønad':
        'Viss du berre mottar fosterheimsgodtgjersle eller omsorgsstønad skal du svare nei på dette spørsmålet.',
    'frilanser.harDuHattInntekt.hvaBetyr.spm': 'Kva tyder dette?',
    'frilanser.harDuHattInntekt.hvaBetyr.info.1':
        'Du skal svare ja på dette spørsmålet viss du jobbar som frilansar og/eller mottar honorar for utført oppdrag. Du kan få kompensert eit eventuelt tap av denne inntekta.',
    'frilanser.harDuHattInntekt.hvaBetyr.info.2':
        'Eit honorar kan til dømes vere ei utbetaling i samband med eit styreverv, eller som trenar for eit idrettslag. Honorar blir òg ofte brukt av frie yrker som forfattarar, fotografar og kunstnarar',

    'frilanser.startetFørSisteTreHeleMåneder.spm': 'Starta du som frilansar før {dato}?',
    'frilanser.startdato.spm': 'Når starta du å jobbe som frilansar?',

    'frilanser.erFortsattFrilanser.spm': 'Jobbar du framleis som frilansar?',
    'frilanser.ingenFrilans.info':
        'Viss det ikkje stemmer at du skal vere registrert med frilansoppdrag i AA-registeret må du be dei som har gjort registreringa om å oppdatere informasjonen. Du kan likevel halde fram med å fylle ut og sende inn søknaden.',

    'frilanser.sluttdato.spm': 'Når slutta du å jobbe som frilansar?',
    'frilanser.misterHonorar.tittle': 'Mistar du honorar fordi du må pleie barnet?',
    'frilanser.misterHonorar.description.tittel': 'Kva tyder dette?',
    'frilanser.misterHonorar.description':
        'Du kan ha rett til å få kompensert tap av honorar viss du skal pleie eit sjukt barn.',

    'frilanser.hjelpetekst.spm': 'Kva tyder det å være frilansar?',
    'frilanser.hjelpetekst.1':
        'Du er frilansar når du mottar løn for enkeltstående oppdrag utan å vere fast eller mellombels tilsett hos den du utfører oppdraget for.Viss du er usikker på om du er frilansar må du sjekke om oppdraga dine er registrert som frilansoppdrag på skatteetaten sine nettsider.',

    'verneplikt.summary.header': 'Verneplikt',
    'verneplikt.summary.harVærtVernepliktig': 'Utøvde verneplikt på tidspunktet det blir søkt pleiepengar frå',
    'verneplikt.summary.harIkkeVærtVernepliktig':
        'Utøvde ikkje verneplikt på tidspunktet det blir søkt pleiepengar frå',

    'steg.arbeidssituasjon.fosterhjemsgodtgjørelse.mottarFosterhjemsgodtgjørelse.spm':
        'Mottar du fosterheimsgodtgjersle frå kommuna?',
    'steg.arbeidssituasjon.fosterhjemsgodtgjørelse.mottarFosterhjemsgodtgjørelse.spm.description.tittel':
        'Kva tyder dette?',
    'steg.arbeidssituasjon.fosterhjemsgodtgjørelse.mottarFosterhjemsgodtgjørelse.spm.description':
        'Fosterheimsgodtgjersle reknast som frilansinntekt, og kan påverke kor mykje du får i pleiepengar.',
    'steg.arbeidssituasjon.fosterhjemsgodtgjørelse.mottarFosterhjemsgodtgjørelseIHelePerioden.spm':
        'Mottar du denne godtgjersla gjennom heile perioden du søkjer om?',
    'steg.arbeidssituasjon.fosterhjemsgodtgjørelse.erFrikjøptFraJobb.spm': 'Er du frikjøpt frå jobb?',
    'steg.arbeidssituasjon.fosterhjemsgodtgjørelse.erFrikjøptFraJobb.beskrivelse.label':
        'Skildr detaljar om frikjøp og fosterheimsgodtgjersla:',
    'steg.arbeidssituasjon.fosterhjemsgodtgjørelse.erFrikjøptFraJobb.info.1':
        'Kor mange prosent eller timar du er frikjøpt frå jobb',
    'steg.arbeidssituasjon.fosterhjemsgodtgjørelse.erFrikjøptFraJobb.info.2':
        'Om du er frikjøpt frå ein eller fleire arbeidsgjevarar',
    'steg.arbeidssituasjon.fosterhjemsgodtgjørelse.erFrikjøptFraJobb.info.3': 'Kva periode er du frikjøpt',
    'steg.arbeidssituasjon.fosterhjemsgodtgjørelse.erFrikjøptFraJobb.info.4':
        'Om du mistar eller får redusert fosterheimsgodtgjersla i perioden du søkjer om',
    'steg.arbeidssituasjon.fosterhjemsgodtgjørelse.starterUndeveis.spm':
        'Startar godtgjersla undervegs i pleiepengeperioden din?',
    'steg.arbeidssituasjon.fosterhjemsgodtgjørelse.starterUndeveis.startdato': 'Startdato:',
    'steg.arbeidssituasjon.fosterhjemsgodtgjørelse.slutterUndeveis.spm':
        'Stoppar godtgjersla undervegs i pleiepengeperioden din?',
    'steg.arbeidssituasjon.fosterhjemsgodtgjørelse.starterUndeveis.sluttdato': 'Sluttdato:',

    'steg.arbeidssituasjon.frilansoppdragListe.tittel': 'Frilansoppdrag registrert på deg:',
    'steg.arbeidssituasjon.frilansoppdragListe.tekst':
        'Dette er informasjon henta frå AA-registeret. Det kan vere jobb som frilansar, eller andre oppdrag som reknast som frilansoppdrag: honorar, fosterheimsgodtgjersle eller omsorgsstønad frå kommuna.',
};
