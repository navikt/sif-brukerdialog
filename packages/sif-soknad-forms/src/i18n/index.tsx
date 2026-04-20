import { typedIntlHelper } from '@navikt/sif-common-utils';
import { FormattedMessage, useIntl } from 'react-intl';

import { annetBarnMessages_nb } from '../dialogs/annet-barn/i18n/nb';
import { annetBarnMessages_nn } from '../dialogs/annet-barn/i18n/nn';
import { bostedUtlandMessages_nb } from '../dialogs/bosted-utland/i18n/nb';
import { bostedUtlandMessages_nn } from '../dialogs/bosted-utland/i18n/nn';
import { enkeltdatoMessages_nb } from '../dialogs/enkeltdatoer/i18n/nb';
import { enkeltdatoMessages_nn } from '../dialogs/enkeltdatoer/i18n/nn';
import { ferieuttakMessages_nb } from '../dialogs/ferieuttak/i18n/nb';
import { ferieuttakMessages_nn } from '../dialogs/ferieuttak/i18n/nn';
import { fosterbarnMessages_nb } from '../dialogs/fosterbarn/i18n/nb';
import { fosterbarnMessages_nn } from '../dialogs/fosterbarn/i18n/nn';
import { fraværMessages_nb } from '../dialogs/fravær/i18n/nb';
import { fraværMessages_nn } from '../dialogs/fravær/i18n/nn';
import { opptjeningUtlandMessages_nb } from '../dialogs/opptjening-utland/i18n/nb';
import { opptjeningUtlandMessages_nn } from '../dialogs/opptjening-utland/i18n/nn';
import { tidsperiodeMessages_nb } from '../dialogs/tidsperiode/i18n/nb';
import { tidsperiodeMessages_nn } from '../dialogs/tidsperiode/i18n/nn';
import { utenlandsoppholdMessages_nb } from '../dialogs/utenlandsopphold/i18n/nb';
import { utenlandsoppholdMessages_nn } from '../dialogs/utenlandsopphold/i18n/nn';
import { vedleggPanelMessages_nb } from '../panels/vedlegg/i18n/nb';
import { vedleggPanelMessages_nn } from '../panels/vedlegg/i18n/nn';
import { velgRegistrertBarnPanelMessages_nb } from '../panels/velg-registrert-barn/i18n/nb';
import { velgRegistrertBarnPanelMessages_nn } from '../panels/velg-registrert-barn/i18n/nn';

const nb = {
    ...annetBarnMessages_nb,
    ...bostedUtlandMessages_nb,
    ...enkeltdatoMessages_nb,
    ...ferieuttakMessages_nb,
    ...fosterbarnMessages_nb,
    ...fraværMessages_nb,
    ...opptjeningUtlandMessages_nb,
    ...tidsperiodeMessages_nb,
    ...utenlandsoppholdMessages_nb,
    ...velgRegistrertBarnPanelMessages_nb,
    ...vedleggPanelMessages_nb,
};

const nn: Record<keyof typeof nb, string> = {
    ...annetBarnMessages_nn,
    ...bostedUtlandMessages_nn,
    ...enkeltdatoMessages_nn,
    ...ferieuttakMessages_nn,
    ...fosterbarnMessages_nn,
    ...fraværMessages_nn,
    ...opptjeningUtlandMessages_nn,
    ...tidsperiodeMessages_nn,
    ...utenlandsoppholdMessages_nn,
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
