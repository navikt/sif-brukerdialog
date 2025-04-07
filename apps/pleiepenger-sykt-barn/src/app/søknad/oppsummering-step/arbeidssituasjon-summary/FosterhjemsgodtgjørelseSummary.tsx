import { FormSummary, Heading, List } from '@navikt/ds-react';
import { ListItem } from '@navikt/ds-react/List';
import { dateFormatter, ISODateToDate } from '@navikt/sif-common-utils';
import { AppText } from '../../../i18n';
import { TimerEllerProsent } from '../../../types';
import { FosterhjemsgodtgjørelseApiData } from '../../../types/søknad-api-data/FosterhjemsgodtgjørelseApiData';

interface Props {
    fosterhjemsgodtgjørelse: FosterhjemsgodtgjørelseApiData;
}

const FosterhjemsgodtgjørelseSummary = ({ fosterhjemsgodtgjørelse: data }: Props) => {
    const {
        mottarFosterhjemsgodtgjørelse,
        timerEllerProsent,
        prosent,
        antallTimer,
        erFrikjøptFraJobb,
        _mottarFosterhjemsgodtgjørelseIHelePerioden,
        _starterUndeveis,
        startdato,
        _slutterUnderveis,
        sluttdato,
    } = data;

    if (
        mottarFosterhjemsgodtgjørelse === false ||
        (mottarFosterhjemsgodtgjørelse === true && erFrikjøptFraJobb === false)
    ) {
        return (
            <FormSummary.Answer>
                <FormSummary.Label>
                    <Heading level="3" size="small">
                        <AppText id="steg.oppsummering.arbeidssituasjon.fosterhjemsgodtgjørelse.title" />
                    </Heading>
                </FormSummary.Label>
                <FormSummary.Value>
                    <List>
                        <List.Item>
                            {mottarFosterhjemsgodtgjørelse ? (
                                <AppText id="steg.oppsummering.arbeidssituasjon.fosterhjemsgodtgjørelse.mottar" />
                            ) : (
                                <AppText id="steg.oppsummering.arbeidssituasjon.fosterhjemsgodtgjørelse.mottarIkke" />
                            )}
                        </List.Item>
                        {mottarFosterhjemsgodtgjørelse && !erFrikjøptFraJobb ? (
                            <List.Item>
                                <AppText id="steg.oppsummering.arbeidssituasjon.fosterhjemsgodtgjørelse.ikkeFrikjøpt" />
                            </List.Item>
                        ) : null}
                    </List>
                </FormSummary.Value>
            </FormSummary.Answer>
        );
    }

    return (
        <FormSummary.Answer>
            <FormSummary.Label>
                <Heading level="3" size="small">
                    <AppText id="steg.oppsummering.arbeidssituasjon.fosterhjemsgodtgjørelse.title" />
                </Heading>
            </FormSummary.Label>
            <FormSummary.Value>
                <List>
                    {_mottarFosterhjemsgodtgjørelseIHelePerioden ? (
                        <List.Item>Mottar fosterhjemsgodtgjørelsen gjennom hele perioden jeg søker om</List.Item>
                    ) : (
                        <List.Item>Mottar fosterhjemsgodtgjørelsen i deler av perioden jeg søker om</List.Item>
                    )}
                    {_mottarFosterhjemsgodtgjørelseIHelePerioden === false && _starterUndeveis && startdato && (
                        <List.Item>{`Startet ${dateFormatter.full(ISODateToDate(startdato))}`}</List.Item>
                    )}
                    {_mottarFosterhjemsgodtgjørelseIHelePerioden === false && _slutterUnderveis && sluttdato && (
                        <List.Item>{`Sluttet ${dateFormatter.full(ISODateToDate(sluttdato))}`}</List.Item>
                    )}
                    <ListItem>
                        {timerEllerProsent === TimerEllerProsent.TIMER ? (
                            <AppText
                                id="steg.oppsummering.arbeidssituasjon.fosterhjemsgodtgjørelse.timer"
                                values={{ antallTimer }}
                            />
                        ) : (
                            <AppText
                                id="steg.oppsummering.arbeidssituasjon.fosterhjemsgodtgjørelse.prosent"
                                values={{ prosent }}
                            />
                        )}
                    </ListItem>
                </List>
            </FormSummary.Value>
        </FormSummary.Answer>
    );
};

export default FosterhjemsgodtgjørelseSummary;
