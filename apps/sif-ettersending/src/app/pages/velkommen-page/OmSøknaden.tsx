import { BodyLong, Heading, Link } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import getLenker from '../../lenker';

const OmSøknaden = () => {
    return (
        <Block margin="xl">
            <Heading level="2" size="medium">
                <FormattedMessage id="page.velkommen.omSøknaden.tittel" />
            </Heading>
            <BodyLong as="div">
                <FormattedMessage id="page.velkommen.omSøknaden.1" tagName="p" />
                <FormattedMessage id="page.velkommen.omSøknaden.2" tagName="p" />
                <FormattedMessage id="page.velkommen.omSøknaden.3" tagName="p" />
                <Block>
                    <FormattedMessage id="page.velkommen.omSøknaden.4.1" />
                    <Link href={getLenker().personvern} target="_blank">
                        <FormattedMessage id="page.velkommen.omSøknaden.4.2" />
                    </Link>
                    <FormattedMessage id="page.velkommen.omSøknaden.4.3" />
                </Block>
            </BodyLong>
        </Block>
    );
};

export default OmSøknaden;
