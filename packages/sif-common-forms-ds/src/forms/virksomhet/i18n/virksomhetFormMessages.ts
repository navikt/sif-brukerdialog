const nb = {
    '@forms.virksomhet.næringstype_FISKE': 'Fisker',
    '@forms.virksomhet.næringstype_JORDBRUK_SKOGBRUK': 'Jordbruker',
    '@forms.virksomhet.næringstype_DAGMAMMA': 'Dagmamma eller familiebarnehage i eget hjem',
    '@forms.virksomhet.næringstype_ANNEN': 'Annet',
    '@forms.virksomhet.form_title': 'Opplysninger om virksomheten din',
    '@forms.virksomhet.form_title.flere': 'Opplysninger om den eldste virksomheten din',
    '@forms.virksomhet.hvilken_type_virksomhet': 'Hvilken type virksomhet har du?',
    '@forms.virksomhet.hvilken_type_virksomhet.flere': 'Hvilken type virksomhet er den eldste virksomheten din?',
    '@forms.virksomhet.hva_heter_virksomheten': 'Hva heter virksomheten?',
    '@forms.virksomhet.fisker_blad_b': 'Er du fisker på blad B?',
    '@forms.virksomhet.veileder_fisker.tittel': `Hvis du ikke har organiasjonsnummer`,
    '@forms.virksomhet.veileder_fisker': `Hvis du ikke har organisasjonsnummer, svarer du nei på spørsmålet "Er {navnPåVirksomheten} registrert i Norge?" I nedtrekkslisten velger du at virksomheten er registrert i Norge.`,
    '@forms.virksomhet.registert_i_norge': `Er {navnPåVirksomheten} registert i Norge?`,
    '@forms.virksomhet.registert_i_hvilket_land': `I hvilket land er {navnPåVirksomheten} registrert i?`,
    '@forms.virksomhet.organisasjonsnummer': 'Hva er organisasjonsnummeret?',
    '@forms.virksomhet.startdato': `Når startet du {navnPåVirksomheten}?`,
    '@forms.virksomhet.kalender_fom': 'Startdato',
    '@forms.virksomhet.kalender_tom': 'Eventuell sluttdato',
    '@forms.virksomhet.kalender_pågående': 'Er pågående',
    '@forms.virksomhet.nyoppstartet.næringsinntektFlere.header': 'Næringsresultat for alle virksomhetene dine',
    '@forms.virksomhet.nyoppstartet.næringsinntektFlere.info':
        'Du har opplyst at du har flere næringsvirksomheter. Her skal du legge inn næringsresultatet totalt for alle virksomhetene du har.',
    '@forms.virksomhet.ikkeNyoppstartet.næringsinntektFlere.header': 'Næringsvirksomhetene dine',
    '@forms.virksomhet.ikkeNyoppstartet.næringsinntektFlere.info':
        'Du har opplyst at du har flere næringsvirksomheter som selvstendig næringsdrivende. Nå skal du svare på spørsmål som gjelder alle virksomhetene dine.',
    '@forms.virksomhet.næringsinntekt': 'Næringsinntekt',
    '@forms.virksomhet.næringsinntekt.enVirksomhet.spm':
        'Hva har du hatt i næringsresultat før skatt de siste 12 månedene?',
    '@forms.virksomhet.næringsinntekt.enVirksomhet.spm.description':
        'Hvis virksomheten har vart i kortere tid enn 12 måneder, kan du bruke denne perioden og regne om til årsinntekt. Oppgi beløpet i hele kroner.',
    '@forms.virksomhet.næringsinntekt.flereVirksomheter.spm':
        'Hva har du hatt totalt i næringsresultat før skatt de siste 12 månedene?',
    '@forms.virksomhet.næringsinntekt.flereVirksomheter.spm.description':
        'Hvis virksomhetene har vart i kortere tid enn 12 måneder, kan du bruke denne perioden og regne om til årsinntekt. Oppgi beløpet i hele kroner.',
    '@forms.virksomhet.hvaErNæringsresultat.enVirksomhet.text':
        'Næringsresultatet er inntekter du har i næringen din, minus utgifter og avskrivninger.',
    '@forms.virksomhet.hvaErNæringsresultat.flereVirksomheter.text':
        'Næringsresultatet er inntekter du har i næringene din, minus utgifter og avskrivninger.',
    '@forms.virksomhet.hvaErNæringsresultat.title': 'Hva er næringsresultatet?',
    '@forms.virksomhet.har_blitt_yrkesaktiv': 'Har du begynt i arbeidslivet i løpet av de 3 siste ferdigliknede årene?',
    '@forms.virksomhet.har_blitt_yrkesaktiv_info_title': 'Hva betyr dette?',
    '@forms.virksomhet.har_blitt_yrkesaktiv_info':
        'Du skal svare ja på spørsmålet hvis du før oppstart av næringsvirksomheten din hadde lav eller ingen inntekt.',
    '@forms.virksomhet.har_blitt_yrkesaktiv_dato': 'Oppgi dato for når du begynte i arbeidslivet',
    '@forms.virksomhet.varig_endring_spm':
        'Har du hatt en varig endring i noen av arbeidsforholdene, virksomhetene eller arbeidssituasjonen din de siste fire årene?',
    '@forms.virksomhet.varig_endring_dato': 'Oppgi dato for endringen',
    '@forms.virksomhet.varig_endring_inntekt':
        'Oppgi næringsinntekten din etter endringen. Oppgi årsinntekten i hele kroner.',
    '@forms.virksomhet.varig_endring_tekst':
        'Her kan du skrive kort hva som har endret seg i arbeidsforholdene, virksomhetene eller arbeidssituasjonen din',
    '@forms.virksomhet.regnskapsfører_spm': 'Har du regnskapsfører?',
    '@forms.virksomhet.regnskapsfører_navn': 'Oppgi navnet til regnskapsfører',
    '@forms.virksomhet.regnskapsfører_telefon': 'Oppgi telefonnummeret til regnskapsfører',
    '@forms.virksomhet.veileder_innhenter_info.1':
        'Vi henter inn opplysninger om virksomheten og inntekten din fra offentlige registre.',
    '@forms.virksomhet.veileder_innhenter_info.2': 'Vi tar kontakt med deg hvis vi trenger flere opplysninger.',
    '@forms.virksomhet.regnskapsfører_telefon_info':
        'Skriv inn telefonnummeret i stedet for å kopiere og lime det inn fra et annet sted.',
};

const nn: Record<keyof typeof nb, string> = {
    '@forms.virksomhet.næringstype_FISKE': 'Fiskar',
    '@forms.virksomhet.næringstype_JORDBRUK_SKOGBRUK': 'Jordbrukar',
    '@forms.virksomhet.næringstype_DAGMAMMA': 'Dagmamma eller familiebarnehage i eigen heim',
    '@forms.virksomhet.næringstype_ANNEN': 'Anna',
    '@forms.virksomhet.form_title': 'Opplysningar om verksemda di',
    '@forms.virksomhet.form_title.flere': 'Opplysningar om den eldste verksemda di',
    '@forms.virksomhet.hvilken_type_virksomhet': 'Kva type verksemd har du?',
    '@forms.virksomhet.hvilken_type_virksomhet.flere': 'Kva type verksemd er den eldste verksemda di?',
    '@forms.virksomhet.hva_heter_virksomheten': 'Kva heiter verksemda?',
    '@forms.virksomhet.fisker_blad_b': 'Er du fiskar på blad B?',
    '@forms.virksomhet.veileder_fisker.tittel': 'Viss du ikkje har organisasjonsnummer',
    '@forms.virksomhet.veileder_fisker':
        'Viss du ikkje har organisasjonsnummer, svarer du nei på spørsmålet "Er {navnPåVirksomheten} registrert i Noreg?" I nedtrekkslista vel du at verksemda er registrert i Noreg.',
    '@forms.virksomhet.registert_i_norge': 'Er {navnPåVirksomheten} registrert i Noreg?',
    '@forms.virksomhet.registert_i_hvilket_land': 'I kva land er {navnPåVirksomheten} registrert?',
    '@forms.virksomhet.organisasjonsnummer': 'Kva er organisasjonsnummeret?',
    '@forms.virksomhet.startdato': 'Når starta du {navnPåVirksomheten}?',
    '@forms.virksomhet.kalender_fom': 'Startdato',
    '@forms.virksomhet.kalender_tom': 'Eventuell sluttdato',
    '@forms.virksomhet.kalender_pågående': 'Er pågåande',
    '@forms.virksomhet.nyoppstartet.næringsinntektFlere.header': 'Næringsresultat for alle verksemdene dine',
    '@forms.virksomhet.nyoppstartet.næringsinntektFlere.info':
        'Du har opplyst at du har fleire næringsverksemder. Her skal du leggje inn næringsresultatet totalt for alle verksemdene du har.',
    '@forms.virksomhet.ikkeNyoppstartet.næringsinntektFlere.header': 'Næringsverksemdene dine',
    '@forms.virksomhet.ikkeNyoppstartet.næringsinntektFlere.info':
        'Du har opplyst at du har fleire næringsverksemder som sjølvstendig næringsdrivande. No skal du svare på spørsmål som gjeld alle verksemdene dine.',
    '@forms.virksomhet.næringsinntekt': 'Næringsinntekt',
    '@forms.virksomhet.næringsinntekt.enVirksomhet.spm':
        'Kva har du hatt i næringsresultat før skatt dei siste 12 månadene?',
    '@forms.virksomhet.næringsinntekt.enVirksomhet.spm.description':
        'Viss verksemda har vart i kortare tid enn 12 månader, kan du bruke denne perioden og rekne om til årsinntekt. Oppgi beløpet i heile kroner.',
    '@forms.virksomhet.næringsinntekt.flereVirksomheter.spm':
        'Kva har du hatt totalt i næringsresultat før skatt dei siste 12 månadene?',
    '@forms.virksomhet.næringsinntekt.flereVirksomheter.spm.description':
        'Viss verksemdene har vart i kortare tid enn 12 månader, kan du bruke denne perioden og rekne om til årsinntekt. Oppgi beløpet i heile kroner.',
    '@forms.virksomhet.hvaErNæringsresultat.enVirksomhet.text':
        'Næringsresultatet er inntekter du har i næringa di, minus utgifter og avskrivingar.',
    '@forms.virksomhet.hvaErNæringsresultat.flereVirksomheter.text':
        'Næringsresultatet er inntekter du har i næringane dine, minus utgifter og avskrivingar.',
    '@forms.virksomhet.hvaErNæringsresultat.title': 'Kva er næringsresultatet?',
    '@forms.virksomhet.har_blitt_yrkesaktiv': 'Har du byrja i arbeidslivet dei 3 siste ferdiglikna åra?',
    '@forms.virksomhet.har_blitt_yrkesaktiv_info_title': 'Kva betyr dette?',
    '@forms.virksomhet.har_blitt_yrkesaktiv_info':
        'Du skal svare ja på spørsmålet viss du før oppstart av næringsverksemda di hadde låg eller inga inntekt.',
    '@forms.virksomhet.har_blitt_yrkesaktiv_dato': 'Oppgi dato for når du byrja i arbeidslivet',
    '@forms.virksomhet.varig_endring_spm':
        'Har du hatt ei varig endring i nokon av arbeidsforholda, verksemdene eller arbeidssituasjonen din dei siste fire åra?',
    '@forms.virksomhet.varig_endring_dato': 'Oppgi dato for endringa',
    '@forms.virksomhet.varig_endring_inntekt':
        'Oppgi næringsinntekta di etter endringa. Oppgi årsinntekta i heile kroner.',
    '@forms.virksomhet.varig_endring_tekst':
        'Her kan du skrive kort kva som har endra seg i arbeidsforholda, verksemdene eller arbeidssituasjonen din',
    '@forms.virksomhet.regnskapsfører_spm': 'Har du rekneskapsførar?',
    '@forms.virksomhet.regnskapsfører_navn': 'Oppgi namnet til rekneskapsføraren',
    '@forms.virksomhet.regnskapsfører_telefon': 'Oppgi telefonnummeret til rekneskapsføraren',
    '@forms.virksomhet.veileder_innhenter_info.1':
        'Vi hentar inn opplysningar om verksemda og inntekta di frå offentlege register.',
    '@forms.virksomhet.veileder_innhenter_info.2': 'Vi tek kontakt med deg viss vi treng fleire opplysningar.',
    '@forms.virksomhet.regnskapsfører_telefon_info':
        'Skriv inn telefonnummeret i staden for å kopiere og lime det inn frå ein annan stad.',
};

export const virksomhetFormMessages = {
    nb,
    nn,
};
