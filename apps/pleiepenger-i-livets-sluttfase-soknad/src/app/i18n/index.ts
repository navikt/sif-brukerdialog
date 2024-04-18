import { commonMessages } from '@navikt/sif-common-core-ds/src/i18n/common.messages';
import { MessageFileFormat } from '@navikt/sif-common-core-ds/src/types/MessageFileFormat';
import { bostedUtlandMessages, opptjeningUtlandMessages, utenlandsoppholdMessages } from '@navikt/sif-common-forms-ds';
import utenlandskNæringMessages from '@navikt/sif-common-forms-ds/src/forms/utenlandsk-næring/utenlandskNæringMessages';
import virksomhetMessages from '@navikt/sif-common-forms-ds/src/forms/virksomhet/virksomhetMessages';
import { soknadMessages } from '@navikt/sif-common-soknad-ds';
import { uiMessages } from '@navikt/sif-common-ui';
import { calendarGridMessages } from '../components/calendar-grid/calendarGridMessages';
import { dagerMedTidMessages } from '../components/dager-med-tid-liste/dagerMedTidMessages';
import { kvitteringMessages } from '../pages/kvittering/kvitteringMesssages';
import { personalOpplysningerMessages } from '../pages/velkommen/personalopplysninger/personalopplysninger.messages';
import { velkommenPageMessages } from '../pages/velkommen/velkommenPageMessages';
import { arbeidssituasjonMessages } from '../søknad/steps/arbeidssituasjon/arbeidssituasjonMessages';
import { arbeidstidMessages } from '../søknad/steps/arbeidstid/arbeidstidMessages';
import { arbeidstidPeriodeMessages } from '../søknad/steps/arbeidstid/arbeidstidPeriodeMessages';
import { legeerklæringMessages } from '../søknad/steps/legeerklæring/legeerklæringMessages';
import { medlemskapMessages } from '../søknad/steps/medlemskap/medlemskapMessages';
import { opplysningerOmPleietrengendeMessages } from '../søknad/steps/opplysninger-om-pleietrengende/opplysningerOmPleietrengendeMessages';
import { oppsummeringMessages } from '../søknad/steps/oppsummering/oppsummeringMessages';
import { tidsromMessages } from '../søknad/steps/tidsrom/tidsromMessages';
import { validateApiDataMessages } from '../utils/søknadsdataToApiData/validateApiData';
import { appMessages } from './appMessages';

const bokmålstekster = {
    ...commonMessages.nb,
    ...uiMessages.nb,
    ...soknadMessages.nb,
    ...personalOpplysningerMessages.nb,
    ...velkommenPageMessages.nb,
    ...opplysningerOmPleietrengendeMessages.nb,
    ...legeerklæringMessages.nb,
    ...tidsromMessages.nb,
    ...utenlandsoppholdMessages.nb,
    ...arbeidstidMessages.nb,
    ...arbeidssituasjonMessages.nb,
    ...opptjeningUtlandMessages.nb,
    ...utenlandskNæringMessages.nb,
    ...bostedUtlandMessages.nb,
    ...virksomhetMessages.nb,
    ...medlemskapMessages.nb,
    ...oppsummeringMessages.nb,
    ...kvitteringMessages.nb,
    ...validateApiDataMessages.nb,
    ...arbeidstidPeriodeMessages.nb,
    ...calendarGridMessages.nb,
    ...dagerMedTidMessages.nb,
    ...appMessages.nb,
};

export const applicationIntlMessages: MessageFileFormat = {
    nb: bokmålstekster,
};
