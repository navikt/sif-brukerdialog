import { oppsummeringMessages_nb } from './nb';

export const oppsummeringMessages_nn: Record<keyof typeof oppsummeringMessages_nb, string> = {
    'step.oppsummering.pageTitle': 'Oppsummering',
    'step.oppsummering.stepTitle': 'Oppsummering',
    'step.oppsummering.stepIndicatorLabel': 'Oppsummering',
    'step.oppsummering.nextButtonLabel': 'Send inn søknad',
    'step.oppsummering.info':
        'Les gjennom oppsummeringa og sjekk at alt er riktig før du sender inn søknaden. Om du vil gjere endringar, kan du gå tilbake.',

    'step.oppsummering.søker.header': 'Om deg',
    'step.oppsummering.søker.navn': 'Namn',
    'step.oppsummering.søker.fnr': 'Fødselsnummer',
    'step.oppsummering.pleietrengende.header': 'Om personen du pleier',
    'step.oppsummering.pleietrengende.fødselsdato': 'Fødselsdato',
    'step.oppsummering.pleietrengende.navn': 'Namn',
    'step.oppsummeringpleietrengende.harIkkeFnr':
        'Oppgjeve grunn for at vedkomande ikkje har fødselsnummer eller D-nummer',
    'step.oppsummeringpleietrengende.årsakManglerIdentitetsnummer.BOR_I_UTLANDET': 'Personen bur i utlandet',
    'step.oppsummeringpleietrengende.årsakManglerIdentitetsnummer.ANNET': 'Anna',
    'step.oppsummeringpleietrengende.id': 'ID for personen du pleier',
    'step.oppsummering.pleietrengende.fnr': 'Fødselsnummer',
    'step.oppsummering.pleietrengende.id.ingenId': 'Ingen ID er lasta opp',

    'step.oppsummeringtidsrom.header': 'Dagane du søkjer pleiepengar for',
    'step.oppsummeringtidsrom.valgteDager.header': '{dager} {dager, plural, one {dag} other {dagar}} med pleiepengar',
    'step.oppsummeringsøknadsperiode.header': 'Periode',
    'step.oppsummeringtidsrom.fomtom': '{fom} - {tom}',

    'step.oppsummeringpleierDuDenSykeHjemme.header': 'Skal du pleie personen heime dei dagane du søkjer for?',
    'step.oppsummeringskalJobbeOgPleieSammeDag.header': 'Skal du jobbe delvis i nokre av dagane du søkjer for?',

    'step.oppsummeringflereSokere.header': 'Er de fleire som skal dele på pleiepengane?',

    'step.oppsummeringJA': 'Ja',
    'step.oppsummeringNEI': 'Nei',
    'step.oppsummeringUSIKKER': 'Usikker',

    'step.oppsummeringutenlandsoppholdIPerioden.header': 'Oppheld du deg i utlandet i nokre av dagane du søker for?',
    'step.oppsummeringutenlandsoppholdIPerioden.listetittel': 'Utanlandsopphald i perioden',

    'step.oppsummeringarbeidssituasjon.header': 'Din arbeidssituasjon',
    'step.oppsummeringvedlegg.header': 'Vedlegg',

    'arbeidsgiver.tittel': '{navn} (organisasjonsnummer {organisasjonsnummer})',
    'frilans.tittel': 'Frilans',
    'frilans.tittel.start': 'Frilansar hos {hvor} (starta {startdato})',
    'frilans.tittel.slutt': 'Frilansar hos {hvor} (slutta {sluttdato})',
    'frilans.tittel.startOgSlutt': 'Frilansar hos {hvor} (starta {startdato}, slutta {sluttdato})',
    'selvstendigNæringsdrivende.tittel': 'Sjølvstendig næringsdrivande',

    'oppsummering.arbeidssituasjon.arbeidsgiver.ansatt': 'Er tilsett i perioden',
    'oppsummering.arbeidssituasjon.avsluttet.arbeidsgiver.ansatt': 'Er ikkje lenger tilsett',
    'oppsummering.arbeidssituasjon.tid': 'Jobbar normalt {timer, plural, one {# time} other {# timar}} per veke',
    'oppsummering.arbeidssituasjon.avsluttet.tid':
        'Jobba normalt {timer, plural, one {# time} other {# timar}} per veke',
    'oppsummering.arbeidssituasjon.avsluttet.sluttetFørSøknadsperiode': 'Slutta før {periodeFra}',
    'oppsummering.arbeidssituasjon.avsluttet.sluttetISøknadsperiode': 'Slutta etter {periodeFra}',

    'oppsummering.arbeidssituasjon.arbeidsgivere.ingenIPeriode.header': 'Arbeidsgjevarar',
    'oppsummering.arbeidssituasjon.arbeidsgivere.ingenIPeriode.tekst': 'Er ikkje tilsett i perioden det søkast for',

    'oppsummering.arbeidssituasjon.frilanser.header': 'Frilansar',
    'oppsummering.arbeidssituasjon.frilans.erIkkeFrilanser': 'Er ikkje frilansar i perioden det søkast for',
    'oppsummering.arbeidssituasjon.frilans.startet': 'Starta som frilansar {dato}',
    'oppsummering.arbeidssituasjon.frilans.fortsattFrilanser': 'Er framleis frilansar',
    'oppsummering.arbeidssituasjon.frilans.sluttet': 'Slutta som frilansar {dato}',
    'oppsummering.arbeidssituasjon.frilans.frilansoppdrag': 'Frilansoppdrag registrert i perioden:',

    'oppsummering.arbeidssituasjon.selvstendig.header': 'Sjølvstendig næringsdrivande',
    'oppsummering.arbeidssituasjon.selvstendig.erIkkeSN':
        'Er ikkje sjølvstendig næringsdrivande i perioden det søkast for',
    'oppsummering.arbeidssituasjon.selvstendig.erSn': 'Er sjølvstendig næringsdrivande i perioden',
    'oppsummering.arbeidssituasjon.selvstendig.flereVirksomheter': 'Har fleire verksemder',
    'oppsummering.arbeidssituasjon.selvstendig.enVirksomhet': 'Har 1 verksemd',

    'oppsummering.arbeidssituasjon.verneplikt.header': 'Verneplikt',
    'oppsummering.arbeidssituasjon.verneplikt.harVærtVernepliktig':
        'Utøvde verneplikt på tidspunktet det søkast pleiepengar frå',
    'oppsummering.arbeidssituasjon.verneplikt.harIkkeVærtVernepliktig':
        'Utøvde ikkje verneplikt på tidspunktet det søkast pleiepengar frå',

    'oppsummering.arbeidssituasjon.optjeningIUtlandet.tittel': 'Arbeidstakar eller frilansar i eit anna EØS-land',
    'oppsummering.arbeidssituasjon.optjeningIUtlandet.ja':
        'Har jobba som arbeidstakar eller frilansar i eit anna EØS-land i løpet av dei 3 siste månadane før perioden ein søker om',
    'oppsummering.arbeidssituasjon.optjeningIUtlandet.nei':
        'Har ikkje jobba som arbeidstakar eller frilansar i eit anna EØS-land i løpet av dei 3 siste månadane før perioden ein søker om',
    'oppsummering.arbeidssituasjon.optjeningIUtlandet.periode': 'Periode med jobb i anna EØS-land',
    'oppsummering.arbeidssituasjon.optjeningIUtlandet.perioder': 'Periodar med jobb i anna EØS-land',

    'oppsummering.arbeidssituasjon.utenlandskNæring.tittel': 'Sjølvstendig næringsdrivande i eit anna EØS-land',
    'oppsummering.arbeidssituasjon.utenlandskNæring.nei':
        'Har ikkje jobba som sjølvstendig næringsdrivande i eit anna EØS-land i løpet av dei 3 siste åra før perioden ein søker om',
    'oppsummering.arbeidssituasjon.utenlandskNæring.ja':
        'Har jobba som sjølvstendig næringsdrivande i eit anna EØS-land i løpet av dei 3 siste åra før perioden ein søker om',
    'oppsummering.arbeidssituasjon.utenlandskNæring.næringer': 'Næringsverksemder i andre EØS-land',
    'oppsummering.arbeidssituasjon.utenlandskNæring.næring': 'Næringsverksemd i anna EØS-land',

    'oppsummering.arbeidIPeriode.jobbIPerioden.header': 'Jobb i søknadsperioden',
    'oppsummering.arbeidIPeriode.jobbIPerioden': 'Jobb i søknadsperioden',
    'oppsummering.arbeidIPeriode.jobberIPerioden.ja': 'jobbar',
    'oppsummering.arbeidIPeriode.jobberIPerioden.HELT_FRAVÆR': 'Eg jobbar ikkje her dei dagane eg pleier',
    'oppsummering.arbeidIPeriode.jobberIPerioden.REDUSERT': 'Eg kombinerer delvis jobb med pleiepengar',
    'oppsummering.arbeidIPeriode.jobberIPerioden.SOM_VANLIG': 'Eg jobbar som normalt, og har ikkje fråvær',
    'oppsummering.arbeidIPeriode.jobberIPerioden.liktHverUke': 'Eg jobbar likt kvar veke',
    'oppsummering.arbeidIPeriode.jobberIPerioden.prosent': 'Eg jobbar {prosent} prosent, i snitt {timer} kvar vekedag',
    'oppsummering.arbeidIPeriode.jobberIPerioden.informasjonMangler': 'Informasjon om arbeid i perioden manglar',
    'oppsummering.arbeidIPeriode.jobberIPerioden.dagerJegSkalJobbe.heading': 'Dagar med pleiepengar der eg skal jobbe',

    'summary.virksomhet.virksomhetInfo.tittel': 'Næringsverksemd som du har lagt inn',

    'step.oppsummering.bekrefterOpplysninger':
        'Eg stadfestar at opplysningane eg har gjeve er riktige, og at eg ikkje har halde tilbake opplysningar som har tydning for retten min til pleiepengar.',

    'step.oppsummering.sendMelding.feilmelding.førsteGang':
        'Det oppstod ein feil under innsending. Ver venleg å prøve igjen.',
    'step.oppsummering.sendMelding.feilmelding.andreGang':
        'Det oppstod framleis ein feil under innsending. Ver venleg og prøv seinare.',

    'step.oppsummering.legeerklæring.header': 'Legeerklæring',
    'step.oppsummering.legeerklæring.label': 'Dokument som er lasta opp',
    'step.oppsummering.samværsavtale.header': 'Avtale om delt bustad',

    'step.oppsummering.fravær.aktivitet.1': 'Fråvær som {aktivitet}.',
    'step.oppsummering.fravær.aktivitet.2': 'Fråvær som {aktivitet1} og {aktivitet2}.',

    'step.oppsummeringbekreftelseFraLege.header': 'Legeerklæring',
    'step.oppsummering.legeerklæring.ingenVedlegg': 'Inga legeerklæring er lasta opp',

    'step.oppsummering.apiValideringFeil.tittel': 'Noko av informasjonen manglar',
    'step.oppsummering.sendSøknad': 'Send søknad',

    'step.oppsummering.bekrefterOpplysninger.ikkeBekreftet': 'Du må stadfeste opplysningane',

    'opptjeningIUtlandetSummaryItem.periode': 'Periode: {periode}',
    'opptjeningIUtlandetSummaryItem.info': 'Jobba i {landnavn} som {hva} hos {hvor}',
};
