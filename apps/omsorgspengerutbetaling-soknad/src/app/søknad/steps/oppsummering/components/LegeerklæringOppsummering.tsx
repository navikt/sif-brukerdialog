import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import AttachmentList from '@navikt/sif-common-core-ds/src/components/attachment-list/AttachmentList';
import { SummarySection } from '@navikt/sif-common-ui';
import { AppText, useAppIntl } from '../../../../i18n';
import { SøknadApiData } from '../../../../types/søknadApiData/SøknadApiData';
import { LegeerklæringSøknadsdata } from '../../../../types/søknadsdata/LegeerklæringSøknadsdata';
import { getAttachmentURLBackend } from '../../../../utils/attachmentUtilsAuthToken';

interface Props {
    apiData: SøknadApiData;
    legeerklæringSøknadsdata?: LegeerklæringSøknadsdata;
}

const LegeerklæringOppsummering: React.FC<Props> = ({ apiData, legeerklæringSøknadsdata }) => {
    const { text } = useAppIntl();
    const legeerklæringer = legeerklæringSøknadsdata
        ? legeerklæringSøknadsdata.vedlegg.filter(
              (v) => v.url && apiData.vedlegg.includes(getAttachmentURLBackend(v.url)),
          )
        : [];

    return (
        <SummarySection header={text('step.oppsummering.legeerklæring.header')}>
            <Block>
                {legeerklæringSøknadsdata?.vedlegg.length === 0 ? (
                    <AppText id="step.oppsummering.legeerklæring.ingenVedlegg" />
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
