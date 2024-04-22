import { FormattedMessage, useIntl } from 'react-intl';
import { commonMessages } from '@navikt/sif-common-core-ds/src/i18n/common.messages';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { soknadMessages } from '@navikt/sif-common-soknad-ds';
import { uiMessages } from '@navikt/sif-common-ui';
import { kvitteringMessages } from '../pages/kvittering/kvitteringMesssages';
import { velkommenPageMessages } from '../pages/velkommen/velkommenPageMessages';
import { deltBostedMessages } from '../søknad/steps/delt-bosted/deltBostedMessages';
import { legeerklæringMessages } from '../søknad/steps/legeerklæring/legeerklæringMessages';
import { omBarnetMessages } from '../søknad/steps/om-barnet/stegOmBarnetMessages';
import { oppsummeringMessages } from '../søknad/steps/oppsummering/oppsummeringMessages';
import { validateApiDataMessages } from '../utils/søknadsdataToApiData/validateApiData';
import { appMessages } from './appMessages';

const nb = {
    ...commonMessages.nb,
    ...uiMessages.nb,
    ...soknadMessages.nb,
    ...velkommenPageMessages.nb,
    ...omBarnetMessages.nb,
    ...deltBostedMessages.nb,
    ...legeerklæringMessages.nb,
    ...oppsummeringMessages.nb,
    ...kvitteringMessages.nb,
    ...validateApiDataMessages.nb,
    ...appMessages.nb,
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
};

export type AppMessageKeys = keyof typeof nb;

export const useAppIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<AppMessageKeys>(intl);
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
    nn,
};
