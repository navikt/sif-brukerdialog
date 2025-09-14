import { FormSummary, Heading, List } from '@navikt/ds-react';
import { dateFormatter, ISODateToDate, ISODurationToDecimalDuration } from '@navikt/sif-common-utils';

import { AppText } from '../../../i18n';
import { OmsorgsstønadApiData } from '../../../types/søknad-api-data/OmsorgsstønadApiData';
import { OmsorgsstønadType } from '../../../types/søknadsdata/OmsorgsstønadSøknadsdata';

interface Props {
    omsorgsstønad: OmsorgsstønadApiData;
}

const OmsorgsstønadSummary = ({ omsorgsstønad }: Props) => {
    // const appIntl = useAppIntl();
    const { mottarOmsorgsstønad } = omsorgsstønad;

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

    const antallTimer = ISODurationToDecimalDuration(omsorgsstønad.antallTimerIUken);

    return (
        <FormSummary.Answer>
            <FormSummary.Label>
                <Heading level="3" size="small">
                    <AppText id="steg.oppsummering.arbeidssituasjon.omsorgsstønad.title" />
                </Heading>
            </FormSummary.Label>
            <FormSummary.Value>
                <List>
                    <List.Item>
                        <AppText id="steg.oppsummering.arbeidssituasjon.omsorgsstønad.mottar" />
                    </List.Item>
                    <List.Item>
                        <AppText
                            id="steg.oppsummering.arbeidssituasjon.omsorgsstønad.antallTimer"
                            values={{ timer: antallTimer }}
                        />
                    </List.Item>
                    {omsorgsstønad.type === OmsorgsstønadType.mottarIHelePerioden ? (
                        <List.Item>
                            <AppText id="steg.oppsummering.arbeidssituasjon.omsorgsstønad.mottarHelePerioden" />
                        </List.Item>
                    ) : (
                        <List.Item>
                            <AppText id="steg.oppsummering.arbeidssituasjon.omsorgsstønad.mottarDelerAvPerioden" />
                        </List.Item>
                    )}

                    {omsorgsstønad.type === OmsorgsstønadType.mottarIDelerAvPerioden &&
                        omsorgsstønad._starterUndeveis &&
                        omsorgsstønad.startdato && (
                            <List.Item>
                                <AppText
                                    id="steg.oppsummering.arbeidssituasjon.omsorgsstønad.startet"
                                    values={{ startdato: dateFormatter.full(ISODateToDate(omsorgsstønad.startdato)) }}
                                />
                            </List.Item>
                        )}
                    {omsorgsstønad.type === OmsorgsstønadType.mottarIDelerAvPerioden &&
                        omsorgsstønad._slutterUnderveis &&
                        omsorgsstønad.sluttdato && (
                            <List.Item>
                                <AppText
                                    id="steg.oppsummering.arbeidssituasjon.omsorgsstønad.sluttet"
                                    values={{ sluttdato: dateFormatter.full(ISODateToDate(omsorgsstønad.sluttdato)) }}
                                />
                            </List.Item>
                        )}
                </List>
            </FormSummary.Value>
        </FormSummary.Answer>
    );
};

export default OmsorgsstønadSummary;
