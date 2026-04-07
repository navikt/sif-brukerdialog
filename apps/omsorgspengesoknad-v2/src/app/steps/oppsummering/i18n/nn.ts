import { oppsummeringStegMessages_nb } from './nb';

export const oppsummeringStegMessages_nn: Record<keyof typeof oppsummeringStegMessages_nb, string> = {
    'oppsummeringSteg.søker.header': 'Om deg',
    'oppsummeringSteg.søker.navn': 'Namn',
    'oppsummeringSteg.søker.fnr': 'Fødselsnummer',

    'oppsummeringSteg.barnet.header': 'Om barnet',
    'oppsummeringSteg.barnet.navn': 'Namn',
    'oppsummeringSteg.barnet.fødselsdato': 'Fødselsdato',
    'oppsummeringSteg.barnet.fnr': 'Fødselsnummer',
    'oppsummeringSteg.barnet.søkersRelasjonTilBarnet': 'Relasjonen din til barnet',
    'oppsummeringSteg.barnet.sammeAdresse.header': 'Bur du saman med barnet?',
    'oppsummeringSteg.barnet.sammeAdresse.ja': 'Ja',
    'oppsummeringSteg.barnet.sammeAdresse.nei': 'Nei',
    'oppsummeringSteg.barnet.sammeAdresse.jaDeltBosted': 'Ja, barnet har delt fast bustad',
    'oppsummeringSteg.barnet.kroniskEllerFunksjonshemmende.header':
        'Har barnet kronisk/langvarig sjukdom eller funksjonshemming?',
    'oppsummeringSteg.barnet.høyereRisikoForFravær.header':
        'Har du høgare risiko for fråvær på jobb på grunn av sjukdommen eller funksjonshemminga til barnet? ',
    'oppsummeringSteg.barnet.høyereRisikoForFraværBeskrivelse.header':
        'Skildring av korleis barnet sin sjukdom eller funksjonshemming gjer det meir sannsynleg at du må vera borte frå jobb.',
    'oppsummeringSteg.ja': 'Ja',
    'oppsummeringSteg.nei': 'Nei',

    'oppsummeringSteg.vedlegg.header': 'Vedlegg',
    'oppsummeringSteg.legeerklæring.header': 'Legeerklæring',
    'oppsummeringSteg.samværsavtale.header': 'Avtale om delt fast bustad',
    'oppsummeringSteg.vedlegg.ingenLastetOpp': 'Ingen vedlegg lasta opp',

    'oppsummeringSteg.bekrefterOpplysninger.label':
        'Eg stadfestar at opplysningane eg har gitt er rette, og at eg ikkje har halde tilbake opplysningar som har noko å seia for retten min til omsorgspengar.',
    'oppsummeringSteg.feil.tittel': 'Søknaden kan ikkje sendast inn',
    'oppsummeringSteg.feil.innhold': 'Det manglar opplysningar i søknaden. Gå tilbake og fyll inn manglande felt.',
    'oppsummeringSteg.innsendingFeilet.tittel': 'Oops, noko gjekk gale.',
    'oppsummeringSteg.innsendingFeilet.tekst.høyereRisikoForFraværBeskrivelseFeil':
        'Skildringa på korleis sjukdommen eller funksjonshemminga til barnet gir markert høgare risiko for fråvær frå jobb inneheld teikn som ikkje er tillate. Gå tilbake til steig éin og sjå over teksten.',
    'oppsummeringSteg.innsendingFeilet.tekst.generell.1': 'Søknaden din inneheld ugyldig informasjon.',
    'oppsummeringSteg.innsendingFeilet.tekst.generell.2':
        'Når du sjølv skriv inn tekst i eit felt i søknaden, kan nokre teikn vera ugyldige ut frå informasjonen me ber om. Dette skjer vanlegvis viss du kopierer og limer inn tekst frå andre stader. Du fiksar dette ved å skriva inn teksten på ny, utan å kopiera den frå ein annan stad.',
    'oppsummeringSteg.innsendingFeilet.tekst.generell.3':
        'Nokre gonger vil dei ugyldige teikna vera synlege som små firkantar inne i teksten. Då kan det vera det held å fjerna desse.',
    'oppsummeringSteg.innsendingFeilet.tekst.generell.4':
        'Viss du har sjekka dette, og framleis ikkje kjem vidare, ber me deg kontakta oss på <Telefon>55 55 33 33</Telefon> for vidare rettleiing.',
    'oppsummeringForm.validation.bekrefterOpplysninger.notChecked':
        'Du må stadfesta at opplysningane er rette for å senda inn søknaden.',
};
