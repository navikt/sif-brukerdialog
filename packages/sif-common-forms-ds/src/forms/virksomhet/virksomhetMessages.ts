import { useIntl } from 'react-intl';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';

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

    '@forms.virksomhet.summary.tittel': 'Næringsvirksomhet som du har lagt inn:',
    '@forms.virksomhet.summary.navn': 'Navn',
    '@forms.virksomhet.summary.næringstype': 'Næringstype',
    '@forms.virksomhet.summary.varigEndring.dato': 'Dato for varig endring',
    '@forms.virksomhet.summary.varigEndring.næringsinntekt': 'Næringsinntekt etter endring',
    '@forms.virksomhet.summary.varigEndring.beskrivelse': 'Beskrivelse av endring',
    '@forms.virksomhet.summary.ikkeRegnskapsfører': 'Har ikke regnskapsfører.',
    '@forms.virksomhet.summary.tidsinfo.avsluttet': 'Startet {fraOgMed}, avsluttet {tilOgMed}.',
    '@forms.virksomhet.summary.tidsinfo.pågående': 'Startet {fraOgMed} (pågående).',
    '@forms.virksomhet.summary.fisker.påBladB': 'på Blad B',
    '@forms.virksomhet.summary.fisker.ikkePåBladB': 'ikke på Blad B',
    '@forms.virksomhet.summary.registrertILand': 'Registrert i {land}',
    '@forms.virksomhet.summary.registrertILand.orgnr': ' (organisasjonsnummer {orgnr})',
    '@forms.virksomhet.summary.yrkesaktiv.jaStartetDato': 'Ja, ble yrkesaktiv {dato}',
    '@forms.virksomhet.summary.næringsinntekst': 'Næringsinntekt:',
    '@forms.virksomhet.summary.regnskapsfører.header': 'Regnskapsfører',
    '@forms.virksomhet.summary.regnskapsfører.info': 'Ja, {navn}, telefon {telefon}',

    '@forms.virksomhetForm.næringstype.noValue': 'Velg hvilken type virksomhet du har fra listen.',
    '@forms.virksomhetForm.fiskerErPåBladB.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på spørsmålet om du er fisker på Blad B.',
    '@forms.virksomhetForm.navnPåVirksomheten.stringHasNoValue': 'Skriv inn navnet på virksomheten din.',
    '@forms.virksomhetForm.navnPåVirksomheten.stringContainsUnicodeChacters':
        'Navnet på virksomheten du har lagt inn inneholder ugyldige tegn. Hvis du har limt inn navnet kan det være at du har fått med tegn som ikke vises. Prøv derfor å skrive det inn selv, i stedet for å lime det inn.',
    '@forms.virksomhetForm.registrertINorge.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på spørsmålet om virksomheten din er registrert i Norge.',
    '@forms.virksomhetForm.registrertILand.noValue':
        'Du må velge hvilket land virksomheten din er registrert i. Velg land fra listen.',
    '@forms.virksomhetForm.organisasjonsnummer.orgNumberHasNoValue':
        'Skriv inn organisasjonsnummeret. Et gyldig organsisasjonsnummer inneholder 9 siffer',
    '@forms.virksomhetForm.organisasjonsnummer.orgNumberHasInvalidFormat':
        'Du har oppgitt et ugyldig organisasjonsnummer. Oppgi et gyldig organsisasjonsnummer som inneholder 9 siffer.',
    '@forms.virksomhetForm.fom.dateHasNoValue':
        'Du må oppgi hvilken dato du startet virksomheten. Skriv inn eller velg startdato fra datovelgeren.',
    '@forms.virksomhetForm.fom.dateIsAfterMax':
        'Startdatoen for når du startet {navn} må være før dagens dato. Skriv inn eller velg startdato fra datovelgeren.',
    '@forms.virksomhetForm.fom.dateHasInvalidFormat':
        'Du må oppgi startdato for virksomheten i et gyldig format. Gyldig format er dd.mm.ååå.',
    '@forms.virksomhetForm.fom.fromDateIsAfterToDate':
        'Startdatoen for når du startet {navn} må være før sluttdatoen, eller på samme dag som sluttdatoen. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.virksomhetForm.tom.dateHasNoValue':
        'Du må oppgi hvilken dato du avsluttet virksomheten. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.virksomhetForm.tom.dateIsBeforeMin':
        'Sluttdatoen for når du avsluttet virksomheten kan ikke være før startdatoen. Skriv inn eller velg sluttdato fra datovelgeren.',
    '@forms.virksomhetForm.tom.dateIsAfterMax':
        'Sluttdatoen for når du avsluttet virksomheten kan ikke være etter dagens dato. Skriv inn eller velg sluttdato fra datovelgeren.',
    '@forms.virksomhetForm.tom.dateHasInvalidFormat':
        'Du må oppgi dato for når du avsluttet virksomheten i et gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.virksomhetForm.tom.toDateIsBeforeFromDate':
        'Sluttdatoen for når du avsluttet virksomheten kan ikke være før startdatoen. Skriv inn eller velg sluttdato fra datovelgeren.',
    '@forms.virksomhetForm.næringsinntekt.numberHasNoValue': 'Du må oppgi næringsinntekten i {navn}.',
    '@forms.virksomhetForm.næringsinntekt.numberHasDecimals': 'Du må oppgi næringsinntekten i {navn} uten desimaler.',
    '@forms.virksomhetForm.næringsinntekt.numberHasInvalidFormat':
        'Du må oppgi et gyldig tall for næringsinntekten i {navn}. Et gyldig tall inneholder kun siffer.',
    '@forms.virksomhetForm.næringsinntekt.numberIsTooSmall':
        'Tallet du har oppgitt som næringsinntekt for {navn} er for lavt. Tallet kan ikke være lavere enn {min}.',
    '@forms.virksomhetForm.næringsinntekt.numberIsTooLarge':
        'Tallet du har oppgitt som næringsinntekt for {navn} er for høyt. Tallet kan ikke være høyere enn {maks}.',
    '@forms.virksomhetForm.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på spørsmålet om du har begynt arbeidslivet i løpet av de 3 siste ferdigliknede årene.',
    '@forms.virksomhetForm.blittYrkesaktivDato.dateHasNoValue':
        'Du må oppgi dato for når du begynte i arbeidslivet. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.virksomhetForm.blittYrkesaktivDato.dateHasInvalidFormat':
        'Du må oppgi dato for når du begynte i arbeidslivet i et gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.virksomhetForm.blittYrkesaktivDato.dateIsAfterMax':
        'Datoen for når du begynte i arbeidslivet kan ikke være etter dagens dato. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.virksomhetForm.blittYrkesaktivDato.dateIsBeforeMin':
        'Datoen for når du begynte i arbeidslivet kan ikke være før {dato}. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.virksomhetForm.hattVarigEndringAvNæringsinntektSiste4Kalenderår.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på spørsmålet om du har hatt varig endring i næringsinntekten i de siste 4 kalenderårene.',
    '@forms.virksomhetForm.varigEndringINæringsinntekt_dato.dateHasNoValue':
        'Du må oppgi fra hvilken dato du fikk en varig endring i næringsinntekten i {navn}. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.virksomhetForm.varigEndringINæringsinntekt_dato.dateHasInvalidFormat':
        'Du må oppgi dato for når du fikk varig endring i næringsinntekt i {navn} i et gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.virksomhetForm.varigEndringINæringsinntekt_dato.dateIsAfterMax':
        'Datoen for når du fikk varig endring i næringsinntekt kan ikke være etter {dato}. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.virksomhetForm.varigEndringINæringsinntekt_dato.dateIsBeforeMin':
        'Datoen for når du fikk varig endring i næringsinntekt kan ikke være før {dato}. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.virksomhetForm.varigEndringINæringsinntekt_inntektEtterEndring.numberHasNoValue':
        'Du må oppgi inntekt etter inntektsendring for {navn}.',
    '@forms.virksomhetForm.varigEndringINæringsinntekt_inntektEtterEndring.numberHasDecimals':
        'Du må oppgi inntekt etter inntektsendring for {navn} uten desimaler.',
    '@forms.virksomhetForm.varigEndringINæringsinntekt_inntektEtterEndring.numberHasInvalidFormat':
        'Du må oppgi et gyldig tall for ny inntekt etter inntektsendring i {navn}. Et gyldig tall inneholder kun siffer.',
    '@forms.virksomhetForm.varigEndringINæringsinntekt_inntektEtterEndring.numberIsTooLarge':
        'Tallet du har oppgitt som ny inntekt etter inntektsendring for {navn} er for høyt. Tallet kan ikke være høyere enn {maks}.',
    '@forms.virksomhetForm.varigEndringINæringsinntekt_inntektEtterEndring.numberIsTooSmall':
        'Tallet du har oppgitt som ny inntekt etter inntektsendring for {navn} er for lavt. Tallet kan ikke være lavere enn {min}.',
    '@forms.virksomhetForm.varigEndringINæringsinntekt_forklaring.stringHasNoValue':
        'Skriv en forklaring på hvorfor du har hatt en varig endring i næringsinntekten for {navn}.',
    '@forms.virksomhetForm.varigEndringINæringsinntekt_forklaring.stringIsTooLong':
        'Du har brukt for mange tegn i forklaringen din. Teksten kan ikke inneholde flere enn {maks} tegn.',
    '@forms.virksomhetForm.varigEndringINæringsinntekt_forklaring.stringIsTooShort':
        'Du har brukt for få tegn i forklaringen din. Teksten må inneholde minst {min} tegn.',
    '@forms.virksomhetForm.harRegnskapsfører.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på spørsmålet om du har regnskapsfører.',
    '@forms.virksomhetForm.regnskapsfører_navn.stringHasNoValue': 'Skriv inn navnet på regnskapsføreren din.',
    '@forms.virksomhetForm.regnskapsfører_navn.stringIsTooLong':
        'Navnet på regnskapsfører kan ikke inneholde flere enn {maks} tegn.',
    '@forms.virksomhetForm.regnskapsfører_navn.stringIsTooShort':
        'Navnet på regnskapsfører må inneholde minst {min} tegn.',
    '@forms.virksomhetForm.regnskapsfører_navn.stringContainsUnicodeChacters':
        'Navnet til regnskapsføreren du har lagt inn inneholder ugyldige tegn. Hvis du har limt inn navnet kan det være at du har fått med tegn som ikke vises. Prøv derfor å skrive det inn selv, i stedet for å lime det inn.',
    '@forms.virksomhet.regnskapsfører_telefon_info':
        'Skriv inn telefonnummeret i stedet for å kopiere og lime det inn fra et annet sted.',
    '@forms.virksomhetForm.regnskapsfører_telefon.stringHasNoValue':
        'Skriv inn telefonnummeret til regnskapsføreren din.',
    '@forms.virksomhetForm.regnskapsfører_telefon.stringIsTooLong':
        'Telefonnummeret til regnskapsfører kan ikke inneholde flere enn {maks} tegn.',
    '@forms.virksomhetForm.regnskapsfører_telefon.stringIsTooShort':
        'Telefonnummeret til regnskapsfører må inneholde minst {min} tegn.',
    '@forms.virksomhetForm.regnskapsfører_telefon.stringContainsUnicodeChacters':
        'Telefonnummeret du har lagt inn inneholder ugyldige tegn. Hvis du har limt inn telefonnummeret kan det være at du har fått med tegn som ikke vises. Prøv derfor å skrive det inn selv, i stedet for å lime det inn. Telefonnummeret kan kun inneholde tall, mellomrom og +.',
    '@forms.virksomhetForm.regnskapsfører_telefon.stringHasInvalidFormat':
        'Telefonnummeret du har lagt inn inneholder ugyldige tegn. Hvis du har limt inn telefonnummeret kan det være at du har fått med tegn som ikke vises. Prøv derfor å skrive det inn selv, i stedet for å lime det inn. Telefonnummeret kan kun inneholde tall, mellomrom og +.',
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
    '@forms.virksomhet.næringstype_FISKE': 'Fisker',
    '@forms.virksomhet.næringstype_JORDBRUK_SKOGBRUK': 'Jordbrukar',
    '@forms.virksomhet.næringstype_DAGMAMMA': 'Dagmamma eller familiebarnehage i eigen heim',
    '@forms.virksomhet.næringstype_ANNEN': 'Anna',
    '@forms.virksomhet.form_title': 'Opplysningar om verksemda di',
    '@forms.virksomhet.form_title.flere': 'Opplysningar om den eldste verksemda di',
    '@forms.virksomhet.hvilken_type_virksomhet': 'Kva type verksemd har du?',
    '@forms.virksomhet.hvilken_type_virksomhet.flere': 'Kva type er den eldste verksemda di?',
    '@forms.virksomhet.hva_heter_virksomheten': 'Kva heiter verksemda?',
    '@forms.virksomhet.fisker_blad_b': 'Er du fiskar på blad B?',
    '@forms.virksomhet.veileder_fisker.tittel': `Dersom du ikkje har organiasjonsnummer`,
    '@forms.virksomhet.veileder_fisker': `Dersom du ikkje har organisasjonsnummer, svarer du nei på spørsmålet "Er {navnPåVirksomheten} registrert i Noreg?". I nedtrekkslista vel du at verksemda er registrert i Noreg.`,
    '@forms.virksomhet.registert_i_norge': `Er {navnPåVirksomheten} registert i Noreg?`,
    '@forms.virksomhet.registert_i_hvilket_land': `I kva land er {navnPåVirksomheten} registrert?`,
    '@forms.virksomhet.organisasjonsnummer': 'Kva er organisasjonsnummeret?',
    '@forms.virksomhet.startdato': `Når starta du {navnPåVirksomheten}?`,
    '@forms.virksomhet.kalender_fom': 'Startdato',
    '@forms.virksomhet.kalender_tom': 'Eventuell sluttdato',
    '@forms.virksomhet.kalender_pågående': 'Er i gang',
    '@forms.virksomhet.nyoppstartet.næringsinntektFlere.header': 'Næringsresultat for alle verksemdene dine',
    '@forms.virksomhet.nyoppstartet.næringsinntektFlere.info':
        'Du har opplyst at du har fleire næringsverksemder. Her skal du leggje inn næringsresultatet totalt for alle verksemdene du har.',
    '@forms.virksomhet.ikkeNyoppstartet.næringsinntektFlere.header': 'Næringsverksemdene dine',
    '@forms.virksomhet.ikkeNyoppstartet.næringsinntektFlere.info':
        'Du har opplyst at du har fleire næringsverksemder som sjølvstendig næringsdrivande. Nå skal du svare på spørsmål som gjeld alle verksemdene dine.',
    '@forms.virksomhet.næringsinntekt.enVirksomhet.spm':
        'Kva har du hatt i næringsresultat før skatt dei siste 12 månadene?',
    '@forms.virksomhet.næringsinntekt.enVirksomhet.spm.description':
        'Dersom verksemda har vart i kortare tid enn 12 månader, kan du bruke denne perioden og rekne om til årsinntekt. Gi opp beløpet i heile kroner.',
    '@forms.virksomhet.næringsinntekt.flereVirksomheter.spm':
        'Kva har du hatt totalt i næringsresultat før skatt dei siste 12 månadene?',
    '@forms.virksomhet.næringsinntekt.flereVirksomheter.spm.description':
        'Dersom verksemdene har vart i kortare tid enn 12 månader, kan du bruke denne perioden og rekne om til årsinntekt. Gi opp beløpet i heile kroner.',
    '@forms.virksomhet.hvaErNæringsresultat.enVirksomhet.text':
        'Næringsresultatet er inntekter du har i næringa di, minus utgifter og avskrivingar.',
    '@forms.virksomhet.hvaErNæringsresultat.flereVirksomheter.text':
        'Næringsresultatet er inntekter du har i næringane dine, minus utgifter og avskrivingar.',
    '@forms.virksomhet.hvaErNæringsresultat.title': 'Kva er næringsresultatet?',
    '@forms.virksomhet.har_blitt_yrkesaktiv': 'Har du begynt i arbeidslivet i løpet av dei 3 siste ferdiglikna åra?',
    '@forms.virksomhet.har_blitt_yrkesaktiv_info_title': 'Kva betyr dette?',
    '@forms.virksomhet.har_blitt_yrkesaktiv_info':
        'Du skal svare ja på spørsmålet dersom du før oppstart av næringsverksemda di hadde låg eller inga inntekt.',
    '@forms.virksomhet.har_blitt_yrkesaktiv_dato': 'Gi opp datoen for når du begynte i arbeidslivet',
    '@forms.virksomhet.varig_endring_spm':
        'Har du hatt ei varig endring i nokre av arbeidsforholda, verksemdene eller arbeidssituasjonen din dei siste fire åra?',
    '@forms.virksomhet.varig_endring_dato': 'Gi opp datoen for endringa',
    '@forms.virksomhet.varig_endring_inntekt':
        'Gi opp næringsinntekta di etter endringa. Gi opp årsinntekta i heile kroner.',
    '@forms.virksomhet.varig_endring_tekst':
        'Her kan du skrive kort kva som har endra seg i arbeidsforholda, verksemdene eller arbeidssituasjonen din',
    '@forms.virksomhet.regnskapsfører_spm': 'Har du rekneskapsførar?',
    '@forms.virksomhet.regnskapsfører_navn': 'Gi opp namnet til rekneskapsføraren',
    '@forms.virksomhet.regnskapsfører_telefon': 'Gi opp telefonnummeret til rekneskapsføraren',
    '@forms.virksomhet.regnskapsfører_telefon_info':
        'Skriv inn telefonnummeret i stedet for å kopiere og lime det inn fra et annet sted.',
    '@forms.virksomhet.veileder_innhenter_info.1':
        'Vi hentar inn opplysningar om verksemda og inntekta di frå offentlege register.',
    '@forms.virksomhet.veileder_innhenter_info.2': 'Vi tek kontakt med deg dersom vi treng fleire opplysningar',

    '@forms.virksomhet.summary.tittel': 'Næringsvirksomhet som du har lagt inn:',
    '@forms.virksomhet.summary.navn': 'Namn',
    '@forms.virksomhet.summary.næringstype': 'Næringstype',
    '@forms.virksomhet.summary.varigEndring.dato': 'Dato for varig endring',
    '@forms.virksomhet.summary.varigEndring.næringsinntekt': 'Næringsinntekt etter endring',
    '@forms.virksomhet.summary.varigEndring.beskrivelse': 'Skildring av endring',
    '@forms.virksomhet.summary.ikkeRegnskapsfører': 'Har ikkje regnskapsførar.',
    '@forms.virksomhet.summary.tidsinfo.avsluttet': 'Startet {fraOgMed}, avsluttet {tilOgMed}.',
    '@forms.virksomhet.summary.tidsinfo.pågående': 'Startet {fraOgMed} (pågåande).',
    '@forms.virksomhet.summary.fisker.påBladB': 'på Blad B',
    '@forms.virksomhet.summary.fisker.ikkePåBladB': 'ikkje på Blad B',
    '@forms.virksomhet.summary.registrertILand': 'Registrert i {land}',
    '@forms.virksomhet.summary.registrertILand.orgnr': ' (organisasjonsnummer {orgnr})',
    '@forms.virksomhet.summary.næringsinntekst': 'Næringsinntekt:',
    '@forms.virksomhet.summary.yrkesaktiv.jaStartetDato': 'Ja, vart yrkesaktiv {dato}',
    '@forms.virksomhet.summary.regnskapsfører.header': 'Regnskapsførar',
    '@forms.virksomhet.summary.regnskapsfører.info': 'Ja, {navn}, telefon {telefon}',
};

export type VirksomhetMessageKeys = keyof typeof nb;

export const virksomhetMessages = {
    nb,
    nn,
};

export const useVirksomhetIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<VirksomhetMessageKeys>(intl);
};

export type VirksomhetIntlShape = ReturnType<typeof useVirksomhetIntl>;
