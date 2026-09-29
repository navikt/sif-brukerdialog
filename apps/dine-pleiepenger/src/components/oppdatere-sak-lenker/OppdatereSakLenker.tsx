import { FileIcon, PencilWritingIcon, TasklistIcon } from '@navikt/aksel-icons';
import { Heading, VStack } from '@navikt/ds-react';

import { useAppIntl } from '../../i18n';
import { browserEnv } from '../../utils/env';
import SnarveiLinkCard from '../snarvei-link-card/SnarveiLinkCard';

const OppdatereSakLenker = () => {
    const { text } = useAppIntl();
    return (
        <section>
            <Heading level="2" size="medium" spacing>
                Trenger du å oppdatere saken din?
            </Heading>
            <VStack gap="space-12">
                <SnarveiLinkCard
                    href={browserEnv.NEXT_PUBLIC_SKJEMA_ENDRINGSMELDING_URL}
                    icon={<PencilWritingIcon role="presentation" aria-hidden={true} width="1.5rem" height="1.5rem" />}
                    title={text('snarveier.endringsmelding.tittel')}
                    description={text('snarveier.endringsmelding.tekst')}
                />
                <SnarveiLinkCard
                    href={browserEnv.NEXT_PUBLIC_BESKJED_URL}
                    icon={<PencilWritingIcon role="presentation" aria-hidden={true} width="1.5rem" height="1.5rem" />}
                    title={text('snarveier.beskjed.tittel')}
                    description={text('snarveier.beskjed.tekst')}
                />
                <SnarveiLinkCard
                    href={browserEnv.NEXT_PUBLIC_SKJEMA_ETTERSENDELSE_URL}
                    icon={<FileIcon role="presentation" aria-hidden={true} width="1.5rem" height="1.5rem" />}
                    title={text('snarveier.ettersend.tittel')}
                    description={text('snarveier.ettersend.tekst')}
                />
                <SnarveiLinkCard
                    href={browserEnv.NEXT_PUBLIC_SKJEMA_PLEIEPENGER_URL}
                    icon={<TasklistIcon role="presentation" aria-hidden={true} width="1.5rem" height="1.5rem" />}
                    title={text('snarveier.nySøknad.tittel')}
                    description={text('snarveier.nySøknad.tekst')}
                />
            </VStack>
        </section>
    );
};

export default OppdatereSakLenker;
