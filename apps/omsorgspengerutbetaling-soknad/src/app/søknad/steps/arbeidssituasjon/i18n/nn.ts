import { arbeidssituasjonMessages_nb } from './nb';

export const arbeidssituasjonMessages_nn: Record<keyof typeof arbeidssituasjonMessages_nb, string> = {
    'step.arbeidssituasjon.info.1':
        'No treng me å vite kva som var arbeidssituasjonen din i dagane du søkjer utbetaling for.',
    'step.arbeidssituasjon.advarsel.ingenSituasjonValgt': 'Du må velje minst éin av situasjonane over.',

    'step.arbeidssituasjon.frilanser.hjelpetekst.tittel': 'Kva tyder det å vere frilansar?',
    'step.arbeidssituasjon.frilanser.hjelpetekst':
        'Du er frilansar når du mottar lønn for enkeltståande oppdrag utan å vere fast eller mellombels tilsett hos den du utfører oppdraget for. Dersom du er usikker på om du er frilansar, må du sjekke om oppdraga dine er registrerte som frilansoppdrag på',
    'step.arbeidssituasjon.frilanser.hjelpetekst.skatteetatenLenke': 'skatteetaten sine nettsider.',

    'step.arbeidssituasjon.selvstendig.hjelpetekst.tittel': 'Kva tyder det å vere sjølvstendig næringsdrivande?',
    'step.arbeidssituasjon.selvstendig.hjelpetekst':
        'Du er sjølvstendig næringsdrivande når du anten har eit enkeltpersonføretak (ENK), eit ansvarleg selskap (ANS), eller eit ansvarleg selskap med delt ansvar (DA).',
    'step.arbeidssituasjon.selvstendig.hjelpetekst.snSkatteetatenLenke':
        'I tillegg kan du lese på skatteetaten si side om andre situasjonar der du kan reknast som sjølvstendig næringsdrivande.',

    'frilanser.erFrilanser.spm': 'Var du frilansar i dagane du søkjer utbetaling for?',
    'frilanser.nårStartet.spm': 'Når starta du som frilansar?',
    'frilanser.jobberFortsatt.spm': 'Jobbar du framleis som frilansar?',
    'frilanser.nårSluttet.spm': 'Når slutta du som frilansar?',

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
    'næringstype.ANNEN': 'Anna verksemd',

    'fiskerinfo.LOTT': 'Lott',
    'fiskerinfo.HYRE': 'Hyre',
    'fiskerinfo.BLAD_A': 'Blad A',
    'fiskerinfo.BLAD_B': 'Blad B',
};
