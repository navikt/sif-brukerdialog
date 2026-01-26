import { TasklistIcon } from '@navikt/aksel-icons';
import { Bleed, BodyShort, HStack, Show, VStack } from '@navikt/ds-react';

import { AppText } from '../../i18n';
import { InnsendtSøknad } from '../../types';
import { formatInnsendtSøknadOpprettetDato } from '../../utils/innsendtSøknadUtils';

interface Props {
    søknad: InnsendtSøknad;
}

const InnsendtSøknadTitle = ({ søknad }: Props) => {
    return (
        <Bleed marginBlock="space-8 space-0">
            <VStack gap="space-8">
                <HStack gap="space-8" align="start" wrap={false}>
                    <Show above="sm">
                        <TasklistIcon role="presentation" aria-hidden={true} width="1.25rem" height="1.25rem" />
                    </Show>
                    <Bleed marginBlock="space-4 space-0">
                        <BodyShort as="div" size="large" weight="semibold">
                            <AppText id={`sakstype.${søknad.søknadstype}`} />
                        </BodyShort>
                    </Bleed>
                </HStack>
                {søknad.opprettet ? (
                    <BodyShort size="small">
                        <AppText
                            id="innsendtSøknadTitle.mottatt"
                            values={{ dato: formatInnsendtSøknadOpprettetDato(søknad.opprettet) }}
                        />
                    </BodyShort>
                ) : null}
            </VStack>
        </Bleed>
    );
};

export default InnsendtSøknadTitle;
