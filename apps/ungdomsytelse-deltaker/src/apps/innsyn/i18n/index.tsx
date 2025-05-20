import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { FormattedMessage, useIntl } from 'react-intl';

const nb = {
    'oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE.tittel': 'Bekreft eller kommenter endret programperiode',
    'oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.tittel': 'Bekreft eller kommenter avvik i inntekt',
    'oppgavetype.RAPPORTER_INNTEKT.tittel': 'Oppgi inntekt',
};

export type AppMessageKeys = keyof typeof nb;

export const useAppIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<AppMessageKeys>(intl);
};

export type AppIntlShape = ReturnType<typeof useAppIntl>;

export const innsynAppMessages = {
    nb,
};

interface AppTextProps {
    id: AppMessageKeys;
    values?: any;
}

export const AppText = (props: AppTextProps) => {
    return <FormattedMessage {...props} />;
};

export const applicationIntlMessages = {
    nb,
};
