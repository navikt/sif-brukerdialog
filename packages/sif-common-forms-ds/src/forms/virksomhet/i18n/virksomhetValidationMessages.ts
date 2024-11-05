const nb = {
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
        'Du må oppgi startdato for virksomheten i et gyldig format. Gyldig format er dd.mm.åååå.',
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
    '@forms.virksomhetForm.næringstype.noValue': 'Vel kva type verksemd du har frå lista.',
    '@forms.virksomhetForm.fiskerErPåBladB.yesOrNoIsUnanswered':
        'Du må svara ja eller nei på spørsmålet om du er fiskar på Blad B.',
    '@forms.virksomhetForm.navnPåVirksomheten.stringHasNoValue': 'Skriv inn namnet på verksemda di.',
    '@forms.virksomhetForm.navnPåVirksomheten.stringContainsUnicodeChacters':
        'Namnet på verksemda du har lagt inn inneheld ugyldige teikn. Viss du har limd inn namnet kan det vera at du har fått med teikn som ikkje blir vist. Prøv derfor å skriva det inn sjølv, i staden for å lima det inn.',
    '@forms.virksomhetForm.registrertINorge.yesOrNoIsUnanswered':
        'Du må svara ja eller nei på spørsmålet om verksemda di er registrert i Noreg.',
    '@forms.virksomhetForm.registrertILand.noValue':
        'Du må velja noko som land verksemda di er registrert i. Vel land frå lista.',
    '@forms.virksomhetForm.organisasjonsnummer.orgNumberHasInvalidFormat':
        'Du har oppgitt eit ugyldig organisasjonsnummer. Oppgi eit gyldig organsisasjonsnummer som inneheld 9 siffer.',
    '@forms.virksomhetForm.organisasjonsnummer.orgNumberHasNoValue':
        'Skriv inn organisasjonsnummeret. Eit gyldig organsisasjonsnummer inneheld 9 siffer',
    '@forms.virksomhetForm.fom.dateHasNoValue':
        'Du må oppgi kva dato du starta verksemda. Skriv inn eller vel startdato frå datoveljaren.',
    '@forms.virksomhetForm.fom.dateIsAfterMax':
        'Startdatoen for når du starta {namn} må vera før dagens dato. Skriv inn eller vel startdato frå datoveljaren.',
    '@forms.virksomhetForm.fom.dateHasInvalidFormat':
        'Du må oppgi startdato for verksemda i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.virksomhetForm.fom.fromDateIsAfterToDate':
        'Startdatoen for når du starta {namn} må vera før sluttdatoen, eller på same dag som sluttdatoen. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.virksomhetForm.tom.dateHasNoValue':
        'Du må oppgi kva dato du avslutta verksemda. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.virksomhetForm.tom.dateIsBeforeMin':
        'Sluttdatoen for når du avslutta verksemda kan ikkje vera før startdatoen. Skriv inn eller vel sluttdato frå datoveljaren.',
    '@forms.virksomhetForm.tom.dateIsAfterMax':
        'Sluttdatoen for når du avslutta verksemda kan ikkje vera etter dagens dato. Skriv inn eller vel sluttdato frå datoveljaren.',
    '@forms.virksomhetForm.tom.dateHasInvalidFormat':
        'Du må oppgi dato for når du avslutta verksemda i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.virksomhetForm.tom.toDateIsBeforeFromDate':
        'Sluttdatoen for når du avslutta verksemda kan ikkje vera før startdatoen. Skriv inn eller vel sluttdato frå datoveljaren.',
    '@forms.virksomhetForm.næringsinntekt.numberHasInvalidFormat':
        'Du må oppgi eit gyldig tal for næringsinntekta i {namn}. Eit gyldig tal inneheld berre siffer.',
    '@forms.virksomhetForm.næringsinntekt.numberIsTooSmall':
        'Talet du har oppgitt som næringsinntekt for {namn} er for lågt. Talet kan ikkje vera lågare enn {min}.',
    '@forms.virksomhetForm.næringsinntekt.numberIsTooLarge':
        'Talet du har oppgitt som næringsinntekt for {namn} er for høgt. Talet kan ikkje vera høgare enn {maks}.',
    '@forms.virksomhetForm.næringsinntekt.numberHasNoValue': 'Du må oppgi næringsinntekta i {namn}.',
    '@forms.virksomhetForm.næringsinntekt.numberHasDecimals': 'Du må oppgi næringsinntekta i {namn} utan desimalar.',
    '@forms.virksomhetForm.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene.yesOrNoIsUnanswered':
        'Du må svara ja eller nei på spørsmålet om du har byrja arbeidslivet  dei 3 siste ferdiglikna åra.',
    '@forms.virksomhetForm.blittYrkesaktivDato.dateHasNoValue':
        'Du må oppgi dato for når du byrja i arbeidslivet. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.virksomhetForm.blittYrkesaktivDato.dateHasInvalidFormat':
        'Du må oppgi dato for når du byrja i arbeidslivet i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.virksomhetForm.blittYrkesaktivDato.dateIsAfterMax':
        'Datoen for når du byrja i arbeidslivet kan ikkje vera etter dagens dato. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.virksomhetForm.blittYrkesaktivDato.dateIsBeforeMin':
        'Datoen for når du byrja i arbeidslivet kan ikkje vera før {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.virksomhetForm.hattVarigEndringAvNæringsinntektSiste4Kalenderår.yesOrNoIsUnanswered':
        'Du må svara ja eller nei på spørsmålet om du har hatt varig endring i næringsinntekta i dei siste 4 kalenderåra.',
    '@forms.virksomhetForm.varigEndringINæringsinntekt_dato.dateHasNoValue':
        'Du må oppgi frå kva dato du fekk ei varig endring i næringsinntekta i {namn}. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.virksomhetForm.varigEndringINæringsinntekt_dato.dateHasInvalidFormat':
        'Du må oppgi dato for når du fekk varig endring i næringsinntekt i {namn} i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.virksomhetForm.varigEndringINæringsinntekt_dato.dateIsAfterMax':
        'Datoen for når du fekk varig endring i næringsinntekt kan ikkje vera etter {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.virksomhetForm.varigEndringINæringsinntekt_dato.dateIsBeforeMin':
        'Datoen for når du fekk varig endring i næringsinntekt kan ikkje vera før {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.virksomhetForm.varigEndringINæringsinntekt_inntektEtterEndring.numberHasNoValue':
        'Du må oppgi inntekt etter inntektsendring for {namn}.',
    '@forms.virksomhetForm.varigEndringINæringsinntekt_inntektEtterEndring.numberHasInvalidFormat':
        'Du må oppgi eit gyldig tal for ny inntekt etter inntektsendring i {namn}. Eit gyldig tal inneheld berre siffer.',
    '@forms.virksomhetForm.varigEndringINæringsinntekt_inntektEtterEndring.numberIsTooLarge':
        'Talet du har oppgitt som ny inntekt etter inntektsendring for {namn} er for høgt. Talet kan ikkje vera høgare enn {maks}.',
    '@forms.virksomhetForm.varigEndringINæringsinntekt_inntektEtterEndring.numberIsTooSmall':
        'Talet du har oppgitt som ny inntekt etter inntektsendring for {namn} er for lågt. Talet kan ikkje vera lågare enn {min}.',
    '@forms.virksomhetForm.varigEndringINæringsinntekt_inntektEtterEndring.numberHasDecimals':
        'Du må oppgi inntekt etter inntektsendring for {namn} utan desimalar.',
    '@forms.virksomhetForm.varigEndringINæringsinntekt_forklaring.stringHasNoValue':
        'Skriv ei forklaring på kvifor du har hatt ei varig endring i næringsinntekta for {namn}.',
    '@forms.virksomhetForm.varigEndringINæringsinntekt_forklaring.stringIsTooLong':
        'Du har brukt for mange teikn i forklaringa di. Teksten kan ikkje innehalda fleire enn {maks} teikn.',
    '@forms.virksomhetForm.varigEndringINæringsinntekt_forklaring.stringIsTooShort':
        'Du har brukt for få teikn i forklaringa di. Teksten må innehalda minst {min} teikn.',
    '@forms.virksomhetForm.harRegnskapsfører.yesOrNoIsUnanswered':
        'Du må svara ja eller nei på spørsmålet om du har rekneskapsførar.',
    '@forms.virksomhetForm.regnskapsfører_navn.stringHasNoValue': 'Skriv inn namnet på rekneskapsføraren din.',
    '@forms.virksomhetForm.regnskapsfører_navn.stringIsTooLong':
        'Namnet på rekneskapsførar kan ikkje innehalda fleire enn {maks} teikn.',
    '@forms.virksomhetForm.regnskapsfører_navn.stringIsTooShort':
        'Namnet på rekneskapsførar må innehalda minst {min} teikn.',
    '@forms.virksomhetForm.regnskapsfører_navn.stringContainsUnicodeChacters':
        'Namnet til rekneskapsføraren du har lagt inn inneheld ugyldige teikn. Viss du har limd inn namnet kan det vera at du har fått med teikn som ikkje blir vist. Prøv derfor å skriva det inn sjølv, i staden for å lima det inn.',
    '@forms.virksomhetForm.regnskapsfører_telefon.stringHasNoValue':
        'Skriv inn telefonnummeret til rekneskapsføraren din.',
    '@forms.virksomhetForm.regnskapsfører_telefon.stringIsTooLong':
        'Telefonnummeret til rekneskapsførar kan ikkje innehalda fleire enn {maks} teikn.',
    '@forms.virksomhetForm.regnskapsfører_telefon.stringIsTooShort':
        'Telefonnummeret til rekneskapsførar må innehalda minst {min} teikn.',
    '@forms.virksomhetForm.regnskapsfører_telefon.stringContainsUnicodeChacters':
        'Telefonnummeret du har lagt inn inneheld ugyldige teikn. Viss du har limd inn telefonnummeret kan det vera at du har fått med teikn som ikkje blir vist. Prøv derfor å skriva det inn sjølv, i staden for å lima det inn. Telefonnummeret kan berre innehalda tal, mellomrom og  .',
    '@forms.virksomhetForm.regnskapsfører_telefon.stringHasInvalidFormat':
        'Telefonnummeret du har lagt inn inneheld ugyldige teikn. Viss du har limd inn telefonnummeret kan det vera at du har fått med teikn som ikkje blir vist. Prøv derfor å skriva det inn sjølv, i staden for å lima det inn. Telefonnummeret kan berre innehalda tal, mellomrom og  .',
};

export const virksomhetValidationMessages = {
    nb,
    nn,
};
