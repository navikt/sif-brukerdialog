import { BodyLong, Heading, Link, List } from '@navikt/ds-react';
import { ListItem } from '@navikt/ds-react/List';
import { ReactNode } from 'react';

import { AppText } from '../../i18n';
import getLenker from '../../lenker';

const OmSøknaden = () => {
    return (
        <div>
            <Heading level="2" size="medium" spacing={true}>
                <AppText id="page.velkommen.omSøknaden.tittel" />
            </Heading>
            <BodyLong as="div">
                <List>
                    <ListItem>
                        <AppText id="page.velkommen.omSøknaden.1" />
                    </ListItem>
                    <ListItem>
                        <AppText id="page.velkommen.omSøknaden.2" />
                    </ListItem>
                    <ListItem>
                        <AppText id="page.velkommen.omSøknaden.3" />
                    </ListItem>
                </List>
                <p>
                    <AppText
                        id="page.velkommen.omSøknaden.4"
                        values={{
                            Lenke: (children: ReactNode) => (
                                <Link
                                    key="lenke"
                                    href={getLenker().personvernerklæring}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    {children}
                                </Link>
                            ),
                        }}
                    />
                </p>
            </BodyLong>
        </div>
    );
};

export default OmSøknaden;
