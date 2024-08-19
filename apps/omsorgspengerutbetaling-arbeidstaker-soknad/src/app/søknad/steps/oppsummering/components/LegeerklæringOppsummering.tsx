import { FormSummary } from '@navikt/ds-react';
import React from 'react';
import AttachmentList from '@navikt/sif-common-core-ds/src/components/attachment-list/AttachmentList';
import { AppText } from '../../../../i18n';
import { LegeerklæringSøknadsdata } from '../../../../types/søknadsdata/LegeerklæringSøknadsdata';
import { getAttachmentURLBackend } from '../../../../utils/attachmentUtilsAuthToken';

interface Props {
    vedlegg: string[];
    legeerklæringSøknadsdata?: LegeerklæringSøknadsdata;
}

const LegeerklæringOppsummering: React.FC<Props> = ({ vedlegg, legeerklæringSøknadsdata }) => {
    const legeerklæringer = legeerklæringSøknadsdata
        ? legeerklæringSøknadsdata.vedlegg.filter((v) => v.url && vedlegg.includes(getAttachmentURLBackend(v.url)))
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
                        <AppText id="step.oppsummering.legeerklæring.liste.header" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        {legeerklæringSøknadsdata?.vedlegg.length === 0 ? (
                            <AppText id="step.oppsummering.legeerklæring.ingenVedlegg" />
                        ) : (
                            <AttachmentList attachments={legeerklæringer} />
                        )}
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default LegeerklæringOppsummering;
