import { Ingress } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import { useLogSidevisning } from '@navikt/sif-common-amplitude';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import SoknadHeader from '@navikt/sif-common-core-ds/lib/components/soknad-header/SoknadHeader';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { useSoknadContext } from '../SoknadContext';
import VelkommenPageForm from './VelkommenPageForm';

const VelkommenPage: React.FunctionComponent = () => {
    const intl = useIntl();
    const { startSoknad } = useSoknadContext();
    useLogSidevisning('velkommen');
    return (
        <Page
            title={intlHelper(intl, 'application.title')}
            topContentRenderer={(): JSX.Element => (
                <SoknadHeader level="1" title={intlHelper(intl, 'application.title')} />
            )}>
            <SifGuidePanel poster={true}>
                <Ingress>{intlHelper(intl, 'step.velkommen.banner.tekst')}</Ingress>
            </SifGuidePanel>

            <Block margin="xl">
                <VelkommenPageForm onStart={startSoknad} />
            </Block>
        </Page>
    );
};

export default VelkommenPage;
