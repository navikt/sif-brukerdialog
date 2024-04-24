const nb = {
    'page.velkommen.sidetittel': 'Søknad om ekstra omsorgsdager',
    'page.velkommen.guide.tittel': 'Hei {navn}',
    'page.velkommen.guide.ingress':
        'Velkommen til søknad om ekstra omsorgsdager når den andre forelderen ikke kan ha tilsyn med barn.',
    'page.velkommen.guide.tekst.1':
        'Denne søknaden er for deg som skal søke om ekstra omsorgsdager fordi den andre forelderen ikke kan ha tilsyn med barn i en periode som varer i minst 6 måneder. Dette er i situasjoner hvor den andre forelderen for eksempel',
    'page.velkommen.guide.tekst.1.1': 'er fysisk eller psykisk syk',
    'page.velkommen.guide.tekst.1.2': 'er innlagt i helseinstitusjon',
    'page.velkommen.guide.tekst.1.3': 'har en funksjonshemning',
    'page.velkommen.guide.tekst.1.4': 'er i fengsel',
    'page.velkommen.guide.tekst.1.5': 'utøver verneplikt',

    'page.velkommen.guide.tekst.2':
        'Hvis du får innvilget søknaden får du doblet antall omsorgsdager. For å ha rett til å bruke omsorgsdager må du være yrkesaktiv. Det betyr at du må være arbeidstaker, selvstendig næringsdrivende, frilanser eller en kombinasjon av disse.',

    'page.velkommen.omSøknaden.tittel': 'Om søknaden',
    'page.velkommen.omSøknaden.1': 'Du får veiledning underveis i søknaden om hva du skal fylle ut, og hvordan.',
    'page.velkommen.omSøknaden.2':
        'Vi tar vare på svarene dine i 72 timer. Hvis du innenfor den tiden for eksempel vil ta en pause eller blir automatisk logget ut, fortsetter du der du var når du kommer tilbake.',
    'page.velkommen.omSøknaden.3':
        'Du må svare på alle spørsmålene for å kunne gå videre. Hvis du mangler etterspurt dokumentasjon, kan du ettersende det så snart du kan.',
    'page.velkommen.omSøknaden.4': 'Om hvordan vi innhenter opplysninger om deg',
    'page.velkommen.harForståttRettigheterOgPlikter.notChecked': 'Du må velge at du har forstått ditt ansvar som søker',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const velkommenPageMessages = { nb, nn };
