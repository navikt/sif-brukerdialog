const nb = {
    'step.oppsummering.info':
        'Les gjennom oppsummeringen før du sender inn søknaden. Hvis du vil gjøre endringer, kan du gå tilbake.',
    'step.oppsummering.søker.header': 'Om deg som søker',
    'step.oppsummering.søker.navn': 'Navn',
    'step.oppsummering.søker.fnr': 'Fødselsnummer',
    'step.oppsummering.søker.omDeg': 'Om deg',

    'step.oppsummering.dineBarn': 'Om barn og dager du må dekke selv',
    'step.oppsummering.dineBarn.barn': 'Dine barn',
    'step.oppsummering.dineBarn.listItem': ' (fnr. {identitetsnummer})',
    'step.oppsummering.dineBarn.listItem.utvidetRett': 'Ekstra omsorgsdager.',
    'step.oppsummering.dineBarn.listItem.årsak.FOSTERBARN': '(Barnet er mitt fosterbarn).',

    'step.oppsummering.arbeidssituasjon.header': 'Din arbeidssituasjon',
    'step.oppsummering.utbetalinger.header': 'Dager du søker om utbetaling for',
    'step.oppsummering.utbetalinger.heleDager': 'Hele dager med fravær',
    'step.oppsummering.utbetalinger.delvisDager': 'Dager med delvis fravær',
    'step.oppsummering.medlemskap.header': 'Medlemskap i folketrygden',

    'step.oppsummering.utlandetSiste12.header': 'Har du bodd i utlandet i de siste 12 månedene?',
    'step.oppsummering.utlandetSiste12.bosteder': 'Bosteder i utlandet de siste 12 månedene',
    'step.oppsummering.utlandetNeste12.header': 'Skal du bo i utlandet i de neste 12 månedene?',
    'step.oppsummering.utlandetNeste12.bosteder': 'Bosteder i utlandet de neste 12 månedene',
    'step.oppsummering.utlandetSiste12.liste.header': 'Utenlandsopphold siste 12 måneder',
    'step.oppsummering.utlandetNeste12.liste.header': 'Utenlandsopphold neste 12 måneder',

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

    'step.oppsummering.sendSøknad': 'Send søknad',

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

const nn: Record<keyof typeof nb, string> = {
    'step.oppsummering.info':
        'Les gjennom oppsummeringa før du sender inn søknaden. Dersom du vil gjere endringar, kan du gå tilbake.',
    'step.oppsummering.søker.header': 'Om deg som søkjar',
    'step.oppsummering.søker.navn': 'Namn',
    'step.oppsummering.søker.fnr': 'Fødselsnummer',
    'step.oppsummering.søker.omDeg': 'Om deg',

    'step.oppsummering.dineBarn': 'Om barn og dagar du må dekke sjølv',
    'step.oppsummering.dineBarn.barn': 'Dine barn',
    'step.oppsummering.dineBarn.listItem': ' (fnr. {identitetsnummer})',
    'step.oppsummering.dineBarn.listItem.utvidetRett': 'Ekstra omsorgsdagar.',
    'step.oppsummering.dineBarn.listItem.årsak.FOSTERBARN': '(Barnet er mitt fosterbarn).',

    'step.oppsummering.arbeidssituasjon.header': 'Di arbeidssituasjon',
    'step.oppsummering.utbetalinger.header': 'Dagar du søkjer om utbetaling for',
    'step.oppsummering.utbetalinger.heleDager': 'Heile dagar med fråvær',
    'step.oppsummering.utbetalinger.delvisDager': 'Dagar med delvis fråvær',
    'step.oppsummering.medlemskap.header': 'Medlemskap i folketrygda',

    'step.oppsummering.utlandetSiste12.header': 'Har du budd i utlandet dei siste 12 månadene?',
    'step.oppsummering.utlandetSiste12.bosteder': 'Bustader i utlandet dei siste 12 månadene',
    'step.oppsummering.utlandetNeste12.header': 'Skal du bu i utlandet dei neste 12 månadene?',
    'step.oppsummering.utlandetNeste12.bosteder': 'Bustader i utlandet dei neste 12 månadene',
    'step.oppsummering.utlandetSiste12.liste.header': 'Utanlandsopphald siste 12 månader',
    'step.oppsummering.utlandetNeste12.liste.header': 'Utanlandsopphald neste 12 månader',

    'step.oppsummering.bekrefterOpplysninger':
        'Eg stadfestar at opplysningane eg har gitt er riktige, og at eg ikkje har halde tilbake opplysningar som har betydning for min rett til omsorgspengar.',
    'step.oppsummering.bekrefterOpplysninger.ikkeBekreftet': 'Du må stadfeste opplysningane',

    'step.oppsummering.utenlandsoppholdIPerioden.listetittel': 'Utanlandsopphald i perioden',

    'step.oppsummering.apiValideringFeil.tittel': 'Noko av informasjonen manglar',

    'step.oppsummering.legeerklæring.ingenVedlegg': 'Ingen legeerklæring er lasta opp',
    'step.oppsummering.legeerklæring.header': 'Legeerklæring',

    'step.oppsummering.fravær.aktivitet.1': 'Fråvær som {aktivitet}.',
    'step.oppsummering.fravær.aktivitet.2': 'Fråvær som {aktivitet1} og {aktivitet2}.',
    'step.oppsummering.dokumenter.ikkelastetopp': 'Ikkje lasta opp, må ettersendast',

    'step.oppsummering.sendSøknad': 'Send søknad',

    'summary.virksomhet.header': 'Sjølvstendig næringsdrivande',
    'summary.virksomhet.næringstype': 'Næringstype',
    'summary.virksomhet.regnskapsfører': 'Rekneskapsførar er {navn}, telefon: {telefon}.',
    'summary.virksomhet.ikkeRegnskapsfører': 'Har ikkje rekneskapsførar.',
    'summary.virksomhet.tidsinfo.avsluttet': 'Starta {fraOgMed}, avslutta {tilOgMed}.',
    'summary.virksomhet.tidsinfo.pågående': 'Starta {fraOgMed} (pågåande).',
    'summary.virksomhet.fisker.påBladB': 'Fiskar er på Blad B.',
    'summary.virksomhet.fisker.ikkePåBladB': 'Fiskar er ikkje på Blad B.',
    'summary.virksomhet.registrertILand': 'Registrert i {land}',
    'summary.virksomhet.registrertILand.orgnr': ' (organisasjonsnummer {orgnr})',
    'summary.virksomhet.næringsinntekt': 'Næringsinntekt: {næringsinntekt}',
    'summary.virksomhet.varigEndring.html':
        'Har hatt varig endring i arbeidsforholdet, verksemda eller arbeidssituasjonen dei siste fire åra. Dato for endring var {dato}, og næringsinntekt etter endringa er <strong>{inntekt}</strong>. Skildring av endringa:',
    'summary.virksomhet.yrkesaktivSisteTreFerdigliknedeÅrene': 'Vart yrkesaktiv {dato}',
    'summary.virksomhet.harDuHattInntekt.header':
        'Var du sjølvstendig næringsdrivande i dagane du søkjer utbetaling for?',
    'summary.virksomhet.harFlereVirksomheter.header': 'Har du fleire enn éi næringsverksemd som er aktiv?',
    'summary.virksomhet.virksomhetInfo.tittel': 'Næringsverksemd som du har lagt inn:',

    'frilanser.summary.header': 'Frilanser',
    'frilanser.summary.harDuHattInntekt.header': 'Var du frilanser i dagane du søkjer utbetaling for?',
    'frilanser.summary.nårStartet.header': 'Når starta du som frilanser?',
    'frilanser.summary.jobberFortsatt.header': 'Jobbar du framleis som frilanser?',
    'frilanser.summary.nårSluttet.header': 'Når slutta du som frilanser?',
};

export const oppsummeringMessages = { nb, nn };
