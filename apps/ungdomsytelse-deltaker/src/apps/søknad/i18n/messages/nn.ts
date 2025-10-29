import { ungSoknadMessages_nb } from './nb';

export const ungSoknadMessages_nn: typeof ungSoknadMessages_nb = {
    'søknad.tittel': 'Søknad om ungdomsprogramytelsen',
    'søknad.tittel.shy': 'Søknad om ungdoms\u00ADprogram\u00ADytelsen',

    'personopplysninger.accordion.header': 'Om korleis vi hentar inn opplysningar om deg',
    'personopplysninger.1': 'Slik handsamar Nav personopplysningane dine',
    'personopplysninger.2':
        'Vi hentar inn og mottek opplysningar om deg for å handsame saka di. Det er naudsynt for at du skal få rett ytingsteneste. Deler av saka di blir handsama automatisk.',
    'personopplysninger.3': 'Kva for opplysningar hentar vi inn?',
    'personopplysninger.4':
        'Opplysningane vi hentar inn kjem anten frå deg, rettleiaren din i Nav eller frå offentlege register:',
    'personopplysninger.4.1':
        'barn som du er registrert som forelder til, hentar vi frå folkeregisteret, slik at vi kan vurdere om du har rett på barnetillegg',
    'personopplysninger.4.2':
        'inntekta di hentar vi frå arbeidsgjevaren, slik at vi kan kontrollere om ytelsen skal reduserast sidan du har inntekt ved sida av',
    'personopplysninger.4.3':
        'ytingar du mottek frå Nav, slik at vi kan kontrollere om ytelsen skal reduserast sidan du mottek annan yting frå Nav',
    'personopplysninger.4.4':
        'opplysningar om perioden du deltek i programmet, hentar vi frå rettleiaren i Nav, slik at vi veit for kva periode du skal få yting/pengar frå Nav',
    'personopplysninger.5':
        'Du har rett til innsyn i saka di. Vil du vite meir om korleis Nav handsamar personopplysningar? Sjå <Lenke>nav.no/personvern</Lenke>.',

    'søknadApp.loading.error': 'Det oppstod ein feil ved henting av nødvendig informasjon. Prøv igjen seinare.',

    'søknadApp.nesteSteg.label': 'Neste steg',
    'søknadApp.forrigeSteg.label': 'Førre steg',
    'søknadApp.avbrytSøknad.label': 'Avbryt søknad',
    'søknadApp.sendSøknad.label': 'Send søknad',

    'søknadApp.slettSøknad.tittel': 'Slett søknad',
    'søknadApp.slettSøknad.ja.label': 'Ja, slett',
    'søknadApp.slettSøknad.nei.label': 'Nei',
    'søknadApp.slettSøknad.spm': 'Vil du slette søknaden?',
    'søknadApp.slettSøknad.tekst': 'Informasjonen du har fylt ut blir sletta, og du kjem tilbake til velkomstsida.',

    /** VelkommenPage */
    'velkommenPage.startSøknad': 'Start søknad',
    'velkommenPage.bekrefter': 'Eg vil svare så godt eg kan på spørsmåla i søknaden.',
    'velkommenPage.infoStemmer':
        'Det er viktig at du gjev oss riktige opplysningar slik at vi kan handsame saka di. <Lenke>Les meir om kvifor det er viktig å gje riktige opplysningar</Lenke>.',
    'velkommenPage.bekreftelse.skjultLegend': 'Stadfesting',
    'velkommenPage.validering.bekrefterIkkeValgt': 'Du må stadfeste at du vil svare så riktig som du kan.',

    /** VelkommenMelding */
    'velkommenMelding.hei': 'Hei {fornavn}!',
    'velkommenMelding.deltakelsePeriode': 'Du er meldt inn i ungdomsprogrammet frå <strong>{startdato}</strong>.',
    'velkommenMelding.ytelseBeskrivelse':
        'Når du er med i ungdomsprogrammet, kan du søkje om å få pengar. Då får du utbetalt pengar kvar månad så lenge du deltek i programmet.',
    'velkommenMelding.søknadBeskrivelse':
        'Du søkjer ved å fylle ut denne søknaden. Les meir om <Lenke>ungdomsprogrammet og -ytelsen på nav.no</Lenke>.',
    'velkommenMelding.readMore.dato.header': 'Kva viss datoen ikkje stemmer?',
    'velkommenMelding.readMore.dato.content':
        'Då tek du kontakt med rettleiaren din og seier frå om dette, før du sender inn denne søknaden.',

    /** KvitteringPage */
    'kvitteringPage.dokumentTittel': 'Søknad er sendt – Søknad om ungdomsprogramytelsen',
    'kvitteringPage.tittel': 'Søknaden er sendt!',
    'kvitteringPage.beskrivelse': 'Vi har fått søknaden din om pengar gjennom ungdomsprogramytelsen.',
    'kvitteringPage.hvaSkjerVidere': 'Kva skjer vidare?',

    'kvitteringPage.hvaSkjerVidere.1':
        'Svaret på søknaden (vedtaksbrevet) får du når vi har behandlet den. Da får du en SMS av oss, og så logger du inn på <Lenke>Min side</Lenke> på nav.no for å se vedtaksbrevet ditt.',
    'kvitteringPage.hvaSkjerVidere.2': 'Pengene får du som regel den 12. hver måned.',
    'kvitteringPage.hvaSkjerVidere.3':
        'Hvis du jobber og får lønn mens du er i ungdomsprogrammet, må du melde fra om dette. Du får en SMS den 1. hver måned, og så logger du inn på <Lenke>Min side</Lenke> på nav.no og melder fra om hva du fikk i lønn måneden før.',

    'kvitteringPage.lykkeTil': 'Vi ønskjer deg lukke til vidare!',
    'kvitteringPage.gåTilMinSide': 'Gå til Min side',

    /** KontonummerSteg */
    'kontonummerSteg.tittel': 'Kontonummer for utbetaling',
    'kontonummerSteg.beskrivelse':
        'For å få pengane inn på bankkontoen din, må du ha registrert kontonummeret ditt hos Nav.',
    'kontonummerSteg.kontonummer.spm': 'Er kontonummeret ditt {kontonummer}?',
    'kontonummerSteg.kontonummer.ja.label': 'Ja',
    'kontonummerSteg.kontonummer.nei.label': 'Nei',
    'kontonummerSteg.kontonummer.stemmerIkke.info':
        'Gå til <Lenke>personopplysningar på Min side</Lenke> for å endre kontonummeret ditt.',
    'kontonummerSteg.kontonummer.stemmerIkke.info.2':
        'Vi rår deg til å endre kontonummeret ditt før du sender inn søknaden, slik at pengane blir sette inn på kontoen din.',
    'kontonummerSteg.harIkkeKontonummer.info.1': 'Du har ikkje registrert kontonummer hos oss',
    'kontonummerSteg.harIkkeKontonummer.info.2':
        'Registrer bankkontonummeret ditt hos Nav slik at du får pengane utbetalt til rett konto. Gå til <Lenke>personopplysningar på Min side</Lenke> for å leggje inn kontonummeret ditt.',
    'kontonummerSteg.harIkkeKontonummer.info.3':
        'Du kan framleis sende inn søknaden, men vi rår deg til å leggje inn kontonummeret med ein gong slik at pengane ikkje blir forseinka.',
    'kontonummerSteg.kontonummerInfoMangler.info.1': 'Vi klarer ikkje sjå om du har kontonummer hos oss',
    'kontonummerSteg.kontonummerInfoMangler.info.2':
        'For at du skal få utbetalt pengane til rett konto, er det viktig at du har registrert kontonummeret ditt. Gå til <Lenke>personopplysningar på Min side</Lenke> for å sjekke dette.',
    'kontonummerSteg.kontonummerInfoMangler.info.3':
        'Du kan framleis sende inn søknaden, men vi rår deg til å sjekke kontonummeret med ein gong slik at pengane ikkje blir forseinka.',

    /** BarnSteg */
    'barnSteg.tittel': 'Barn',
    'barnSteg.beskrivelse': 'Deltar du i ungdomsprogrammet og har barn, kan du ha rett på barnetillegg.',
    'barnSteg.registrerteBarn.tittel': 'Barn vi har registrert på deg:',
    'barnSteg.barnStemmer.ja.label': 'Ja',
    'barnSteg.barnStemmer.nei.label': 'Nei',
    'barnSteg.spørsmål.ingenBarn': 'Stemmer det at du ikkje har barn?',
    'barnSteg.spørsmål.harBarn': 'Stemmer opplysningen om {antallBarn, plural, one {barnet} other {barna}}?',
    'barnSteg.validering.ikkeSvart': 'Du må svare på om informasjonen stemmer',
    'barnSteg.opplysninger.info.tittel': 'Vi hentar opplysningar frå folkeregisteret',
    'barnSteg.opplysninger.info.text':
        'Du må vere registrert som forelder med foreldreansvar i Folkeregisteret for å ha rett på barnetillegg. Meiner du opplysningane frå Folkeregisteret er feil, må du ta <Lenke>kontakt med Skatteetaten</Lenke>. Hos Skatteetaten kan du registrere foreldreansvar.',
    'barnSteg.barnInfo.ingenBarn': 'Vi har ikkje registrert at du har barn.',

    /** OppsummeringSteg */
    'oppsummeringSteg.tittel': 'Oppsummering',
    'oppsummeringSteg.startdato': 'Startdato',
    'oppsummeringSteg.kontonummer.tittel': 'Kontonummer for utbetaling',
    'oppsummeringSteg.kontonummer.ingenKontonummer.tittel': 'Kontonummer for utbetaling',
    'oppsummeringSteg.kontonummer.ingenKontonummer.tekst': 'Vi har ikkje registrert noko kontonummer på deg.',
    'oppsummeringSteg.kontonummer.kontonummerInfoMangler.tittel': 'Kontonummer for utbetaling',
    'oppsummeringSteg.kontonummer.kontonummerInfoMangler.tekst':
        'Vi klarer ikkje sjå om du har registrert kontonummer hos oss.',
    'oppsummeringSteg.barn.tittel': 'Barn',
    'oppsummeringSteg.bekreft.hiddenLegend': 'Stadfest opplysningar',
    'oppsummeringSteg.bekreft.tekst':
        'Eg stadfestar at opplysningane over er riktige og at eg ønskjer å søkje om ungdoms\u00ADprogram\u00ADytelsen.',
    'oppsummeringSteg.bekreft.validering.bekreftIkkeValgt': 'Du må stadfeste at opplysningane er riktige',
    'oppsummeringSteg.søknadIkkeGyldig':
        'Det manglar opplysningar i søknaden din. Gå tilbake og fyll ut dei nødvendige felta.',
};
