import { BodyLong } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { useLogSidevisning } from '@navikt/sif-common-amplitude';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import SoknadHeader from '@navikt/sif-common-core-ds/lib/components/soknad-header/SoknadHeader';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { navigateToSoknadFrontpage } from '../../utils/navigationUtils';
import IntroForm from './IntroForm';

const IntroPage: React.FunctionComponent = () => {
    const intl = useIntl();
    const history = useHistory() as any;
    useLogSidevisning('intro');
    return (
        <Page
            title={intlHelper(intl, 'application.title')}
            topContentRenderer={() => <SoknadHeader level="1" title={intlHelper(intl, 'application.title')} />}>
            <section aria-label="Introduksjon">
                <SifGuidePanel poster>
                    <BodyLong as="div">
                        {intlHelper(intl, 'introForm.info.1')}
                        <p>{intlHelper(intl, 'introForm.info.2')}</p>
                        <ul>
                            <li>
                                <ExpandableInfo
                                    title={intlHelper(intl, 'introForm.info.2.nedtrek.tittel')}
                                    filledBackground={false}>
                                    {intlHelper(intl, 'introForm.info.2.nedtrek')}
                                </ExpandableInfo>
                            </li>
                            <li>
                                <ExpandableInfo
                                    title={intlHelper(intl, 'introForm.info.3.nedterk.tittel')}
                                    filledBackground={false}>
                                    <p>{intlHelper(intl, 'introForm.info.4')}</p>
                                    <ul>
                                        <li>{intlHelper(intl, 'introForm.info.4.1')}</li>
                                        <li>{intlHelper(intl, 'introForm.info.4.2')}</li>
                                    </ul>
                                    <p>{intlHelper(intl, 'introForm.info.5')}</p>
                                </ExpandableInfo>
                            </li>
                            <li>
                                <ExpandableInfo
                                    title={intlHelper(intl, 'introForm.info.5.nedtrek.1.tittel')}
                                    filledBackground={false}>
                                    {intlHelper(intl, 'introForm.info.5.nedtrek.1.2021')}
                                </ExpandableInfo>
                            </li>
                        </ul>
                    </BodyLong>
                </SifGuidePanel>
            </section>

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
