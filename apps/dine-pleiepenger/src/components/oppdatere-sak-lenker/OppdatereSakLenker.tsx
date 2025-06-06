import { Heading, HGrid, VStack } from '@navikt/ds-react';
import { PencilWritingIcon } from '@navikt/aksel-icons';
import { File, Task } from '@navikt/ds-icons';
import { useAppIntl } from '../../i18n';
import { browserEnv } from '../../utils/env';
import SnarveiLinkPanel from '../snarvei-link-panel/SnarveiLinkPanel';

const OppdatereSakLenker = () => {
    const { text } = useAppIntl();
    return (
        <section>
            <VStack gap="4">
                <Heading level="2" size="medium" className="text-deepblue-800">
                    Trenger du å oppdatere saken din?
                </Heading>
                <HGrid gap="4" columns={{ sm: 1, md: 2 }}>
                    <SnarveiLinkPanel
                        href={browserEnv.NEXT_PUBLIC_SKJEMA_ENDRINGSMELDING_URL}
                        icon={
                            <PencilWritingIcon role="presentation" aria-hidden={true} width="1.5rem" height="1.5rem" />
                        }
                        title={text('snarveier.endringsmelding.tittel')}
                        description={text('snarveier.endringsmelding.tekst')}
                    />
                    <SnarveiLinkPanel
                        href={browserEnv.NEXT_PUBLIC_BESKJED_URL}
                        icon={
                            <PencilWritingIcon role="presentation" aria-hidden={true} width="1.5rem" height="1.5rem" />
                        }
                        title={text('snarveier.beskjed.tittel')}
                        description={text('snarveier.beskjed.tekst')}
                    />
                </HGrid>
                <HGrid gap="4" columns={{ sm: 1, md: 2 }}>
                    <SnarveiLinkPanel
                        href={browserEnv.NEXT_PUBLIC_SKJEMA_ETTERSENDELSE_URL}
                        icon={<File role="presentation" aria-hidden={true} width="1.5rem" height="1.5rem" />}
                        title={text('snarveier.ettersend.tittel')}
                        description={text('snarveier.ettersend.tekst')}
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

export default OppdatereSakLenker;
