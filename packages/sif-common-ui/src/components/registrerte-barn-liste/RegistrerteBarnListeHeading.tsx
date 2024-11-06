import { Heading, HeadingProps, HelpText, HStack } from '@navikt/ds-react';

import { RegistrerteBarnListText as Text } from './registrerteBarnListe.messages';

export interface RegistrerteBarnListeHeadingProps extends HeadingProps {
    children: string;
}

const RegistrerteBarnListeHeading = ({ children: tittel, ...rest }: RegistrerteBarnListeHeadingProps) => {
    return (
        <HStack gap="2">
            <Heading {...rest} aria-label={tittel}>
                {tittel}
            </Heading>
            <HelpText>
                <Text id="registrerteBarnListe.kilde" />
            </HelpText>
        </HStack>
    );
};

export default RegistrerteBarnListeHeading;
