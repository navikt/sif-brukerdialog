import { BodyLong, Heading, Link } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { AppText } from '../../../i18n';
import getLenker from '../../../lenker';
import InfoList from './info-list/InfoList';

const BehandlingAvPersonopplysningerContent: React.FunctionComponent = () => {
    return (
        <>
            <BodyLong size="large">
                <AppText id="personopplysninger.1" />
            </BodyLong>
            <p>
                <AppText id="personopplysninger.2" />
            </p>
            <Block margin="l">
                <Heading level="3" size="xsmall">
                    <AppText id="personopplysninger.3" />
                </Heading>
                <p>
                    <AppText id="personopplysninger.4" />
                </p>
                <InfoList>
                    <li>
                        <AppText id="personopplysninger.4.1" />
                    </li>
                    <li>
                        <AppText id="personopplysninger.4.2" />
                    </li>
                    <li>
                        <AppText id="personopplysninger.4.3" />
                    </li>
                    <li>
                        <AppText id="personopplysninger.4.4" />
                    </li>
                    <li>
                        <AppText id="personopplysninger.4.5" />
                    </li>
                    <li>
                        <AppText id="personopplysninger.4.6" />
                    </li>
                </InfoList>
                <p>
                    <AppText id="personopplysninger.4b" />
                </p>
            </Block>

            <Block>
                <AppText
                    id="personopplysninger.5"
                    values={{
                        Lenke: (children) => (
                            <Link href={getLenker().personvern} target="_blank">
                                {children}
                            </Link>
                        ),
                    }}
                />
            </Block>
        </>
    );
};

export default BehandlingAvPersonopplysningerContent;
