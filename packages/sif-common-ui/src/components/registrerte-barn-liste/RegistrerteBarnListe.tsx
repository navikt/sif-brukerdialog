import { Alert, Box, HStack, VStack } from '@navikt/ds-react';
import React from 'react';
import { RegistrertBarn } from '@navikt/sif-common-api';
import ItemList from '@navikt/sif-common-core-ds/src/components/lists/item-list/ItemList';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { dateFormatter } from '@navikt/sif-common-utils';
import { RegistrerteBarnListText as Text } from './registrerteBarnListe.messages';
import RegistrerteBarnListeHeading, { RegistrerteBarnListeHeadingProps } from './RegistrerteBarnListeHeading';

interface Props {
    registrerteBarn: RegistrertBarn[];
}

const RegistrerteBarnListe = ({ registrerteBarn }: Props) => {
    return registrerteBarn.length === 0 ? (
        <Alert variant="info">
            <Text id="registrerteBarnListe.ingenbarn" />
        </Alert>
    ) : (
        <VStack gap="4">
            <ItemList<RegistrertBarn>
                getItemId={(barn): string => barn.aktørId}
                getItemTitle={(barn): string => barn.etternavn}
                labelRenderer={(barn): React.ReactNode => (
                    <HStack gap="4">
                        <Box>
                            <Text
                                id="registrertBarnListe.barn.født"
                                values={{ dato: dateFormatter.compact(barn.fødselsdato) }}
                            />
                        </Box>
                        <Box>{formatName(barn.fornavn, barn.etternavn, barn.mellomnavn)}</Box>
                    </HStack>
                )}
                items={registrerteBarn}
            />
        </VStack>
    );
};

RegistrerteBarnListe.Heading = RegistrerteBarnListeHeading;

export default RegistrerteBarnListe;

export type { RegistrerteBarnListeHeadingProps };
