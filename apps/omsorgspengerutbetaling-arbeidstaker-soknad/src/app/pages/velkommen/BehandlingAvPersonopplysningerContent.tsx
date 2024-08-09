import { Heading, Link, VStack } from '@navikt/ds-react';
import React from 'react';
import InfoList from '@navikt/sif-common-core-ds/src/components/lists/info-list/InfoList';
import { AppText } from '../../i18n';
import getLenker from '../../lenker';

const BehandlingAvPersonopplysningerContent: React.FunctionComponent = () => {
    return (
        <VStack gap="2" paddingBlock="2 0">
            <div>
                <Heading level="3" size="xsmall" spacing={true}>
                    <AppText id="personopplysninger.1" />
                </Heading>
                <p>
                    <AppText id="personopplysninger.2" />
                </p>
            </div>
            <div>
                <Heading level="3" size="xsmall" spacing={true}>
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
            </div>
            <div>
                <AppText
                    id="personopplysninger.5"
                    values={{
                        Lenke: (value) => (
                            <Link href={getLenker().personvern} target="_blank">
                                {value}
                            </Link>
                        ),
                    }}
                />
            </div>
        </VStack>
    );
};

export default BehandlingAvPersonopplysningerContent;
