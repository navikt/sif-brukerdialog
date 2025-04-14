import { FormSummary, Heading, List } from '@navikt/ds-react';
import { dateFormatter, ISODateToDate } from '@navikt/sif-common-utils';
import { AppText } from '../../../i18n';
import { OmsorgsstønadApiData } from '../../../types/søknad-api-data/OmsorgsstønadApiData';

interface Props {
    omsorgsstønad: OmsorgsstønadApiData;
}

const OmsorgsstønadSummary = ({ omsorgsstønad }: Props) => {
    const {
        mottarOmsorgsstønad,
        _mottarOmsorgsstønadIHelePeroden: mottarOmsorgsstønadIHelePerioden,
        _starterUndeveis,
        startdato,
        _slutterUnderveis,
        sluttdato,
    } = omsorgsstønad;

    if (mottarOmsorgsstønad === false) {
        return (
            <FormSummary.Answer data-testid="omsorgsstønad">
                <FormSummary.Label>
                    <Heading level="3" size="small">
                        <AppText id="steg.oppsummering.arbeidssituasjon.omsorgsstønad.title" />
                    </Heading>
                </FormSummary.Label>
                <FormSummary.Value>
                    <List>
                        <List.Item>
                            <AppText id="steg.oppsummering.arbeidssituasjon.omsorgsstønad.mottarIkke" />
                        </List.Item>
                    </List>
                </FormSummary.Value>
            </FormSummary.Answer>
        );
    }

    return (
        <FormSummary.Answer>
            <FormSummary.Label>
                <Heading level="3" size="small">
                    <AppText id="steg.oppsummering.arbeidssituasjon.omsorgsstønad.title" />
                </Heading>
            </FormSummary.Label>
            <FormSummary.Value>
                <List>
                    {mottarOmsorgsstønadIHelePerioden ? (
                        <List.Item>Mottar omsorgsstønaden gjennom hele perioden jeg søker om</List.Item>
                    ) : (
                        <List.Item>Mottar omsorgsstønaden gjennom i deler av perioden jeg søker om</List.Item>
                    )}
                    {mottarOmsorgsstønadIHelePerioden === false && _starterUndeveis && startdato && (
                        <List.Item>{`Startet ${dateFormatter.full(ISODateToDate(startdato))}`}</List.Item>
                    )}
                    {mottarOmsorgsstønadIHelePerioden === false && _slutterUnderveis && sluttdato && (
                        <List.Item>{`Sluttet ${dateFormatter.full(ISODateToDate(sluttdato))}`}</List.Item>
                    )}
                    <List.Item>Mottar {omsorgsstønad.antallTimer} timer per uken i snitt</List.Item>
                </List>
            </FormSummary.Value>
        </FormSummary.Answer>
    );
};

export default OmsorgsstønadSummary;
