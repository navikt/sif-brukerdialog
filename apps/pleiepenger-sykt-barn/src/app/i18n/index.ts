import { allCommonMessages } from '@navikt/sif-common-core-ds/src/i18n/allCommonMessages';
import { MessageFileFormat } from '@navikt/sif-common-core-ds/src/types/MessageFileFormat';
import bostedMessages from '@navikt/sif-common-forms-ds/src/forms/bosted-utland/bostedUtlandMessages';
import ferieuttakMessages from '@navikt/sif-common-forms-ds/src/forms/ferieuttak/ferieuttakMessages';
import opptjeningUtlandMessages from '@navikt/sif-common-forms-ds/src/forms/opptjening-utland/opptjeningUtlandMessages';
import tidsperiodeMessages from '@navikt/sif-common-forms-ds/src/forms/tidsperiode/tidsperiodeMessages';
import utenlandskNæringMessages from '@navikt/sif-common-forms-ds/src/forms/utenlandsk-næring/utenlandskNæringMessages';
import utenlandsoppholdMessages from '@navikt/sif-common-forms-ds/src/forms/utenlandsopphold/utenlandsoppholdMessages';
import virksomhetMessages from '@navikt/sif-common-forms-ds/src/forms/virksomhet/virksomhetMessages';
import soknadIntlMessages from '@navikt/sif-common-soknad-ds/src/i18n/soknadIntlMessages';
import { sifCommonPleiepengerMessages } from '../local-sif-common-pleiepenger/i18n';
import { velkommenPageMessages } from '../pages/welcoming-page/velkommenPageMessages';
import omsorgstilbudMessages from './omsorgstilbudMessages';
import { arbeidIPeriodeMessages } from '../søknad/arbeidstid-step/i18n/arbeidIPeriodeMessages';
import { appMessagesNb } from './nb';

const bokmålstekster = {
    ...allCommonMessages.nb,
    ...utenlandsoppholdMessages.nb,
    ...bostedMessages.nb,
    ...virksomhetMessages.nb,
    ...tidsperiodeMessages.nb,
    ...ferieuttakMessages.nb,
    ...omsorgstilbudMessages.nb,
    ...sifCommonPleiepengerMessages.nb,
    ...opptjeningUtlandMessages.nb,
    ...utenlandskNæringMessages.nb,
    ...appMessagesNb,
    ...velkommenPageMessages.nb,
    ...soknadIntlMessages.nb,
    ...arbeidIPeriodeMessages.nb,
};

export const applicationIntlMessages: MessageFileFormat = {
    nb: bokmålstekster,
};
