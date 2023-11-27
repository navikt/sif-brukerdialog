import { BodyShort, HStack } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Task } from '@navikt/ds-icons';
import { Søknad } from '../../types/Søknad';
import PrettyDate from '../pretty-date/PrettyDate';
import { getSøknadMottattDato } from '../../utils/søknadUtils';

interface Props {
    søknad: Søknad;
}

const SøknadTitle: React.FunctionComponent<Props> = ({ søknad }) => {
    return (
        <div>
            <HStack gap="2" align={'start'} wrap={false}>
                <Task role="presentation" aria-hidden={true} width="1.25rem" height="1.25rem" />
                <div>
                    <BodyShort as="div" size="large" className="font-bold mb-2">
                        <FormattedMessage id={`sakstype.${søknad.søknadstype}`} />
                    </BodyShort>
                </div>
            </HStack>
            <BodyShort size="small">
                Mottatt{' '}
                <PrettyDate date={getSøknadMottattDato(søknad)} format="dayDateAndTime" useNorwegianTime={true} />
            </BodyShort>
        </div>
    );
};

export default SøknadTitle;
