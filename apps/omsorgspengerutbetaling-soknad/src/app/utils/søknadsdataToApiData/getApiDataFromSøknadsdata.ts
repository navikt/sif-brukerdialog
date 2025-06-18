import { getVedleggApiData } from '@navikt/sif-common-core-ds/src';
import { AppIntlShape } from '../../i18n';
import { SøknadApiData, YesNoSpørsmålOgSvar } from '../../types/søknadApiData/SøknadApiData';
import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { getDineBarnApiDataFromSøknadsdata } from './getDineBarnApiDataFromSøknadsdata';
import { getFrilansApiDataFromSøknadsdata } from './getFrilansApiDataFromSøknadsdata';
import { getMedlemskapApiDataFromSøknadsdata } from './getMedlemskapApiDataFromSøknadsdata';
import { getSelvstendigApiDataFromSøknadsdata } from './getSelvstendigApiDataFromSøknadsdata';
import { getUtbetalingsperioderApiDataFromSøknadsdata } from './getUtbetalingsperioderApiDataFromSøknadsdata';
import { getUtenlansoppholdApiDataFromSøknadsdata } from './getUtenlandsoppholdApiDataFromSøknadsdata';

export const getApiDataFromSøknadsdata = (
    søkerNorskIdent: string,
    søknadsdata: Søknadsdata,
    { text, locale }: AppIntlShape,
): SøknadApiData | undefined => {
    const { id, dineBarn, fravaer, arbeidssituasjon, medlemskap, legeerklæring } = søknadsdata;

    if (!id || !dineBarn || !medlemskap || !legeerklæring || !arbeidssituasjon) {
        return undefined;
    }
    const { frilans, selvstendig } = arbeidssituasjon;

    if (frilans === undefined || selvstendig === undefined) {
        return undefined;
    }

    const språk = locale;

    const yesOrNoQuestions: YesNoSpørsmålOgSvar[] = [];

    if (frilans.type === 'pågående' || frilans.type === 'sluttetISøknadsperiode') {
        yesOrNoQuestions.push({
            spørsmål: text('frilanser.erFrilanser.spm'),
            svar: frilans.erFrilanser,
        });
    }
    if (selvstendig.type === 'erSN') {
        yesOrNoQuestions.push({
            spørsmål: text('selvstendig.erDuSelvstendigNæringsdrivende.spm'),
            svar: selvstendig.erSelvstendigNæringsdrivende,
        });
    }

    return {
        søkerNorskIdent,
        id,
        språk,
        bekreftelser: {
            harForståttRettigheterOgPlikter: søknadsdata.velkommen?.harForståttRettigheterOgPlikter === true,
            harBekreftetOpplysninger: søknadsdata.oppsummering?.harBekreftetOpplysninger === true,
        },
        spørsmål: yesOrNoQuestions,
        ...getDineBarnApiDataFromSøknadsdata(dineBarn),
        opphold: getUtenlansoppholdApiDataFromSøknadsdata(språk, fravaer),
        frilans: getFrilansApiDataFromSøknadsdata(frilans),
        selvstendigNæringsdrivende: getSelvstendigApiDataFromSøknadsdata(selvstendig),
        utbetalingsperioder: getUtbetalingsperioderApiDataFromSøknadsdata(søknadsdata),
        vedlegg: getVedleggApiData(legeerklæring?.vedlegg),
        bosteder: getMedlemskapApiDataFromSøknadsdata(språk, medlemskap),
    };
};
