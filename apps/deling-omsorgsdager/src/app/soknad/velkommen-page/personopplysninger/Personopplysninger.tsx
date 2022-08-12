import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import Lenke from 'nav-frontend-lenker';
import { Ingress, Systemtittel } from 'nav-frontend-typografi';
import getLenker from '../../../lenker';

const BehandlingAvPersonopplysningerContent: React.FunctionComponent = () => {
    const intl = useIntl();
    return (
        <>
            <Systemtittel tag="h1">
                <FormattedMessage id="modal.personopplysninger.1" />
            </Systemtittel>
            <Block margin="xl">
                <FormattedMessage id="modal.personopplysninger.2" />
            </Block>
            <Block margin="xl">
                <Ingress tag="h2">
                    <FormattedMessage id="modal.personopplysninger.3" />
                </Ingress>
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
                <Ingress tag="h2">
                    <FormattedMessage id="modal.personopplysninger.6" />
                </Ingress>
                <p>
                    <FormattedMessage id="modal.personopplysninger.7" />
                </p>
            </Block>
            <Block margin="xl">
                <p>
                    <FormattedMessage id="modal.personopplysninger.8.1" />
                    {` `}
                    <Lenke href={getLenker(intl.locale).personvern} target="_blank">
                        <FormattedMessage id="modal.personopplysninger.8.2" />
                    </Lenke>
                    <FormattedMessage id="modal.personopplysninger.8.3" />
                </p>
            </Block>
        </>
    );
};

export default BehandlingAvPersonopplysningerContent;
