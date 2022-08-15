import { Heading } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import { useLogSidevisning } from '@navikt/sif-common-amplitude';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import FrontPageBanner from '@navikt/sif-common-core-ds/lib/components/front-page-banner/FrontPageBanner';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
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
                <FrontPageBanner
                    bannerSize="large"
                    counsellorWithSpeechBubbleProps={{
                        strongText: intlHelper(intl, 'step.velkommen.banner.tittel'),
                        normalText: intlHelper(intl, 'step.velkommen.banner.tekst'),
                    }}
                />
            )}>
            <Block margin="xxxl" textAlignCenter={true}>
                <Heading level="1" size="large">
                    {intlHelper(intl, 'step.velkommen.tittel')}
                </Heading>
            </Block>

            <Block margin="xxl">
                <VelkommenPageForm onStart={startSoknad} />
            </Block>
        </Page>
    );
};

export default VelkommenPage;
