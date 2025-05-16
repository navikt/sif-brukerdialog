import { oppsummeringMessages_nb } from './nb';

export const oppsummeringMessages_nn: Record<keyof typeof oppsummeringMessages_nb, string> = {
    'step.oppsummering.stepIndicatorLabel': 'Oppsummering',
    'step.oppsummering.nextButtonLabel': 'Send søknad',

    'step.oppsummering.info':
        'Les gjennom oppsummeringa før du sender inn søknaden. Dersom du vil gjere endringar, kan du gå tilbake.',
    'step.oppsummering.søker.header': 'Om deg',
    'step.oppsummering.søker.navn': 'Namn',
    'step.oppsummering.søker.fnr': 'Fødselsnummer',

    'step.oppsummering.arbeidsforhold.tittel': 'Fråvær frå arbeid',
    'step.oppsummering.arbeidsforhold.forhold': '{navn} (organisasjonsnummer: {organisasjonsnummer})',
    'step.oppsummering.arbeidsforhold.ingenArbeidsforhold': 'Ingen arbeidsgjevar er valt',
    'step.oppsummering.arbeidsforhold.harHattFravær.spm':
        'Har du hatt fråvær hos denne arbeidsgjevaren fordi du har brukt omsorgsdagar?',
    'step.oppsummering.arbeidsforhold.harArbeidsgiverUtbetaltDegLønnForOmsorgsdagene.spm':
        'Har arbeidsgjevaren utbetalt deg løn for dei dagane du har brukt omsorgsdagar?',
    'step.oppsummering.arbeidsforhold.utbetalingsårsak.spm':
        'Kva er grunnen til at du søkjer om utbetaling av omsorgspengar frå Nav?',
    'step.oppsummering.arbeidsforhold.utbetalingsårsak.IKKE_BESVART': 'Ikkje svara på',
    'step.oppsummering.arbeidsforhold.utbetalingsårsak.NYOPPSTARTET_HOS_ARBEIDSGIVER':
        'Eg har jobba mindre enn 4 veker hos denne arbeidsgjevaren',
    'step.oppsummering.arbeidsforhold.utbetalingsårsak.ARBEIDSGIVER_KONKURS': 'Arbeidsgjevaren er konkurs',
    'step.oppsummering.arbeidsforhold.utbetalingsårsak.KONFLIKT_MED_ARBEIDSGIVER':
        'Det er usemje mellom meg og arbeidsgjevar',
    'step.oppsummering.arbeidsforhold.årsakMinde4Uker.spm':
        'Kva var situasjonen din rett før du starta hos denne arbeidsgjevaren?',
    'step.oppsummering.arbeidsforhold.årsakMinde4Uker.JOBBET_HOS_ANNEN_ARBEIDSGIVER':
        'Eg jobba for ein annan arbeidsgivar',
    'step.oppsummering.arbeidsforhold.årsakMinde4Uker.VAR_FRILANSER': 'Eg var frilansar',
    'step.oppsummering.arbeidsforhold.årsakMinde4Uker.VAR_SELVSTENDIGE': 'Eg var sjølvstendig næringsdrivande',
    'step.oppsummering.arbeidsforhold.årsakMinde4Uker.SØKTE_ANDRE_UTBETALINGER':
        'Eg søkte om eller mottok dagpengar, foreldrepengar, svangerskapspengar, sjukepengar, omsorgspengar, pleiepengar eller opplæringspengar.',
    'step.oppsummering.arbeidsforhold.årsakMinde4Uker.ARBEID_I_UTLANDET':
        'Eg var i arbeid, hadde frilansoppdrag eller næringsverksemd i utlandet',
    'step.oppsummering.arbeidsforhold.årsakMinde4Uker.UTØVDE_VERNEPLIKT': 'Eg utøvde verneplikt',
    'step.oppsummering.arbeidsforhold.årsakMinde4Uker.ANNET': 'Anna',
    'step.oppsummering.arbeidsforhold.konflikt.forklaringTittel':
        'Forklar situasjonen med arbeidsgjevaren din. Få med kvifor du meiner at du har rett til å få omsorgspengar frå arbeidsgjevar.',
    'step.oppsummering.arbeidsforhold.konflikt.dokumenter.header':
        'Forklaring frå arbeidsgjevar om kvifor dei ikkje utbetalar:',
    'step.oppsummering.arbeidsforhold.konflikt.dokumenter.ikkelastetopp': 'Ikkje lasta opp, må ettersendast',
    'step.oppsummering.arbeidsforhold.fravær.heleDager.header': 'Heile dagar med fråvær',
    'step.oppsummering.arbeidsforhold.fravær.heleDager.item': 'Frå og med {fom}, til og med {tom}',
    'step.oppsummering.arbeidsforhold.delvisFravær.header': 'Dagar med delvis fråvær',
    'step.oppsummering.arbeidsforhold.delvisFravær.item':
        '{dato}: Skulle jobba {timerSkulleJobbet}. Borte frå jobb {timerBorte}.',
    'step.oppsummering.fravær.årsak': 'Årsak: {årsak}.',

    'step.oppsummering.utenlandsopphold.titel': 'Utanlandsopphald',
    'step.oppsummering.utenlandsoppholdIPerioden.listetittel': 'Utanlandsopphald i perioden du har brukt omsorgsdagar',

    'step.oppsummering.medlemskap.header': 'Medlemskap i folketrygda',
    'step.oppsummering.utlandetSiste12.header': 'Har du budd i utlandet dei siste 12 månadane?',
    'step.oppsummering.utlandetSiste12.liste.header': 'Bustadar i utlandet siste 12 månadar',
    'step.oppsummering.utlandetNeste12.header': 'Skal du bu i utlandet dei neste 12 månadane?',
    'step.oppsummering.utlandetNeste12.liste.header': 'Bustadar i utlandet neste 12 månadar',

    'step.oppsummering.dokumenter.header': 'Vedlegg',

    'step.oppsummering.deltBosted.ingenVedlegg': 'Inga avtale om delt bustad er lasta opp. Denne må ettersendast.',
    'step.oppsummering.deltBosted.header': 'Avtale om delt fast bustad',
    'step.oppsummering.deltBosted.dokumenter': 'Dokument lasta opp',

    'step.oppsummering.legeerklæring.ingenVedlegg': 'Ingen legeerklæring er lasta opp. Denne må ettersendast.',
    'step.oppsummering.fosterbarn': 'Fosterbarn',
    'step.oppsummering.fosterbarn.harFosterbarn': 'Har du fosterbarn?',
    'step.oppsummering.fosterbarn.listItem': ' (fnr. {identitetsnummer})',

    'step.oppsummering.legeerklæring.header': 'Legeerklæring',
    'step.oppsummering.legeerklæring.liste.header': 'Dokument lasta opp',

    'step.oppsummering.bekrefterOpplysninger':
        'Eg stadfestar at opplysningane eg har gjeve er riktige, og at eg ikkje har halde tilbake opplysningar som har tyding for retten min til omsorgsdagar.',
    'step.oppsummering.bekrefterOpplysninger.ikkeBekreftet': 'Du må stadfeste opplysningane',

    'step.oppsummering.dineBarn.tittel': 'Dine barn',
    'step.oppsummering.dineBarn.registrerteBarn': 'Barn me har funne på deg i folkeregisteret',
    'step.oppsummering.dineBarn.andreBarn': 'Andre barn du har lagt til her',
    'step.oppsummering.dineBarn.født': 'Fødselsdato: {dato}',
    'step.oppsummering.dineBarn.id': 'Fødselsnummer/id: {identitetsnummer}',
    'step.oppsummering.dineBarn.fosterbarn': 'Barnet er fosterbarn mitt',
    'step.oppsummering.sendSøknad': 'Send søknad',
};
