const nb = {
    'steg.oppsummering.søker.header': 'Om deg',
    'steg.oppsummering.søker.fnr': 'Fødselsnummer',
    'steg.oppsummering.barnet.header': 'Om barnet',
    'steg.oppsummering.barnet.navn': 'Navn',
    'steg.oppsummering.barnet.fødselsdato': 'Fødselsdato',
    'steg.oppsummering.barnet.fnr': 'Fødselsnummer',
    'steg.oppsummering.barnet.søkersRelasjonTilBarnet': 'Din relasjon til barnet',
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
    'step.oppsummering.sendSøknad': 'Send søknad',
    'validation.harBekreftetOpplysninger.notChecked': 'Du må bekrefte opplysningene.',
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
};
export const oppsummeringMessages = {
    nb,
    nn,
};
