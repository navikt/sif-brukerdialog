import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Heading, Link } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import InfoList from '@navikt/sif-common-core-ds/src/components/lists/info-list/InfoList';
import getLenker from '../../../lenker';

const BehandlingAvPersonopplysningerContent: React.FunctionComponent = () => {
    return (
        <Block margin="l" style={{ paddingTop: '.5rem' }}>
            <Heading level="3" size="small">
                <FormattedMessage id="personopplysninger.1" />
            </Heading>
            <p>
                <FormattedMessage id="personopplysninger.2" />
            </p>
            <Block margin="l">
                <Heading size="small" level="4">
                    <FormattedMessage id="personopplysninger.3" />
                </Heading>
                <p>
                    <FormattedMessage id="personopplysninger.4" />
                </p>
                <InfoList>
                    <li>
                        <FormattedMessage id="personopplysninger.4.1" />
                    </li>
                    <li>
                        <FormattedMessage id="personopplysninger.4.2" />
                    </li>
                    <li>
                        <FormattedMessage id="personopplysninger.4.3" />
                    </li>
                    <li>
                        <FormattedMessage id="personopplysninger.4.4" />
                    </li>
                    <li>
                        <FormattedMessage id="personopplysninger.4.5" />
                    </li>
                    <li>
                        <FormattedMessage id="personopplysninger.4.6" />
                    </li>
                </InfoList>
            </Block>
            <Block>
                <FormattedMessage id="personopplysninger.5.1" />
                <Link href={getLenker().personvern} target="_blank">
                    <FormattedMessage id="personopplysninger.5.2" />
                </Link>
                <FormattedMessage id="personopplysninger.5.3" />
            </Block>
        </Block>
    );
};

export default BehandlingAvPersonopplysningerContent;
