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
import { soknadMessages } from '@navikt/sif-common-soknad-ds';
import { uiMessages } from '@navikt/sif-common-ui';
import { arbeidstidMessages } from '../søknad/steps/arbeidstid/arbeidstidMessages';
import { arbeidstidPeriodeMessages } from '../søknad/steps/arbeidstid/arbeidstidPeriodeMessages';
import { appMessages } from './appMessages';
import { kursperiodeMessages } from '../søknad/steps/kurs/kursperioder-form-part/kursperiodeMessages';

export const libMessages = {
    nb: {
        ...commonMessages.nb,
        ...uiMessages.nb,
        ...soknadMessages.nb,
        ...bostedUtlandMessages.nb,
        ...opptjeningUtlandMessages.nb,
        ...utenlandskNæringMessages.nb,
        ...utenlandsoppholdMessages.nb,
        ...virksomhetMessages.nb,
        ...kursperiodeMessages.nb,
        ...arbeidstidMessages.nb,
        ...arbeidstidPeriodeMessages.nb,
        ...ferieuttakMessages.nb,
    },
    nn: {
        ...commonMessages.nn,
        ...uiMessages.nn,
        ...soknadMessages.nn,
        ...bostedUtlandMessages.nn,
        ...opptjeningUtlandMessages.nn,
        ...utenlandskNæringMessages.nn,
        ...utenlandsoppholdMessages.nn,
        ...virksomhetMessages.nn,
        ...ferieuttakMessages.nn,
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
