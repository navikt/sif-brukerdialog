/* eslint-disable max-len */
export type OppsummeringStegMessageKeys = keyof typeof oppsummeringStegMessages_nb;

export const oppsummeringStegMessages_nb = {
    'oppsummeringSteg.søker.header': 'Om deg',
    'oppsummeringSteg.søker.navn': 'Navn',
    'oppsummeringSteg.søker.fnr': 'Fødselsnummer',

    'oppsummeringSteg.barnet.header': 'Om barnet',
    'oppsummeringSteg.barnet.navn': 'Navn',
    'oppsummeringSteg.barnet.fødselsdato': 'Fødselsdato',
    'oppsummeringSteg.barnet.fnr': 'Fødselsnummer',
    'oppsummeringSteg.barnet.søkersRelasjonTilBarnet': 'Din relasjon til barnet',
    'oppsummeringSteg.barnet.sammeAdresse.header': 'Bor du sammen med barnet?',
    'oppsummeringSteg.barnet.sammeAdresse.ja': 'Ja',
    'oppsummeringSteg.barnet.sammeAdresse.nei': 'Nei',
    'oppsummeringSteg.barnet.sammeAdresse.jaDeltBosted': 'Ja, barnet har delt fast bosted',
    'oppsummeringSteg.barnet.kroniskEllerFunksjonshemmende.header':
        'Har barnet kronisk/langvarig sykdom eller funksjonshemning?',
    'oppsummeringSteg.barnet.høyereRisikoForFravær.header':
        'Har du høyere risiko for fravær på jobb på grunn av barnets sykdom eller funksjonshemning?',
    'oppsummeringSteg.barnet.høyereRisikoForFraværBeskrivelse.header':
        'Beskrivelse på hvordan barnets sykdom eller funksjonshemning gir høyere risiko for fravær fra jobb',
    'oppsummeringSteg.ja': 'Ja',
    'oppsummeringSteg.nei': 'Nei',

    'oppsummeringSteg.vedlegg.header': 'Vedlegg',
    'oppsummeringSteg.legeerklæring.header': 'Legeerklæring',
    'oppsummeringSteg.samværsavtale.header': 'Avtale om delt fast bosted',
    'oppsummeringSteg.vedlegg.ingenLastetOpp': 'Ingen vedlegg lastet opp',

    'oppsummeringSteg.bekrefterOpplysninger.label':
        'Jeg bekrefter at opplysningene jeg har gitt er riktige, og at jeg ikke har holdt tilbake opplysninger som har betydning for min rett til omsorgspenger.',
    'oppsummeringSteg.feil.tittel': 'Søknaden kan ikke sendes inn',
    'oppsummeringSteg.feil.innhold': 'Det mangler opplysninger i søknaden. Gå tilbake og fyll inn manglende felt.',
    'oppsummeringSteg.innsendingFeilet.tittel': 'Oops, noe gikk galt.',
    'oppsummeringSteg.innsendingFeilet.tekst.høyereRisikoForFraværBeskrivelseFeil':
        'Beskrivelsen på hvordan barnets sykdom eller funksjonshemning gir markert høyere risiko for fravær fra jobb inneholder tegn som ikke er tillatt. Gå tilbake til steg én og se over teksten.',
    'oppsummeringSteg.innsendingFeilet.tekst.generell.1': 'Søknaden din inneholder ugyldig informasjon.',
    'oppsummeringSteg.innsendingFeilet.tekst.generell.2':
        'Når du selv skriver inn tekst i et felt i søknaden, kan noen tegn være ugyldige ut fra informasjonen vi ber om. Dette skjer vanligvis hvis du kopierer og limer inn tekst fra andre steder. Du fikser dette ved å skrive inn teksten på ny direkte i feltet, uten å kopiere den fra et annet sted.',
    'oppsummeringSteg.innsendingFeilet.tekst.generell.3':
        'Noen ganger vil de ugyldige tegnene være tegn en ser på som vanlige, f.eks. emojier, «, » eller «§», mens andre ganger kan det være synlige som små firkanter inne i teksten.',
    'oppsummeringSteg.innsendingFeilet.tekst.generell.4':
        'Hvis du har sjekket dette, og fortsatt ikke kommer videre, ber vi deg kontakte oss på <Telefon>55 55 33 33</Telefon> for videre veiledning.',
    'oppsummeringForm.validation.bekrefterOpplysninger.notChecked':
        'Du må bekrefte at opplysningene er riktige for å sende inn søknaden.',
} as const;
