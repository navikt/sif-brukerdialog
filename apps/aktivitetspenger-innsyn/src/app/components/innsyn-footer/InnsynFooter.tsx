import { BodyLong, Heading, Link, VStack } from '@navikt/ds-react';
import { ReactNode } from 'react';
import { AppText } from '../../i18n';
import getLenker from '../../lenker';

export const InnsynFooter = () => {
    return (
        <div>
            <Heading level="2" size="medium" spacing>
                <AppText id="page.forside.om.tittel" />
            </Heading>
            <VStack gap="space-16">
                <BodyLong>
                    <AppText id="page.forside.om.tekst.1" />
                </BodyLong>
                <BodyLong>
                    <AppText
                        id="page.forside.om.tekst.2"
                        values={{
                            Lenke: (chunks: ReactNode) => <Link href={getLenker().aktivitetspenger}>{chunks}</Link>,
                        }}
                    />
                </BodyLong>
            </VStack>
        </div>
    );
};
