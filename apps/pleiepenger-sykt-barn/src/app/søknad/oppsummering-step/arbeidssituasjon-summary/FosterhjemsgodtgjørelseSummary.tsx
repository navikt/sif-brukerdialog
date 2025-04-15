import { BodyShort, FormSummary, Heading, List } from '@navikt/ds-react';
import { dateFormatter, ISODateToDate } from '@navikt/sif-common-utils';
import { AppText } from '../../../i18n';
import { FosterhjemsgodtgjørelseApiData } from '../../../types/søknad-api-data/FosterhjemsgodtgjørelseApiData';
import { Sitat, TextareaSvar } from '@navikt/sif-common-ui';
import { FosterhjemsgodtgjørelseType } from '../../../types/søknadsdata/FosterhjemsgodtgjørelseSøknadsdata';

interface Props {
    fosterhjemsgodtgjørelse: FosterhjemsgodtgjørelseApiData;
}

const FosterhjemsgodtgjørelseSummary = ({ fosterhjemsgodtgjørelse: data }: Props) => {
    const { type } = data;

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
                        {data.mottarFosterhjemsgodtgjørelse === false ? (
                            <List.Item>
                                <AppText id="steg.oppsummering.arbeidssituasjon.fosterhjemsgodtgjørelse.mottarIkke" />
                            </List.Item>
                        ) : (
                            <>
                                <List.Item>
                                    <AppText id="steg.oppsummering.arbeidssituasjon.fosterhjemsgodtgjørelse.mottarIkke" />
                                </List.Item>

                                {type === FosterhjemsgodtgjørelseType.mottarFrikjøpt ? (
                                    <List.Item>
                                        <AppText id="steg.oppsummering.arbeidssituasjon.fosterhjemsgodtgjørelse.frikjøpt" />
                                    </List.Item>
                                ) : (
                                    <List.Item>
                                        <AppText id="steg.oppsummering.arbeidssituasjon.fosterhjemsgodtgjørelse.ikkeFrikjøpt" />
                                    </List.Item>
                                )}
                                {type === FosterhjemsgodtgjørelseType.mottarIDelerAvPerioden ||
                                type === FosterhjemsgodtgjørelseType.mottarIHelePerioden ? (
                                    <>
                                        {data._mottarFosterhjemsgodtgjørelseIHelePerioden ? (
                                            <List.Item>
                                                <AppText id="steg.oppsummering.arbeidssituasjon.fosterhjemsgodtgjørelse.mottarHelePerioden" />
                                            </List.Item>
                                        ) : (
                                            <List.Item>
                                                <AppText id="steg.oppsummering.arbeidssituasjon.fosterhjemsgodtgjørelse.mottarDelerAvPerioden" />
                                            </List.Item>
                                        )}
                                        {data._mottarFosterhjemsgodtgjørelseIHelePerioden === false &&
                                            data._starterUndeveis &&
                                            data.startdato && (
                                                <List.Item>
                                                    <AppText
                                                        id="steg.oppsummering.arbeidssituasjon.fosterhjemsgodtgjørelse.startet"
                                                        values={{
                                                            startdato: dateFormatter.full(
                                                                ISODateToDate(data.startdato),
                                                            ),
                                                        }}
                                                    />
                                                </List.Item>
                                            )}
                                        {data._mottarFosterhjemsgodtgjørelseIHelePerioden === false &&
                                            data._slutterUnderveis &&
                                            data.sluttdato && (
                                                <List.Item>
                                                    <AppText
                                                        id="steg.oppsummering.arbeidssituasjon.fosterhjemsgodtgjørelse.sluttet"
                                                        values={{
                                                            sluttdato: dateFormatter.full(
                                                                ISODateToDate(data.sluttdato),
                                                            ),
                                                        }}
                                                    />
                                                </List.Item>
                                            )}
                                    </>
                                ) : null}
                                {type === FosterhjemsgodtgjørelseType.mottarFrikjøpt ? (
                                    <List.Item>
                                        <BodyShort>
                                            <AppText id="steg.oppsummering.arbeidssituasjon.fosterhjemsgodtgjørelse.frikjøptBeskrivelse.tittel" />
                                        </BodyShort>
                                        <Sitat>
                                            <TextareaSvar text={data.frikjøptBeskrivelse} />
                                        </Sitat>
                                    </List.Item>
                                ) : null}
                            </>
                        )}
                    </List>
                </FormSummary.Value>
            </FormSummary.Answer>
        </>
    );
};

export default FosterhjemsgodtgjørelseSummary;
