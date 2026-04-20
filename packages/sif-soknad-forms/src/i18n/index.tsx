import { typedIntlHelper } from '@navikt/sif-common-utils';
import { FormattedMessage, useIntl } from 'react-intl';

import { annetBarnMessages_nb } from '../dialogs/annet-barn/i18n/nb';
import { annetBarnMessages_nn } from '../dialogs/annet-barn/i18n/nn';
import { bostedUtlandMessages_nb } from '../dialogs/bosted-utland/i18n/nb';
import { bostedUtlandMessages_nn } from '../dialogs/bosted-utland/i18n/nn';
import { vedleggPanelMessages_nb } from '../panels/vedlegg/i18n/nb';
import { vedleggPanelMessages_nn } from '../panels/vedlegg/i18n/nn';
import { velgRegistrertBarnPanelMessages_nb } from '../panels/velg-registrert-barn/i18n/nb';
import { velgRegistrertBarnPanelMessages_nn } from '../panels/velg-registrert-barn/i18n/nn';

const nb = {
    ...annetBarnMessages_nb,
    ...bostedUtlandMessages_nb,
    ...velgRegistrertBarnPanelMessages_nb,
    ...vedleggPanelMessages_nb,
};

const nn: Record<keyof typeof nb, string> = {
    ...annetBarnMessages_nn,
    ...bostedUtlandMessages_nn,
    ...velgRegistrertBarnPanelMessages_nn,
    ...vedleggPanelMessages_nn,
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
