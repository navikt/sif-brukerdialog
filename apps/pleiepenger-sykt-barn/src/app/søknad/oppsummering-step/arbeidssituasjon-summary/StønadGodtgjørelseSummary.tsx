import SummaryBlock from '@navikt/sif-common-soknad-ds/lib/components/summary-block/SummaryBlock';
import { dateFormatter, ISODateToDate } from '@navikt/sif-common-utils/lib';
import { StønadGodtgjørelseApiData } from '../../../types/søknad-api-data/StønadGodtgjørelseApiData';

interface Props {
    stønadGodtgjørelse: StønadGodtgjørelseApiData;
}

const StønadGodtgjørelseSummary = ({ stønadGodtgjørelse }: Props) => {
    // const intl = useIntl();
    const {
        mottarStønadGodtgjørelse,
        _mottarStønadGodtgjørelseIHelePeroden: mottarStønadGodtgjørelseIHelePeroden,
        _starterUndeveis,
        startdato,
        _slutterUnderveis,
        sluttdato,
    } = stønadGodtgjørelse;

    if (mottarStønadGodtgjørelse === false) {
        return (
            <SummaryBlock header={'Omsorgsstønad eller fosterhjemsgodtgjørelse'}>
                <ul>
                    <li>Jeg mottar ikke omsorgsstønad eller fosterhjemsgodtgjørelse</li>
                </ul>
            </SummaryBlock>
        );
    }

    return (
        <SummaryBlock header={'Omsorgsstønad eller fosterhjemsgodtgjørelse'}>
            <ul>
                {mottarStønadGodtgjørelseIHelePeroden ? (
                    <li>{'Jeg mottar stønad/godtgjørelse i hele perioden jeg søker for'}</li>
                ) : (
                    <li>{'Jeg mottar stønad/godtgjørelse i deler av perioden jeg søker for'}</li>
                )}
                {mottarStønadGodtgjørelseIHelePeroden === false && _starterUndeveis && startdato && (
                    <li>{`Startet ${dateFormatter.full(ISODateToDate(startdato))}`}</li>
                )}
                {mottarStønadGodtgjørelseIHelePeroden === false && _slutterUnderveis && sluttdato && (
                    <li>{`Sluttet ${dateFormatter.full(ISODateToDate(sluttdato))}`}</li>
                )}
            </ul>
        </SummaryBlock>
    );
};

export default StønadGodtgjørelseSummary;
