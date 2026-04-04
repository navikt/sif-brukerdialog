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
    'oppsummeringForm.validation.bekrefterOpplysninger.notChecked':
        'Du må stadfesta at opplysningane er rette for å senda inn søknaden.',
};
