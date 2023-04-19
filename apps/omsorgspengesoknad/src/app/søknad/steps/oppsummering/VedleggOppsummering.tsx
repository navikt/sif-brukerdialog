import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import AttachmentList from '@navikt/sif-common-core-ds/lib/components/attachment-list/AttachmentList';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import ContentWithHeader from '@navikt/sif-common-core-ds/lib/components/content-with-header/ContentWithHeader';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import SummarySection from '@navikt/sif-common-soknad-ds/lib/soknad-summary/summary-section/SummarySection';
import { SøknadApiData } from '../../../types/søknadApiData/SøknadApiData';
import { DeltBostedSøknadsdata } from '../../../types/søknadsdata/DeltBostedSøknadsdata';
import { LegeerklæringSøknadsdata } from '../../../types/søknadsdata/LegeerklæringSøknadsdata';
import { getAttachmentURLBackend } from '../../../utils/attachmentUtilsAuthToken';
import { Alert } from '@navikt/ds-react';

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
    const intl = useIntl();
    const legeerklæringer = legeerklæringSøknadsdata
        ? legeerklæringSøknadsdata.vedlegg.filter(
              (v) => v.url && apiData.legeerklæring.includes(getAttachmentURLBackend(v.url))
          )
        : [];

    const samværsavtaler = samværsavtaleSøknadsdata
        ? samværsavtaleSøknadsdata.vedlegg.filter((v) => {
              return v.url && apiData.samværsavtale && apiData.samværsavtale.includes(getAttachmentURLBackend(v.url));
          })
        : undefined;

    return (
        <SummarySection header={intlHelper(intl, 'steg.oppsummering.vedlegg.header')}>
            <Block>
                <ContentWithHeader header={intlHelper(intl, 'steg.oppsummering.legeerklæring.header')}>
                    {legeerklæringSøknadsdata?.vedlegg.length === 0 ? (
                        <FormattedMessage id="vedleggsliste.ingenLegeerklæringLastetOpp" />
                    ) : (
                        <div data-testid="legeerklæring-liste">
                            <AttachmentList attachments={legeerklæringer} />
                        </div>
                    )}
                </ContentWithHeader>
            </Block>
            {samværsavtaler && (
                <Block margin="xl">
                    <ContentWithHeader header={intlHelper(intl, 'steg.oppsummering.samværsavtale.header')}>
                        <div data-testid="samværsavtale-liste">
                            {samværsavtaler.length > 0 ? (
                                <AttachmentList attachments={samværsavtaler} />
                            ) : (
                                <Alert inline={true} variant="warning">
                                    Ingen avtale er lastet opp
                                </Alert>
                            )}
                        </div>
                    </ContentWithHeader>
                </Block>
            )}
        </SummarySection>
    );
};

export default VedleggOppsummering;
