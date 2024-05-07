import { samtykkeFormMessages } from '@navikt/sif-common-soknad-ds/src/modules/samtykke-form/samtykkeForm.messages';

type OverrideKeys = Pick<
    typeof samtykkeFormMessages.nb,
    | 'scs.samtykkeForm.bekreftLabel'
    | 'scs.samtykkeForm.ansvar.tittel'
    | 'scs.samtykkeForm.ansvar.list.1'
    | 'scs.samtykkeForm.harForståttRettigheterOgPlikter.notChecked'
>;

const nb: Record<keyof OverrideKeys, string> = {
    'scs.samtykkeForm.bekreftLabel': 'Jeg bekrefter at jeg har forstått mitt ansvar når jeg sender inn en endring',
    'scs.samtykkeForm.ansvar.tittel': 'Ditt ansvar når du melder fra om endring i saken din',
    'scs.samtykkeForm.ansvar.list.1':
        'Jeg forstår at hvis jeg gir uriktige opplysninger, kan det få konsekvenser for retten min til pleiepenger',
    'scs.samtykkeForm.harForståttRettigheterOgPlikter.notChecked':
        'Du må velge at du har forstått ditt ansvar når du sender inn en endring',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const samtykkeFormOverrideMessages = {
    nb,
    nn,
};
