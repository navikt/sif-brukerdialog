import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import AttachmentList from '@navikt/sif-common-core-ds/lib/components/attachment-list/AttachmentList';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { SummaryBlock, SummarySection } from '@navikt/sif-common-soknad-ds';
import { SøknadApiData } from '../../../../types/søknadApiData/SøknadApiData';
import { getAttachmentURLBackend } from '../../../../utils/attachmentUtilsAuthToken';
import { SmittevernDokumenterSøknadsdata } from '../../../../types/søknadsdata/SmittevernDokumenterSøknadsdata';

interface Props {
    apiData: SøknadApiData;
    smittevernDokumenterSøknadsdata?: SmittevernDokumenterSøknadsdata;
}

const VedleggOppsummering: React.FC<Props> = ({ apiData, smittevernDokumenterSøknadsdata }) => {
    const intl = useIntl();

    const smittevernDokumenter = smittevernDokumenterSøknadsdata
        ? smittevernDokumenterSøknadsdata.vedlegg.filter(
              (v) => v.url && apiData.vedlegg.includes(getAttachmentURLBackend(v.url))
          )
        : [];

    return (
        <SummarySection header={intlHelper(intl, 'step.oppsummering.dokumenter.header')}>
            <Block>
                {smittevernDokumenterSøknadsdata && (
                    <Block margin="s">
                        <SummaryBlock header={intlHelper(intl, 'step.oppsummering.dokumenterSmittevern.header')}>
                            {smittevernDokumenter.length === 0 && (
                                <FormattedMessage id={'step.oppsummering.dokumenter.ikkelastetopp'} />
                            )}
                            {smittevernDokumenter.length > 0 && <AttachmentList attachments={smittevernDokumenter} />}
                        </SummaryBlock>
                    </Block>
                )}

                {!smittevernDokumenterSøknadsdata && (
                    <Block margin="s">
                        <FormattedMessage id={'step.oppsummering.dokumenter.ingenVedlegg'} />
                    </Block>
                )}
            </Block>
        </SummarySection>
    );
};

export default VedleggOppsummering;
