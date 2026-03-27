import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { IntlProvider } from 'react-intl';

import { ungUi_messages_nb } from '../i18n/nb';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
    },
});

const allMessages: Record<string, string> = {
    ...ungUi_messages_nb,
    '@ungUi.inntektForm.validation.harInntekt.yesOrNoIsUnanswered': 'Du må svare på om du hadde inntekt.',
    '@ungUi.inntektForm.validation.inntekt.numberHasNoValue': 'Du må oppgi hva du hadde i inntekt før skatt',
    '@ungUi.inntektForm.validation.inntekt.numberHasInvalidFormat':
        'Oppgitt inntekt har ikke gyldig format. Et gyldig tall inneholder kun siffer.',
    '@ungUi.inntektForm.validation.inntekt.numberIsTooSmall':
        'Oppgitt inntekt må være mer enn 0. Hvis du ikke hadde inntekt, velger du "Nei" på spørsmålet over.',
    '@ungUi.inntektForm.validation.inntekt.numberHasDecimals': 'Du må oppgi inntekt uten desimaler.',
    '@ungUi.uttalelseForm.validation.harUttalelse.yesOrNoIsUnanswered': 'Du må svare på om du har en tilbakemelding.',
    '@ungUi.uttalelseForm.validation.uttalelse.stringHasNoValue': 'Du må fylle ut tilbakemeldingsfeltet.',
    '@ungUi.uttalelseForm.validation.uttalelse.stringIsTooShort':
        'Du har brukt for få tegn i tilbakemeldingen din. Teksten må minst inneholde {min} tegn.',
    '@ungUi.uttalelseForm.validation.uttalelse.stringIsTooLong':
        'Du har brukt for mange tegn i tilbakemeldingen din. Teksten kan ikke inneholde flere enn {maks} tegn.',
    '@ungUi.uttalelseForm.validation.uttalelse.stringHasInvalidCharacters':
        'Tilbakemeldingen inneholder ugyldige tegn.',
};

export const StorybookDecorator = (Story: React.ComponentType) => (
    <QueryClientProvider client={queryClient}>
        <IntlProvider locale="nb" messages={allMessages}>
            <Story />
        </IntlProvider>
    </QueryClientProvider>
);
