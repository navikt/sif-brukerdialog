import { BodyLong, Heading, Link, List } from '@navikt/ds-react';
import { ListItem } from '@navikt/ds-react/List';
import { ReactNode } from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { AppText } from '../../../i18n';
import getLenker from '../../../lenker';

const OmSøknaden = () => {
    return (
        <div>
            <Heading level="2" size="medium">
                <AppText id="omSøknaden.tittel" />
            </Heading>
            <BodyLong as="div">
                <List>
                    <ListItem>
                        <AppText id="omSøknaden.tekst.1" />
                    </ListItem>
                    <ListItem>
                        <AppText id="omSøknaden.tekst.2" />
                    </ListItem>
                    <ListItem>
                        <AppText id="omSøknaden.tekst.3" />
                    </ListItem>
                </List>
                <Block>
                    <AppText
                        id="omSøknaden.tekst.4"
                        values={{
                            Lenke: (children: ReactNode) => (
                                <Link href={getLenker().personvern} target="_blank">
                                    {children}
                                </Link>
                            ),
                        }}
                    />
                </Block>
            </BodyLong>
        </div>
    );
};

export default OmSøknaden;
