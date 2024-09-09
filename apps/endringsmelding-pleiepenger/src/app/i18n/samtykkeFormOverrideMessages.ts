import { samtykkeFormMessages } from '@navikt/sif-common-soknad-ds/src/modules/samtykke-form/samtykkeForm.messages';

type OverrideKeys = Pick<
    typeof samtykkeFormMessages.nb,
    | '@soknad.samtykkeForm.bekreftLabel'
    | '@soknad.samtykkeForm.ansvar.tittel'
    | '@soknad.samtykkeForm.ansvar.list.1'
    | '@soknad.samtykkeForm.harForståttRettigheterOgPlikter.notChecked'
>;

const nb: Record<keyof OverrideKeys, string> = {
    '@soknad.samtykkeForm.bekreftLabel': 'Jeg bekrefter at jeg har forstått mitt ansvar når jeg sender inn en endring',
    '@soknad.samtykkeForm.ansvar.tittel': 'Ditt ansvar når du melder fra om endring i saken din',
    '@soknad.samtykkeForm.ansvar.list.1':
        'Jeg forstår at hvis jeg gir uriktige opplysninger, kan det få konsekvenser for retten min til pleiepenger',
    '@soknad.samtykkeForm.harForståttRettigheterOgPlikter.notChecked':
        'Du må velge at du har forstått ditt ansvar når du sender inn en endring',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const samtykkeFormOverrideMessages = {
    nb,
    nn,
};
