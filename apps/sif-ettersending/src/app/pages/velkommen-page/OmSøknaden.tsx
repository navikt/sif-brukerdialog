import { BodyLong, Heading, Link } from '@navikt/ds-react';
import { ReactNode } from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { AppText } from '../../i18n';
import getLenker from '../../lenker';

const OmSøknaden = () => {
    return (
        <Block margin="xl">
            <Heading level="2" size="medium">
                <AppText id="page.velkommen.omSøknaden.tittel" />
            </Heading>
            <BodyLong as="div">
                <p>
                    <AppText id="page.velkommen.omSøknaden.1" />
                </p>
                <p>
                    <AppText id="page.velkommen.omSøknaden.2" />
                </p>
                <p>
                    <AppText id="page.velkommen.omSøknaden.3" />
                </p>
                <Block>
                    <AppText
                        id="page.velkommen.omSøknaden.4"
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
        </Block>
    );
};

export default OmSøknaden;
