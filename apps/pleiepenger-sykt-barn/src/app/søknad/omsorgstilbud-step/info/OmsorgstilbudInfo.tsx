import { Alert } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormattedHtmlMessage from '@navikt/sif-common-core-ds/src/atoms/formatted-html-message/FormattedHtmlMessage';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { AppText } from '../../../i18n';

const OmsorgstilbudStepInfo = () => {
    const intl = useIntl();
    return (
        <SifGuidePanel>
            <p>
                <AppText id="steg.omsorgstilbud.veileder.1" />
            </p>
            <ul>
                <li>
                    <AppText id="steg.omsorgstilbud.veileder.1.1" />
                </li>
                <li>
                    <AppText id="steg.omsorgstilbud.veileder.1.2" />
                </li>
                <li>
                    <AppText id="steg.omsorgstilbud.veileder.1.3" />
                </li>
                <li>
                    <AppText id="steg.omsorgstilbud.veileder.1.4" />
                </li>
                <li>
                    <AppText id="steg.omsorgstilbud.veileder.1.5" />
                </li>
                <li>
                    <AppText id="steg.omsorgstilbud.veileder.1.6" />
                </li>
            </ul>
            <p>
                <FormattedHtmlMessage id="steg.omsorgstilbud.veileder.2" />
            </p>
            <Block>
                <ExpandableInfo title={intlHelper(intl, 'steg.omsorgstilbud.eksempel.tittel')}>
                    <p>{intlHelper(intl, 'steg.omsorgstilbud.eksempel.1')}</p>
                    <p>{intlHelper(intl, 'steg.omsorgstilbud.eksempel.2')}</p>
                </ExpandableInfo>
            </Block>
            <Block>
                <ExpandableInfo title={intlHelper(intl, 'steg.omsorgstilbud.veileder.3')}>
                    <p>
                        <AppText id="steg.omsorgstilbud.veileder.3.1" />{' '}
                        <strong>
                            <AppText id="steg.omsorgstilbud.veileder.3.2" />
                        </strong>{' '}
                        <AppText id="steg.omsorgstilbud.veileder.3.3" />
                    </p>
                    <p>
                        <AppText id="steg.omsorgstilbud.veileder.3.4" />
                    </p>
                </ExpandableInfo>
            </Block>

            <Block>
                <ExpandableInfo title={intlHelper(intl, 'steg.omsorgstilbud.veileder.4')}>
                    <p>
                        <AppText id="steg.omsorgstilbud.veileder.4.1" />
                    </p>
                </ExpandableInfo>
            </Block>
            <Block>
                <ExpandableInfo title={intlHelper(intl, 'steg.omsorgstilbud.veileder.5')}>
                    <p>
                        <AppText id="steg.omsorgstilbud.veileder.5.1" />
                    </p>
                    <p>
                        <AppText id="steg.omsorgstilbud.veileder.5.2" />
                    </p>
                    <p>
                        <FormattedHtmlMessage id="steg.omsorgstilbud.veileder.5.3" />
                    </p>
                    <p>
                        <AppText id="steg.omsorgstilbud.veileder.5.4" />
                    </p>
                </ExpandableInfo>
            </Block>
        </SifGuidePanel>
    );
};

const AdvarselSøkerKunHelgedager = () => (
    <Alert variant="warning">
        <p>
            <AppText id="step.omsorgstilbud.søkerKunHelgedager.alert.avsnitt.1" />
        </p>
        <p>
            <AppText id="step.omsorgstilbud.søkerKunHelgedager.alert.avsnitt.2" />
        </p>
        <p>
            <AppText id="step.omsorgstilbud.søkerKunHelgedager.alert.avsnitt.3" />
        </p>
    </Alert>
);

const ErLiktHverUke: React.FunctionComponent = () => {
    const intl = useIntl();
    return (
        <ExpandableInfo title={intlHelper(intl, 'steg.omsorgstilbud.erLiktHverUke.info.tittel')}>
            <AppText id={'steg.omsorgstilbud.erLiktHverUke.info.1'} />
            <br />
            <AppText id={'steg.omsorgstilbud.erLiktHverUke.info.2'} />
        </ExpandableInfo>
    );
};

const ErIOmsorgstilbud: React.FunctionComponent = () => {
    const intl = useIntl();
    return (
        <ExpandableInfo title={intlHelper(intl, 'steg.omsorgstilbud.hvorMyeTidIOmsorgstilbud.description.tittel')}>
            <p>
                <AppText id={'steg.omsorgstilbud.hvorMyeTidIOmsorgstilbud.description.info.1'} />
            </p>
        </ExpandableInfo>
    );
};

const HvorMye: React.FunctionComponent = () => {
    return (
        <p>
            <AppText id={'steg.omsorgstilbud.hvorMyeTidIOmsorgstilbud.description.info.2'} />
        </p>
    );
};

const omsorgstilbudInfo = {
    stepIntro: <OmsorgstilbudStepInfo />,
    advarselSøkerKunHelgedager: <AdvarselSøkerKunHelgedager />,
    erLiktHverUke: <ErLiktHverUke />,
    erIOmsorgstilbud: <ErIOmsorgstilbud />,
    hvorMye: <HvorMye />,
};

export default omsorgstilbudInfo;
