import { BodyShort, FormSummary, Heading, List } from '@navikt/ds-react';
import { dateFormatter, ISODateToDate } from '@navikt/sif-common-utils';
import { AppText } from '../../../i18n';
import { FosterhjemsgodtgjørelseApiData } from '../../../types/søknad-api-data/FosterhjemsgodtgjørelseApiData';
import { Sitat, TextareaSvar } from '@navikt/sif-common-ui';

interface Props {
    fosterhjemsgodtgjørelse: FosterhjemsgodtgjørelseApiData;
}

const FosterhjemsgodtgjørelseSummary = ({ fosterhjemsgodtgjørelse: data }: Props) => {
    const {
        mottarFosterhjemsgodtgjørelse,
        erFrikjøptFraJobb,
        frikjøptBeskrivelse,
        _mottarFosterhjemsgodtgjørelseIHelePerioden,
        _starterUndeveis,
        startdato,
        _slutterUnderveis,
        sluttdato,
    } = data;

    return (
        <>
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
                        {erFrikjøptFraJobb ? (
                            <List.Item>
                                <AppText id="steg.oppsummering.arbeidssituasjon.fosterhjemsgodtgjørelse.frikjøpt" />
                            </List.Item>
                        ) : (
                            <List.Item>
                                <AppText id="steg.oppsummering.arbeidssituasjon.fosterhjemsgodtgjørelse.ikkeFrikjøpt" />
                            </List.Item>
                        )}
                        {erFrikjøptFraJobb === false ? (
                            <>
                                {_mottarFosterhjemsgodtgjørelseIHelePerioden ? (
                                    <List.Item>
                                        <AppText id="steg.oppsummering.arbeidssituasjon.fosterhjemsgodtgjørelse.mottarHelePerioden" />
                                    </List.Item>
                                ) : (
                                    <List.Item>
                                        <AppText id="steg.oppsummering.arbeidssituasjon.fosterhjemsgodtgjørelse.mottarDelerAvPerioden" />
                                    </List.Item>
                                )}
                                {_mottarFosterhjemsgodtgjørelseIHelePerioden === false &&
                                    _starterUndeveis &&
                                    startdato && (
                                        <List.Item>{`Startet ${dateFormatter.full(ISODateToDate(startdato))}`}</List.Item>
                                    )}
                                {_mottarFosterhjemsgodtgjørelseIHelePerioden === false &&
                                    _slutterUnderveis &&
                                    sluttdato && (
                                        <List.Item>{`Sluttet ${dateFormatter.full(ISODateToDate(sluttdato))}`}</List.Item>
                                    )}
                            </>
                        ) : (
                            <List.Item>
                                <BodyShort>
                                    <AppText id="steg.oppsummering.arbeidssituasjon.fosterhjemsgodtgjørelse.frikjøptBeskrivelse.tittel" />
                                </BodyShort>
                                <Sitat>
                                    <TextareaSvar text={frikjøptBeskrivelse} />
                                </Sitat>
                            </List.Item>
                        )}
                    </List>
                </FormSummary.Value>
            </FormSummary.Answer>
        </>
    );
};

export default FosterhjemsgodtgjørelseSummary;
