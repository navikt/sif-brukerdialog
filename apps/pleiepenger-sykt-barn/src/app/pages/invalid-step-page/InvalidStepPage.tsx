import { BodyShort, Heading } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import ActionLink from '@navikt/sif-common-core-ds/lib/atoms/action-link/ActionLink';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import FormattedHtmlMessage from '@navikt/sif-common-core-ds/lib/atoms/formatted-html-message/FormattedHtmlMessage';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { getBackLinkFromNotIncludedStep } from '../../søknad/søknadStepsConfig';
import { StepID } from '../../types/StepID';
import { navigateTo } from '../../utils/navigationUtils';

interface Props {
    stepId: StepID;
}

const InvalidStepPage = ({ stepId }: Props) => {
    const intl = useIntl();
    const navigate = useNavigate();
    const backLink = getBackLinkFromNotIncludedStep(stepId);
    return (
        <Page title={intlHelper(intl, 'page.invalidStepPage.sidetittel')}>
            <div style={{ paddingTop: '1rem' }}>
                <SifGuidePanel poster={true} compact={true} mood="uncertain">
                    <Heading level="2" size="medium">
                        <FormattedMessage id="page.invalidStepPage.tittel" />
                    </Heading>
                    <Block margin="m" padBottom="l">
                        <BodyShort as="div">
                            <FormattedHtmlMessage id="page.invalidStepPage.tekst" />
                            <p>
                                <ActionLink
                                    onClick={() => {
                                        if (backLink) {
                                            navigateTo(backLink, navigate);
                                        } else {
                                            history.go(-1);
                                        }
                                    }}>
                                    <FormattedMessage id="page.invalidStepPage.tilbakeLenke" />
                                </ActionLink>
                            </p>
                        </BodyShort>
                    </Block>
                </SifGuidePanel>
            </div>
        </Page>
    );
};

export default InvalidStepPage;
