import React from 'react';
import AttachmentList from '@navikt/sif-common-core-ds/src/components/attachment-list/AttachmentList';
import { AppText } from '../../../../i18n';
import { DeltBostedSøknadsdata } from '../../../../types/søknadsdata/DeltBostedSøknadsdata';
import { getAttachmentURLBackend } from '../../../../utils/attachmentUtilsAuthToken';
import { FormSummary } from '@navikt/ds-react';

interface Props {
    vedlegg: string[];
    deltBostedSøknadsdata?: DeltBostedSøknadsdata;
}

const DeltBostedOppsummering: React.FC<Props> = ({ vedlegg, deltBostedSøknadsdata }) => {
    const delteBosteder = deltBostedSøknadsdata
        ? deltBostedSøknadsdata.vedlegg.filter((v) => v.url && vedlegg.includes(getAttachmentURLBackend(v.url)))
        : [];

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="step.oppsummering.deltBosted.header" />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="step.oppsummering.deltBosted.dokumenter" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        {deltBostedSøknadsdata?.vedlegg.length === 0 ? (
                            <AppText id="step.oppsummering.deltBosted.ingenVedlegg" />
                        ) : (
                            <AttachmentList attachments={delteBosteder} />
                        )}
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default DeltBostedOppsummering;
