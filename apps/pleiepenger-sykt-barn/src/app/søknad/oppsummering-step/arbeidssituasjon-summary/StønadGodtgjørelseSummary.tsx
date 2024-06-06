import { SummaryBlock } from '@navikt/sif-common-ui';
import { dateFormatter, ISODateToDate } from '@navikt/sif-common-utils';
import { StønadGodtgjørelseApiData } from '../../../types/søknad-api-data/StønadGodtgjørelseApiData';

interface Props {
    stønadGodtgjørelse: StønadGodtgjørelseApiData;
}

const StønadGodtgjørelseSummary = ({ stønadGodtgjørelse }: Props) => {
    const {
        mottarStønadGodtgjørelse,
        _mottarStønadGodtgjørelseIHelePeroden: mottarStønadGodtgjørelseIHelePerioden,
        _starterUndeveis,
        startdato,
        _slutterUnderveis,
        sluttdato,
    } = stønadGodtgjørelse;

    if (mottarStønadGodtgjørelse === false) {
        return (
            <div data-testid="omsorgsstønad">
                <SummaryBlock header={'Omsorgsstønad eller fosterhjemsgodtgjørelse'}>
                    <ul>
                        <li>Mottar ikke fosterhjemgodtgjørelse, eller omsorgsstønad fra kommunen</li>
                    </ul>
                </SummaryBlock>
            </div>
        );
    }

    return (
        <SummaryBlock header={'Omsorgsstønad eller fosterhjemsgodtgjørelse'} data-testid="omsorgsstønad">
            <ul>
                {mottarStønadGodtgjørelseIHelePerioden ? (
                    <li>Mottar stønad eller godtgjørelsen gjennom hele perioden jeg søker om</li>
                ) : (
                    <li>Mottar stønad eller godtgjørelsen i deler av perioden jeg søker om</li>
                )}
                {mottarStønadGodtgjørelseIHelePerioden === false && _starterUndeveis && startdato && (
                    <li>{`Startet ${dateFormatter.full(ISODateToDate(startdato))}`}</li>
                )}
                {mottarStønadGodtgjørelseIHelePerioden === false && _slutterUnderveis && sluttdato && (
                    <li>{`Sluttet ${dateFormatter.full(ISODateToDate(sluttdato))}`}</li>
                )}
            </ul>
        </SummaryBlock>
    );
};

export default StønadGodtgjørelseSummary;
