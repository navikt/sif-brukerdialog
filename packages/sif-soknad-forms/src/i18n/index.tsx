import { typedIntlHelper } from '@navikt/sif-common-utils';
import { FormattedMessage, useIntl } from 'react-intl';

import { bostedUtlandMessages_nb } from '../dialogs/bosted-utland/i18n/nb';
import { bostedUtlandMessages_nn } from '../dialogs/bosted-utland/i18n/nn';

const nb = {
    ...bostedUtlandMessages_nb,
};

const nn: Record<keyof typeof nb, string> = {
    ...bostedUtlandMessages_nn,
};

type SifSoknadFormsMessageKeys = keyof typeof nb;

export const useSifSoknadFormsIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<SifSoknadFormsMessageKeys>(intl);
};

interface SifSoknadFormsTextProps {
    id: SifSoknadFormsMessageKeys;
    values?: any;
}

export const SifSoknadFormsText = (props: SifSoknadFormsTextProps) => {
    return <FormattedMessage {...props} />;
};

export const sifSoknadFormsMessages = {
    nb,
    nn,
};
