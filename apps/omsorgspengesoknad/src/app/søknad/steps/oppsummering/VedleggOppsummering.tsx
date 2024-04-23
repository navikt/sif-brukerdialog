import { Alert } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import AttachmentList from '@navikt/sif-common-core-ds/src/components/attachment-list/AttachmentList';
import ContentWithHeader from '@navikt/sif-common-core-ds/src/components/content-with-header/ContentWithHeader';
import { SummarySection } from '@navikt/sif-common-ui';
import { AppText, useAppIntl } from '../../../i18n';
import { SøknadApiData } from '../../../types/søknadApiData/SøknadApiData';
import { DeltBostedSøknadsdata } from '../../../types/søknadsdata/DeltBostedSøknadsdata';
import { LegeerklæringSøknadsdata } from '../../../types/søknadsdata/LegeerklæringSøknadsdata';
import { getAttachmentURLBackend } from '../../../utils/attachmentUtilsAuthToken';

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
    const { text } = useAppIntl();
    const legeerklæringer = legeerklæringSøknadsdata
        ? legeerklæringSøknadsdata.vedlegg.filter(
              (v) => v.url && apiData.legeerklæring.includes(getAttachmentURLBackend(v.url)),
          )
        : [];

    const samværsavtaler = samværsavtaleSøknadsdata
        ? samværsavtaleSøknadsdata.vedlegg.filter((v) => {
              return v.url && apiData.samværsavtale && apiData.samværsavtale.includes(getAttachmentURLBackend(v.url));
          })
        : undefined;

    return (
        <SummarySection header={text('steg.oppsummering.vedlegg.header')}>
            <Block>
                <ContentWithHeader header={text('steg.oppsummering.legeerklæring.header')}>
                    {legeerklæringSøknadsdata?.vedlegg.length === 0 ? (
                        <Alert inline={true} variant="warning">
                            <AppText id="vedleggsliste.ingenLegeerklæringLastetOpp" />
                        </Alert>
                    ) : (
                        <AttachmentList attachments={legeerklæringer} />
                    )}
                </ContentWithHeader>
            </Block>
            {samværsavtaler && (
                <Block margin="xl">
                    <ContentWithHeader header={text('steg.oppsummering.samværsavtale.header')}>
                        {samværsavtaler.length > 0 ? (
                            <AttachmentList attachments={samværsavtaler} />
                        ) : (
                            <Alert inline={true} variant="warning">
                                <AppText id="vedleggsliste.ingenBostedsavtaleLastetOpp" />
                            </Alert>
                        )}
                    </ContentWithHeader>
                </Block>
            )}
        </SummarySection>
    );
};

export default VedleggOppsummering;
