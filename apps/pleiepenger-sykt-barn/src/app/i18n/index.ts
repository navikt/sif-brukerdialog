import { commonMessages } from '@navikt/sif-common-core-ds/src/i18n/common.messages';
import { MessageFileFormat } from '@navikt/sif-common-core-ds/src/types/MessageFileFormat';
import {
    bostedUtlandMessages,
    ferieuttakMessages,
    opptjeningUtlandMessages,
    utenlandskNæringMessages,
} from '@navikt/sif-common-forms-ds';
import tidsperiodeMessages from '@navikt/sif-common-forms-ds/src/forms/tidsperiode/tidsperiodeMessages';
import utenlandsoppholdMessages from '@navikt/sif-common-forms-ds/src/forms/utenlandsopphold/utenlandsoppholdMessages';
import virksomhetMessages from '@navikt/sif-common-forms-ds/src/forms/virksomhet/virksomhetMessages';
import { soknadMessages } from '@navikt/sif-common-soknad-ds';
import { uiMessages } from '@navikt/sif-common-ui';
import { sifCommonPleiepengerMessages } from '../local-sif-common-pleiepenger/i18n';
import { velkommenPageMessages } from '../pages/welcoming-page/velkommenPageMessages';
import { arbeidIPeriodeMessages } from '../søknad/arbeidstid-step/i18n/arbeidIPeriodeMessages';
import { appMessagesNb } from './nb';
import omsorgstilbudMessages from './omsorgstilbudMessages';

const bokmålstekster = {
    ...commonMessages.nb,
    ...uiMessages.nb,
    ...soknadMessages.nb,
    ...utenlandsoppholdMessages.nb,
    ...bostedUtlandMessages.nb,
    ...virksomhetMessages.nb,
    ...tidsperiodeMessages.nb,
    ...ferieuttakMessages.nb,
    ...omsorgstilbudMessages.nb,
    ...sifCommonPleiepengerMessages.nb,
    ...opptjeningUtlandMessages.nb,
    ...utenlandskNæringMessages.nb,
    ...velkommenPageMessages.nb,
    ...arbeidIPeriodeMessages.nb,
    ...appMessagesNb,
    'psb.timer': '{timer, plural, one {# time} other {# timer}}',
    'psb.minutter': '{minutter, plural, one {# minutt} other {# minutter}}',
    'psb.timerOgMinutter':
        '{timer, plural, one {# time} other {# timer}} og {minutter, plural, one {# minutt} other {# minutter}}',
};

export const applicationIntlMessages: MessageFileFormat = {
    nb: bokmålstekster,
};
