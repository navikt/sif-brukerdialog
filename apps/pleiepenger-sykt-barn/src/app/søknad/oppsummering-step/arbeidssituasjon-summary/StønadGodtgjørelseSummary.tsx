import { dateFormatter, ISODateToDate } from '@navikt/sif-common-utils';
import { StønadGodtgjørelseApiData } from '../../../types/søknad-api-data/StønadGodtgjørelseApiData';
import { FormSummary, Heading, List } from '@navikt/ds-react';
import { AppText } from '../../../i18n';
import { MottarStønadGodtgjørelseVariant } from '../../../types/søknad-form-values/StønadGodtgjørelseFormValues';

interface Props {
    stønadGodtgjørelse: StønadGodtgjørelseApiData;
}

const StønadGodtgjørelseSummary = ({ stønadGodtgjørelse }: Props) => {
    const { mottarStønadGodtgjørelse, _variant, startdato, sluttdato } = stønadGodtgjørelse;

    if (mottarStønadGodtgjørelse === false) {
        return (
            <FormSummary.Answer data-testid="omsorgsstønad">
                <FormSummary.Label>
                    <Heading level="3" size="small">
                        <AppText id="steg.oppsummering.arbeidssituasjon.omsfost.title" />
                    </Heading>
                </FormSummary.Label>
                <FormSummary.Value>
                    <List>
                        <List.Item>
                            <AppText id="steg.oppsummering.arbeidssituasjon.omsfost.mottarIkke" />
                        </List.Item>
                    </List>
                </FormSummary.Value>
            </FormSummary.Answer>
        );
    }

    const starterIPerioden =
        _variant === MottarStønadGodtgjørelseVariant.starterIPerioden ||
        _variant === MottarStønadGodtgjørelseVariant.starterOgSlutterIPerioden;

    const slutterIPerioden =
        _variant === MottarStønadGodtgjørelseVariant.slutterIPerioden ||
        _variant === MottarStønadGodtgjørelseVariant.starterOgSlutterIPerioden;

    return (
        <FormSummary.Answer>
            <FormSummary.Label>
                <Heading level="3" size="small">
                    <AppText id="steg.oppsummering.arbeidssituasjon.omsfost.title" />
                </Heading>
            </FormSummary.Label>
            {_variant && (
                <FormSummary.Value>
                    <List>
                        <List.Item>
                            {_variant === MottarStønadGodtgjørelseVariant.somVanlig ? (
                                <AppText id="steg.oppsummering.arbeidssituasjon.omsfost.helePerioden" />
                            ) : (
                                <AppText id="steg.oppsummering.arbeidssituasjon.omsfost.delerAvPerioden" />
                            )}
                        </List.Item>
                        {starterIPerioden && startdato && (
                            <List.Item>
                                <AppText
                                    id="steg.oppsummering.arbeidssituasjon.omsfost.startdato"
                                    values={{ startdato: dateFormatter.full(ISODateToDate(startdato)) }}
                                />
                            </List.Item>
                        )}
                        {slutterIPerioden && sluttdato && (
                            <List.Item>
                                <AppText
                                    id="steg.oppsummering.arbeidssituasjon.omsfost.sluttdato"
                                    values={{ sluttdato: dateFormatter.full(ISODateToDate(sluttdato)) }}
                                />
                            </List.Item>
                        )}
                    </List>
                </FormSummary.Value>
            )}
        </FormSummary.Answer>
    );
};

export default StønadGodtgjørelseSummary;
