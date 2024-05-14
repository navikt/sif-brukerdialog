import { BodyShort, HStack } from '@navikt/ds-react';
import React from 'react';
import { Task } from '@navikt/ds-icons';
import { Msg } from '../../i18n';
import { InnsendtSøknad } from '../../types/InnsendtSøknad';
import { formatInnsendtSøknadOpprettetDato } from '../../utils/innsendtSøknadUtils';

interface Props {
    søknad: InnsendtSøknad;
}

const InnsendtSøknadTitle: React.FunctionComponent<Props> = ({ søknad }) => {
    return (
        <div>
            <HStack gap="2" align={'start'} wrap={false}>
                <Task role="presentation" aria-hidden={true} width="1.25rem" height="1.25rem" />
                <div>
                    <BodyShort as="div" size="large" className="font-bold mb-2">
                        <Msg id={`sakstype.${søknad.søknadstype}`} />
                    </BodyShort>
                </div>
            </HStack>
            {søknad.opprettet ? (
                <BodyShort size="small" className="text-grayalpha-700">
                    <Msg
                        id="innsendtSøknadTitle.mottatt"
                        values={{ dato: formatInnsendtSøknadOpprettetDato(søknad.opprettet) }}
                    />
                </BodyShort>
            ) : null}
        </div>
    );
};

export default InnsendtSøknadTitle;
