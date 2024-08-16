import { dateFormatter, ISODateToDate } from '@navikt/sif-common-utils';
import { StønadGodtgjørelseApiData } from '../../../types/søknad-api-data/StønadGodtgjørelseApiData';
import { FormSummary, Heading, List } from '@navikt/ds-react';
import { AppText } from '../../../i18n';

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
            <FormSummary.Answer data-testid="omsorgsstønad">
                <FormSummary.Label>
                    <Heading level="3" size="small">
                        <AppText id="steg.oppsummering.arbeidssituasjon.omsfost.title" />
                    </Heading>
                </FormSummary.Label>
                <FormSummary.Value>
                    <AppText id="steg.oppsummering.arbeidssituasjon.omsfost.mottarIkke" />
                </FormSummary.Value>
            </FormSummary.Answer>
        );
    }

    return (
        <FormSummary.Answer>
            <FormSummary.Label>
                <Heading level="3" size="small">
                    <AppText id="steg.oppsummering.arbeidssituasjon.omsfost.title" />
                </Heading>
            </FormSummary.Label>
            <FormSummary.Value>
                <List>
                    {mottarStønadGodtgjørelseIHelePerioden ? (
                        <List.Item>Mottar stønad eller godtgjørelsen gjennom hele perioden jeg søker om</List.Item>
                    ) : (
                        <List.Item>Mottar stønad eller godtgjørelsen i deler av perioden jeg søker om</List.Item>
                    )}
                    {mottarStønadGodtgjørelseIHelePerioden === false && _starterUndeveis && startdato && (
                        <List.Item>{`Startet ${dateFormatter.full(ISODateToDate(startdato))}`}</List.Item>
                    )}
                    {mottarStønadGodtgjørelseIHelePerioden === false && _slutterUnderveis && sluttdato && (
                        <List.Item>{`Sluttet ${dateFormatter.full(ISODateToDate(sluttdato))}`}</List.Item>
                    )}
                </List>
            </FormSummary.Value>
        </FormSummary.Answer>
    );
};

export default StønadGodtgjørelseSummary;
