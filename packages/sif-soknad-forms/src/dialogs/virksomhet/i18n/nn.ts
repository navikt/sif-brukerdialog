import { virksomhetMessages_nb } from './nb';

export const virksomhetMessages_nn: Record<keyof typeof virksomhetMessages_nb, string> = {
    '@sifSoknadForms.virksomhet.Norge': 'Noreg',
    '@sifSoknadForms.virksomhet.Nei': 'Nei',
    '@sifSoknadForms.virksomhet.dialog.tittel': 'Opplysningar om verksemda di',
    '@sifSoknadForms.virksomhet.dialog.avbrytKnapp': 'Avbryt',
    '@sifSoknadForms.virksomhet.dialog.leggTilKnapp': 'Legg til',
    '@sifSoknadForms.virksomhet.dialog.oppdaterKnapp': 'Oppdater',
    '@sifSoknadForms.virksomhet.form.næringstype.legend': 'Kva type verksemd har du?',
    '@sifSoknadForms.virksomhet.form.næringstype.FISKE': 'Fiskar',
    '@sifSoknadForms.virksomhet.form.næringstype.JORDBRUK_SKOGBRUK': 'Jordbrukar',
    '@sifSoknadForms.virksomhet.form.næringstype.DAGMAMMA': 'Dagmamma eller familiebarnehage i eigen heim',
    '@sifSoknadForms.virksomhet.form.næringstype.ANNEN': 'Anna',
    '@sifSoknadForms.virksomhet.form.fiskerErPåBladB.legend': 'Er du fiskar på blad B?',
    '@sifSoknadForms.virksomhet.form.navnPåVirksomheten.label': 'Kva heiter verksemda?',
    '@sifSoknadForms.virksomhet.form.registrertINorge.legend': 'Er {navn} registrert i Noreg?',
    '@sifSoknadForms.virksomhet.form.veileder_fisker.tittel': 'Viss du ikkje har organisasjonsnummer',
    '@sifSoknadForms.virksomhet.form.veileder_fisker':
        'Viss du ikkje har organisasjonsnummer, svarer du nei på spørsmålet "Er {navn} registrert i Noreg?" I nedtrekkslista vel du at verksemda er registrert i Noreg.',
    '@sifSoknadForms.virksomhet.form.registrertILand.label': 'I kva land er {navn} registrert?',
    '@sifSoknadForms.virksomhet.form.organisasjonsnummer.label': 'Kva er organisasjonsnummeret?',
    '@sifSoknadForms.virksomhet.form.tidsperiode.legend': 'Når starta du {navn}?',
    '@sifSoknadForms.virksomhet.form.fom.label': 'Startdato',
    '@sifSoknadForms.virksomhet.form.tom.label': 'Eventuell sluttdato',
    '@sifSoknadForms.virksomhet.form.erPågående.label': 'Er pågåande',
    '@sifSoknadForms.virksomhet.form.næringsinntekt.label':
        'Kva har du hatt i næringsresultat før skatt dei siste 12 månadane?',
    '@sifSoknadForms.virksomhet.form.næringsinntekt.flereVirksomheter.label':
        'Kva har du hatt totalt i næringsresultat før skatt dei siste 12 månadane?',
    '@sifSoknadForms.virksomhet.form.næringsinntekt.flereVirksomheter.header':
        'Næringsresultat for alle verksemdene dine',
    '@sifSoknadForms.virksomhet.form.næringsinntekt.flereVirksomheter.info':
        'Du har opplyst at du har fleire næringsverksemder. Her skal du leggje inn næringsresultatet totalt for alle verksemdene du har.',
    '@sifSoknadForms.virksomhet.form.harBlittYrkesaktiv.legend':
        'Har du byrja i arbeidslivet dei 3 siste ferdiglikna åra?',
    '@sifSoknadForms.virksomhet.form.blittYrkesaktivDato.label': 'Oppgje dato for når du byrja i arbeidslivet',
    '@sifSoknadForms.virksomhet.form.varigEndring.legend':
        'Har du hatt ei varig endring i nokon av arbeidsforholda, verksemdene eller arbeidssituasjonen din dei siste fire åra?',
    '@sifSoknadForms.virksomhet.form.varigEndring.dato.label': 'Oppgje dato for endringa',
    '@sifSoknadForms.virksomhet.form.varigEndring.inntekt.label':
        'Oppgje næringsinntekta di etter endringa. Oppgje årsinntekta i heile kroner.',
    '@sifSoknadForms.virksomhet.form.varigEndring.forklaring.label':
        'Her kan du skrive kort kva som har endra seg i arbeidsforholda, verksemdene eller arbeidssituasjonen din',
    '@sifSoknadForms.virksomhet.form.harRegnskapsfører.legend': 'Har du rekneskapsførar?',
    '@sifSoknadForms.virksomhet.form.regnskapsfører_navn.label': 'Oppgje namnet til rekneskapsføraren',
    '@sifSoknadForms.virksomhet.form.regnskapsfører_telefon.label': 'Oppgje telefonnummeret til rekneskapsføraren',
    '@sifSoknadForms.virksomhet.form.veileder_innhenter_info':
        'Me innhentar opplysningar om verksemda og inntekta di frå offentlege register. Me tar kontakt med deg viss vi treng fleire opplysningar.',
    '@sifSoknadForms.virksomhet.summary.navn': 'Namn',
    '@sifSoknadForms.virksomhet.summary.næringstype': 'Næringstype',
    '@sifSoknadForms.virksomhet.summary.land': 'Land',
    '@sifSoknadForms.virksomhet.summary.organisasjonsnummer': 'Organisasjonsnummer',
    '@sifSoknadForms.virksomhet.summary.startet': 'Starta',
    '@sifSoknadForms.virksomhet.summary.avsluttet': 'Avslutta',
    '@sifSoknadForms.virksomhet.summary.pågående': 'pågåande',
    '@sifSoknadForms.virksomhet.summary.fisker.påBladB': 'på Blad B',
    '@sifSoknadForms.virksomhet.summary.fisker.ikkePåBladB': 'ikkje på Blad B',
    '@sifSoknadFormsVirksomhetForm.validation.næringstype.noValue': 'Vel kva type verksemd du har frå lista.',
    '@sifSoknadFormsVirksomhetForm.validation.fiskerErPåBladB.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på spørsmålet om du er fiskar på Blad B.',
    '@sifSoknadFormsVirksomhetForm.validation.navnPåVirksomheten.stringHasNoValue': 'Skriv inn namnet på verksemda di.',
    '@sifSoknadFormsVirksomhetForm.validation.navnPåVirksomheten.stringContainsUnicodeChacters':
        'Namnet på verksemda inneheld ugyldige teikn. Prøv å skrive det inn sjølv, i staden for å lime det inn.',
    '@sifSoknadFormsVirksomhetForm.validation.registrertINorge.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på spørsmålet om verksemda di er registrert i Noreg.',
    '@sifSoknadFormsVirksomhetForm.validation.registrertILand.noValue':
        'Du må velja kva for eit land verksemda di er registrert i. Vel land frå lista.',
    '@sifSoknadFormsVirksomhetForm.validation.organisasjonsnummer.orgNumberHasNoValue':
        'Skriv inn organisasjonsnummeret. Eit gyldig organisasjonsnummer inneheld 9 siffer.',
    '@sifSoknadFormsVirksomhetForm.validation.organisasjonsnummer.orgNumberHasInvalidFormat':
        'Du har oppgjeve eit ugyldig organisasjonsnummer. Oppgje eit gyldig organisasjonsnummer som inneheld 9 siffer.',
    '@sifSoknadFormsVirksomhetForm.validation.fom.dateHasNoValue':
        'Du må oppgje kva dato du starta verksemda. Skriv inn eller vel startdato frå datoveljaren.',
    '@sifSoknadFormsVirksomhetForm.validation.fom.dateIsAfterMax':
        'Startdatoen for verksemda må vera før dags dato. Skriv inn eller vel startdato frå datoveljaren.',
    '@sifSoknadFormsVirksomhetForm.validation.fom.dateHasInvalidFormat':
        'Du må oppgje startdato for verksemda i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@sifSoknadFormsVirksomhetForm.validation.fom.fromDateIsAfterToDate':
        'Startdatoen for verksemda må vera før sluttdatoen, eller på same dag som sluttdatoen. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadFormsVirksomhetForm.validation.tom.dateHasNoValue':
        'Du må oppgje kva dato du avslutta verksemda. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadFormsVirksomhetForm.validation.tom.dateIsBeforeMin':
        'Sluttdatoen kan ikkje vera før startdatoen. Skriv inn eller vel sluttdato frå datoveljaren.',
    '@sifSoknadFormsVirksomhetForm.validation.tom.dateIsAfterMax':
        'Sluttdatoen kan ikkje vera etter dags dato. Skriv inn eller vel sluttdato frå datoveljaren.',
    '@sifSoknadFormsVirksomhetForm.validation.tom.dateHasInvalidFormat':
        'Du må oppgje dato for når du avslutta verksemda i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@sifSoknadFormsVirksomhetForm.validation.tom.toDateIsBeforeFromDate':
        'Sluttdatoen kan ikkje vera før startdatoen. Skriv inn eller vel sluttdato frå datoveljaren.',
    '@sifSoknadFormsVirksomhetForm.validation.næringsinntekt.numberHasNoValue': 'Du må oppgje næringsinntekta.',
    '@sifSoknadFormsVirksomhetForm.validation.næringsinntekt.numberHasDecimals':
        'Du må oppgje næringsinntekta utan desimalar.',
    '@sifSoknadFormsVirksomhetForm.validation.næringsinntekt.numberHasInvalidFormat':
        'Du må oppgje eit gyldig tal for næringsinntekta. Eit gyldig tal inneheld berre siffer.',
    '@sifSoknadFormsVirksomhetForm.validation.næringsinntekt.numberIsTooSmall': 'Talet er for lågt.',
    '@sifSoknadFormsVirksomhetForm.validation.næringsinntekt.numberIsTooLarge': 'Talet er for høgt.',
    '@sifSoknadFormsVirksomhetForm.validation.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på spørsmålet om du har byrja i arbeidslivet.',
    '@sifSoknadFormsVirksomhetForm.validation.blittYrkesaktivDato.dateHasNoValue':
        'Du må oppgje dato for når du byrja i arbeidslivet.',
    '@sifSoknadFormsVirksomhetForm.validation.blittYrkesaktivDato.dateHasInvalidFormat':
        'Du må oppgje dato i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@sifSoknadFormsVirksomhetForm.validation.blittYrkesaktivDato.dateIsAfterMax':
        'Datoen kan ikkje vera etter dags dato.',
    '@sifSoknadFormsVirksomhetForm.validation.blittYrkesaktivDato.dateIsBeforeMin': 'Datoen kan ikkje vera før {dato}.',
    '@sifSoknadFormsVirksomhetForm.validation.hattVarigEndringAvNæringsinntektSiste4Kalenderår.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på spørsmålet om varig endring.',
    '@sifSoknadFormsVirksomhetForm.validation.varigEndringINæringsinntekt_dato.dateHasNoValue':
        'Du må oppgje dato for varig endring.',
    '@sifSoknadFormsVirksomhetForm.validation.varigEndringINæringsinntekt_dato.dateHasInvalidFormat':
        'Du må oppgje dato for varig endring i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@sifSoknadFormsVirksomhetForm.validation.varigEndringINæringsinntekt_dato.dateIsAfterMax':
        'Datoen for varig endring kan ikkje vera etter {dato}.',
    '@sifSoknadFormsVirksomhetForm.validation.varigEndringINæringsinntekt_dato.dateIsBeforeMin':
        'Datoen for varig endring kan ikkje vera før {dato}.',
    '@sifSoknadFormsVirksomhetForm.validation.varigEndringINæringsinntekt_inntektEtterEndring.numberHasNoValue':
        'Du må oppgje inntekt etter inntektsendringa.',
    '@sifSoknadFormsVirksomhetForm.validation.varigEndringINæringsinntekt_inntektEtterEndring.numberHasDecimals':
        'Du må oppgje inntekt utan desimalar.',
    '@sifSoknadFormsVirksomhetForm.validation.varigEndringINæringsinntekt_inntektEtterEndring.numberHasInvalidFormat':
        'Du må oppgje eit gyldig tal for ny inntekt. Eit gyldig tal inneheld berre siffer.',
    '@sifSoknadFormsVirksomhetForm.validation.varigEndringINæringsinntekt_inntektEtterEndring.numberIsTooLarge':
        'Talet er for høgt.',
    '@sifSoknadFormsVirksomhetForm.validation.varigEndringINæringsinntekt_inntektEtterEndring.numberIsTooSmall':
        'Talet er for lågt.',
    '@sifSoknadFormsVirksomhetForm.validation.varigEndringINæringsinntekt_forklaring.stringHasNoValue':
        'Skriv ei forklaring på kvifor du har hatt ei varig endring i næringsinntekta.',
    '@sifSoknadFormsVirksomhetForm.validation.varigEndringINæringsinntekt_forklaring.stringIsTooLong':
        'Du har brukt for mange teikn. Teksten kan ikkje innehalda fleire enn {maks} teikn.',
    '@sifSoknadFormsVirksomhetForm.validation.varigEndringINæringsinntekt_forklaring.stringIsTooShort':
        'Du har brukt for få teikn. Teksten må innehalda minst {min} teikn.',
    '@sifSoknadFormsVirksomhetForm.validation.harRegnskapsfører.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på spørsmålet om du har rekneskapsførar.',
    '@sifSoknadFormsVirksomhetForm.validation.regnskapsfører_navn.stringHasNoValue':
        'Skriv inn namnet på rekneskapsføraren din.',
    '@sifSoknadFormsVirksomhetForm.validation.regnskapsfører_navn.stringIsTooLong':
        'Namnet kan ikkje innehalda fleire enn {maks} teikn.',
    '@sifSoknadFormsVirksomhetForm.validation.regnskapsfører_navn.stringIsTooShort':
        'Namnet må innehalda minst {min} teikn.',
    '@sifSoknadFormsVirksomhetForm.validation.regnskapsfører_navn.stringContainsUnicodeChacters':
        'Namnet inneheld ugyldige teikn. Prøv å skrive det inn sjølv, i staden for å lime det inn.',
    '@sifSoknadFormsVirksomhetForm.validation.regnskapsfører_telefon.stringHasNoValue':
        'Skriv inn telefonnummeret til rekneskapsføraren din.',
    '@sifSoknadFormsVirksomhetForm.validation.regnskapsfører_telefon.stringIsTooLong':
        'Telefonnummeret kan ikkje innehalda fleire enn {maks} teikn.',
    '@sifSoknadFormsVirksomhetForm.validation.regnskapsfører_telefon.stringIsTooShort':
        'Telefonnummeret må innehalda minst {min} teikn.',
    '@sifSoknadFormsVirksomhetForm.validation.regnskapsfører_telefon.stringContainsUnicodeChacters':
        'Telefonnummeret inneheld ugyldige teikn. Prøv å skrive det inn sjølv, i staden for å lime det inn.',
    '@sifSoknadFormsVirksomhetForm.validation.regnskapsfører_telefon.stringHasInvalidFormat':
        'Telefonnummeret inneheld ugyldige teikn. Telefonnummeret kan berre innehalda tal, mellomrom og +.',
};
