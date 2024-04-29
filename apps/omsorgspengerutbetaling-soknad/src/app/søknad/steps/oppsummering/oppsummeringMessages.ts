const nb = {
    'step.oppsummering.info':
        'Les gjennom oppsummeringen før du sender inn søknaden. Hvis du vil gjøre endringer, kan du gå tilbake.',
    'step.oppsummering.søker.header': 'Om deg som søker',
    'step.oppsummering.søker.fnr': 'Fødselsnummer: {fødselsnummer}',
    'step.oppsummering.søker.omDeg': 'Om deg',

    'step.oppsummering.dineBarn': 'Om barn og dager du må dekke selv',
    'step.oppsummering.dineBarn.listItem': ' (fnr. {identitetsnummer})',
    'step.oppsummering.dineBarn.listItem.utvidetRett': 'Ekstra omsorgsdager.',
    'step.oppsummering.dineBarn.listItem.årsak.FOSTERBARN': '(Barnet er mitt fosterbarn).',

    'step.oppsummering.arbeidssituasjon.header': 'Din arbeidssituasjon',
    'step.oppsummering.utbetalinger.header': 'Dager du søker om utbetaling for',
    'step.oppsummering.medlemskap.header': 'Medlemskap i folketrygden',

    'step.oppsummering.utlandetSiste12.header': 'Har du bodd i utlandet i de siste 12 månedene?',
    'step.oppsummering.utlandetNeste12.header': 'Skal du bo i utlandet i de neste 12 månedene?',
    'step.oppsummering.utlandetSiste12.liste.header': 'Utenlandsopphold siste 12 måneder',
    'step.oppsummering.utlandetNeste12.liste.header': 'Utenlandsopphold neste 12 måneder',
    'step.oppsummering.samværsavtale.header': 'Avtale om delt bosted',
    'step.oppsummering.bekrefterOpplysninger':
        'Jeg bekrefter at opplysningene jeg har gitt er riktige, og at jeg ikke har holdt tilbake opplysninger som har betydning for min rett til omsorgspenger.',
    'step.oppsummering.bekrefterOpplysninger.ikkeBekreftet': 'Du må bekrefte opplysningene',

    'step.oppsummering.utenlandsoppholdIPerioden.listetittel': 'Utenlandsopphold i perioden',

    'step.oppsummering.apiValideringFeil.tittel': 'Noe av informasjonen mangler',

    'step.oppsummering.legeerklæring.ingenVedlegg': 'Ingen legeerklæring er lastet opp',
    'step.oppsummering.legeerklæring.header': 'Legeerklæring',

    'step.oppsummering.fravær.aktivitet.1': 'Fravær som {aktivitet}.',
    'step.oppsummering.fravær.aktivitet.2': 'Fravær som {aktivitet1} og {aktivitet2}.',
    'step.oppsummering.dokumenter.ikkelastetopp': 'Ikke lastet opp, må ettersendes',

    'summary.virksomhet.header': 'Selvstendig næringsdrivende',
    'summary.virksomhet.næringstype': 'Næringstype',
    'summary.virksomhet.regnskapsfører': 'Regnskapsfører er {navn}, telefon: {telefon}.',
    'summary.virksomhet.ikkeRegnskapsfører': 'Har ikke regnskapsfører.',
    'summary.virksomhet.tidsinfo.avsluttet': 'Startet {fraOgMed}, avsluttet {tilOgMed}.',
    'summary.virksomhet.tidsinfo.pågående': 'Startet {fraOgMed} (pågående).',
    'summary.virksomhet.fisker.påBladB': 'Fisker er på Blad B.',
    'summary.virksomhet.fisker.ikkePåBladB': 'Fisker er ikke på Blad B.',
    'summary.virksomhet.registrertILand': 'Registrert i {land}',
    'summary.virksomhet.registrertILand.orgnr': ' (organisasjonsnummer {orgnr})',
    'summary.virksomhet.næringsinntekt': 'Næringsinntekt: {næringsinntekt}',
    'summary.virksomhet.varigEndring.html':
        'Har hatt varig endring i arbeidsforholdet, virksomheten eller arbeidssituasjonen de siste fire årene. Dato for endring var {dato}, og næringsinntekt etter endringen er <strong>{inntekt}</strong>. Beskrivelse av endringen:',
    'summary.virksomhet.yrkesaktivSisteTreFerdigliknedeÅrene': 'Ble yrkesaktiv {dato}',
    'summary.virksomhet.harDuHattInntekt.header':
        'Var du selvstendig næringsdrivende i dagene du søker utbetaling for?',
    'summary.virksomhet.harFlereVirksomheter.header': 'Har du flere enn én næringsvirksomhet som er aktiv?',
    'summary.virksomhet.virksomhetInfo.tittel': 'Næringsvirksomhet som du har lagt inn:',

    'frilanser.summary.header': 'Frilanser',
    'frilanser.summary.harDuHattInntekt.header': 'Var du frilanser i dagene du søker utbetaling for?',
    'frilanser.summary.nårStartet.header': 'Når startet du som frilanser?',
    'frilanser.summary.jobberFortsatt.header': 'Jobber du fortsatt som frilanser?',
    'frilanser.summary.nårSluttet.header': 'Når sluttet du som frilanser?',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const oppsummeringMessages = { nb, nn };
