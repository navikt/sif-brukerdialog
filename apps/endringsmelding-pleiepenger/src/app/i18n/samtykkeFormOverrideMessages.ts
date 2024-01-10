import { MessageFileFormat } from '@navikt/sif-common-core-ds/src/types/MessageFileFormat';

export const samtykkeFormOverrideMessages: MessageFileFormat = {
    nb: {
        'samtykkeForm.bekreftLabel': 'Jeg bekrefter at jeg har forstått mitt ansvar når jeg sender inn en endring',
        'samtykkeForm.ansvar.tittel': 'Ditt ansvar når du melder fra om endring i saken din',
        'samtykkeForm.ansvar.list.1':
            'Jeg forstår at hvis jeg gir uriktige opplysninger, kan det få konsekvenser for retten min til pleiepenger',
        'samtykkeForm.ansvar.list.2.1': 'Jeg har lest og forstått det som står på',
        'samtykkeForm.ansvar.list.2.2': 'nav.no/rett og plikt',
        'samtykkeForm.harForståttRettigheterOgPlikter.notChecked':
            'Du må velge at du har forstått ditt ansvar når du sender inn en endring',
    },
};
