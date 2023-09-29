import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';
import { allCommonMessages } from '@navikt/sif-common-core-ds/lib/i18n/allCommonMessages';
import soknadIntlMessages from '@navikt/sif-common-soknad-ds/lib/i18n/soknadIntlMessages';
import { personalOpplysningerMessages } from '../pages/velkommen/personalopplysninger/personalopplysninger.messages';
import { velkommenPageMessages } from '../pages/velkommen/velkommenPageMessages';
import { appMessages } from './appMessages';
import { opplysningerOmPleietrengendeMessages } from '../søknad/steps/opplysninger-om-pleietrengende/opplysningerOmPleietrengendeMessages';
import { arbeidssituasjonMessages } from '../søknad/steps/arbeidssituasjon/arbeidssituasjonMessages';
import utenlandsoppholdMessages from '@navikt/sif-common-forms-ds/lib/forms/utenlandsopphold/utenlandsoppholdMessages';
import { tidsromMessages } from '../søknad/steps/tidsrom/tidsromMessages';
import { kvitteringMessages } from '../pages/kvittering/kvitteringMesssages';
import { validateApiDataMessages } from '../utils/søknadsdataToApiData/validateApiData';
import bostedUtlandMessages from '@navikt/sif-common-forms-ds/lib/forms/bosted-utland/bostedUtlandMessages';
import virksomhetMessages from '@navikt/sif-common-forms-ds/lib/forms/virksomhet/virksomhetMessages';
import { medlemskapMessages } from '../søknad/steps/medlemskap/medlemskapMessages';
import { legeerklæringMessages } from '../søknad/steps/legeerklæring/legeerklæringMessages';
import { oppsummeringMessages } from '../søknad/steps/oppsummering/oppsummeringMessages';
import utenlandskNæringMessages from '@navikt/sif-common-forms-ds/lib/forms/utenlandsk-næring/utenlandskNæringMessages';
import { sifCommonPleiepengerMessages } from '../local-sif-common-pleiepenger/i18n';
import opptjeningUtlandMessages from '@navikt/sif-common-forms-ds/lib/forms/opptjening-utland/opptjeningUtlandMessages';
import ferieuttakMessages from '@navikt/sif-common-forms-ds/lib/forms/ferieuttak/ferieuttakMessages';
import arbeidstidVariertMessages from '../søknad/steps/arbeidstid/form-parts/arbeidstid-variert/arbeidstidVariertMessages';
import { arbeidstidMessages } from '../søknad/steps/arbeidstid/arbeidstidMessages';

const bokmålstekster = {
    ...allCommonMessages.nb,
    ...soknadIntlMessages.nb,
    ...personalOpplysningerMessages.nb,
    ...velkommenPageMessages.nb,
    ...opplysningerOmPleietrengendeMessages.nb,
    ...legeerklæringMessages.nb,
    ...tidsromMessages.nb,
    ...utenlandsoppholdMessages.nb,
    ...arbeidstidMessages.nb,
    ...arbeidssituasjonMessages.nb,
    ...arbeidstidVariertMessages.nb,
    ...opptjeningUtlandMessages.nb,
    ...utenlandskNæringMessages.nb,
    ...ferieuttakMessages.nb,
    ...bostedUtlandMessages.nb,
    ...virksomhetMessages.nb,
    ...medlemskapMessages.nb,
    ...oppsummeringMessages.nb,
    ...kvitteringMessages.nb,
    ...validateApiDataMessages.nb,
    ...sifCommonPleiepengerMessages.nb,
    ...appMessages.nb,
};

export const applicationIntlMessages: MessageFileFormat = {
    nb: bokmålstekster,
};
