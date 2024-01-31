import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import AttachmentList from '@navikt/sif-common-core-ds/src/components/attachment-list/AttachmentList';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { SummarySection } from '@navikt/sif-common-ui';
import { LegeerklæringSøknadsdata } from '../../../../types/søknadsdata/LegeerklæringSøknadsdata';
import { getAttachmentURLBackend } from '../../../../utils/attachmentUtilsAuthToken';
import { SøknadApiData } from '../../../../types/søknadApiData/SøknadApiData';

interface Props {
    apiData: SøknadApiData;
    legeerklæringSøknadsdata?: LegeerklæringSøknadsdata;
}

const LegeerklæringOppsummering: React.FC<Props> = ({ apiData, legeerklæringSøknadsdata }) => {
    const intl = useIntl();
    const legeerklæringer = legeerklæringSøknadsdata
        ? legeerklæringSøknadsdata.vedlegg.filter(
              (v) => v.url && apiData.vedleggUrls.includes(getAttachmentURLBackend(v.url)),
          )
        : [];

    return (
        <SummarySection header={intlHelper(intl, 'step.oppsummering.legeerklæring.header')}>
            <Block>
                {legeerklæringSøknadsdata?.vedlegg.length === 0 ? (
                    <FormattedMessage id="step.oppsummering.legeerklæring.ingenVedlegg" />
                ) : (
                    <div data-testid="legeerklæring-liste">
                        <AttachmentList attachments={legeerklæringer} />
                    </div>
                )}
            </Block>
        </SummarySection>
    );
};

export default LegeerklæringOppsummering;
