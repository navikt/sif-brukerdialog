import { FormSummary } from '@navikt/ds-react';
import React from 'react';
import AttachmentList from '@navikt/sif-common-core-ds/src/components/attachment-list/AttachmentList';
import { AppText } from '../../../../i18n';
import { SøknadApiData } from '../../../../types/søknadApiData/SøknadApiData';
import { LegeerklæringSøknadsdata } from '../../../../types/søknadsdata/LegeerklæringSøknadsdata';
import { getAttachmentURLBackend } from '../../../../utils/attachmentUtilsAuthToken';

interface Props {
    apiData: SøknadApiData;
    legeerklæringSøknadsdata?: LegeerklæringSøknadsdata;
}

const LegeerklæringOppsummering: React.FC<Props> = ({ apiData, legeerklæringSøknadsdata }) => {
    const legeerklæringer = legeerklæringSøknadsdata
        ? legeerklæringSøknadsdata.vedlegg.filter(
              (v) => v.url && apiData.vedleggUrls.includes(getAttachmentURLBackend(v.url)),
          )
        : [];

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="step.oppsummering.legeerklæring.header" />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="step.oppsummering.legeerklæring.label" />
                    </FormSummary.Label>{' '}
                    <FormSummary.Value>
                        {legeerklæringSøknadsdata?.vedlegg.length === 0 ? (
                            <AppText id="step.oppsummering.legeerklæring.ingenVedlegg" />
                        ) : (
                            <div data-testid="legeerklæring-liste">
                                <AttachmentList attachments={legeerklæringer} />
                            </div>
                        )}
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default LegeerklæringOppsummering;
