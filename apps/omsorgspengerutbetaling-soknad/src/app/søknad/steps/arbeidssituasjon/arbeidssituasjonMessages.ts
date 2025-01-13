const nb = {
    'step.arbeidssituasjon.info.1':
        'Nå trenger vi å vite hva som var arbeidssituasjonen din i dagene du søker utbetaling for.',
    'step.arbeidssituasjon.advarsel.ingenSituasjonValgt': 'Du må velge minst én av situasjonene over.',

    'step.arbeidssituasjon.frilanser.hjelpetekst.tittel': 'Hva betyr det å være frilanser?',
    'step.arbeidssituasjon.frilanser.hjelpetekst':
        'Du er frilanser når du mottar lønn for enkeltstående oppdrag uten å være fast eller midlertidig ansatt hos den du utfører oppdraget for. Hvis du er usikker på om du er frilanser må du sjekke om oppdragene dine er registrert som frilansoppdrag på',
    'step.arbeidssituasjon.frilanser.hjelpetekst.skatteetatenLenke': 'skatteetaten sine nettsider.',

    'step.arbeidssituasjon.selvstendig.hjelpetekst.tittel': 'Hva betyr det å være selvstendig næringsdrivende?',
    'step.arbeidssituasjon.selvstendig.hjelpetekst':
        'Du er selvstendig næringsdrivende når du enten har et enkeltpersonforetak (ENK), et ansvarlig selskap (ANS), eller et ansvarlig selskap med delt ansvar (DA).',
    'step.arbeidssituasjon.selvstendig.hjelpetekst.snSkatteetatenLenke':
        'I tillegg kan du lese på skatteetatens side om andre situasjoner hvor du kan regnes som selvstendig næringsdrivende.',

    'frilanser.erFrilanser.spm': 'Var du frilanser i dagene du søker utbetaling for?',
    'frilanser.nårStartet.spm': 'Når startet du som frilanser?',
    'frilanser.jobberFortsatt.spm': 'Jobber du fortsatt som frilanser?',
    'frilanser.nårSluttet.spm': 'Når sluttet du som frilanser?',

    'selvstendig.erDuSelvstendigNæringsdrivende.spm':
        'Var du selvstendig næringsdrivende i dagene du søker utbetaling for?',
    'selvstendig.harFlereVirksomheter.spm': 'Har du flere enn én næringsvirksomhet som er aktiv?',
    'selvstendig.veileder.flereAktiveVirksomheter':
        'Når du har flere aktive næringsvirksomheter skal du kun legge inn den virksomheten som er eldst av dem. Har du for eksempel en virksomhet du startet i 2012 og en annen som du startet i 2020, skal du kun legge inn virksomheten du startet i 2012.',
    'selvstendig.infoDialog.infoTittel': 'Næringsvirksomhet som du har lagt inn:',
    'selvstendig.infoDialog.registrerKnapp': 'Registrer virksomhet',
    'selvstendig.infoDialog.endreKnapp': 'Endre opplysninger',
    'selvstendig.infoDialog.fjernKnapp': 'Fjern virksomhet',
    'selvstendig.infoDialog.tittel.en': 'Opplysninger om virksomheten din',
    'selvstendig.infoDialog.tittel.flere': 'Opplysninger om den eldste virksomheten din',

    'næringstype.FISKE': 'Fiske',
    'næringstype.JORDBRUK_SKOGBRUK': 'Jordbruk',
    'næringstype.DAGMAMMA': 'Dagmamma i eget hjem',
    'næringstype.ANNEN': 'Annen virksomhet',

    'fiskerinfo.LOTT': 'Lott',
    'fiskerinfo.HYRE': 'Hyre',
    'fiskerinfo.BLAD_A': 'Blad A',
    'fiskerinfo.BLAD_B': 'Blad B',
};

const nn: Record<keyof typeof nb, string> = {
    'step.arbeidssituasjon.info.1':
        'No treng me å vite kva som var arbeidssituasjonen din i dagane du søkjer utbetaling for.',
    'step.arbeidssituasjon.advarsel.ingenSituasjonValgt': 'Du må velje minst éin av situasjonane over.',

    'step.arbeidssituasjon.frilanser.hjelpetekst.tittel': 'Kva betyr det å vere frilanser?',
    'step.arbeidssituasjon.frilanser.hjelpetekst':
        'Du er frilanser når du mottar lønn for enkeltståande oppdrag utan å vere fast eller mellombels tilsett hos den du utfører oppdraget for. Dersom du er usikker på om du er frilanser, må du sjekke om oppdraga dine er registrerte som frilansoppdrag på',
    'step.arbeidssituasjon.frilanser.hjelpetekst.skatteetatenLenke': 'skatteetaten sine nettsider.',

    'step.arbeidssituasjon.selvstendig.hjelpetekst.tittel': 'Kva betyr det å vere sjølvstendig næringsdrivande?',
    'step.arbeidssituasjon.selvstendig.hjelpetekst':
        'Du er sjølvstendig næringsdrivande når du anten har eit enkeltpersonføretak (ENK), eit ansvarleg selskap (ANS), eller eit ansvarleg selskap med delt ansvar (DA).',
    'step.arbeidssituasjon.selvstendig.hjelpetekst.snSkatteetatenLenke':
        'I tillegg kan du lese på skatteetaten si side om andre situasjonar der du kan reknast som sjølvstendig næringsdrivande.',

    'frilanser.erFrilanser.spm': 'Var du frilanser i dagane du søkjer utbetaling for?',
    'frilanser.nårStartet.spm': 'Når starta du som frilanser?',
    'frilanser.jobberFortsatt.spm': 'Jobbar du framleis som frilanser?',
    'frilanser.nårSluttet.spm': 'Når slutta du som frilanser?',

    'selvstendig.erDuSelvstendigNæringsdrivende.spm':
        'Var du sjølvstendig næringsdrivande i dagane du søkjer utbetaling for?',
    'selvstendig.harFlereVirksomheter.spm': 'Har du fleire enn éi næringsverksemd som er aktiv?',
    'selvstendig.veileder.flereAktiveVirksomheter':
        'Når du har fleire aktive næringsverksemder, skal du berre leggje inn den verksemda som er eldst. Har du for eksempel ei verksemd du starta i 2012 og ei anna som du starta i 2020, skal du berre leggje inn verksemda du starta i 2012.',
    'selvstendig.infoDialog.infoTittel': 'Næringsverksemd som du har lagt inn:',
    'selvstendig.infoDialog.registrerKnapp': 'Registrer verksemd',
    'selvstendig.infoDialog.endreKnapp': 'Endre opplysningar',
    'selvstendig.infoDialog.fjernKnapp': 'Fjern verksemd',
    'selvstendig.infoDialog.tittel.en': 'Opplysningar om verksemda di',
    'selvstendig.infoDialog.tittel.flere': 'Opplysningar om den eldste verksemda di',

    'næringstype.FISKE': 'Fiske',
    'næringstype.JORDBRUK_SKOGBRUK': 'Jordbruk',
    'næringstype.DAGMAMMA': 'Dagmamma i eige heim',
    'næringstype.ANNEN': 'Annan verksemd',

    'fiskerinfo.LOTT': 'Lott',
    'fiskerinfo.HYRE': 'Hyre',
    'fiskerinfo.BLAD_A': 'Blad A',
    'fiskerinfo.BLAD_B': 'Blad B',
};
export const arbeidssituasjonMessages = { nb, nn };
