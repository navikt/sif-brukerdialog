/* eslint-disable max-len */
const nb = {
    'samtykke.bekreftLabel': 'Jeg bekrefter at jeg har forstått mitt ansvar som søker.',
    'samtykke.ansvar.tittel': 'Ditt ansvar som søker',
    'samtykke.ansvar.list.1':
        'Jeg forstår at hvis jeg gir uriktige opplysninger, kan det få konsekvenser for retten min til det jeg søker om.',
    'samtykke.ansvar.list.2': 'Jeg har lest og forstått det som står på <Lenke>nav.no/rett og plikt</Lenke>.',
    'samtykke.ansvar.list.3':
        'Jeg bekrefter at opplysningene jeg har gitt er riktige, og at jeg ikke har holdt tilbake opplysninger som har betydning for min rett til ungdomsytelsen.',
    'samtykke.harForståttRettigheterOgPlikter.notChecked': 'Du må velge at du har forstått ditt ansvar som søker',

    'omSøknaden.tittel': 'Om søknaden',
    'omSøknaden.tekst.1': 'Du får veiledning underveis i søknaden om hva du skal fylle ut, og hvordan.',
    'omSøknaden.tekst.2':
        'Vi tar vare på svarene dine i 72 timer. Hvis du innenfor den tiden for eksempel vil ta en pause eller blir automatisk logget ut, fortsetter du der du var når du kommer tilbake.',
    'omSøknaden.tekst.3':
        'Du må svare på alle spørsmålene for å kunne gå videre. Hvis du mangler etterspurt dokumentasjon, kan du ettersende det så snart du kan.',
    'omSøknaden.tekst.4': 'Om hvordan vi innhenter opplysninger om deg',

    'personopplysninger.accordion.header': 'Om hvordan vi innhenter opplysninger om deg',
    'personopplysninger.1': 'Slik behandler Nav personopplysningene dine',
    'personopplysninger.2':
        'Vi henter inn og mottar opplysninger om deg for å behandle saken din. Det er nødvendig for at du skal få riktig ytelsetjeneste. Deler av saken din blir behandlet automatisk.',
    'personopplysninger.3': 'Hvilke opplysninger henter vi inn?',
    'personopplysninger.4':
        'Opplysningene vi henter inn kommer enten fra deg, din veileder i NAV eller fra offentlige registre:',
    'personopplysninger.4.1':
        'barn som du er registrert som forelder til, henter vi fra folkeregisteret, slik at vi kan vurdere om du har rett på barnetillegg',
    'personopplysninger.4.2':
        'inntekten din henter vi fra arbeidsgiver, slik at vi kan kontrollere om ytelsen skal reduseres siden du har inntekt ved siden av',
    'personopplysninger.4.3':
        'ytelser du mottar fra Nav, slik at vi kan kontrollere om ytelsen skal reduseres siden du mottar annen ytelse fra Nav',
    'personopplysninger.4.4':
        'opplysninger om perioden du deltar i programmet, henter vi fra veileder i Nav, slik at vi vet for hvilken periode du skal motta ytelse/penger fra Nav',
    'personopplysninger.5':
        'Du har rett til innsyn i saken din. Vil du vite mer om hvordan Nav behandler personopplysninger? Se <Lenke>nav.no/personvern</Lenke>.',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const appMessages = {
    nb,
    nn,
};
