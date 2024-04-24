const nb = {
    'personopplysninger.dialogtittel': 'Om behandling av personopplysninger',
    'personopplysninger.1': 'Slik behandler NAV personopplysningene dine',
    'personopplysninger.2':
        'Vi innhenter og mottar opplysninger om deg når vi skal behandle saken din. Det er nødvendig for at du skal få riktig tjeneste. Saken din kan behandles automatisk.',
    'personopplysninger.3': 'Hvilke opplysninger innhenter vi?',
    'personopplysninger.4': 'Opplysningene vi innhenter kommer enten fra deg eller fra offentlige registre:',
    'personopplysninger.4.1': 'hvilke barn du er registrert som forelder til.',
    'personopplysninger.4.2': 'hvem den andre forelderen er.',
    'personopplysninger.4.3': 'arbeidssituasjonen din.',
    'personopplysninger.4.4': 'tilknytningen din til Norge.',
    'personopplysninger.4.5':
        'trygdeordninger du kan ha rett til i andre land. Vi kan også sende opplysninger om deg til trygdemyndigheter i andre land.',
    'personopplysninger.4.6':
        'hvis du søker i forbindelse med at den andre forelderen er innlagt i helseinstitusjon, avtjener verneplikt eller soner fengselsstraff, kan vi sjekke dette mot offentlige registre ved behov.',

    'personopplysninger.5.1':
        'Du har rett til innsyn i saken din. Vil du vite mer om hvordan NAV behandler personopplysninger? Se ',
    'personopplysninger.5.2': 'nav.no/personvern',
    'personopplysninger.5.3': '.',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const personalOpplysningerMessages = { nb, nn };
