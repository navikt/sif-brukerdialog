import { Alert } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormattedHtmlMessage from '@navikt/sif-common-core-ds/src/atoms/formatted-html-message/FormattedHtmlMessage';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

const OmsorgstilbudStepInfo = () => {
    const intl = useIntl();
    return (
        <SifGuidePanel>
            <p>
                <FormattedMessage id="steg.omsorgstilbud.veileder.1" />
            </p>
            <ul>
                <li>
                    <FormattedMessage id="steg.omsorgstilbud.veileder.1.1" />
                </li>
                <li>
                    <FormattedMessage id="steg.omsorgstilbud.veileder.1.2" />
                </li>
                <li>
                    <FormattedMessage id="steg.omsorgstilbud.veileder.1.3" />
                </li>
                <li>
                    <FormattedMessage id="steg.omsorgstilbud.veileder.1.4" />
                </li>
                <li>
                    <FormattedMessage id="steg.omsorgstilbud.veileder.1.5" />
                </li>
                <li>
                    <FormattedMessage id="steg.omsorgstilbud.veileder.1.6" />
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
                        <FormattedMessage id="steg.omsorgstilbud.veileder.3.1" />{' '}
                        <strong>
                            <FormattedMessage id="steg.omsorgstilbud.veileder.3.2" />
                        </strong>{' '}
                        <FormattedMessage id="steg.omsorgstilbud.veileder.3.3" />
                    </p>
                    <p>
                        <FormattedMessage id="steg.omsorgstilbud.veileder.3.4" />
                    </p>
                </ExpandableInfo>
            </Block>

            <Block>
                <ExpandableInfo title={intlHelper(intl, 'steg.omsorgstilbud.veileder.4')}>
                    <p>
                        <FormattedMessage id="steg.omsorgstilbud.veileder.4.1" />
                    </p>
                </ExpandableInfo>
            </Block>
            <Block>
                <ExpandableInfo title={intlHelper(intl, 'steg.omsorgstilbud.veileder.5')}>
                    <p>
                        <FormattedMessage id="steg.omsorgstilbud.veileder.5.1" />
                    </p>
                    <p>
                        <FormattedMessage id="steg.omsorgstilbud.veileder.5.2" />
                    </p>
                    <p>
                        <FormattedHtmlMessage id="steg.omsorgstilbud.veileder.5.3" />
                    </p>
                    <p>
                        <FormattedMessage id="steg.omsorgstilbud.veileder.5.4" />
                    </p>
                </ExpandableInfo>
            </Block>
        </SifGuidePanel>
    );
};

const AdvarselSøkerKunHelgedager = () => (
    <Alert variant="warning">
        <p>
            <FormattedMessage id="step.omsorgstilbud.søkerKunHelgedager.alert.avsnitt.1" />
        </p>
        <p>
            <FormattedMessage id="step.omsorgstilbud.søkerKunHelgedager.alert.avsnitt.2" />
        </p>
        <p>
            <FormattedMessage id="step.omsorgstilbud.søkerKunHelgedager.alert.avsnitt.3" />
        </p>
    </Alert>
);

const ErLiktHverUke: React.FunctionComponent = () => {
    const intl = useIntl();
    return (
        <ExpandableInfo title={intlHelper(intl, 'steg.omsorgstilbud.erLiktHverUke.info.tittel')}>
            <FormattedMessage id={'steg.omsorgstilbud.erLiktHverUke.info.1'} />
            <br />
            <FormattedMessage id={'steg.omsorgstilbud.erLiktHverUke.info.2'} />
        </ExpandableInfo>
    );
};

const ErIOmsorgstilbud: React.FunctionComponent = () => {
    const intl = useIntl();
    return (
        <ExpandableInfo title={intlHelper(intl, 'steg.omsorgstilbud.hvorMyeTidIOmsorgstilbud.description.tittel')}>
            <p>
                <FormattedMessage id={'steg.omsorgstilbud.hvorMyeTidIOmsorgstilbud.description.info.1'} />
            </p>
        </ExpandableInfo>
    );
};

const HvorMye: React.FunctionComponent = () => {
    return (
        <p>
            <FormattedMessage id={'steg.omsorgstilbud.hvorMyeTidIOmsorgstilbud.description.info.2'} />
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
