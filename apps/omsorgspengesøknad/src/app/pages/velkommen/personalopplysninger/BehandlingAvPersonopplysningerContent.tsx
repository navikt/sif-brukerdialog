import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import { Heading, Link } from '@navikt/ds-react';
import getLenker from '../../../lenker';

const BehandlingAvPersonopplysningerContent: React.FunctionComponent = () => {
    const intl = useIntl();
    return (
        <>
            <p>
                <FormattedMessage id="modal.personopplysninger.2" />
            </p>
            <Block margin="l">
                <Heading size="small" level="3">
                    <FormattedMessage id="modal.personopplysninger.3" />
                </Heading>
                <p>
                    <FormattedMessage id="modal.personopplysninger.4" />
                </p>
                <ul>
                    <li>
                        <FormattedMessage id="modal.personopplysninger.4.1" />
                    </li>
                    <li>
                        <FormattedMessage id="modal.personopplysninger.4.2" />
                    </li>
                    <li>
                        <FormattedMessage id="modal.personopplysninger.4.3" />
                    </li>
                    <li>
                        <FormattedMessage id="modal.personopplysninger.4.4" />
                    </li>
                    <li>
                        <FormattedMessage id="modal.personopplysninger.4.5" />
                    </li>
                    <li>
                        <FormattedMessage id="modal.personopplysninger.4.6" />
                    </li>
                </ul>
                <p>
                    <FormattedMessage id="modal.personopplysninger.5" />
                </p>
            </Block>

            <Block margin="l">
                <Heading size="small" level="3">
                    <FormattedMessage id="modal.personopplysninger.6" />
                </Heading>
                <p>
                    <FormattedMessage id="modal.personopplysninger.7" />
                </p>
                <ul>
                    <li>
                        <FormattedMessage id="modal.personopplysninger.7.1" />
                    </li>
                    <li>
                        <FormattedMessage id="modal.personopplysninger.7.2" />
                    </li>
                    <li>
                        <FormattedMessage id="modal.personopplysninger.7.3" />
                    </li>
                </ul>
            </Block>
            <Block margin="l">
                <p>
                    <FormattedMessage id="modal.personopplysninger.8.1" />
                    {` `}
                    <Link href={getLenker(intl.locale).personvern} target="_blank">
                        <FormattedMessage id="modal.personopplysninger.8.2" />
                    </Link>
                    <FormattedMessage id="modal.personopplysninger.8.3" />
                </p>
            </Block>
        </>
    );
};

export default BehandlingAvPersonopplysningerContent;
