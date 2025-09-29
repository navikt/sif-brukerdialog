import { oppsummeringMessages_nb } from './nb';

export const oppsummeringMessages_nn: Record<keyof typeof oppsummeringMessages_nb, string> = {
    'step.oppsummering.nextButtonLabel': 'Send inn søknaden',
    'step.oppsummering.info':
        'Les gjennom oppsummeringa og sjekk at alt er riktig før du sender inn søknaden. Dersom du vil gjere endringar, kan du gå tilbake.',

    'step.oppsummering.søker.header': 'Om deg som søkjar',
    'step.oppsummering.søker.navn': 'Namn',
    'step.oppsummering.søker.fnr': 'Fødselsnummer',

    'step.oppsummering.omBarna.header': 'Om barn',
    'step.oppsummering.omBarna.barn': 'Barna dine',
    'step.oppsummering.omBarna.listItem': ' (fnr. {identitetsnummer})',

    'step.oppsummering.annenForelder.header': 'Om den andre forelderen',
    'step.oppsummering.annenForelder.navn': 'Namn',
    'step.oppsummering.annenForelder.fnr': 'Fødselsnummer',

    'step.oppsummering.annenForelderensSituasjon.header': 'Den andre forelderen sin situasjon',
    'step.oppsummering.annenForelderensSituasjon.erVarighetMerEnn6Maneder':
        'Har du stadfesta at den andre forelderen ikkje kan ha tilsyn med barn i ein periode på minst 6 månadar?',
    'step.oppsummering.annenForelderensSituasjon.tittel':
        'Grunn til at den andre forelderen ikkje kan ha tilsyn med barn:',
    'step.oppsummering.annenForelderensSituasjon.beskrivelse': 'Skildring av situasjonen:',
    'step.oppsummering.annenForelderensSituasjon.periode.header':
        'Periode når den andre forelderen ikkje kan ha tilsyn med barnet/barna:',
    'step.oppsummering.annenForelderensSituasjon.VetIkkeHvorLengePerioden': 'Eg veit ikkje kor lenge perioden vil vare',

    'step.oppsummering.bekrefterOpplysninger':
        'Eg stadfestar at opplysningane eg har gjeve er riktige, og at eg ikkje har halde tilbake opplysningar som har tyding for retten min til omsorgsdagar.',

    'step.oppsummering.sendSøknad': 'Send søknad',

    'validation.harBekreftetOpplysninger.notChecked': 'Du må stadfeste opplysningane.',
    'innsendingFeilet.tittel': 'Oops, noko gjekk gale.',
    'innsendingFeilet.tekst.situasjonBeskrivelse': 'Skildringa av situasjonen inneheld teikn som ikkje er tillate.',
    'innsendingFeilet.tekst.generell.1': 'Søknaden din inneheld ugyldig informasjon.',
    'innsendingFeilet.tekst.generell.2':
        'Når du sjølv skriv inn tekst i eit felt i søknaden, kan nokre teikn vera ugyldige ut frå informasjonen me ber om. Dette skjer vanlegvis viss du kopierer og limer inn tekst frå andre stader. Du fiksar dette ved å skriva inn teksten på ny, utan å kopiera den frå ein annan stad.',
    'innsendingFeilet.tekst.generell.3':
        'Nokre gonger vil dei ugyldige teikna vera synlege som små firkantar inne i teksten. Då kan det vera det held å fjerna desse.',
    'innsendingFeilet.tekst.generell.4':
        'Viss du har sjekka dette, og framleis ikkje kjem vidare, ber me deg kontakta oss på <Telefon>55 55 33 33</Telefon> for vidare rettleiing.',
};
