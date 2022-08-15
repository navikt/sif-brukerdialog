import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import { Heading, Link } from '@navikt/ds-react';
import getLenker from '../../../lenker';

const BehandlingAvPersonopplysningerContent: React.FunctionComponent = () => {
    const intl = useIntl();
    return (
        <>
            <Heading level="1" size="medium">
                <FormattedMessage id="modal.personopplysninger.1" />
            </Heading>
            <Block margin="xl">
                <FormattedMessage id="modal.personopplysninger.2" />
            </Block>
            <Block margin="xl">
                <Heading level="2" size="small">
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
                <ul>
                    <li>
                        <FormattedMessage id="modal.personopplysninger.5.1" />
                    </li>
                    <li>
                        <FormattedMessage id="modal.personopplysninger.5.2" />
                    </li>
                </ul>
            </Block>
            <Block margin="xl">
                <Heading level="2" size="small">
                    <FormattedMessage id="modal.personopplysninger.6" />
                </Heading>
                <p>
                    <FormattedMessage id="modal.personopplysninger.7" />
                </p>
            </Block>
            <Block margin="xl">
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
