import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';

export const oppsummeringMessages: MessageFileFormat = {
    nb: {
        'steg.oppsummering.info':
            'Les gjennom oppsummeringen før du sender inn søknaden. Hvis du vil gjøre endringer, kan du gå tilbake.',
        'steg.oppsummering.søker.omDeg': 'Om deg',
        'steg.oppsummering.søker.fnr': 'Fødselsnummer: {fødselsnummer}',

        'steg.oppsummering.dineBarn': 'Dine Barn',
        'steg.oppsummering.dineBarn.bekrefterDektTiDagerSelv': 'Har du dekket de 10 første omsorgsdagene selv?',
        'step.oppsummering.dineBarn.listItem': ' (fnr. {identitetsnummer})',
        'step.oppsummering.dineBarn.listItem.utvidetRett': 'Ekstra omsorgsdager.',
        'step.oppsummering.dineBarn.listItem.årsak.FOSTERBARN': '(Barnet er mitt fosterbarn).',

        'steg.oppsummering.arbeidssituasjon.header': 'Din arbeidssituasjon',
        'steg.oppsummering.utbetalinger.header': 'Omsorgsdager du søker utbetaling for',

        'steg.oppsummering.medlemskap.header': 'Medlemskap i folketrygden',

        'steg.oppsummering.utlandetSiste12.header': 'Har du bodd i utlandet i de siste 12 månedene?',
        'steg.oppsummering.utlandetNeste12.header': 'Skal du bo i utlandet i de neste 12 månedene?',
        'steg.oppsummering.utlandetSiste12.liste.header': 'Utenlandsopphold siste 12 måneder',
        'steg.oppsummering.utlandetNeste12.liste.header': 'Utenlandsopphold neste 12 måneder',
        'steg.oppsummering.samværsavtale.header': 'Avtale om delt bosted',
        'steg.oppsummering.bekrefterOpplysninger':
            'Jeg bekrefter at opplysningene jeg har gitt er riktige, og at jeg ikke har holdt tilbake opplysninger som har betydning for min rett til omsorgspenger.',
        'steg.oppsummering.bekrefterOpplysninger.ikkeBekreftet': 'Du må bekrefte opplysningene',

        'steg.oppsummering.utenlandsoppholdIPerioden.listetittel': 'Utenlandsopphold i perioden',

        'steg.oppsummering.apiValideringFeil.tittel': 'Noe av informasjonen mangler',

        'steg.oppsummering.dokumenter.header': 'Vedlegg',
        'steg.oppsummering.dokumenter.ingenVedlegg': 'Ingen vedlegg er lastet opp',
        'steg.oppsummering.dokumenterLegeerklæring.header': 'Legeerklæring',
        'steg.oppsummering.dokumenterSmittevern.header': 'Bekreftelse fra lege',
        'steg.oppsummering.dokumenterStengtBhgSkole.header': 'Bekreftelse fra barnehage eller skole',

        'steg.oppsummering.fravær.årsak': 'Årsak: {årsak}.',
        'steg.oppsummering.fravær.aktivitet.1': 'Fravær som {aktivitet}.',
        'steg.oppsummering.fravær.aktivitet.2': 'Fravær som {aktivitet1} og {aktivitet2}.',
        'steg.oppsummering.dokumenter.ikkelastetopp': 'Ikke lastet opp, må ettersendes',

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
    },
};
