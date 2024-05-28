import { Heading, HGrid, VStack } from '@navikt/ds-react';
import React from 'react';
import { PencilWritingIcon } from '@navikt/aksel-icons';
import { Dialog, File, Task } from '@navikt/ds-icons';
import { useAppIntl } from '../../i18n';
import { browserEnv } from '../../utils/env';
import SnarveiLinkPanel from '../snarvei-link-panel/SnarveiLinkPanel';

interface Props {
    title?: string;
}

const Snarveier: React.FunctionComponent<Props> = ({ title }) => {
    const { text } = useAppIntl();
    return (
        <section>
            <VStack gap="4">
                {title ? (
                    <Heading level="2" size="medium" className="text-deepblue-800">
                        {title}
                    </Heading>
                ) : null}

                <HGrid gap="4" columns={{ sm: 1, md: 2 }}>
                    <SnarveiLinkPanel
                        href={browserEnv.NEXT_PUBLIC_SKJEMA_ENDRINGSMELDING_URL}
                        icon={
                            <PencilWritingIcon role="presentation" aria-hidden={true} width="1.5rem" height="1.5rem" />
                        }
                        title={text('snarveier.endring.tittel')}
                        description={text('snarveier.endring.tekst')}
                    />
                    <SnarveiLinkPanel
                        href={browserEnv.NEXT_PUBLIC_SKJEMA_ETTERSENDELSE_URL}
                        icon={<File role="presentation" aria-hidden={true} width="1.5rem" height="1.5rem" />}
                        title={text('snarveier.ettersend.tittel')}
                        description={text('snarveier.ettersend.tekst')}
                    />
                </HGrid>
                <HGrid gap="4" columns={{ sm: 1, md: 2 }}>
                    <SnarveiLinkPanel
                        href={browserEnv.NEXT_PUBLIC_SKRIV_TIL_OSS_URL}
                        icon={<Dialog role="presentation" aria-hidden={true} width="1.5rem" height="1.5rem" />}
                        title={text('snarveier.skrivTilOss.tittel')}
                        description={text('snarveier.skrivTilOss.tekst')}
                    />
                    <SnarveiLinkPanel
                        href={browserEnv.NEXT_PUBLIC_SKJEMA_PLEIEPENGER_URL}
                        icon={<Task role="presentation" aria-hidden={true} width="1.5rem" height="1.5rem" />}
                        title={text('snarveier.nySøknad.tittel')}
                        description={text('snarveier.nySøknad.tekst')}
                    />
                </HGrid>
            </VStack>
        </section>
    );
};

export default Snarveier;
