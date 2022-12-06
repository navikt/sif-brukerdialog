import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import AttachmentList from '@navikt/sif-common-core-ds/lib/components/attachment-list/AttachmentList';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import ContentWithHeader from '@navikt/sif-common-core-ds/lib/components/content-with-header/ContentWithHeader';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import SummarySection from '@navikt/sif-common-soknad-ds/lib/soknad-summary/summary-section/SummarySection';
import { SøknadApiData } from '../../../types/søknadApiData/SøknadApiData';
import { DeltBostedSøknadsdata } from '../../../types/søknadsdata/DeltBostedSøknadsdata';
import { LegeerklæringSøknadsdata } from '../../../types/søknadsdata/LegeerklæringSøknadsdata';

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
        ? legeerklæringSøknadsdata.vedlegg.filter((v) => v.url && apiData.legeerklæring.includes(v.url))
        : [];

    const samværsavtaler = samværsavtaleSøknadsdata
        ? samværsavtaleSøknadsdata.vedlegg.filter((v) => {
              return v.url && apiData.samværsavtale && apiData.samværsavtale.includes(v.url);
          })
        : undefined;

    return (
        <SummarySection header={intlHelper(intl, 'steg.oppsummering.vedlegg.header')}>
            <Block>
                <ContentWithHeader header={intlHelper(intl, 'steg.oppsummering.legeerklæring.header')}>
                    {legeerklæringSøknadsdata?.vedlegg.length === 0 ? (
                        <FormattedMessage id="vedleggsliste.ingenLegeerklæringLastetOpp" />
                    ) : (
                        <AttachmentList attachments={legeerklæringer} />
                    )}
                </ContentWithHeader>
            </Block>
            {samværsavtaler && (
                <Block margin="xl">
                    <ContentWithHeader header={intlHelper(intl, 'steg.oppsummering.samværsavtale.header')}>
                        <AttachmentList attachments={samværsavtaler} />
                    </ContentWithHeader>
                </Block>
            )}
        </SummarySection>
    );
};

export default VedleggOppsummering;
