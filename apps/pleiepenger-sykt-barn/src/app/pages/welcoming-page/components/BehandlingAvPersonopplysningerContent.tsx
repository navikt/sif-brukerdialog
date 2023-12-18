import { Heading, Ingress, Link } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import getLenker from '../../../lenker';
import InfoList from './info-list/InfoList';

const BehandlingAvPersonopplysningerContent: React.FunctionComponent = () => {
    return (
        <>
            <Ingress>
                <FormattedMessage id="personopplysninger.1" />
            </Ingress>
            <p>
                <FormattedMessage id="personopplysninger.2" />
            </p>
            <Block margin="l">
                <Heading level="3" size="xsmall">
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
                <p>
                    <FormattedMessage id="personopplysninger.4b" />
                </p>
            </Block>

            <Block>
                <FormattedMessage id="personopplysninger.5.1" />
                <Link href={getLenker().personvern} target="_blank">
                    <FormattedMessage id="personopplysninger.5.2" />
                </Link>
                <FormattedMessage id="personopplysninger.5.3" />
            </Block>
        </>
    );
};

export default BehandlingAvPersonopplysningerContent;
