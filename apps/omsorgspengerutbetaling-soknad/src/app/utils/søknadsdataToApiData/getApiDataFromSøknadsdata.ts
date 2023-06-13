import { attachmentIsUploadedAndIsValidFileFormat } from '@navikt/sif-common-core-ds/lib/utils/attachmentUtils';
import { Attachment } from '../../components/formik-file-uploader/useFormikFileUploader';
import { SøknadApiData, YesNoSpørsmålOgSvar } from '../../types/søknadApiData/SøknadApiData';
import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { getAttachmentURLBackend } from '../attachmentUtilsAuthToken';
import { getUtenlansoppholdApiDataFromSøknadsdata } from './getUtenlandsoppholdApiDataFromSøknadsdata';
import { getDineBarnApiDataFromSøknadsdata } from './getDineBarnApiDataFromSøknadsdata';
import { getMedlemskapApiDataFromSøknadsdata } from './getMedlemskapApiDataFromSøknadsdata';
import { getUtbetalingsperioderApiDataFromSøknadsdata } from './getUtbetalingsperioderApiDataFromSøknadsdata';
import { RegistrertBarn } from '../../types/RegistrertBarn';
import { getFrilansApiDataFromSøknadsdata } from './getFrilansApiDataFromSøknadsdata';
import { getSelvstendigApiDataFromSøknadsdata } from './getSelvstendigApiDataFromSøknadsdata';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { IntlShape } from 'react-intl';
import { brukEndringeneFor2023, harFraværPgaSmittevernhensyn, harFraværPgaStengBhgSkole } from '../midlertidigUtils';

const getVedleggApiData = (vedlegg?: Attachment[]): string[] => {
    if (!vedlegg || vedlegg.length === 0) {
        return [];
    }
    return vedlegg.filter(attachmentIsUploadedAndIsValidFileFormat).map(({ url }) => getAttachmentURLBackend(url));
};

export const getApiDataFromSøknadsdata = (
    søknadsdata: Søknadsdata,
    registrerteBarn: RegistrertBarn[],
    intl: IntlShape
): SøknadApiData | undefined => {
    const { id, dineBarn, fravaer, arbeidssituasjon, medlemskap, legeerklæring } = søknadsdata;
    // TODO Check !legeerklaring
    if (!id || !dineBarn || !medlemskap || !arbeidssituasjon) {
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

    const harDekketTiFørsteDagerSelv =
        dineBarn.type === 'minstEtt12årEllerYngre' && dineBarn.harDekketTiFørsteDagerSelv === true;

    const fraværDager =
        søknadsdata.fravaer?.type === 'harFulltOgDelvisFravær' || søknadsdata.fravaer?.type === 'harKunDelvisFravær'
            ? søknadsdata.fravaer.fraværDager
            : [];
    const fraværPerioder =
        søknadsdata.fravaer?.type === 'harFulltOgDelvisFravær' || søknadsdata.fravaer?.type === 'harKunFulltFravær'
            ? søknadsdata.fravaer.fraværPerioder
            : [];

    const vedleggLegeerklæring = brukEndringeneFor2023(fraværDager, fraværPerioder)
        ? getVedleggApiData(legeerklæring?.vedlegg)
        : [];

    const vedleggSmittevern = harFraværPgaSmittevernhensyn(fraværPerioder, fraværDager)
        ? getVedleggApiData(søknadsdata.vedlegg_smittevernhensyn?.vedlegg)
        : [];
    const vedleggStengtBhgSkole = harFraværPgaStengBhgSkole(fraværPerioder, fraværDager)
        ? getVedleggApiData(søknadsdata.vedlegg_stengtSkoleBhg?.vedlegg)
        : [];

    return {
        id,
        språk,
        bekreftelser: {
            harForståttRettigheterOgPlikter: søknadsdata.velkommen?.harForståttRettigheterOgPlikter === true,
            harBekreftetOpplysninger: søknadsdata.oppsummering?.harBekreftetOpplysninger === true,
        },
        spørsmål: yesOrNoQuestions,
        barn: getDineBarnApiDataFromSøknadsdata(dineBarn, registrerteBarn),
        harDekketTiFørsteDagerSelv,
        opphold: getUtenlansoppholdApiDataFromSøknadsdata(språk, fravaer),
        frilans: getFrilansApiDataFromSøknadsdata(frilans),
        selvstendigNæringsdrivende: getSelvstendigApiDataFromSøknadsdata(selvstendig),
        utbetalingsperioder: getUtbetalingsperioderApiDataFromSøknadsdata(søknadsdata),
        vedlegg: [...vedleggLegeerklæring, ...vedleggSmittevern, ...vedleggStengtBhgSkole],
        bosteder: getMedlemskapApiDataFromSøknadsdata(språk, medlemskap),
    };
};
