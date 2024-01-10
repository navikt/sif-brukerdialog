import { MessageFileFormat } from '@navikt/sif-common-core-ds/src/types/MessageFileFormat';

export const oppsummeringMessages: MessageFileFormat = {
    nb: {
        'step.oppsummering.pageTitle': 'Oppsummering',
        'step.oppsummering.stepTitle': 'Oppsummering',
        'step.oppsummering.stepIndicatorLabel': 'Oppsummering',
        'step.oppsummering.nextButtonLabel': 'Send inn søknad',
        'step.oppsummering.info':
            'Les gjennom oppsummeringen og sjekk at alt er riktig før du sender inn søknaden. Hvis du vil gjøre endringer, kan du gå tilbake.',

        'step.oppsummering.søker.header': 'Om deg',
        'step.oppsummering.søker.fnr': 'Fødselsnummer: {fødselsnummer}',
        'step.oppsummering.pleietrengende.header': 'Om personen du pleier',
        'steg.oppsummering.pleietrengende.harIkkeFnr':
            'Oppgitt grunn for at han/hun ikke har fødselsnummer eller D-nummer: {årsak}',
        'steg.oppsummering.pleietrengende.fødselsdato': 'Fødselsdato: {dato}',
        'steg.oppsummering.pleietrengende.årsakManglerIdentitetsnummer.BOR_I_UTLANDET': 'Personen bor i utlandet',
        'steg.oppsummering.pleietrengende.årsakManglerIdentitetsnummer.ANNET': 'Annet',
        'steg.oppsummering.pleietrengende.id': 'ID for personen du pleier',
        'step.oppsummering.pleietrengende.id.ingenId': 'Ingen ID er lastet opp',

        'steg.oppsummering.tidsrom.header': 'Dagene du søker pleiepenger for',
        'steg.oppsummering.søknadsperiode.header': 'Periode',
        'steg.oppsummering.tidsrom.fomtom': '{fom} - {tom}',

        'steg.oppsummering.pleierDuDenSykeHjemme.header': 'Skal du pleie personen hjemme i de dagene du søker for?',
        'steg.oppsummering.skalJobbeOgPleieSammeDag.header': 'Skal du jobbe delvis i noen av dagene du søker for?',

        'steg.oppsummering.flereSokere.header': 'Er dere flere som skal dele på pleiepengene?',

        'steg.oppsummering.JA': 'Ja',
        'steg.oppsummering.NEI': 'Nei',
        'steg.oppsummering.USIKKER': 'Usikker',

        'steg.oppsummering.utenlandsoppholdIPerioden.header':
            'Oppholder du deg i utlandet i noen av dagene du søker for?',
        'steg.oppsummering.utenlandsoppholdIPerioden.listetittel': 'Utenlandsopphold i perioden',

        'steg.oppsummering.arbeidssituasjon.header': 'Din arbeidssituasjon',
        'steg.oppsummering.vedlegg.header': 'Vedlegg',

        'arbeidsgiver.tittel': '{navn} (organisasjonsnummer {organisasjonsnummer})',
        'frilans.tittel': 'Frilans',
        'frilans.tittel.start': 'Frilanser hos {hvor} (startet {startdato})',
        'frilans.tittel.slutt': 'Frilanser hos {hvor} (sluttet {sluttdato})',
        'frilans.tittel.startOgSlutt': 'Frilanser hos {hvor} (startet {startdato}, sluttet {sluttdato})',
        'selvstendigNæringsdrivende.tittel': 'Selvstendig næringsdrivende',

        'oppsummering.arbeidssituasjon.arbeidsgiver.ansatt': 'Er ansatt i perioden',
        'oppsummering.arbeidssituasjon.avsluttet.arbeidsgiver.ansatt': 'Er ikke lenger ansatt',
        'oppsummering.arbeidssituasjon.tid': 'Jobber normalt {timer, plural, one {# time} other {# timer}} per uke',
        'oppsummering.arbeidssituasjon.avsluttet.tid':
            'Jobbet normalt {timer, plural, one {# time} other {# timer}} per uke',
        'oppsummering.arbeidssituasjon.avsluttet.sluttetFørSøknadsperiode': 'Sluttet før {periodeFra}',
        'oppsummering.arbeidssituasjon.avsluttet.sluttetISøknadsperiode': 'Sluttet etter {periodeFra}',

        'oppsummering.arbeidssituasjon.arbeidsgivere.ingenIPeriode.header': 'Arbeidsgivere',
        'oppsummering.arbeidssituasjon.arbeidsgivere.ingenIPeriode.tekst': 'Er ikke ansatt i perioden det søkes for',

        'oppsummering.arbeidssituasjon.frilanser.header': 'Frilanser',
        'oppsummering.arbeidssituasjon.frilans.erIkkeFrilanser': 'Er ikke frilanser i perioden det søkes for',
        'oppsummering.arbeidssituasjon.frilans.startet': 'Startet som frilanser {dato}',
        'oppsummering.arbeidssituasjon.frilans.fortsattFrilanser': 'Er fortsatt frilanser',
        'oppsummering.arbeidssituasjon.frilans.sluttet': 'Sluttet som frilanser {dato}',
        'oppsummering.arbeidssituasjon.frilans.frilansoppdrag': 'Frilansoppdrag registrert i perioden:',

        'oppsummering.arbeidssituasjon.selvstendig.header': 'Selvstendig næringsdrivende',
        'oppsummering.arbeidssituasjon.selvstendig.erIkkeSN':
            'Er ikke selvstendig næringsdrivende i perioden det søkes for',
        'oppsummering.arbeidssituasjon.selvstendig.erSn': 'Er selvstendig næringsdrivende i perioden',
        'oppsummering.arbeidssituasjon.selvstendig.flereVirksomheter': 'Har flere virksomheter',
        'oppsummering.arbeidssituasjon.selvstendig.enVirksomhet': 'Har 1 virksomhet',

        'oppsummering.arbeidssituasjon.verneplikt.header': 'Verneplikt',
        'oppsummering.arbeidssituasjon.verneplikt.harVærtVernepliktig':
            'Utøvde verneplikt på tidspunktet det søkes pleiepenger fra',
        'oppsummering.arbeidssituasjon.verneplikt.harIkkeVærtVernepliktig':
            'Utøvde ikke verneplikt på tidspunktet det søkes pleiepenger fra',

        'oppsummering.arbeidssituasjon.optjeningIUtlandet.listetittel':
            'Har jobbet som arbeidstaker eller frilanser i et annet EØS-land i løpet av de 3 siste månedene før perioden en søker om',
        'oppsummering.arbeidssituasjon.optjeningIUtlandet.nei': 'Nei',

        'oppsummering.arbeidssituasjon.utenlandskNæring.listetittel':
            'Har jobbet som selvstendig næringsdrivende i et annet EØS-land i løpet av de 3 siste årene før perioden en søker om',
        'oppsummering.arbeidssituasjon.utenlandskNæring.nei': 'Nei',

        'oppsummering.arbeidIPeriode.jobbIPerioden.header': 'Jobb i søknadsperioden',
        'oppsummering.arbeidIPeriode.jobbIPerioden': 'Jobb i søknadsperioden',
        'oppsummering.arbeidIPeriode.jobberIPerioden.ja': 'jobber',
        'oppsummering.arbeidIPeriode.jobberIPerioden.HELT_FRAVÆR': 'Jeg jobber ikke her de dagene jeg pleier',
        'oppsummering.arbeidIPeriode.jobberIPerioden.REDUSERT': 'Jeg kombinerer delvis jobb med pleiepenger',
        'oppsummering.arbeidIPeriode.jobberIPerioden.SOM_VANLIG': 'Jeg jobber som normalt, og har ikke fravær',
        'oppsummering.arbeidIPeriode.jobberIPerioden.liktHverUke': 'Jobber likt hver uke',
        'oppsummering.arbeidIPeriode.jobberIPerioden.prosent': 'Jobber {prosent} prosent, i snitt {timer} hver ukedag',

        'summary.virksomhet.virksomhetInfo.tittel': 'Næringsvirksomhet som du har lagt inn:',

        'step.oppsummering.bekrefterOpplysninger':
            'Jeg bekrefter at opplysningene jeg har gitt er riktige, og at jeg ikke har holdt tilbake opplysninger som har betydning for min rett til pleiepenger.',

        'step.oppsummering.sendMelding.feilmelding.førsteGang':
            'Det oppstod en feil under innsending. Vennligst prøv på nytt.',
        'step.oppsummering.sendMelding.feilmelding.andreGang':
            'Det oppstod fortsatt en feil under innsending. Vennligst vent litt og prøv på nytt.',

        'step.oppsummering.medlemskap.header': 'Medlemskap i folketrygden',
        'step.oppsummering.utenlandsoppholdIPerioden.listetittel': 'Utenlandsopphold i perioden',
        'step.oppsummering.utlandetSiste12.header': 'Har du bodd i utlandet i de siste 12 månedene?',
        'step.oppsummering.utlandetNeste12.header': 'Skal du bo i utlandet i de neste 12 månedene?',
        'step.oppsummering.utlandetSiste12.liste.header': 'Utenlandsopphold siste 12 måneder',
        'step.oppsummering.utlandetNeste12.liste.header': 'Utenlandsopphold neste 12 måneder',
        'step.oppsummering.legeerklæring.header': 'Legeerklæring',
        'step.oppsummering.samværsavtale.header': 'Avtale om delt bosted',

        'step.oppsummering.fravær.aktivitet.1': 'Fravær som {aktivitet}.',
        'step.oppsummering.fravær.aktivitet.2': 'Fravær som {aktivitet1} og {aktivitet2}.',

        'steg.oppsummering.bekreftelseFraLege.header': 'Legeerklæring',
        'step.oppsummering.legeerklæring.ingenVedlegg': 'Ingen legeerklæring er lastet opp',

        'step.oppsummering.apiValideringFeil.tittel': 'Noe av informasjonen mangler',

        'step.oppsummering.bekrefterOpplysninger.ikkeBekreftet': 'Du må bekrefte opplysningene',
    },
};
