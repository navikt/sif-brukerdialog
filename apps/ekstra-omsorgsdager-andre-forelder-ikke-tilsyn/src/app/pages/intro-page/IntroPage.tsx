import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude/lib';
import SoknadHeader from '@navikt/sif-common-core-ds/lib/components/soknad-header/SoknadHeader';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import InformationPoster from '@navikt/sif-common-core/lib/components/information-poster/InformationPoster';
import Page from '@navikt/sif-common-core/lib/components/page/Page';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { navigateToSoknadFrontpage } from '../../utils/navigationUtils';
import IntroForm from './IntroForm';

const IntroPage = () => {
    const intl = useIntl();
    const history = useHistory();
    useLogSidevisning(SIFCommonPageKey.intro);

    return (
        <Page
            title={intlHelper(intl, 'application.title')}
            topContentRenderer={() => <SoknadHeader level="1" title={intlHelper(intl, 'application.title')} />}>
            <Box margin="xxxl">
                <InformationPoster>
                    <p>
                        <FormattedMessage id="introForm.info.1" />
                    </p>

                    <ul>
                        <li>{intlHelper(intl, 'introForm.info.grunnList.1')}</li>
                        <li>{intlHelper(intl, 'introForm.info.grunnList.2')}</li>
                        <li>{intlHelper(intl, 'introForm.info.grunnList.3')}</li>
                        <li>{intlHelper(intl, 'introForm.info.grunnList.4')}</li>
                        <li>{intlHelper(intl, 'introForm.info.grunnList.5')}</li>
                    </ul>
                    <p>{intlHelper(intl, 'introForm.info.2')}</p>
                </InformationPoster>
            </Box>
            <FormBlock>
                <IntroForm
                    onValidSubmit={() => {
                        setTimeout(() => {
                            navigateToSoknadFrontpage(history);
                        });
                    }}
                />
            </FormBlock>
        </Page>
    );
};

export default IntroPage;
