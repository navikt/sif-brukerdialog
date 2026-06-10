/* eslint-disable max-len */
import { kvitteringPageMessages_nn } from '../../pages/i18n/kvitteringPage/nn';
import { velkommenPageMessages_nn } from '../../pages/i18n/velkommenPage/nn';
import { barnStegMessages_nn } from '../../steg/barn/i18n/nn';
import { kontonummerStegMessages_nn } from '../../steg/kontonummer/i18n/nn';
import { oppsummeringStegMessages_nn } from '../../steg/oppsummering/i18n/nn';
import { ungSoknadMessages_nb } from './nb';

export const ungSoknadMessages_nn: typeof ungSoknadMessages_nb = {
    'søknad.tittel': 'Søknad om ungdomsprogramytelsen',
    'søknad.tittel.shy': 'Søknad om ungdoms\u00ADprogram\u00ADytelsen',

    'step.kontonummer.title': 'Kontonummer for utbetaling',
    'step.barn.title': 'Barn',
    'step.oppsummering.title': 'Oppsummering',

    'personopplysninger.accordion.header': 'Om korleis vi hentar inn opplysningar om deg',
    'personopplysninger.1': 'Slik handsamar Nav personopplysningane dine',
    'personopplysninger.2':
        'Vi hentar inn og mottek opplysningar om deg for å handsame saka di. Det er naudsynt for at du skal få rett ytingsteneste. Deler av saka di blir handsama automatisk.',
    'personopplysninger.3': 'Kva for opplysningar hentar vi inn?',
    'personopplysninger.4':
        'Opplysningane vi hentar inn kjem anten frå deg, rettleiaren din i Nav eller frå offentlege register:',
    'personopplysninger.4.1':
        'barn som du er registrert som forelder til, hentar vi frå folkeregisteret, slik at vi kan vurdere om du har rett på barnetillegg',
    'personopplysninger.4.2':
        'inntekta di hentar vi frå arbeidsgjevaren, slik at vi kan kontrollere om ytelsen skal reduserast sidan du har inntekt ved sida av',
    'personopplysninger.4.3':
        'ytingar du mottek frå Nav, slik at vi kan kontrollere om ytelsen skal reduserast sidan du mottek annan yting frå Nav',
    'personopplysninger.4.4':
        'opplysningar om perioden du deltek i programmet, hentar vi frå rettleiaren i Nav, slik at vi veit for kva periode du skal få yting/pengar frå Nav',
    'personopplysninger.5':
        'Du har rett til innsyn i saka di. Vil du vite meir om korleis Nav handsamar personopplysningar? Sjå <Lenke>nav.no/personvern</Lenke>.',

    'søknadApp.loading.error': 'Det oppstod ein feil ved henting av nødvendig informasjon. Prøv igjen seinare.',

    'søknadApp.nesteSteg.label': 'Neste steg',
    'søknadApp.forrigeSteg.label': 'Førre steg',
    'søknadApp.avbrytSøknad.label': 'Avbryt søknad',
    'søknadApp.sendSøknad.label': 'Send søknad',

    'søknadApp.slettSøknad.tittel': 'Slett søknad',
    'søknadApp.slettSøknad.ja.label': 'Ja, slett',
    'søknadApp.slettSøknad.nei.label': 'Nei',
    'søknadApp.slettSøknad.spm': 'Vil du slette søknaden?',
    'søknadApp.slettSøknad.tekst': 'Informasjonen du har fylt ut blir sletta, og du kjem tilbake til velkomstsida.',

    ...velkommenPageMessages_nn,
    ...kvitteringPageMessages_nn,
    ...kontonummerStegMessages_nn,
    ...barnStegMessages_nn,
    ...oppsummeringStegMessages_nn,
};
