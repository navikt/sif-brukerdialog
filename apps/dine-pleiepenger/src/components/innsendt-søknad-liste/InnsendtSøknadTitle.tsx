import { BodyShort, HStack, VStack } from '@navikt/ds-react';
import React from 'react';
import { Task } from '@navikt/ds-icons';
import { AppText } from '../../i18n';
import { InnsendtSøknad } from '../../types/InnsendtSøknad';
import { formatInnsendtSøknadOpprettetDato } from '../../utils/innsendtSøknadUtils';

interface Props {
    søknad: InnsendtSøknad;
}

const InnsendtSøknadTitle: React.FunctionComponent<Props> = ({ søknad }) => {
    return (
        <VStack gap="2">
            <HStack gap="2" align="start" wrap={false}>
                <Task role="presentation" aria-hidden={true} width="1.25rem" height="1.25rem" />
                <div>
                    <BodyShort as="div" size="large" weight="semibold">
                        <AppText id={`sakstype.${søknad.søknadstype}`} />
                    </BodyShort>
                </div>
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
    );
};

export default InnsendtSøknadTitle;
