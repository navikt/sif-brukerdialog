import { Alert, FormSummary } from '@navikt/ds-react';
import AttachmentList from '@navikt/sif-common-core-ds/src/components/attachment-list/AttachmentList';
import { AppText } from '../../../../i18n';
import { SøknadApiData } from '../../../../types/søknadApiData/SøknadApiData';
import { DeltBostedSøknadsdata } from '../../../../types/søknadsdata/DeltBostedSøknadsdata';
import { LegeerklæringSøknadsdata } from '../../../../types/søknadsdata/LegeerklæringSøknadsdata';
import { fixAttachmentURL, getAttachmentURLBackend } from '@navikt/sif-common';

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
    const legeerklæringer = legeerklæringSøknadsdata
        ? legeerklæringSøknadsdata.vedlegg
              .filter((v) => v.url && apiData.legeerklæring.includes(getAttachmentURLBackend(v.url)))
              .map(fixAttachmentURL)
        : [];

    const samværsavtaler = samværsavtaleSøknadsdata
        ? samværsavtaleSøknadsdata.vedlegg
              .filter((v) => {
                  return (
                      v.url && apiData.samværsavtale && apiData.samværsavtale.includes(getAttachmentURLBackend(v.url))
                  );
              })
              .map(fixAttachmentURL)
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
                            <AttachmentList attachments={legeerklæringer} />
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
                                <AttachmentList attachments={samværsavtaler} />
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
