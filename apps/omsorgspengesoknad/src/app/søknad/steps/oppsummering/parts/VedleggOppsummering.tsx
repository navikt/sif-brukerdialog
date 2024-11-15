import { Alert, FormSummary } from '@navikt/ds-react';
import { getVedleggInLocationArray, VedleggSummaryList } from '@navikt/sif-common-core-ds';
import { AppText } from '../../../../i18n';
import { SøknadApiData } from '../../../../types/søknadApiData/SøknadApiData';
import { DeltBostedSøknadsdata } from '../../../../types/søknadsdata/DeltBostedSøknadsdata';
import { LegeerklæringSøknadsdata } from '../../../../types/søknadsdata/LegeerklæringSøknadsdata';

interface Props {
    apiData: SøknadApiData;
    legeerklæringSøknadsdata?: LegeerklæringSøknadsdata;
    samværsavtaleSøknadsdata?: DeltBostedSøknadsdata;
}

const VedleggOppsummering: React.FunctionComponent<Props> = ({
    apiData,
    legeerklæringSøknadsdata,
    samværsavtaleSøknadsdata,
}) => {
    const legeerklæringer = getVedleggInLocationArray({
        locations: apiData.legeerklæring,
        vedlegg: legeerklæringSøknadsdata?.vedlegg,
    });
    const samværsavtaler = samværsavtaleSøknadsdata
        ? getVedleggInLocationArray({
              locations: apiData.samværsavtale,
              vedlegg: samværsavtaleSøknadsdata?.vedlegg,
          })
        : undefined;
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="steg.oppsummering.vedlegg.header" />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="steg.oppsummering.legeerklæring.header" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        {legeerklæringSøknadsdata?.vedlegg.length === 0 ? (
                            <Alert inline={true} variant="warning">
                                <AppText id="vedleggsliste.ingenLegeerklæringLastetOpp" />
                            </Alert>
                        ) : (
                            <VedleggSummaryList vedlegg={legeerklæringer} />
                        )}
                    </FormSummary.Value>
                </FormSummary.Answer>
                {samværsavtaler && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="steg.oppsummering.samværsavtale.header" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            {samværsavtaler.length > 0 ? (
                                <VedleggSummaryList vedlegg={samværsavtaler} />
                            ) : (
                                <Alert inline={true} variant="warning">
                                    <AppText id="vedleggsliste.ingenBostedsavtaleLastetOpp" />
                                </Alert>
                            )}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default VedleggOppsummering;
