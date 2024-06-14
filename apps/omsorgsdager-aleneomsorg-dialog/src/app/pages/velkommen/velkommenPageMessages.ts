const nb = {
    'page.velkommen.sidetittel': 'Søknad om ekstra omsorgsdager',
    'page.velkommen.guide.tittel': 'Hei {navn}',
    'page.velkommen.guide.ingress': 'Velkommen til søknad om ekstra omsorgsdager ved aleneomsorg.',
    'page.velkommen.guide.tekst.1':
        'Når det gjelder omsorgsdager er du alene om omsorgen når barnet bor fast hos deg, og du ikke bor sammen med den andre forelderen. Det kan for eksempel være på grunn av samlivsbrudd, at du er blitt enke/enkemann eller at du har aleneomsorg for et donorbarn. Hvis dere vanligvis bor sammen, men den andre forelderen ikke kan ha tilsyn med barnet, skal du bruke <Lenke>Søknad om ekstra omsorgsdager når den andre forelderen ikke kan ha tilsyn med barn</Lenke>',
    'page.velkommen.guide.tekst.2':
        'Hvis dere har avtalt delt fast bosted for barnet har begge foreldre rett på omsorgsdager, og ingen av dere skal søke om ekstra omsorgsdager på grunn av aleneomsorg.',
    'page.velkommen.guide.tekst.3':
        'Hvis du har aleneomsorg for flere barn, må du sende en søknad for hvert av barna. Du trenger ikke å søke flere ganger for samme barn, hvis du har fått godkjent søknaden. Vedtaket om ekstra omsorgsdager gjelder så lenge du har rett til omsorgsdager for barnet.',

    'page.velkommen.omSøknaden.tittel': 'Om søknaden',
    'page.velkommen.omSøknaden.1': 'Du får veiledning underveis i søknaden om hva du skal fylle ut, og hvordan.',
    'page.velkommen.omSøknaden.2':
        'Vi tar vare på svarene dine i 72 timer. Hvis du innenfor den tiden for eksempel vil ta en pause eller blir automatisk logget ut, fortsetter du der du var når du kommer tilbake.',
    'page.velkommen.omSøknaden.3':
        'Du må svare på alle spørsmålene for å kunne gå videre. Hvis du mangler etterspurt dokumentasjon, kan du ettersende det så snart du kan.',
    'page.velkommen.omSøknaden.4': 'Om hvordan vi innhenter opplysninger om deg',
    'page.velkommen.harForståttRettigheterOgPlikter.notChecked': 'Du må velge at du har forstått ditt ansvar som søker',

    'page.velkommen.personopplysninger.dialogtittel': 'Om behandling av personopplysninger',
    'page.velkommen.personopplysninger.1': 'Slik behandler NAV personopplysningene dine',
    'page.velkommen.personopplysninger.2':
        'Vi innhenter og mottar opplysninger om deg når vi skal behandle saken din. Det er nødvendig for at du skal få riktig tjeneste. Saken din kan behandles automatisk.',
    'page.velkommen.personopplysninger.3': 'Hvilke opplysninger innhenter vi?',
    'page.velkommen.personopplysninger.4':
        'Opplysningene vi innhenter kommer enten fra deg eller fra offentlige registre:',
    'page.velkommen.personopplysninger.4.1': 'hvilke barn du er registrert som forelder til.',
    'page.velkommen.personopplysninger.4.2':
        'hvem den andre forelderen er, og om dere er bosatt på samme folkeregistrerte adresse.',
    'page.velkommen.personopplysninger.4.3': 'tilknytningen din til Norge.',
    'page.velkommen.personopplysninger.4.4':
        'trygdeordninger du kan ha rett til i andre land. Vi kan også sende opplysninger om deg til trygdemyndigheter i andre land.',

    'page.velkommen.personopplysninger.5':
        'Du har rett til innsyn i saken din. Vil du vite mer om hvordan NAV behandler personopplysninger? Se <Lenke>nav.no/personvern</Lenke>.',
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
};

export const velkommenPageMessages = {
    nb,
    nn,
};
