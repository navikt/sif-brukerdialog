const nb = {
    'steg.oppsummering.søker.header': 'Om deg',
    'steg.oppsummering.søker.fnr': 'Fødselsnummer: {fødselsnummer}',
    'steg.oppsummering.barnet.header': 'Om barnet',
    'steg.oppsummering.barnet.navn': 'Navn: {navn}',
    'steg.oppsummering.barnet.fødselsdato': 'Fødselsdato: {dato}',
    'steg.oppsummering.barnet.fnr': 'Fødselsnummer: {fnr}',
    'steg.oppsummering.barnet.søkersRelasjonTilBarnet': 'Din relasjon til barnet: {relasjon}',
    'steg.oppsummering.barnet.sammeAdresse.header': 'Bor du sammen med barnet?',
    'steg.oppsummering.barnet.sammeAdresse.ja': 'Ja',
    'steg.oppsummering.barnet.sammeAdresse.nei': 'Nei',
    'steg.oppsummering.barnet.sammeAdresse.jaDeltBosted': 'Ja, barnet har delt fast bosted',
    'steg.oppsummering.barnet.kroniskEllerFunksjonshemmende.header':
        'Har barnet kronisk/langvarig sykdom eller funksjonshemning?',
    'steg.oppsummering.barnet.høyereRisikoForFravær.header':
        'Har du høyere risiko for fravær på jobb på grunn av barnets sykdom eller funksjonshemning? ',
    'steg.oppsummering.barnet.høyereRisikoForFraværBeskrivelse.header':
        'Beskrivelse på hvordan barnets sykdom eller funksjonshemning gir høyere risiko for fravær fra jobb',
    'steg.oppsummering.vedlegg.header': 'Vedlegg',
    'steg.oppsummering.legeerklæring.header': 'Legeerklæring',
    'steg.oppsummering.samværsavtale.header': 'Avtale om delt fast bosted',
    'steg.oppsummering.bekrefterOpplysninger':
        'Jeg bekrefter at opplysningene jeg har gitt er riktige, og at jeg ikke har holdt tilbake opplysninger som har betydning for min rett til omsorgspenger.',
    'validation.harBekreftetOpplysninger.notChecked': 'Du må bekrefte opplysningene.',
};

const nn: Record<keyof typeof nb, string> = {
    'steg.oppsummering.søker.header': 'Om deg',
    'steg.oppsummering.søker.fnr': 'Fødselsnummer: {fødselsnummer}',
    'steg.oppsummering.barnet.header': 'Om barnet',
    'steg.oppsummering.barnet.navn': 'Namn: {navn}',
    'steg.oppsummering.barnet.fødselsdato': 'Fødselsdato: {dato}',
    'steg.oppsummering.barnet.fnr': 'Fødselsnummer: {fnr}',
    'steg.oppsummering.barnet.søkersRelasjonTilBarnet': 'Relasjonen din til barnet: {relasjon}',
    'steg.oppsummering.barnet.sammeAdresse.header': 'Bor du saman med barnet?',
    'steg.oppsummering.barnet.sammeAdresse.ja': 'Ja',
    'steg.oppsummering.barnet.sammeAdresse.nei': 'Nei',
    'steg.oppsummering.barnet.sammeAdresse.jaDeltBosted': 'Ja, barnet har delt fast bustad',
    'steg.oppsummering.barnet.kroniskEllerFunksjonshemmende.header':
        'Har barnet kronisk/langvarig sjukdom eller funksjonshemning?',
    'steg.oppsummering.barnet.høyereRisikoForFravær.header':
        'Har du høgare risiko for fråvær på jobb på grunn av sjukdommen eller funksjonshemninga til barnet? ',
    'steg.oppsummering.barnet.høyereRisikoForFraværBeskrivelse.header':
        'Skildring på korleis sjukdommen eller funksjonshemninga til barnet gir høgare risiko for fråvær frå jobb',
    'steg.oppsummering.vedlegg.header': 'Vedlegg',
    'steg.oppsummering.legeerklæring.header': 'Legeerklæring',
    'steg.oppsummering.samværsavtale.header': 'Avtale om delt fast bustad',
    'steg.oppsummering.bekrefterOpplysninger':
        'Eg stadfestar at opplysningane eg har gitt er korrekte, og at eg ikkje har halde tilbake opplysningar som har noko å seia for retten min til omsorgspengar.',
    'validation.harBekreftetOpplysninger.notChecked': 'Du må stadfesta opplysningane.',
};

export const oppsummeringMessages = {
    nb,
    nn,
};
