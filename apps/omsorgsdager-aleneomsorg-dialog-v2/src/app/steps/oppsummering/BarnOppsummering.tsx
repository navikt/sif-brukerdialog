import { AppText, useAppIntl } from '@app/i18n';
import { TidspunktForAleneomsorg } from '@app/steps/tidspunkt-for-aleneomsorg/types';
import type { SøknadApiData } from '@app/types/SoknadApiData';
import { FormSummary, List } from '@navikt/ds-react';
import { dateFormatter, type ISODate } from '@sif/utils';

export const BarnOppsummering = ({ barn }: { barn: SøknadApiData['barn'] }) => {
    const { locale, text } = useAppIntl();

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="oppsummeringSteg.barn.tittel" />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Value>
                        <List>
                            {barn.map((barnet) => (
                                <List.Item key={barnet.aktørId ?? barnet.identitetsnummer}>
                                    <div>{barnet.navn}</div>
                                    <div>
                                        {barnet.tidspunktForAleneomsorg === TidspunktForAleneomsorg.TIDLIGERE
                                            ? text('oppsummeringSteg.barn.tidspunkt.tidligere')
                                            : barnet.dato
                                              ? text('oppsummeringSteg.barn.tidspunkt', {
                                                    dato: dateFormatter.dateShortMonthYear(
                                                        barnet.dato as ISODate,
                                                        locale,
                                                    ),
                                                })
                                              : null}
                                    </div>
                                </List.Item>
                            ))}
                        </List>
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
        </FormSummary>
    );
};
