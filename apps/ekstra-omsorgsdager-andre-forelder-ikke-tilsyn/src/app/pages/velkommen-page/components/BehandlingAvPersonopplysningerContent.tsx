import React from 'react';
import { FormattedMessage } from 'react-intl';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import Lenke from 'nav-frontend-lenker';
import { Element, Ingress } from 'nav-frontend-typografi';
import getLenker from '../../../lenker';
import InfoList from './info-list/InfoList';

const BehandlingAvPersonopplysningerContent: React.FunctionComponent = () => {
    return (
        <>
            <Ingress tag="h3">
                <FormattedMessage id="personopplysninger.1" />
            </Ingress>
            <p>
                <FormattedMessage id="personopplysninger.2" />
            </p>
            <Box margin="l">
                <Element tag="h4">
                    <FormattedMessage id="personopplysninger.3" />
                </Element>
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
            </Box>
            <Box>
                <FormattedMessage id="personopplysninger.5.1" />
                <Lenke href={getLenker().personvern} target="_blank">
                    <FormattedMessage id="personopplysninger.5.2" />
                </Lenke>
                <FormattedMessage id="personopplysninger.5.3" />
            </Box>{' '}
        </>
    );
};

export default BehandlingAvPersonopplysningerContent;
