import { FormSummary } from '@navikt/ds-react';
import React from 'react';
import { getAttachmentURLBackend } from '@navikt/sif-common';
import AttachmentList from '@navikt/sif-common-core-ds/src/components/attachment-list/AttachmentList';
import { EditStepLink } from '@navikt/sif-common-soknad-ds';
import { AppText } from '../../../../i18n';
import { DeltBostedSøknadsdata } from '../../../../types/søknadsdata/DeltBostedSøknadsdata';

interface Props {
    vedlegg: string[];
    deltBostedSøknadsdata?: DeltBostedSøknadsdata;
    onEdit?: () => void;
}

const DeltBostedOppsummering: React.FC<Props> = ({ vedlegg, deltBostedSøknadsdata, onEdit }) => {
    const delteBosteder = deltBostedSøknadsdata
        ? deltBostedSøknadsdata.vedlegg.filter((v) => v.url && vedlegg.includes(getAttachmentURLBackend(v.url)))
        : [];

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="step.oppsummering.deltBosted.header" />
                </FormSummary.Heading>
                {onEdit && <EditStepLink onEdit={onEdit} />}
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
