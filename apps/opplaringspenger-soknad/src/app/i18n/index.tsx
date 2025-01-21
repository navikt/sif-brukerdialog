import { FormattedMessage, useIntl } from 'react-intl';
import { commonMessages } from '@navikt/sif-common-core-ds/src/i18n/common.messages';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import {
    bostedUtlandMessages,
    ferieuttakMessages,
    opptjeningUtlandMessages,
    utenlandskNæringMessages,
    utenlandsoppholdMessages,
    virksomhetMessages,
} from '@navikt/sif-common-forms-ds';
import { medlemskapFormMessages } from '@navikt/sif-common-forms-ds/src';
import { enkeltdatoMessages } from '@navikt/sif-common-forms-ds/src/forms/enkeltdatoer/enkeltdatoMessages';
import { soknadMessages } from '@navikt/sif-common-soknad-ds';
import { uiMessages } from '@navikt/sif-common-ui';
import { kursperiodeMessages } from '../søknad/steps/kurs/kursperioder-form-part/kursperiodeMessages';
import { appMessages } from './appMessages';

export const libMessages = {
    nb: {
        ...bostedUtlandMessages.nb,
        ...commonMessages.nb,
        ...enkeltdatoMessages.nb,
        ...ferieuttakMessages.nb,
        ...kursperiodeMessages.nb,
        ...medlemskapFormMessages.nb,
        ...opptjeningUtlandMessages.nb,
        ...soknadMessages.nb,
        ...uiMessages.nb,
        ...utenlandskNæringMessages.nb,
        ...utenlandsoppholdMessages.nb,
        ...virksomhetMessages.nb,
    },
    nn: {
        ...bostedUtlandMessages.nn,
        ...commonMessages.nn,
        ...enkeltdatoMessages.nn,
        ...ferieuttakMessages.nn,
        ...kursperiodeMessages.nn,
        ...medlemskapFormMessages.nn,
        ...opptjeningUtlandMessages.nn,
        ...soknadMessages.nn,
        ...uiMessages.nn,
        ...utenlandskNæringMessages.nn,
        ...utenlandsoppholdMessages.nn,
        ...virksomhetMessages.nn,
    },
};

const nb = {
    ...libMessages.nb,
    ...appMessages.nb,
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export type AppMessageKeys = keyof typeof nb;

export const useAppIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<AppMessageKeys>(intl);
};

export type AppIntlShape = ReturnType<typeof useAppIntl>;

export const AppText = (props: { id: AppMessageKeys; values?: any }) => {
    return <FormattedMessage {...props} />;
};

export const applicationIntlMessages = {
    nb,
    nn,
};
