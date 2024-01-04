import { IntlShape } from 'react-intl';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { attachmentIsUploadedAndIsValidFileFormat } from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { RegistrertBarn } from '../../types/RegistrertBarn';
import { SøknadApiData, YesNoSpørsmålOgSvar } from '../../types/søknadApiData/SøknadApiData';
import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { getAttachmentURLBackend } from '../attachmentUtilsAuthToken';
import { getDineBarnApiDataFromSøknadsdata } from './getDineBarnApiDataFromSøknadsdata';
import { getFrilansApiDataFromSøknadsdata } from './getFrilansApiDataFromSøknadsdata';
import { getMedlemskapApiDataFromSøknadsdata } from './getMedlemskapApiDataFromSøknadsdata';
import { getSelvstendigApiDataFromSøknadsdata } from './getSelvstendigApiDataFromSøknadsdata';
import { getUtbetalingsperioderApiDataFromSøknadsdata } from './getUtbetalingsperioderApiDataFromSøknadsdata';
import { getUtenlansoppholdApiDataFromSøknadsdata } from './getUtenlandsoppholdApiDataFromSøknadsdata';

const getVedleggApiData = (vedlegg?: Attachment[]): string[] => {
    if (!vedlegg || vedlegg.length === 0) {
        return [];
    }
    return vedlegg.filter(attachmentIsUploadedAndIsValidFileFormat).map(({ url }) => getAttachmentURLBackend(url));
};

export const getApiDataFromSøknadsdata = (
    søknadsdata: Søknadsdata,
    registrerteBarn: RegistrertBarn[],
    intl: IntlShape,
): SøknadApiData | undefined => {
    const { id, dineBarn, fravaer, arbeidssituasjon, medlemskap, legeerklæring } = søknadsdata;

    if (!id || !dineBarn || !medlemskap || !legeerklæring || !arbeidssituasjon) {
        return undefined;
    }
    const { frilans, selvstendig } = arbeidssituasjon;

    if (frilans === undefined || selvstendig === undefined) {
        return undefined;
    }

    const språk = 'nb';

    const yesOrNoQuestions: YesNoSpørsmålOgSvar[] = [];

    if (frilans.type === 'pågående' || frilans.type === 'sluttetISøknadsperiode') {
        yesOrNoQuestions.push({
            spørsmål: intlHelper(intl, 'frilanser.erFrilanser.spm'),
            svar: frilans.erFrilanser,
        });
    }
    if (selvstendig.type === 'erSN') {
        yesOrNoQuestions.push({
            spørsmål: intlHelper(intl, 'selvstendig.erDuSelvstendigNæringsdrivende.spm'),
            svar: selvstendig.erSelvstendigNæringsdrivende,
        });
    }

    return {
        id,
        språk,
        bekreftelser: {
            harForståttRettigheterOgPlikter: søknadsdata.velkommen?.harForståttRettigheterOgPlikter === true,
            harBekreftetOpplysninger: søknadsdata.oppsummering?.harBekreftetOpplysninger === true,
        },
        spørsmål: yesOrNoQuestions,
        ...getDineBarnApiDataFromSøknadsdata(dineBarn, registrerteBarn),
        opphold: getUtenlansoppholdApiDataFromSøknadsdata(språk, fravaer),
        frilans: getFrilansApiDataFromSøknadsdata(frilans),
        selvstendigNæringsdrivende: getSelvstendigApiDataFromSøknadsdata(selvstendig),
        utbetalingsperioder: getUtbetalingsperioderApiDataFromSøknadsdata(søknadsdata),
        vedlegg: getVedleggApiData(legeerklæring?.vedlegg),
        bosteder: getMedlemskapApiDataFromSøknadsdata(språk, medlemskap),
    };
};
