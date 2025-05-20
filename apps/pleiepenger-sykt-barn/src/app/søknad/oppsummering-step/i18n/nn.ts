import { oppsummeringMessages_nb } from './nb';

export const oppsummeringMessages_nn: Record<keyof typeof oppsummeringMessages_nb, string> = {
    'step.oppsummering.pageTitle': 'Pleiepengesøknad - oppsummering',
    'step.oppsummering.stepTitle': 'Oppsummering',
    'step.oppsummering.stepIndicatorLabel': 'Oppsummering',
    'step.oppsummering.nextButtonLabel': 'Send inn søknaden',

    'steg.oppsummering.info':
        'Les gjennom oppsummeringa før du sender inn søknaden. Du kan gå tilbake viss du vil gjere endringar.',
    'steg.oppsummering.søker.header': 'Om deg',
    'steg.oppsummering.søker.navn': 'Namn',
    'steg.oppsummering.søker.fnr': 'Fødselsnummer',
    'steg.oppsummering.tidsrom.header': 'Perioden du søkjer pleiepenger for',
    'steg.oppsummering.søknadsperiode.header': 'Periode',
    'steg.oppsummering.tidsrom.fomtom': '{fom} - {tom}',

    'steg.oppsummering.barnet.header': 'Om barnet',
    'steg.oppsummering.barnet.navn': 'Namn',
    'steg.oppsummering.barnet.fødselsdato': 'Fødselsdato',
    'steg.oppsummering.barnet.fnr': 'Fødselsnummer',
    'steg.oppsummering.barnet.barnetHarIkkeFnr': 'Utan fødselsnummer/D-nummer',
    'steg.oppsummering.barnet.årsakManglerIdentitetsnummer.NYFØDT':
        'Barnet er nyfødd, og har ikkje fått fødselsnummer endå',
    'steg.oppsummering.barnet.årsakManglerIdentitetsnummer.BARNET_BOR_I_UTLANDET': 'Barnet bur i utlandet',
    'steg.oppsummering.barnet.årsakManglerIdentitetsnummer.ANNET': 'Anna',
    'steg.oppsummering.omBarn.fødselsattest.tittel': 'Fødselsattest',
    'step.oppsummering.omBarn.ingenFødselsattest': 'Ingen fødselsattest er lastet opp',
    'steg.oppsummering.relasjonTilBarnet.header': 'Relasjon til barnet',
    'steg.oppsummering.relasjonTilBarnetBeskrivelse': 'Di skildring av relasjon og tilsynsrolle for barnet:',
    'steg.oppsummering.barnRelasjon.MOR': 'Du er mor til barnet',
    'steg.oppsummering.barnRelasjon.MEDMOR': 'Du er medmor til barnet',
    'steg.oppsummering.barnRelasjon.FOSTERFORELDER': 'Du er fosterforelder til barnet',
    'steg.oppsummering.barnRelasjon.FAR': 'Du er far til barnet',
    'steg.oppsummering.barnRelasjon.ANNET': 'Anna',
    'steg.oppsummering.utenlandsoppholdIPerioden.header': 'Skal du vere i utlandet i perioden?',
    'steg.oppsummering.utenlandsoppholdIPerioden.listTitle': 'Utlandsopphold i perioden',
    'steg.oppsummering.ferieuttakIPerioden.header': 'Skal du ta ut ferie i perioden?',
    'steg.oppsummering.ferieuttakIPerioden.listTitle': 'Ferie i perioden',

    'steg.oppsummering.omsorgstilbud.header': 'Omsorgstilbod i søknadsperioden',
    'steg.oppsummering.omsorgstilbud.fortid.spm':
        'Har barnet vore fast og regelmessig på skolen, i barnehagen eller i andre omsorgstilbod?',
    'steg.oppsummering.omsorgstilbud.fortid.svar.JA': 'Ja, i heile eller delar av perioden',
    'steg.oppsummering.omsorgstilbud.fortid.svar.NEI': 'Nei',
    'steg.oppsummering.omsorgstilbud.fortid.svar.USIKKER': 'Usikker',
    'steg.oppsummering.omsorgstilbud.fremtid.spm':
        'Skal barnet vere fast og regelmessig på skulen, i barnehagen eller i andre omsorgstilbod fremover i tid?',
    'steg.oppsummering.omsorgstilbud.fremtid.spm.kunFremtid':
        'Skal barnet vere fast og regelmessig på skulen, i barnehagen eller i andre omsorgstilbod?',
    'steg.oppsummering.omsorgstilbud.fremtid.svar.JA': 'Ja, i heile eller delar av perioden',
    'steg.oppsummering.omsorgstilbud.fremtid.svar.NEI': 'Nei',
    'steg.oppsummering.omsorgstilbud.fremtid.svar.USIKKER': 'Usikker',
    'steg.oppsummering.nattevåkBeredskap.header': 'Nattvak og beredskap',
    'steg.oppsummering.nattevåkBeredskap.nattevåk.beskrivelse':
        'Skildring av korleis barnet sin sjukdom gjev eit pleie- eller tilsynsbehov om nettene',
    'steg.oppsummering.nattevåkBeredskap.beredskap.beskrivelse':
        'Skildring av korleis barnet sin sjukdom gjer at du må vere i beredskap',
    'steg.oppsummering.omsorgstilbud.fast.header': 'Omsorgstilbod er likt kvar veke i perioden:',
    'steg.oppsummering.omsorgstilbud.fast.header.fortid': 'Tida har vore lik kvar veke i perioden:',

    'steg.oppsummering.omsorgstilbud.enkeltdager.header': 'Fast og regelmessig tid i omsorgstilbod:',

    'steg.oppsummering.utlandetSiste12.header': 'Har budd i utlandet i dei siste 12 månedane',
    'steg.oppsummering.utlandetNeste12.header': 'Skal bu i utlandet i dei neste 12 månedane',
    'steg.oppsummering.utlandetSiste12.liste.header': 'Utanlandsopphald siste 12 månedar',
    'steg.oppsummering.utlandetNeste12.liste.header': 'Utanlandsopphald neste 12 månedar',

    'steg.oppsummering.bekrefterOpplysninger':
        'Eg stadfestar at opplysningane eg har gjeve er riktige, og at eg ikkje har halde tilbake opplysningar som har tydning for retten min til pleiepengar.',

    'steg.oppsummering.arbeidssituasjon.header': 'Arbeidssituasjonen din',
    'steg.oppsummering.arbeidssituasjon.omsorgsstønad.title': 'Omsorgsstønad',
    'steg.oppsummering.arbeidssituasjon.omsorgsstønad.mottarIkke': 'Mottar ikkje omsorgsstønad frå kommuna',
    'steg.oppsummering.arbeidssituasjon.omsorgsstønad.mottar': 'Mottar omsorgsstønad frå kommuna',
    'steg.oppsummering.arbeidssituasjon.omsorgsstønad.mottarHelePerioden':
        'Mottar omsorgsstønaden gjennom heile perioden eg søkjer om',
    'steg.oppsummering.arbeidssituasjon.omsorgsstønad.mottarDelerAvPerioden':
        'Mottar omsorgsstønaden gjennom i delar av perioden eg søkjer om',
    'steg.oppsummering.arbeidssituasjon.omsorgsstønad.antallTimer':
        'Antal timar i veka du har vedtak om omsorgsstønad: {timer, plural, one {# time} other {# timer}}',
    'steg.oppsummering.arbeidssituasjon.omsorgsstønad.startet': 'Startar {startdato}',
    'steg.oppsummering.arbeidssituasjon.omsorgsstønad.sluttet': 'Sluttar {sluttdato}',

    'steg.oppsummering.arbeidssituasjon.fosterhjemsgodtgjørelse.title': 'Fosterheimsgodt­gjersle',
    'steg.oppsummering.arbeidssituasjon.fosterhjemsgodtgjørelse.mottar': 'Mottar fosterheimsgodtgjersle frå kommuna',
    'steg.oppsummering.arbeidssituasjon.fosterhjemsgodtgjørelse.mottarIkke':
        'Mottar ikkje fosterheimsgodtgjersle frå kommuna',
    'steg.oppsummering.arbeidssituasjon.fosterhjemsgodtgjørelse.frikjøpt': 'Er frikjøpt frå jobb',
    'steg.oppsummering.arbeidssituasjon.fosterhjemsgodtgjørelse.ikkeFrikjøpt': 'Er ikkje frikjøpt frå jobb',
    'steg.oppsummering.arbeidssituasjon.fosterhjemsgodtgjørelse.mottarHelePerioden':
        'Mottar fosterheimsgodtgjersla gjennom heile perioden eg søkjer om',
    'steg.oppsummering.arbeidssituasjon.fosterhjemsgodtgjørelse.mottarDelerAvPerioden':
        'Mottar fosterheimsgodtgjersla i delar av perioden eg søkjer om',
    'steg.oppsummering.arbeidssituasjon.fosterhjemsgodtgjørelse.startet': 'Startar {startdato}',
    'steg.oppsummering.arbeidssituasjon.fosterhjemsgodtgjørelse.sluttet': 'Sluttar {sluttdato}',

    'steg.oppsummering.arbeidssituasjon.fosterhjemsgodtgjørelse.frikjøptBeskrivelse.tittel':
        'Detaljar om frikjøp og fosterheimsgodtgjersle:',

    'steg.oppsummering.vedlegg.header': 'Legeerklæring',
    'steg.oppsummering.vedlegg.listTitle': 'Dokument er lasta opp',

    'steg.oppsummering.validering.navigasjonTilStegInfo':
        'Ver venleg å gå tilbake og sjekk informasjonen du har fylt ut. Når du har gjort det, trykkjer du på "Fortset"-knappen for å gå vidare.',
    'steg.oppsummering.validering.navigasjonTilStegGåTil': 'Gå til',
    'steg.oppsummering.validering.tidsromKunHelg':
        'Oops, noko gjekk gale med perioden du søkjer for. Du kan kun få utbetalt pleiepengar for kvardagar. Det blir ikkje utbetalt pleiepengar for laurdag eller sundag sjølv om du har hatt fråvær frå jobb for å pleie barn. Du kan difor ikkje søkje pleiepengar kun for laurdag og/eller sundag.',
    'steg.oppsummering.validering.manglerVedlegg':
        'Oops, noko gjekk gale med legeerklæringa. Ver venleg å gå tilbake og kontroller at den er lasta opp riktig.',
    'steg.oppsummering.validering.fødselsattest':
        'Oops, noko gjekk gale med fødselsattest. Ver venleg å gå tilbake og kontroller at den er lasta opp riktig.',
    'steg.oppsummering.validering.omsorgstilbud.ugyldig':
        'Oops, noko gjekk gale med omsorgstilbodet som er registrert.',
    'steg.oppsummering.validering.omsorgstilbud.nattevåkBeskrivelseForLang':
        'Oops, no ser me at teksten du har skrive om nattvak er for lang.',
    'steg.oppsummering.validering.omsorgstilbud.beredskapBeskrivelseForLang':
        'Oops, no ser me at teksten du har skrive om beredskap er for lang.',
    'steg.oppsummering.validering.arbeidssituasjon.sn.forHøyInntekt':
        'Oops, no ser me at inntekta du har oppgjeve for verksemda di er for høg.',

    'oppsummering.arbeidssituasjon.arbeidsgiver.ansatt': 'Er tilsett',
    'oppsummering.arbeidssituasjon.avsluttet.arbeidsgiver.ansatt': 'Er ikkje tilsett lenger',
    'oppsummering.arbeidssituasjon.tid': 'Jobbar normalt {timer, plural, one {# time} other {# timer}} per veke',
    'oppsummering.arbeidssituasjon.avsluttet.tid':
        'Jobba normalt {timer, plural, one {# time} other {# timer}} per veke',
    'oppsummering.arbeidssituasjon.avsluttet.sluttetFørSøknadsperiode': 'Slutta før {periodeFra}',
    'oppsummering.arbeidssituasjon.avsluttet.sluttetISøknadsperiode': 'Slutta etter {periodeFra}',

    'oppsummering.arbeidssituasjon.arbeidsgivere.ingenIPeriode.header': 'Arbeidsgjevar',
    'oppsummering.arbeidssituasjon.arbeidsgivere.ingenIPeriode.tekst': 'Er ikkje tilsett i søknadsperioden',

    'oppsummering.arbeidssituasjon.frilanser.header': 'Frilans og oppdrag som blir rekna som frilansoppdrag',
    'oppsummering.arbeidssituasjon.frilans.erIkkeFrilanser':
        'Er ikkje frilansar og får ikkje honorar i søknadsperioden',
    'oppsummering.arbeidssituasjon.frilans.startetFørSisteTreHeleMåneder':
        'Starta som frilansar før {opptjeningStartdato}',
    'oppsummering.arbeidssituasjon.frilans.startet': 'Starta som frilansar {dato}',
    'oppsummering.arbeidssituasjon.frilans.FRILANS': 'Jobbar som frilansar',
    'oppsummering.arbeidssituasjon.frilans.FRILANS_HONORAR': 'Jobbar som frilansar og mottar honorar',
    'oppsummering.arbeidssituasjon.frilans.HONORAR': 'Mottar honorar',
    'oppsummering.arbeidssituasjon.frilans.HONORAR.misterIkkeHonorar': 'Mistar ikkje honorar i søknadsperioden',
    'oppsummering.arbeidssituasjon.frilans.HONORAR.misterHonorar': 'Mistar honorar i søknadsperioden',
    'oppsummering.arbeidssituasjon.frilans.sluttet': 'Slutta {dato}',
    'oppsummering.arbeidssituasjon.frilans.frilansoppdrag': 'Frilansoppdrag registrert i søknadsperioden:',

    'oppsummering.arbeidssituasjon.selvstendig.header': 'Sjølvstendig næringsdrivande',
    'oppsummering.arbeidssituasjon.selvstendig.erIkkeSN': 'Er ikkje sjølvstendig næringsdrivande i søknadsperioden',

    'oppsummering.arbeidssituasjon.selvstendig.erSn': 'Er sjølvstendig næringsdrivande',
    'oppsummering.arbeidssituasjon.selvstendig.flereVirksomheter': 'Har fleire verksemder',
    'oppsummering.arbeidssituasjon.selvstendig.enVirksomhet': 'Har 1 verksemd',

    'oppsummering.arbeidssituasjon.optjeningIUtlandet.listetittel': 'Jobba i anna EØS-land',
    'oppsummering.arbeidssituasjon.optjeningIUtlandet.tittel': 'Arbeidstakar eller frilansar i eit anna EØS-land',
    'oppsummering.arbeidssituasjon.optjeningIUtlandet.ja':
        'Har jobba som arbeidstakar eller frilansar i eit anna EØS-land i løpet av dei 3 siste månedane før perioden ein søkjer om',
    'oppsummering.arbeidssituasjon.optjeningIUtlandet.nei':
        'Har ikkje jobba som arbeidstakar eller frilansar i eit anna EØS-land i løpet av dei 3 siste månedane før perioden ein søkjer om',
    'oppsummering.arbeidssituasjon.optjeningIUtlandet.periode': 'Periode med jobb i eit anna EØS-land',
    'oppsummering.arbeidssituasjon.optjeningIUtlandet.perioder': 'Periodar med jobb i eit anna EØS-land',

    'oppsummering.arbeidssituasjon.utenlandskNæring.tittel': 'Sjølvstendig næringsdrivande i eit anna EØS-land',
    'oppsummering.arbeidssituasjon.utenlandskNæring.nei':
        'Har ikkje jobba som sjølvstendig næringsdrivande i eit anna EØS-land i løpet av dei 3 siste åra før perioden ein søkjer om',
    'oppsummering.arbeidssituasjon.utenlandskNæring.ja':
        'Har jobba som sjølvstendig næringsdrivande i eit anna EØS-land i løpet av dei 3 siste åra før perioden ein søkjer om',
    'oppsummering.arbeidssituasjon.utenlandskNæring.næringer': 'Næringsverksemder i andre EØS-land',
    'oppsummering.arbeidssituasjon.utenlandskNæring.næring': 'Næringsverksemd i eit anna EØS-land',

    'opptjeningIUtlandetSummaryItem.periode': 'Periode: {periode}',
    'opptjeningIUtlandetSummaryItem.info': 'Jobba i {landnavn} som {hva} hos {hvor}',

    'oppsummering.arbeidssituasjon.utenlandskNæring.listetittel':
        'Jobba som sjølvstendig næringsdrivande i eit anna EØS-land',

    'oppsummering.arbeidIPeriode.jobbIPerioden.header': 'Jobb i søknadsperioden',
    'oppsummering.arbeidIPeriode.jobbIPerioden': 'Jobb i søknadsperioden',
    'oppsummering.arbeidIPeriode.arbeiderIPerioden.nei': 'Jobbar ikkje i søknadsperioden',
    'oppsummering.arbeidIPeriode.arbeiderIPerioden.nei.honorar': 'Mistar alt av honorar',
    'oppsummering.arbeidIPeriode.arbeiderIPerioden.somVanlig':
        'Jobbar som normalt, har ikkje fråvær på grunn av pleiepengar i søknadsperioden',
    'oppsummering.arbeidIPeriode.arbeiderIPerioden.somVanlig.honorar': 'Mistar ikkje honorar på grunn av pleiepengar',
    'oppsummering.arbeidIPeriode.arbeiderIPerioden.redusert':
        'Kombinerar delvis jobb med pleiepengar i søknadsperioden',

    'oppsummering.arbeidIPeriode.arbeiderIPerioden.frilanser.REDUSERT':
        'Frilansar: Kombinerar delvis jobb med pleiepengar',
    'oppsummering.arbeidIPeriode.arbeiderIPerioden.frilanser.HELT_FRAVÆR': 'Frilansar: Jobbar ikkje i søknadsperioden',
    'oppsummering.arbeidIPeriode.arbeiderIPerioden.frilanser.SOM_VANLIG':
        'Frilansar: Jobbar som normalt, har ikkje fråvær på grunn av pleiepengar',

    'oppsummering.arbeidIPeriode.arbeiderIPerioden.prosent': 'Jobbar {prosent} prosent av normalt',
    'oppsummering.arbeidIPeriode.arbeiderIPerioden.timerPerUke': 'Jobbar {timer} per veke',
    'oppsummering.arbeidIPeriode.arbeiderIPerioden.ulikeUker.timer.tittel':
        'Jobber ulikt antal timar i vekene i søknadsperioden:',
    'oppsummering.arbeidIPeriode.arbeiderIPerioden.ulikeUker.enkeltuke.timer.tittel': 'Jobbar:',
    'oppsummering.arbeidIPeriode.arbeiderIPerioden.ulikeUker.timer.uke': 'Veke {ukenummer}: {timer}',

    'oppsummering.virksomhet.virksomhetInfo.tittel': 'Næringsverksemd som du har lagt inn:',
};
