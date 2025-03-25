import { Heading, HGrid, VStack } from '@navikt/ds-react';
import { Dialog } from '@navikt/ds-icons';
import { useAppIntl } from '../../i18n';
import { browserEnv } from '../../utils/env';
import SnarveiLinkPanel from '../snarvei-link-panel/SnarveiLinkPanel';

const SkrivTilOssLenker = () => {
    const { text } = useAppIntl();
    return (
        <section>
            <VStack gap="4">
                <Heading level="2" size="medium" className="text-deepblue-800">
                    Har du spørsmål om saken din?
                </Heading>
                <HGrid gap="4" columns={{ sm: 1, md: 2 }}>
                    <SnarveiLinkPanel
                        href={browserEnv.NEXT_PUBLIC_SKRIV_TIL_OSS_URL}
                        icon={<Dialog role="presentation" aria-hidden={true} width="1.5rem" height="1.5rem" />}
                        title={text('snarveier.skrivTilOss.tittel')}
                        // description={text('snarveier.skrivTilOss.tekst')}
                    />
                </HGrid>
            </VStack>
        </section>
    );
};

export default SkrivTilOssLenker;
