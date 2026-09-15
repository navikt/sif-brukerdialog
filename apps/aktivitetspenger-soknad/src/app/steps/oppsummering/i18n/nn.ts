import { oppsummeringStegMessages_nb } from './nb';

export const oppsummeringStegMessages_nn: Record<keyof typeof oppsummeringStegMessages_nb, string> = {
    'oppsummeringSteg.feil.tittel': 'Det skjedde ein feil',
    'oppsummeringSteg.feil.innhold':
        'Det manglar nødvendig informasjon for å kunne sende inn søknaden. Prøv igjen seinare.',

    'oppsummeringSteg.innsendingFeilet.tittel': 'Oi, noko gjekk gale.',
    'oppsummeringSteg.innsendingFeilet.tekst.generell.1':
        'Det oppstod ein feil ved innsending av søknaden. Du kan prøve på nytt om ei lita stund.',
    'oppsummeringSteg.innsendingFeilet.tekst.generell.2':
        'Viss feilen held fram og du ikkje kjem vidare, ber me deg kontakte oss på <Telefon>55 55 33 33</Telefon> for vidare rettleiing.',
    'oppsummeringSteg.innsendingFeilet.merInformasjon.header': 'Meir informasjon om feilen',

    'oppsummeringSteg.oppsummering.tittel': 'Informasjon du har oppgitt',
    'oppsummeringSteg.startdato.tittel': 'Startdato',
    'oppsummeringSteg.startdato.label': 'Når skal aktivitetspengane starte?',
    'oppsummeringSteg.bekrefterOpplysninger.label': 'Eg stadfestar at opplysningane eg har gitt er rette',
    'oppsummeringForm.validation.bekrefterOpplysninger.notChecked': 'Du må stadfeste at opplysningane er rette',
    'oppsummeringSteg.kontonummer.tittel': 'Kontonummer for utbetaling',
    'oppsummeringSteg.kontonummer.ingenKontonummer.tittel': 'Kontonummer for utbetaling',
    'oppsummeringSteg.kontonummer.ingenKontonummer.tekst': 'Me har ikkje registrert noko kontonummer på deg.',
    'oppsummeringSteg.kontonummer.kontonummerInfoMangler.tittel': 'Kontonummer for utbetaling',
    'oppsummeringSteg.kontonummer.kontonummerInfoMangler.tekst':
        'Me klarer ikkje å sjå om du har registrert kontonummer hos oss.',
    'oppsummeringSteg.barn.tittel': 'Barn',
    'oppsummeringSteg.startdato.testing': 'Berre for testing i Q',
    'oppsummeringSteg.startdato.velgStartdato': 'Vel startdato som skal gjelde for denne søknaden',
    'oppsummeringSteg.bosted.tittel': 'Bustad',
    'oppsummeringSteg.bosted.erBosattITrondheim': 'Er du busett i Trondheim kommune?',
    'oppsummeringSteg.medlemskap.bostederUtenforNorge': 'Bustader utanfor Noreg siste 5 år',
    'oppsummering.medlemskap.arbeidstederUtenforNorge': 'Jobb utanfor Noreg siste 5 år',
};
