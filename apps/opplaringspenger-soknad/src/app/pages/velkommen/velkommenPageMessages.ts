const nb = {
    'page.velkommen.sidetittel': 'Søknad om opplæringspenger',
    'page.velkommen.guide.tittel': 'Hei {navn}',
    'page.velkommen.guide.ingress': 'Velkommen til søknad om opplæringspenger.',
    'page.velkommen.guide.tekst.1':
        'Denne søknaden er for deg som må være borte fra jobb på grunn av opplæring som er nødvendig for å kunne ta deg av et barn med langvarig sykdom eller funksjonshemning.',
    'page.velkommen.guide.tekst.2': 'Du kan lese <Lenke>mer om opplæringspenger her</Lenke>.',

    'page.velkommen.omSøknaden.tittel': 'Om søknaden',
    'page.velkommen.omSøknaden.1': 'Du får veiledning underveis i søknaden om hva du skal fylle ut, og hvordan.',
    'page.velkommen.omSøknaden.2':
        'Vi tar vare på svarene dine i 72 timer. Så, hvis du innenfor den tiden for eksempel vil ta en pause eller blir automatisk logget ut, fortsetter du der du var når du kommer tilbake.',
    'page.velkommen.omSøknaden.3':
        'Du må svare på alle spørsmålene for å kunne gå videre. Hvis du mangler etterspurt dokumentasjon, kan du ettersende det så snart du kan.',
    'page.velkommen.omSøknaden.4': 'Om hvordan vi innhenter opplysninger om deg',
    'page.velkommen.form.bekreftLabel': 'Jeg bekrefter at jeg har forstått mitt ansvar som søker',
    'page.velkommen.form.ansvar.tittel': 'Ditt ansvar som søker',
    'page.velkommen.form.ansvar.list.1':
        'Jeg forstår at hvis jeg gir uriktige opplysninger, kan det få konsekvenser for retten min til det jeg søker om',
    'page.velkommen.form.ansvar.list.2.1': 'Jeg har lest og forstått det som står på',
    'page.velkommen.form.ansvar.list.2.2': 'nav.no/rett og plikt',
    'page.velkommen.harForståttRettigheterOgPlikter.notChecked': 'Du må velge at du har forstått ditt ansvar som søker',
    'personopplysninger.1': 'Slik behandler Nav personopplysningene dine',
    'personopplysninger.2':
        'Vi innhenter og mottar opplysninger om deg for å behandle saken din. Det er nødvendig for at du skal få riktig tjeneste.',
    'personopplysninger.3': 'Hvilke opplysninger innhenter vi?',
    'personopplysninger.4':
        'Opplysningene vi innhenter kommer enten fra deg, arbeidsgiver eller fra offentlige registre:',
    'personopplysninger.4.1': 'opplysninger om helsen til den du skal søke opplæringspenger for',
    'personopplysninger.4.2': 'arbeidsforholdene dine og inntekten din',
    'personopplysninger.4.3': 'ytelser du mottar fra Nav',
    'personopplysninger.4.4': 'tilknytningen din til Norge',
    'personopplysninger.4.5':
        'trygdeordninger du kan ha rett til i andre land. Vi kan også sende opplysninger om deg til trygdemyndigheter i andre land',

    'personopplysninger.6':
        'Du har rett til innsyn i saken din. Vil du vite mer om hvordan Nav behandler personopplysninger? Se <Lenke>nav.no/personvern</Lenke>.',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const velkommenPageMessages = { nb, nn };
