import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import AttachmentList from '@navikt/sif-common-core-ds/src/components/attachment-list/AttachmentList';
import { SummarySection } from '@navikt/sif-common-ui';
import { AppText, useAppIntl } from '../../../../i18n';
import { DeltBostedSøknadsdata } from '../../../../types/søknadsdata/DeltBostedSøknadsdata';
import { getAttachmentURLBackend } from '../../../../utils/attachmentUtilsAuthToken';

interface Props {
    vedlegg: string[];
    deltBostedSøknadsdata?: DeltBostedSøknadsdata;
}

const DeltBostedOppsummering: React.FC<Props> = ({ vedlegg, deltBostedSøknadsdata }) => {
    const { text } = useAppIntl();
    const delteBosteder = deltBostedSøknadsdata
        ? deltBostedSøknadsdata.vedlegg.filter((v) => v.url && vedlegg.includes(getAttachmentURLBackend(v.url)))
        : [];

    return (
        <SummarySection header={text('step.oppsummering.deltBosted.header')}>
            <Block>
                {deltBostedSøknadsdata?.vedlegg.length === 0 ? (
                    <AppText id="step.oppsummering.deltBosted.ingenVedlegg" />
                ) : (
                    <div data-testid="DeltBosted-liste">
                        <AttachmentList attachments={delteBosteder} />
                    </div>
                )}
            </Block>
        </SummarySection>
    );
};

export default DeltBostedOppsummering;
