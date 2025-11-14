import { TasklistIcon } from '@navikt/aksel-icons';
import { Bleed, BodyShort, HStack, Show, VStack } from '@navikt/ds-react';

import { AppText } from '../../i18n';
import { InnsendtSøknad } from '../../types/InnsendtSøknad';
import { formatInnsendtSøknadOpprettetDato } from '../../utils/innsendtSøknadUtils';

interface Props {
    søknad: InnsendtSøknad;
}

const InnsendtSøknadTitle = ({ søknad }: Props) => {
    return (
        <Bleed marginBlock="2 0">
            <VStack gap="2">
                <HStack gap="2" align="start" wrap={false}>
                    <Show above="sm">
                        <TasklistIcon role="presentation" aria-hidden={true} width="1.25rem" height="1.25rem" />
                    </Show>
                    <Bleed marginBlock="1 0">
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
