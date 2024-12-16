const nb = {
    'velkommenPage.tittel': 'Velkommen til endringsskjemaet',
    'velkommenForm.submitButtonLabel': 'Start',
    'velkommenForm.harForståttRettigheterOgPlikter.notChecked':
        'Du må velge at du har forstått ditt ansvar når du sender inn en endring',
    'velkommenForm.hvaSkalEndres.listHasTooFewItems': 'Du må velge hva du ønsker å endre',

    'velkommenPage.guide.tittel': 'Hei {navn}',
    'velkommenPage.guide.tekst':
        'Du kan melde fra om endringer i pleiepenger for {barnetsNavn} i tidsrommet {samletSøknadsperiodeTekst}.',

    'velkommenPage.endre.spm': 'Hva ønsker du å endre?',
    'velkommenPage.endre.ferie': 'Ferie',
    'velkommenPage.endre.jobb': 'Jobb',

    'velkommenPage.omSøknaden.tittel': 'Om utfylling av skjemaet',
    'velkommenPage.omSøknaden.1': 'Du får veiledning underveis om hva du skal fylle ut, og hvordan.',
    'velkommenPage.omSøknaden.2':
        'Vi tar vare på svarene dine i 72 timer. Hvis du innenfor den tiden for eksempel vil ta en pause eller blir automatisk logget ut, fortsetter du der du var når du kommer tilbake.',
    'velkommenPage.omSøknaden.3': 'Du må svare på alle spørsmålene for å kunne gå videre.',

    'velkommenPage.merInformasjon.tittel': 'Mer informasjon',
    'velkommenPage.personopplysninger.tittel': 'Om hvordan vi innhenter opplysninger om deg',

    'personopplysninger.1': 'Slik behandler Nav personopplysningene dine',
    'personopplysninger.2':
        'Vi innhenter og mottar opplysninger om deg for å behandle saken din. Det er nødvendig for at du skal få riktig tjeneste. Deler av saken din behandles automatisk.',
    'personopplysninger.3': 'Hvilke opplysninger innhenter vi?',
    'personopplysninger.4': 'Opplysningene vi innhenter kommer enten fra deg eller fra offentlige registre:',
    'personopplysninger.4.1': 'hvilke barn du er registrert som forelder til',
    'personopplysninger.4.2': 'opplysninger om barnets helse',
    'personopplysninger.4.3': 'arbeidsforholdene dine og inntekten din',
    'personopplysninger.4.4': 'ytelser du mottar fra Nav',
    'personopplysninger.4.5': 'tilknytningen din til Norge',
    'personopplysninger.4.6':
        'trygdeordninger du kan ha rett til i andre land. Vi kan også sende opplysninger om deg til trygdemyndigheter i andre land',
    'personopplysninger.5':
        'Du har rett til innsyn i saken din. Vil du vite mer om hvordan Nav behandler personopplysninger? Se <Link>nav.no/personvern</Link>.',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const velkommenPageMessages = {
    nb,
    nn,
};
