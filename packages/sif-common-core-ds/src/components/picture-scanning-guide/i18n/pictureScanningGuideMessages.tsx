import { useIntl } from 'react-intl';
import { typedIntlHelper } from '../../../utils/intlUtils';

const nb = {
    '@core.psg.expandable.tittel': 'Tips til deg som skal ta bilde av dokumentet:',
    '@core.psg.section1.tittel': 'Trygg bruk når du tar bilde:',
    '@core.psg.section1.liste.1':
        'Bruk kamerafunksjonen på mobilen din for å ta bildet, ikke bruk Snapchat eller andre apper.',
    '@core.psg.section1.liste.2':
        'Vær obs på hvor du lagrer bildet, for eksempel skytjenester, og gjør deg kjent med risiko for at andre får tilgang til bildet.',
    '@core.psg.section1.liste.3': 'Vurder om du bør slette bildet etter at du har lastet det opp til søknaden.',
    '@core.psg.section2.tittel': 'Slik tar du et godt bilde:',
    '@core.psg.section2.liste.1': 'Hold mobilen eller kameraet direkte over dokumentet.',
    '@core.psg.section2.liste.2':
        'Dokumentet skal fylle hele bildet. Bildet skal ikke inneholde annen dokumentasjon eller gjenstander.',
    '@core.psg.section2.liste.3':
        'Bildet må inneholde all tekst i dokumentet. Hvis dokumentet er på mer enn en side, bør du laste opp flere bilder. ',
    '@core.psg.section3.tittel': 'Etter at du har tatt bildet, sjekk følgende før du laster opp:',
    '@core.psg.section3.liste.1': 'Dokumentet har riktig retning.',
    '@core.psg.section3.liste.2': 'Teksten til dokumentet er godt leselig.',
    '@core.psg.section3.liste.3': 'Bildet er godt opplyst, uten skygger.',
    '@core.psg.icon.heading': 'Bra og dårlige eksempler på bilder av dokumenter',
    '@core.psg.good': 'Bra',
    '@core.psg.bad': 'Dårlig',
    '@core.psg.icon.label.good': 'Dokumentet fyller hele bildet',
    '@core.psg.icon.label.keystone': 'Bildet er ikke tatt ovenfra',
    '@core.psg.icon.label.horizontal': 'Bildet har ikke riktig retning',
    '@core.psg.icon.label.shadow': 'Bildet har skygge på dokumentet',
    '@core.psg.lenkepanel.url': 'https://www.nav.no/brukerstotte#sende-soknad-pa-nett',
    '@core.psg.lenkepanel.text': 'Mer hjelp til å laste opp vedlegg (åpnes i et nytt vindu).',
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,

    '@core.psg.expandable.tittel': 'Tips til deg som skal ta bilete av dokumentet:',
    '@core.psg.section1.tittel': 'Trygg bruk når du tek bilete:',
    '@core.psg.section1.liste.1':
        'Bruk kamerafunksjonen på mobilen din for å ta biletet, ikkje bruk Snapchat eller andre apper.',
    '@core.psg.section1.liste.2':
        'Ver obs på kvar du lagrar biletet, til dømes skytenester, og gjer deg kjent med risiko for at andre får tilgang til biletet.',
    '@core.psg.section1.liste.3': 'Vurder om du bør sletta biletet etter at du har lasta det opp til søknaden.',
    '@core.psg.section2.tittel': 'Slik tek du eit godt bilete:',
    '@core.psg.section2.liste.1': 'Hald mobilen eller kameraet direkte over dokumentet.',
    '@core.psg.section2.liste.2':
        'Dokumentet skal fylle heile biletet. Biletet skal ikkje innehalde annan dokumentasjon eller gjenstandar.',
    '@core.psg.section2.liste.3':
        'Biletet må innehalde all tekst i dokumentet. Dersom dokumentet er skriven på meir enn éi side, bør du laste opp fleire bilete.',
    '@core.psg.section3.tittel': 'Etter at du har teke biletet, sjekk følgjande før du lastar opp:',
    '@core.psg.section3.liste.1': 'Dokumentet har rett retning.',
    '@core.psg.section3.liste.2': 'Teksten til dokumentet er godt leseleg.',
    '@core.psg.section3.liste.3': 'Biletet er godt opplyst, utan skuggar.',
    '@core.psg.icon.heading': 'Bra og dårlige eksempler på bilder av dokument',
    '@core.psg.good': 'Bra',
    '@core.psg.bad': 'Dårlig',
    '@core.psg.icon.label.good': 'Dokumentet fyller heile biletet',
    '@core.psg.icon.label.keystone': 'Biletet er ikkje tatt ovanfrå',
    '@core.psg.icon.label.horizontal': 'Biletet har ikkje rett retning',
    '@core.psg.icon.label.shadow': 'Biletet har skugge oppå dokumentet',
    '@core.psg.lenkepanel.url': 'https://www.nav.no/brukerstotte#sende-soknad-pa-nett',
    '@core.psg.lenkepanel.text': 'Meir hjelp til opplasting av vedlegg (vert åpna i nytt vindauge).',
};

export type PSGMessageKeys = keyof typeof nb;

export const usePSGIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<PSGMessageKeys>(intl);
};

export const pictureScanningGuideMessages = {
    nb,
    nn,
};
