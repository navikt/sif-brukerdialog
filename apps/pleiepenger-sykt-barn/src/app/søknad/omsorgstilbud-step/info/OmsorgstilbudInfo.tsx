import { useAppIntl } from '@i18n/index';
import { Alert, List } from '@navikt/ds-react';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import React from 'react';

import { AppText } from '../../../i18n';

const OmsorgstilbudStepInfo = () => {
    const { text } = useAppIntl();
    return (
        <>
            <p>
                <AppText id="steg.omsorgstilbud.veileder.1" />
            </p>
            <List>
                <List.Item>
                    <AppText id="steg.omsorgstilbud.veileder.1.1" />
                </List.Item>
                <List.Item>
                    <AppText id="steg.omsorgstilbud.veileder.1.2" />
                </List.Item>
                <List.Item>
                    <AppText id="steg.omsorgstilbud.veileder.1.3" />
                </List.Item>
                <List.Item>
                    <AppText id="steg.omsorgstilbud.veileder.1.4" />
                </List.Item>
                <List.Item>
                    <AppText id="steg.omsorgstilbud.veileder.1.5" />
                </List.Item>
                <List.Item>
                    <AppText id="steg.omsorgstilbud.veileder.1.6" />
                </List.Item>
            </List>
            <p>
                <strong>
                    <AppText id="steg.omsorgstilbud.veileder.2" />
                </strong>
            </p>

            <ExpandableInfo title={text('steg.omsorgstilbud.eksempel.tittel')}>
                <p>
                    <AppText id="steg.omsorgstilbud.eksempel.1" />
                </p>
                <p>
                    <AppText id="steg.omsorgstilbud.eksempel.2" />
                </p>
            </ExpandableInfo>
            <ExpandableInfo title={text('steg.omsorgstilbud.veileder.3')}>
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
            <ExpandableInfo title={text('steg.omsorgstilbud.veileder.4')}>
                <p>
                    <AppText id="steg.omsorgstilbud.veileder.4.1" />
                </p>
            </ExpandableInfo>
            <ExpandableInfo title={text('steg.omsorgstilbud.veileder.5')}>
                <p>
                    <AppText id="steg.omsorgstilbud.veileder.5.1" />
                </p>
                <p>
                    <AppText id="steg.omsorgstilbud.veileder.5.2" />
                </p>
                <p>
                    <AppText
                        id="steg.omsorgstilbud.veileder.5.3"
                        values={{ strong: (children) => <strong key="strong">{children}</strong> }}
                    />
                </p>
                <p>
                    <AppText id="steg.omsorgstilbud.veileder.5.4" />
                </p>
            </ExpandableInfo>
        </>
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
    const { text } = useAppIntl();
    return (
        <ExpandableInfo title={text('steg.omsorgstilbud.erLiktHverUke.info.tittel')}>
            <AppText id="steg.omsorgstilbud.erLiktHverUke.info.1" />
            <br />
            <AppText id="steg.omsorgstilbud.erLiktHverUke.info.2" />
        </ExpandableInfo>
    );
};

const ErIOmsorgstilbud: React.FunctionComponent = () => {
    const { text } = useAppIntl();
    return (
        <ExpandableInfo title={text('steg.omsorgstilbud.hvorMyeTidIOmsorgstilbud.description.tittel')}>
            <p>
                <AppText id="steg.omsorgstilbud.hvorMyeTidIOmsorgstilbud.description.info.1" />
            </p>
        </ExpandableInfo>
    );
};

const HvorMye: React.FunctionComponent = () => {
    return (
        <p>
            <AppText id="steg.omsorgstilbud.hvorMyeTidIOmsorgstilbud.description.info.2" />
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
